import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getUserClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

/** Admin client for storage operations (bypasses storage RLS) */
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("MISSING ENV:", { hasUrl: !!url, hasServiceKey: !!key });
    throw new Error("Server configuration error: missing Supabase service role key");
  }
  return createClient(url, key);
}

/**
 * POST /api/collaborate/files — Upload a file to a project
 * Body: FormData with fields: projectId, file, category?, description?
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabase = getUserClient(token);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const projectId = formData.get("projectId") as string;
    const file = formData.get("file") as File;
    const category = (formData.get("category") as string) || "general";
    const description = (formData.get("description") as string) || null;

    if (!projectId || !file) {
      return NextResponse.json(
        { error: "projectId and file required" },
        { status: 400 }
      );
    }

    // Validate file size (max 25MB)
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 25MB)" },
        { status: 400 }
      );
    }

    // Check user has access to the project (owner or collaborator)
    const { data: project } = await supabase
      .from("projects")
      .select("user_id")
      .eq("id", projectId)
      .single();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const isOwner = project.user_id === user.id;
    if (!isOwner) {
      const { data: collab } = await supabase
        .from("project_collaborators")
        .select("accepted_at, role, vendor_company")
        .eq("project_id", projectId)
        .eq("user_id", user.id)
        .single();

      if (!collab?.accepted_at) {
        return NextResponse.json(
          { error: "You must be a collaborator on this project" },
          { status: 403 }
        );
      }
    }

    // Get vendor company if applicable
    let vendorCompany: string | null = null;
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role, company_name")
      .eq("id", user.id)
      .single();

    if (profile?.role === "vendor" || profile?.company_name) {
      vendorCompany = profile.company_name ?? null;
    }

    // Use admin client for storage (bypasses storage RLS; our API handles access control)
    const admin = getAdminClient();

    // Upload to Supabase Storage
    const storagePath = `${projectId}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const fileBuffer = await file.arrayBuffer();
    const { error: uploadError } = await admin.storage
      .from("project-files")
      .upload(storagePath, fileBuffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file: " + uploadError.message },
        { status: 500 }
      );
    }

    // Record in project_files table (admin so RLS doesn't block owner inserts)
    const { data: fileRecord, error: insertError } = await admin
      .from("project_files")
      .insert({
        project_id: projectId,
        uploaded_by: user.id,
        file_name: file.name,
        file_type: file.type || null,
        file_size: file.size,
        storage_path: storagePath,
        file_category: category,
        description,
        vendor_company: vendorCompany,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert file record error:", insertError);
      // Clean up storage on failure
      await admin.storage.from("project-files").remove([storagePath]);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Log activity
    await supabase.from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "file_uploaded",
      details: {
        fileName: file.name,
        category,
        fileSize: file.size,
        vendorCompany,
      },
    });

    return NextResponse.json({ success: true, file: fileRecord });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("File upload POST error:", message, err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/collaborate/files?projectId=xxx — list project files
 */
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabase = getUserClient(token);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projectId = req.nextUrl.searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json({ error: "projectId required" }, { status: 400 });
    }

    const { data: files, error } = await supabase
      .from("project_files")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Generate signed URLs for each file (admin client for storage access)
    const admin = getAdminClient();
    const filesWithUrls = await Promise.all(
      (files ?? []).map(async (f: Record<string, unknown>) => {
        const { data: urlData } = await admin.storage
          .from("project-files")
          .createSignedUrl(f.storage_path as string, 3600); // 1 hour

        return {
          ...f,
          downloadUrl: urlData?.signedUrl ?? null,
        };
      })
    );

    return NextResponse.json({ files: filesWithUrls });
  } catch (err) {
    console.error("File list GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/collaborate/files — delete a project file
 * Body: { fileId, projectId }
 */
export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabase = getUserClient(token);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { fileId, projectId } = body;

    if (!fileId) {
      return NextResponse.json({ error: "fileId required" }, { status: 400 });
    }

    // Get file record to find storage path
    const { data: fileRecord } = await supabase
      .from("project_files")
      .select("storage_path, uploaded_by")
      .eq("id", fileId)
      .single();

    if (!fileRecord) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Check permission: owner of file, or owner of project
    const { data: project } = await supabase
      .from("projects")
      .select("user_id")
      .eq("id", projectId)
      .single();

    if (fileRecord.uploaded_by !== user.id && project?.user_id !== user.id) {
      return NextResponse.json(
        { error: "Only the file uploader or project owner can delete files" },
        { status: 403 }
      );
    }

    // Delete from storage (admin client)
    const admin = getAdminClient();
    await admin.storage
      .from("project-files")
      .remove([fileRecord.storage_path]);

    // Delete record
    const { error } = await supabase
      .from("project_files")
      .delete()
      .eq("id", fileId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log activity
    if (projectId) {
      await supabase.from("project_activity").insert({
        project_id: projectId,
        user_id: user.id,
        action: "file_deleted",
        details: { fileId },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("File delete error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

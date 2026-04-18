import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getUserClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

/**
 * POST /api/collaborate/files/record — Record a file that was uploaded client-side
 * Body: { projectId, fileName, fileType, fileSize, storagePath, category?, description? }
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

    const body = await req.json();
    const { projectId, fileName, fileType, fileSize, storagePath, category, description } = body;

    if (!projectId || !fileName || !storagePath) {
      return NextResponse.json(
        { error: "projectId, fileName, and storagePath required" },
        { status: 400 }
      );
    }

    // Verify user has access (owner or collaborator)
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
        .select("accepted_at")
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

    if (profile?.company_name) {
      vendorCompany = profile.company_name;
    }

    // Use service role for insert if available, otherwise user client
    let dbClient = supabase;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (serviceKey) {
      dbClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey);
    }

    const { data: fileRecord, error: insertError } = await dbClient
      .from("project_files")
      .insert({
        project_id: projectId,
        uploaded_by: user.id,
        file_name: fileName,
        file_type: fileType || null,
        file_size: fileSize || 0,
        storage_path: storagePath,
        file_category: category || "general",
        description: description || null,
        vendor_company: vendorCompany,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert file record error:", insertError);
      return NextResponse.json(
        { error: "DB insert failed: " + insertError.message },
        { status: 500 }
      );
    }

    // Log activity
    await dbClient.from("project_activity").insert({
      project_id: projectId,
      user_id: user.id,
      action: "file_uploaded",
      details: {
        fileName,
        category: category || "general",
        fileSize: fileSize || 0,
        vendorCompany,
      },
    });

    return NextResponse.json({ success: true, file: fileRecord });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("File record POST error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

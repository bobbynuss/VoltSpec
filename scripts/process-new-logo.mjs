import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SOURCE = "C:/Users/bobnu/.openclaw/media/inbound/acdf5493-eb92-4893-9176-95d15af65f91.jpg";

// VoltSpec site background: hsl(222, 47%, 7%) ≈ #0f1729 ≈ rgb(15, 23, 41)
const SITE_BG = { r: 15, g: 23, b: 41 };

async function main() {
  const meta = await sharp(SOURCE).metadata();
  const W = meta.width, H = meta.height;
  console.log(`Source: ${W}x${H}`);

  await sharp(SOURCE).toFile(join(PUBLIC, "voltspec-logo-source.jpg"));

  // The logo bg is dark navy that closely matches the site bg.
  // For the header/hero: replace the logo bg with exact site bg color
  // so it blends perfectly. Then make THAT color transparent.

  const { data: orig } = await sharp(SOURCE).raw().toBuffer({ resolveWithObject: true });
  const ch = 3;

  // Step 1: Build alpha channel based on how different each pixel is from the bg
  // Pixels very close to the bg → transparent; logo content → opaque
  // Smooth gradient at glow edges
  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const r = orig[i * ch], g = orig[i * ch + 1], b = orig[i * ch + 2];
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;

    // Color distance from known bg samples (avg: R=13, G=16, B=40)
    const dr = r - 13, dg = g - 16, db = b - 40;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);

    // Map distance to alpha: 0-15 → transparent, 15-40 → gradient, 40+ → opaque
    let alpha;
    if (dist < 12) {
      alpha = 0;
    } else if (dist < 40) {
      alpha = Math.round(((dist - 12) / 28) * 255);
    } else {
      alpha = 255;
    }
    rgba[i * 4 + 3] = alpha;
  }

  // Recolored version for icons (site bg replaces original bg exactly)
  const recolored = Buffer.from(orig);
  for (let i = 0; i < W * H; i++) {
    if (rgba[i * 4 + 3] === 0) {
      recolored[i * ch] = SITE_BG.r;
      recolored[i * ch + 1] = SITE_BG.g;
      recolored[i * ch + 2] = SITE_BG.b;
    }
  }

  const trimmed = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .trim()
    .toBuffer({ resolveWithObject: true });
  console.log(`Trimmed: ${trimmed.info.width}x${trimmed.info.height}`);

  const maxDim = Math.max(trimmed.info.width, trimmed.info.height);
  const pad = Math.round(maxDim * 0.04);
  const sq = maxDim + pad * 2;

  const squareLogo = await sharp(trimmed.data, {
    raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 },
  }).extend({
    top: Math.round((sq - trimmed.info.height) / 2),
    bottom: Math.ceil((sq - trimmed.info.height) / 2),
    left: Math.round((sq - trimmed.info.width) / 2),
    right: Math.ceil((sq - trimmed.info.width) / 2),
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).png().toBuffer();

  writeFileSync(join(PUBLIC, "logo-transparent.png"), squareLogo);
  console.log("Saved: logo-transparent.png");

  // Header logo (transparent bg, 128px)
  const hdr = await sharp(squareLogo).resize(128, 128, { fit: "inside" }).png().toBuffer();
  writeFileSync(join(PUBLIC, "logo-header.png"), hdr);
  console.log("Saved: logo-header.png");

  // Step 3: Icons — use the recolored version WITH site bg (no transparency)
  // This gives clean edges since the bg matches the icon background perfectly
  const recoloredPng = await sharp(recolored, { raw: { width: W, height: H, channels: ch } })
    .png().toBuffer();

  // Crop to square center
  const cropSize = Math.min(W, H);
  const cropTop = Math.round((H - cropSize) / 2);
  const squareMaster = await sharp(recoloredPng)
    .extract({ left: 0, top: cropTop, width: cropSize, height: cropSize })
    .resize(1024, 1024)
    .png()
    .toBuffer();

  const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];
  for (const size of SIZES) {
    const cr = Math.round(size * 0.18);
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${cr}" ry="${cr}" fill="white"/></svg>`
    );
    const resized = await sharp(squareMaster).resize(size, size).png().toBuffer();
    const icon = await sharp(resized)
      .composite([{ input: mask, blend: "dest-in" }])
      .png().toBuffer();
    const fn = size === 180 ? "apple-touch-icon.png" : `icon-${size}x${size}.png`;
    writeFileSync(join(PUBLIC, fn), icon);
    console.log(`Saved: ${fn}`);
  }

  console.log("\nDone!");
}

main().catch(console.error);

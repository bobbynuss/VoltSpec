import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SOURCE = join(PUBLIC, "voltspec-logo-source.jpg");

async function main() {
  const meta = await sharp(SOURCE).metadata();
  const W = meta.width, H = meta.height;
  console.log(`Source: ${W}x${H}`);

  const CX = 395; // center axis of V
  const ch = 3;

  // Load original raw pixels  
  const { data: orig } = await sharp(SOURCE).raw().toBuffer({ resolveWithObject: true });

  const isBolt = (r, g, b) =>
    (r > 145 && g > 100 && b < 115 && (r - b) > 50) ||
    (r > 100 && g > 60 && b < 50 && (r - b) > 60 && r > g);
  const isChecker = (r, g, b) => ((r + g + b) / 3) > 165 && (Math.max(r, g, b) - Math.min(r, g, b)) < 40;

  // Build per-row bolt bounds (on entire image) and a dilated bolt mask
  const boltMask = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * ch;
      if (isBolt(orig[i], orig[i+1], orig[i+2])) boltMask[y * W + x] = 1;
    }
  }

  // Dilate bolt mask to include glow
  const GLOW = 25;
  const dilated = new Uint8Array(W * H);
  // Use row-based dilation for speed
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!boltMask[y * W + x]) continue;
      const yMin = Math.max(0, y - GLOW), yMax = Math.min(H - 1, y + GLOW);
      const xMin = Math.max(0, x - GLOW), xMax = Math.min(W - 1, x + GLOW);
      for (let dy = yMin; dy <= yMax; dy++) {
        for (let dx = xMin; dx <= xMax; dx++) {
          if ((dx - x) * (dx - x) + (dy - y) * (dy - y) <= GLOW * GLOW) {
            dilated[dy * W + dx] = 1;
          }
        }
      }
    }
  }
  console.log("Built dilated bolt+glow mask");

  // Output: same dimensions as original
  const out = Buffer.from(orig);

  // For every pixel on the RIGHT side of center:
  // If it's in the bolt+glow zone → keep original pixel (preserves bolt exactly)
  // Otherwise → replace with mirrored left pixel (but skip if mirror source is in bolt zone)
  for (let y = 0; y < H; y++) {
    for (let x = CX + 1; x < W; x++) {
      // Preserve everything in the bolt+glow zone from the original
      if (dilated[y * W + x]) continue;

      const mx = CX - (x - CX); // mirror coordinate
      if (mx < 0) continue;

      // Don't copy from bolt zone on left side
      if (dilated[y * W + mx]) continue;

      // Copy mirrored pixel
      const srcI = (y * W + mx) * ch;
      const dstI = (y * W + x) * ch;
      out[dstI] = orig[srcI];
      out[dstI + 1] = orig[srcI + 1];
      out[dstI + 2] = orig[srcI + 2];
    }
  }

  console.log("Mirror complete — bolt zone fully preserved from original");

  // Save mirrored JPG
  await sharp(out, { raw: { width: W, height: H, channels: ch } })
    .jpeg({ quality: 95 })
    .toFile(join(PUBLIC, "voltspec-logo-mirrored.jpg"));
  console.log("Saved: voltspec-logo-mirrored.jpg");

  // Make transparent and trim
  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const r = out[i * ch], g = out[i * ch + 1], b = out[i * ch + 2];
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    rgba[i * 4 + 3] = isChecker(r, g, b) ? 0 : 255;
  }

  const trimmed = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .trim()
    .toBuffer({ resolveWithObject: true });
  console.log(`Trimmed: ${trimmed.info.width}x${trimmed.info.height}`);

  const maxDim = Math.max(trimmed.info.width, trimmed.info.height);
  const pad = Math.round(maxDim * 0.06);
  const sq = maxDim + pad * 2;

  const squareLogo = await sharp(trimmed.data, {
    raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 },
  })
    .extend({
      top: Math.round((sq - trimmed.info.height) / 2),
      bottom: Math.ceil((sq - trimmed.info.height) / 2),
      left: Math.round((sq - trimmed.info.width) / 2),
      right: Math.ceil((sq - trimmed.info.width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  writeFileSync(join(PUBLIC, "logo-transparent.png"), squareLogo);
  console.log("Saved: logo-transparent.png");

  // Generate icons
  const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];
  for (const size of SIZES) {
    const cr = Math.round(size * 0.18);
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${cr}" ry="${cr}" fill="white"/></svg>`
    );
    const resized = await sharp(squareLogo)
      .resize(size, size, { fit: "contain", background: { r: 15, g: 23, b: 42, alpha: 255 } })
      .png()
      .toBuffer();
    const icon = await sharp(resized)
      .composite([{ input: mask, blend: "dest-in" }])
      .png()
      .toBuffer();
    const fn = size === 180 ? "apple-touch-icon.png" : `icon-${size}x${size}.png`;
    writeFileSync(join(PUBLIC, fn), icon);
    console.log(`Saved: ${fn}`);
  }

  const hdr = await sharp(squareLogo).resize(128, 128, { fit: "inside" }).png().toBuffer();
  writeFileSync(join(PUBLIC, "logo-header.png"), hdr);
  console.log("Saved: logo-header.png\nDone!");
}

main().catch(console.error);

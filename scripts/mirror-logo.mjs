import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SOURCE = join(PUBLIC, "voltspec-logo-source.jpg");

async function main() {
  const meta = await sharp(SOURCE).metadata();
  const W = meta.width, H = meta.height;
  console.log(`Source: ${W}x${H}`);

  // V center axis
  const CX = 395;

  // Load original pixels
  const { data: orig } = await sharp(SOURCE).raw().toBuffer({ resolveWithObject: true });
  const ch = 3; // JPEG = RGB

  // Simple color checks
  const isYellow = (r, g, b) => r > 145 && g > 100 && b < 115 && (r - b) > 50;
  const isChecker = (r, g, b) => ((r + g + b) / 3) > 165 && (Math.max(r, g, b) - Math.min(r, g, b)) < 40;

  // OUTPUT = copy of original
  const out = Buffer.from(orig);

  // For every pixel to the RIGHT of center:
  //   - If it's a yellow bolt pixel → keep it (don't touch)
  //   - Otherwise → replace with the mirrored left-side pixel,
  //     UNLESS the mirrored left pixel is yellow (bolt on left side),
  //     in which case use checker gray so we don't create a ghost bolt
  for (let y = 0; y < H; y++) {
    for (let x = CX + 1; x < W; x++) {
      const idx = (y * W + x) * ch;
      const r = out[idx], g = out[idx + 1], b = out[idx + 2];

      // Keep bolt pixels on the right side untouched
      if (isYellow(r, g, b)) continue;

      // Mirror coordinate
      const mx = CX - (x - CX);
      if (mx < 0) continue;

      const mIdx = (y * W + mx) * ch;
      const mr = orig[mIdx], mg = orig[mIdx + 1], mb = orig[mIdx + 2];

      // If the mirrored left pixel is yellow (bolt), don't copy it — use checker bg
      if (isYellow(mr, mg, mb)) {
        out[idx] = 204;
        out[idx + 1] = 204;
        out[idx + 2] = 204;
      } else {
        // Copy the mirrored left pixel (V arm, trace, bg, glow)
        out[idx] = mr;
        out[idx + 1] = mg;
        out[idx + 2] = mb;
      }
    }
  }

  // Save mirrored JPG for inspection
  await sharp(out, { raw: { width: W, height: H, channels: ch } })
    .jpeg({ quality: 95 })
    .toFile(join(PUBLIC, "voltspec-logo-mirrored.jpg"));
  console.log("Saved: voltspec-logo-mirrored.jpg");

  // Make transparent
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

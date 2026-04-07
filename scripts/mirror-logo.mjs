import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SOURCE = join(PUBLIC, "voltspec-logo-source.jpg");

async function main() {
  const meta = await sharp(SOURCE).metadata();
  const W = meta.width, H = meta.height;
  const ch = 3;
  console.log(`Source: ${W}x${H}`);

  const { data: orig } = await sharp(SOURCE).raw().toBuffer({ resolveWithObject: true });

  const CX = 395; // V center axis

  const isBolt = (r, g, b) =>
    (r > 145 && g > 100 && b < 115 && (r - b) > 50) ||
    (r > 100 && g > 60 && b < 50 && (r - b) > 60 && r > g);
  // Also catch the blue/cyan glow pixels around the bolt (they have high blue channel)
  const isBoltGlow = (r, g, b) => {
    // Yellow-adjacent warm glow
    if (r > 120 && g > 80 && b < 80 && (r - b) > 40) return true;
    // Dark amber edges
    if (r > 80 && g > 50 && b < 40 && (r - b) > 40) return true;
    return false;
  };
  const isChecker = (r, g, b) => ((r + g + b) / 3) > 165 && (Math.max(r, g, b) - Math.min(r, g, b)) < 40;

  // Build bolt mask with wider dilation for glow protection
  const GLOW = 35;
  const boltMask = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const r = orig[i * ch], g = orig[i * ch + 1], b = orig[i * ch + 2];
    if (isBolt(r, g, b) || isBoltGlow(r, g, b)) boltMask[i] = 1;
  }
  const dilated = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!boltMask[y * W + x]) continue;
      const yMin = Math.max(0, y - GLOW), yMax = Math.min(H - 1, y + GLOW);
      const xMin = Math.max(0, x - GLOW), xMax = Math.min(W - 1, x + GLOW);
      for (let dy = yMin; dy <= yMax; dy++) {
        for (let dx = xMin; dx <= xMax; dx++) {
          if ((dx - x) ** 2 + (dy - y) ** 2 <= GLOW * GLOW) {
            dilated[dy * W + dx] = 1;
          }
        }
      }
    }
  }
  console.log("Built bolt+glow mask");

  const out = Buffer.from(orig);

  // For every pixel on the RIGHT side:
  // - If in bolt+glow zone → keep original (preserves bolt perfectly)
  // - Otherwise → replace with mirrored left pixel
  //   - Unless mirror source is in bolt zone → use checker bg
  for (let y = 0; y < H; y++) {
    for (let x = CX + 1; x < W; x++) {
      if (dilated[y * W + x]) continue; // protect bolt zone

      const mx = CX - (x - CX);
      if (mx < 0) continue;

      if (dilated[y * W + mx]) {
        // Mirror source is bolt — fill with checker
        out[(y * W + x) * ch] = 204;
        out[(y * W + x) * ch + 1] = 204;
        out[(y * W + x) * ch + 2] = 204;
      } else {
        const si = (y * W + mx) * ch;
        const di = (y * W + x) * ch;
        out[di] = orig[si];
        out[di + 1] = orig[si + 1];
        out[di + 2] = orig[si + 2];
      }
    }
  }

  console.log("Mirror complete");

  // Save JPG for inspection
  await sharp(out, { raw: { width: W, height: H, channels: ch } })
    .jpeg({ quality: 95 })
    .toFile(join(PUBLIC, "voltspec-logo-final.jpg"));
  console.log("Saved: voltspec-logo-final.jpg");

  // Make transparent + trim + icons
  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const r = out[i * ch], g = out[i * ch + 1], b = out[i * ch + 2];
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    rgba[i * 4 + 3] = isChecker(r, g, b) ? 0 : 255;
  }

  const trimmed = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .trim().toBuffer({ resolveWithObject: true });
  console.log(`Trimmed: ${trimmed.info.width}x${trimmed.info.height}`);

  const maxDim = Math.max(trimmed.info.width, trimmed.info.height);
  const pad = Math.round(maxDim * 0.06);
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

  const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];
  for (const size of SIZES) {
    const cr = Math.round(size * 0.18);
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${cr}" ry="${cr}" fill="white"/></svg>`
    );
    const resized = await sharp(squareLogo)
      .resize(size, size, { fit: "contain", background: { r: 15, g: 23, b: 42, alpha: 255 } })
      .png().toBuffer();
    const icon = await sharp(resized)
      .composite([{ input: mask, blend: "dest-in" }])
      .png().toBuffer();
    const fn = size === 180 ? "apple-touch-icon.png" : `icon-${size}x${size}.png`;
    writeFileSync(join(PUBLIC, fn), icon);
    console.log(`Saved: ${fn}`);
  }

  const hdr = await sharp(squareLogo).resize(128, 128, { fit: "inside" }).png().toBuffer();
  writeFileSync(join(PUBLIC, "logo-header.png"), hdr);
  console.log("Saved: logo-header.png\nDone!");
}

main().catch(console.error);

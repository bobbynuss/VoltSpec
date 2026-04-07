import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SOURCE = join(PUBLIC, "voltspec-logo-source.jpg");

async function main() {
  const meta = await sharp(SOURCE).metadata();
  const W = meta.width, H = meta.height;
  console.log(`Source: ${W}x${H}`);

  // The V's center axis is at approximately x=395
  const CX = 395;

  // Step 1: Extract the left half of the image (0 to CX)
  const leftHalf = await sharp(SOURCE)
    .extract({ left: 0, top: 0, width: CX, height: H })
    .toBuffer();

  // Step 2: Flip the left half horizontally to create the right side
  const leftFlipped = await sharp(leftHalf)
    .flop()
    .toBuffer();

  // Step 3: Create the mirrored base — left half + flipped left half
  // The total width = CX + CX = 2*CX
  const mirroredBase = await sharp({
    create: { width: CX * 2, height: H, channels: 3, background: { r: 200, g: 200, b: 200 } }
  })
    .composite([
      { input: leftHalf, left: 0, top: 0 },
      { input: leftFlipped, left: CX, top: 0 },
    ])
    .jpeg({ quality: 98 })
    .toBuffer();

  // Step 4: Now extract the bolt from the original image and overlay it
  // We need to identify bolt pixels. Let's get the original and mirrored as raw.
  const { data: origRaw, info: origInfo } = await sharp(SOURCE)
    .resize(CX * 2, H, { fit: "cover", position: "left top" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: mirRaw, info: mirInfo } = await sharp(mirroredBase)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const mW = mirInfo.width, mH = mirInfo.height, ch = mirInfo.channels;
  const out = Buffer.from(mirRaw);

  // Overlay bolt pixels from original onto mirrored base
  // The bolt is in the center area of the image
  const boltZoneLeft = CX - 180;
  const boltZoneRight = CX + 180;

  for (let y = 0; y < mH; y++) {
    for (let x = boltZoneLeft; x < Math.min(boltZoneRight, mW); x++) {
      if (x < 0 || x >= Math.min(origInfo.width, mW)) continue;
      const idx = (y * mW + x) * ch;
      const oIdx = (y * origInfo.width + x) * ch;
      if (oIdx + 2 >= origRaw.length) continue;

      const r = origRaw[oIdx], g = origRaw[oIdx + 1], b = origRaw[oIdx + 2];

      // Detect bolt (yellow/gold pixels)
      const isYellow = r > 155 && g > 115 && b < 110 && (r - b) > 60;
      // Also catch darker gold edges of bolt
      const isDarkGold = r > 120 && g > 80 && b < 60 && (r - b) > 60 && g < 170;

      if (isYellow || isDarkGold) {
        out[idx] = r;
        out[idx + 1] = g;
        out[idx + 2] = b;
      }
    }
  }

  // Save mirrored result for inspection
  await sharp(out, { raw: { width: mW, height: mH, channels: ch } })
    .jpeg({ quality: 95 })
    .toFile(join(PUBLIC, "voltspec-logo-mirrored.jpg"));
  console.log("Saved: voltspec-logo-mirrored.jpg");

  // Step 5: Make transparent — remove checker background
  const rgba = Buffer.alloc(mW * mH * 4);
  for (let i = 0; i < mW * mH; i++) {
    const r = out[i * ch], g = out[i * ch + 1], b = out[i * ch + 2];
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;

    const avg = (r + g + b) / 3;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    rgba[i * 4 + 3] = (avg > 165 && sat < 40) ? 0 : 255;
  }

  const trimmed = await sharp(rgba, { raw: { width: mW, height: mH, channels: 4 } })
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

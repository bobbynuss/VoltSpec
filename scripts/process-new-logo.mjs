import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SOURCE = "C:/Users/bobnu/.openclaw/media/inbound/acdf5493-eb92-4893-9176-95d15af65f91.jpg";

async function main() {
  const meta = await sharp(SOURCE).metadata();
  const W = meta.width, H = meta.height;
  console.log(`Source: ${W}x${H}`);

  // Copy source
  await sharp(SOURCE).toFile(join(PUBLIC, "voltspec-logo-source.jpg"));

  // This logo has a dark navy background that matches VoltSpec's app theme.
  // Keep the bg — just crop to square (center), then resize for all icons.
  
  // The logo is centered, taller than wide. Let's crop to a square from center.
  const cropSize = Math.min(W, H); // 784
  const cropTop = Math.round((H - cropSize) / 2);

  const squareMaster = await sharp(SOURCE)
    .extract({ left: 0, top: cropTop, width: cropSize, height: cropSize })
    .resize(1024, 1024, { fit: "cover" })
    .png()
    .toBuffer();

  // Also save a version with transparent bg for header use
  // (extract logo from dark bg)
  const { data: sqData } = await sharp(squareMaster).raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(1024 * 1024 * 4);
  for (let i = 0; i < 1024 * 1024; i++) {
    const r = sqData[i * 3], g = sqData[i * 3 + 1], b = sqData[i * 3 + 2];
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    // Keep pixels that are part of the logo (bright enough or saturated)
    const brightness = (r + g + b) / 3;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    rgba[i * 4 + 3] = (brightness < 30 && sat < 30) ? 0 : 255;
  }
  const transparentLogo = await sharp(rgba, { raw: { width: 1024, height: 1024, channels: 4 } })
    .trim()
    .extend({
      top: 20, bottom: 20, left: 20, right: 20,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(512, 512, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  writeFileSync(join(PUBLIC, "logo-transparent.png"), transparentLogo);
  console.log("Saved: logo-transparent.png (for header)");

  // Generate all icon sizes from the square master WITH navy bg
  const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];
  for (const size of SIZES) {
    const cr = Math.round(size * 0.18);
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${cr}" ry="${cr}" fill="white"/></svg>`
    );
    const resized = await sharp(squareMaster)
      .resize(size, size)
      .png().toBuffer();
    const icon = await sharp(resized)
      .composite([{ input: mask, blend: "dest-in" }])
      .png().toBuffer();
    const fn = size === 180 ? "apple-touch-icon.png" : `icon-${size}x${size}.png`;
    writeFileSync(join(PUBLIC, fn), icon);
    console.log(`Saved: ${fn}`);
  }

  // Header logo — use transparent version at 128px
  const hdr = await sharp(transparentLogo).resize(128, 128, { fit: "inside" }).png().toBuffer();
  writeFileSync(join(PUBLIC, "logo-header.png"), hdr);
  console.log("Saved: logo-header.png");

  console.log("\nDone!");
}

main().catch(console.error);

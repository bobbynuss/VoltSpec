import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SVG = readFileSync(join(PUBLIC, "icon.svg"));

const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];

async function main() {
  // Render SVG at high res as the master (transparent background)
  const master = await sharp(SVG, { density: 300 })
    .resize(1024, 1024)
    .png()
    .toBuffer();

  writeFileSync(join(PUBLIC, "logo-transparent.png"), master);
  console.log("Saved: logo-transparent.png (1024x1024 master)");

  // Generate all icon sizes with navy bg + rounded corners
  for (const size of SIZES) {
    const cr = Math.round(size * 0.18);
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${cr}" ry="${cr}" fill="white"/></svg>`
    );
    const resized = await sharp(master)
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

  // Header logo (transparent, 128px)
  const hdr = await sharp(master).resize(128, 128, { fit: "inside" }).png().toBuffer();
  writeFileSync(join(PUBLIC, "logo-header.png"), hdr);
  console.log("Saved: logo-header.png\nDone!");
}

main().catch(console.error);

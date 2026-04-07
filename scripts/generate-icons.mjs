import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SVG_SOURCE = join(PUBLIC, "icon.svg");

const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];

async function main() {
  const svgBuffer = readFileSync(SVG_SOURCE);

  // Render SVG at high resolution (1024px) as master
  const master = await sharp(svgBuffer, { density: 300 })
    .resize(1024, 1024)
    .png()
    .toBuffer();

  console.log("Rendered SVG master at 1024x1024");

  // Save transparent master (logo on transparent background — extracted from SVG)
  // The SVG has dark V arms + traces + bolt, but no background rect
  // For logo-transparent, render the SVG as-is (transparent bg)
  writeFileSync(join(PUBLIC, "logo-transparent.png"), master);
  console.log("Saved: logo-transparent.png (master, transparent bg)");

  // Generate all icon sizes with navy background + rounded corners
  for (const size of SIZES) {
    const cornerRadius = Math.round(size * 0.18);

    // Create rounded rect mask
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}">
        <rect width="${size}" height="${size}" rx="${cornerRadius}" ry="${cornerRadius}" fill="white"/>
      </svg>`
    );

    // Resize master
    const resized = await sharp(master)
      .resize(size, size, { fit: "contain", background: { r: 15, g: 23, b: 42, alpha: 255 } })
      .png()
      .toBuffer();

    // Composite with rounded corners
    const icon = await sharp(resized)
      .composite([{ input: mask, blend: "dest-in" }])
      .png()
      .toBuffer();

    const filename = size === 180 ? "apple-touch-icon.png" : `icon-${size}x${size}.png`;
    writeFileSync(join(PUBLIC, filename), icon);
    console.log(`Saved: ${filename} (${size}x${size})`);
  }

  // Header logo (transparent bg, 128px)
  const headerLogo = await sharp(master)
    .resize(128, 128, { fit: "inside" })
    .png()
    .toBuffer();
  writeFileSync(join(PUBLIC, "logo-header.png"), headerLogo);
  console.log("Saved: logo-header.png");

  console.log("\nDone!");
}

main().catch(console.error);

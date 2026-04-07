import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SOURCE = join(PUBLIC, "voltspec-logo-source.jpg");

// Target sizes for all icon variants
const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];

async function main() {
  // Load source, remove the checkered bg by compositing on the navy background,
  // then trim, center in square, and resize
  const source = sharp(SOURCE);
  const meta = await source.metadata();
  console.log(`Source: ${meta.width}x${meta.height}`);

  // Strategy: The logo has a light checkered/transparent-grid background (JPG).
  // We'll composite it onto a dark navy rounded-rect background for icons.
  // For the main logo used in the app header, we want the logo mark only.

  // First, let's extract the logo by removing the light gray checker pattern.
  // The checker pattern is ~white (#f0f0f0) and light gray (#ccc).
  // The logo itself is dark navy + yellow + blue glow.
  // We'll threshold: anything brighter than a certain level becomes transparent.

  // Extract the raw pixels to work with
  const { data, info } = await source
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Raw: ${width}x${height}, channels: ${channels}`);

  // Create RGBA buffer - make light pixels transparent
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    // The checkered pattern pixels are generally light gray
    // The logo pixels are dark (navy), yellow, or have blue glow
    // Simple heuristic: if pixel is very light (close to white/light gray), make transparent
    const brightness = (r + g + b) / 3;
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);

    // Keep pixel if: it's dark enough, or it has color saturation (yellow bolt, blue glow)
    const isLogo = brightness < 180 || saturation > 60;

    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    rgba[i * 4 + 3] = isLogo ? 255 : 0;
  }

  // Create the transparent logo
  const transparentLogo = sharp(rgba, { raw: { width, height, channels: 4 } });

  // Trim transparent pixels
  const trimmed = await transparentLogo.trim().toBuffer({ resolveWithObject: true });
  console.log(`Trimmed: ${trimmed.info.width}x${trimmed.info.height}`);

  // Make it square (pad the shorter dimension)
  const maxDim = Math.max(trimmed.info.width, trimmed.info.height);
  const padding = Math.round(maxDim * 0.08); // 8% padding
  const squareSize = maxDim + padding * 2;

  const squareLogo = await sharp(trimmed.data, {
    raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 },
  })
    .extend({
      top: Math.round((squareSize - trimmed.info.height) / 2),
      bottom: Math.ceil((squareSize - trimmed.info.height) / 2),
      left: Math.round((squareSize - trimmed.info.width) / 2),
      right: Math.ceil((squareSize - trimmed.info.width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // Save the clean transparent master
  writeFileSync(join(PUBLIC, "logo-transparent.png"), squareLogo);
  console.log("Saved: logo-transparent.png (master)");

  // Generate all icon sizes with navy background + rounded corners
  for (const size of SIZES) {
    const cornerRadius = Math.round(size * 0.18); // ~18% rounded corners

    // Create rounded rect mask
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}">
        <rect width="${size}" height="${size}" rx="${cornerRadius}" ry="${cornerRadius}" fill="white"/>
      </svg>`
    );

    // Resize logo onto navy background
    const resized = await sharp(squareLogo)
      .resize(Math.round(size * 0.75), Math.round(size * 0.75), { fit: "inside" })
      .toBuffer();

    const icon = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 15, g: 23, b: 42, alpha: 255 }, // #0f172a navy
      },
    })
      .composite([
        { input: resized, gravity: "center" },
        { input: mask, blend: "dest-in" },
      ])
      .png()
      .toBuffer();

    const filename = size === 180 ? "apple-touch-icon.png" : `icon-${size}x${size}.png`;
    writeFileSync(join(PUBLIC, filename), icon);
    console.log(`Saved: ${filename} (${size}x${size})`);
  }

  // Also generate a clean logo for the app header (transparent bg, no rounded corners)
  const headerLogo = await sharp(squareLogo)
    .resize(128, 128, { fit: "inside" })
    .png()
    .toBuffer();
  writeFileSync(join(PUBLIC, "logo-header.png"), headerLogo);
  console.log("Saved: logo-header.png (for app header)");

  console.log("\nDone! All icons generated.");
}

main().catch(console.error);

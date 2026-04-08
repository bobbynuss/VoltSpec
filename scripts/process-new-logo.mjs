import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SOURCE = "C:/Users/bobnu/.openclaw/media/inbound/56dee3ca-8c47-4b5a-b036-dc4ff26ea194.jpg";

// Site background: hsl(222, 47%, 7%) ≈ rgb(15, 23, 41)
const SITE_BG = { r: 15, g: 23, b: 41 };

async function main() {
  console.log("Processing Grok flyer logo...");

  // Step 1: Crop just the V+bolt mark from the flyer
  const logoCrop = await sharp(SOURCE)
    .extract({ left: 430, top: 5, width: 310, height: 245 })
    .png()
    .toBuffer();

  // Save the cropped source
  await sharp(logoCrop).toFile(join(PUBLIC, "voltspec-logo-source.jpg"));
  console.log("Saved: voltspec-logo-source.jpg (cropped from flyer)");

  // Step 2: Get raw pixels for alpha processing
  const { data: orig, info } = await sharp(logoCrop)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, ch = info.channels;
  console.log(`Cropped: ${W}x${H}`);

  // Step 3: Build transparent version
  // The flyer bg is a dark gradient — sample corners to get avg bg color
  const cornerSamples = [];
  for (const [x, y] of [[2,2], [W-3,2], [2,H-3], [W-3,H-3]]) {
    const i = (y * W + x) * ch;
    cornerSamples.push([orig[i], orig[i+1], orig[i+2]]);
  }
  const avgBg = cornerSamples.reduce(
    (a, c) => [a[0] + c[0]/4, a[1] + c[1]/4, a[2] + c[2]/4],
    [0, 0, 0]
  ).map(Math.round);
  console.log(`Avg bg: R=${avgBg[0]} G=${avgBg[1]} B=${avgBg[2]}`);

  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const r = orig[i * ch], g = orig[i * ch + 1], b = orig[i * ch + 2];
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;

    // Color distance from background
    const dr = r - avgBg[0], dg = g - avgBg[1], db = b - avgBg[2];
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);

    // Smooth alpha: close to bg → transparent, far → opaque
    let alpha;
    if (dist < 15) alpha = 0;
    else if (dist < 45) alpha = Math.round(((dist - 15) / 30) * 255);
    else alpha = 255;
    rgba[i * 4 + 3] = alpha;
  }

  // Trim transparent pixels
  const trimmed = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .trim()
    .toBuffer({ resolveWithObject: true });
  console.log(`Trimmed: ${trimmed.info.width}x${trimmed.info.height}`);

  // Make square with small padding
  const maxDim = Math.max(trimmed.info.width, trimmed.info.height);
  const pad = Math.round(maxDim * 0.05);
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

  // Header logo
  const hdr = await sharp(squareLogo).resize(128, 128, { fit: "inside" }).png().toBuffer();
  writeFileSync(join(PUBLIC, "logo-header.png"), hdr);
  console.log("Saved: logo-header.png");

  // Step 4: Icons — composite on site bg for clean edges
  const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];
  for (const size of SIZES) {
    const cr = Math.round(size * 0.18);
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${cr}" ry="${cr}" fill="white"/></svg>`
    );
    // Composite logo onto site bg, then apply rounded mask
    const resized = await sharp(squareLogo)
      .resize(size, size, { fit: "contain", background: { ...SITE_BG, alpha: 255 } })
      .png().toBuffer();
    const icon = await sharp(resized)
      .composite([{ input: mask, blend: "dest-in" }])
      .png().toBuffer();
    const fn = size === 180 ? "apple-touch-icon.png" : `icon-${size}x${size}.png`;
    writeFileSync(join(PUBLIC, fn), icon);
    console.log(`Saved: ${fn}`);
  }

  console.log("\nDone! 🔥");
}

main().catch(console.error);

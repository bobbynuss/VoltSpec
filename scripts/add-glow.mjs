import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(import.meta.dirname, "..", "public");
const SOURCE = "C:/Users/bobnu/.openclaw/media/inbound/0a1a79ae-7e42-4124-be3a-f26da15405e2.jpg";

async function main() {
  const meta = await sharp(SOURCE).metadata();
  const W = meta.width, H = meta.height;
  const ch = 3;
  console.log(`Source: ${W}x${H}`);

  const { data: orig } = await sharp(SOURCE).raw().toBuffer({ resolveWithObject: true });

  // The right-side circuit traces are BLACK lines/nodes on the top-right area,
  // extending outside the V shape into the checkered/light background.
  // They're roughly in the region x > 420, y < 500
  // 
  // Strategy:
  // 1. Find all dark (black) pixels in that region that are the circuit traces
  // 2. Create a glow layer: blur those pixels with blue color
  // 3. Composite: original on top of glow layer (glow only shows around the traces)

  const isChecker = (r, g, b) => ((r + g + b) / 3) > 170 && (Math.max(r, g, b) - Math.min(r, g, b)) < 35;
  const isBlackTrace = (r, g, b) => (r + g + b) / 3 < 60; // very dark = circuit trace

  // Region where the right-side black traces live
  const REGION = { xMin: 380, xMax: W, yMin: 0, yMax: 520 };

  // Step 1: Create a mask of the black circuit trace pixels in the region
  // We'll create an RGBA image that's cyan where traces are, transparent elsewhere
  const glowSource = Buffer.alloc(W * H * 4, 0); // fully transparent

  for (let y = REGION.yMin; y < REGION.yMax; y++) {
    for (let x = REGION.xMin; x < REGION.xMax; x++) {
      const i = (y * W + x) * ch;
      const r = orig[i], g = orig[i + 1], b = orig[i + 2];

      if (isBlackTrace(r, g, b)) {
        const j = (y * W + x) * 4;
        glowSource[j] = 0;       // R
        glowSource[j + 1] = 180; // G
        glowSource[j + 2] = 255; // B (#00b4ff)
        glowSource[j + 3] = 255; // A
      }
    }
  }

  // Step 2: Blur the glow source to create a soft blue glow
  const glowBlurred = await sharp(glowSource, { raw: { width: W, height: H, channels: 4 } })
    .blur(15)
    .toBuffer();

  // Step 3: Boost the glow intensity (the blur dilutes it)
  // Multiply alpha and color by a factor
  const glowPixels = new Uint8Array(glowBlurred);
  for (let i = 0; i < glowPixels.length; i += 4) {
    const a = glowPixels[i + 3];
    if (a > 0) {
      // Boost intensity
      glowPixels[i] = Math.min(255, glowPixels[i] * 1.5);       // R
      glowPixels[i + 1] = Math.min(255, glowPixels[i + 1] * 1.5); // G
      glowPixels[i + 2] = Math.min(255, glowPixels[i + 2] * 1.5); // B
      glowPixels[i + 3] = Math.min(255, Math.round(a * 2.5));      // A - boost opacity
    }
  }

  const glowLayer = await sharp(Buffer.from(glowPixels), { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toBuffer();

  // Step 4: Composite — glow behind the original
  // First convert original to PNG to preserve as-is
  const origPng = await sharp(SOURCE).png().toBuffer();

  const result = await sharp(glowLayer)
    .composite([{ input: origPng, blend: "over" }])
    .png()
    .toBuffer();

  // Hmm wait — the original is a JPG with checkered bg, so we can't just
  // composite PNG over PNG. The glow needs to show through the checkered areas.
  // 
  // Better approach: paint the glow directly onto the original image pixels.
  // For each pixel: if glow has color, blend it behind (only on light/checker pixels)

  const { data: glowRaw } = await sharp(Buffer.from(glowPixels), { raw: { width: W, height: H, channels: 4 } })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.from(orig);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const gi = (y * W + x) * 4;
      const ga = glowRaw[gi + 3];
      if (ga === 0) continue;

      const oi = (y * W + x) * ch;
      const r = out[oi], g = out[oi + 1], b = out[oi + 2];

      // Only apply glow to light/checker background pixels
      // Don't touch dark V pixels, bolt pixels, or the black traces themselves
      const brightness = (r + g + b) / 3;
      if (brightness < 120) continue; // skip dark pixels (V body, traces)

      const isYellow = r > 145 && g > 100 && b < 115 && (r - b) > 50;
      if (isYellow) continue; // don't touch bolt

      // Blend glow color onto this pixel
      const alpha = ga / 255;
      const gr = glowRaw[gi], gg = glowRaw[gi + 1], gb = glowRaw[gi + 2];
      out[oi] = Math.round(r * (1 - alpha) + gr * alpha);
      out[oi + 1] = Math.round(g * (1 - alpha) + gg * alpha);
      out[oi + 2] = Math.round(b * (1 - alpha) + gb * alpha);
    }
  }

  // Save the result
  await sharp(out, { raw: { width: W, height: H, channels: ch } })
    .jpeg({ quality: 95 })
    .toFile(join(PUBLIC, "voltspec-logo-final.jpg"));
  console.log("Saved: voltspec-logo-final.jpg");

  // Now make transparent + trim + icons (same as before)
  const isCheckerFn = (r, g, b) => ((r + g + b) / 3) > 165 && (Math.max(r, g, b) - Math.min(r, g, b)) < 35;

  // For transparency, we also need to handle the glow pixels —
  // they should NOT be transparent (they're the new blue glow)
  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const r = out[i * ch], g = out[i * ch + 1], b = out[i * ch + 2];
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;

    // Check if this pixel has glow applied (blue-ish from glow blending)
    const hasGlow = glowRaw[i * 4 + 3] > 30;
    const isBg = isCheckerFn(r, g, b) && !hasGlow;
    rgba[i * 4 + 3] = isBg ? 0 : 255;
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

import sharp from 'sharp';
import { readFileSync } from 'fs';

const svg = readFileSync('public/icon.svg');

const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 384, 512];
for (const s of sizes) {
  await sharp(svg).resize(s, s).png().toFile(`public/icon-${s}x${s}.png`);
  console.log(`Generated icon-${s}x${s}.png`);
}

// Apple touch icon
await sharp(svg).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('Generated apple-touch-icon.png');

// OG image (1200x630)
const ogSvg = Buffer.from(`<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>
  <rect width='1200' height='630' fill='#0f172a'/>
  <rect y='0' width='1200' height='5' fill='#facc15'/>
  <path d='M520 120L440 280h80l-40 160 136-210H560l12-110z' fill='#facc15'/>
  <text x='600' y='370' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='72' font-weight='bold' fill='#ffffff'>Volt<tspan fill='#facc15'>Spec</tspan></text>
  <text x='600' y='420' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='24' fill='#94a3b8'>Electrical Estimating Tool for Texas</text>
  <text x='600' y='460' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='18' fill='#64748b'>NEC 2026 · 12 Jurisdictions · Real EES Pricing · Professional PDFs</text>
  <rect y='625' width='1200' height='5' fill='#facc15'/>
</svg>`);
await sharp(ogSvg).resize(1200, 630).png().toFile('public/og-image.png');
console.log('Generated og-image.png');

// Overwrite the Next.js default favicon with our icon
await sharp(svg).resize(32, 32).png().toFile('app/icon.png');
console.log('Generated app/icon.png (Next.js auto-detects)');

console.log('Done!');

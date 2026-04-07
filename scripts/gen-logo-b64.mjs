import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const dir = import.meta.dirname;
const pub = join(dir, "..", "public");

const buf = await sharp(join(pub, "logo-transparent.png"))
  .resize(64, 64, { fit: "inside" })
  .png()
  .toBuffer();

const b64 = "data:image/png;base64," + buf.toString("base64");
writeFileSync(
  join(dir, "..", "lib", "logo-base64.ts"),
  `export const VOLTSPEC_LOGO_BASE64 = ${JSON.stringify(b64)};\n`
);
console.log("Saved lib/logo-base64.ts, length:", b64.length);

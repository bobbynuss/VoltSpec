import { readFileSync } from "fs";
const c = readFileSync("C:\\Users\\bobnu\\projects\\voltspec\\lib\\data\\jobs\\new-200a-residential.ts", "utf-8");
const re = /item:\s*"([^"]{1,40})".*?unitPrice:\s*([\d.]+)/g;
let m;
while ((m = re.exec(c)) !== null) {
  console.log(`${m[1].padEnd(38)} $${m[2]}`);
}

import { readFileSync } from 'fs';
import { resolve } from 'path';

const file = resolve(process.env.USERPROFILE, 'Downloads', 'Crowley Retail Electrical Rev.1 9.15.25.pdf');
const bytes = readFileSync(file);
const base64 = bytes.toString('base64');

console.log(`File: ${(bytes.length / 1024 / 1024).toFixed(1)} MB`);
console.log(`Base64: ${(base64.length / 1024 / 1024).toFixed(1)} MB`);

const payload = JSON.stringify({
  file: base64,
  fileName: 'Crowley Retail Electrical.pdf',
  fileType: 'application/pdf',
});

console.log(`JSON payload: ${(payload.length / 1024 / 1024).toFixed(1)} MB`);
console.log('Sending to localhost:3000/api/takeoff...');

try {
  const res = await fetch('http://localhost:3000/api/takeoff', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    signal: AbortSignal.timeout(240000),
  });
  
  console.log(`Status: ${res.status}`);
  const text = await res.text();
  console.log(`Response (${text.length} chars):`);
  console.log(text.substring(0, 2000));
} catch (err) {
  console.error('Error:', err.message);
}

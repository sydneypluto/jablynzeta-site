/**
 * Build favicon set from the main logo PNG (white canvas, zoomed “contain” + center crop).
 * Run: npm run build:favicons
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(
  root,
  "uterpy-html-package",
  "uterpy-html",
  "assets",
  "images",
  "resources",
  "jablynzeta-logo.png"
);
const outDir = path.join(
  root,
  "uterpy-html-package",
  "uterpy-html",
  "assets",
  "images",
  "favicons"
);

if (!fs.existsSync(src)) {
  console.error("Missing logo:", src);
  process.exit(1);
}

const outputs = [
  { file: "favicon-16x16.png", size: 16 },
  { file: "favicon-32x32.png", size: 32 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "android-chrome-192x192.png", size: 192 },
  { file: "android-chrome-512x512.png", size: 512 },
];

fs.mkdirSync(outDir, { recursive: true });

const bg = { r: 255, g: 255, b: 255, alpha: 1 };
/** Renders a larger square, then center-crops so the mark fills the favicon more (≈1.28× “zoom” vs pure contain) */
const ZOOM = 1.28;

for (const { file, size } of outputs) {
  const out = path.join(outDir, file);
  const w = Math.max(size + 2, Math.round(size * ZOOM));
  const buf = await sharp(src)
    .rotate()
    .resize(w, w, {
      fit: "contain",
      position: "centre",
      background: bg,
    })
    .png()
    .toBuffer();
  const left = Math.floor((w - size) / 2);
  const top = Math.floor((w - size) / 2);
  await sharp(buf)
    .extract({ left, top, width: size, height: size })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(out);
  console.log(file, "->", (fs.statSync(out).size / 1024).toFixed(1), "KB");
}
console.log("Favicons done.");

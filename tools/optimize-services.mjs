/**
 * Resize + optimise the AI-generated service photos and drop them in as
 * services-v1-img{1,2,3}.jpg so the existing HTML keeps working unchanged.
 *
 * Source: 3 jz-service-*.jpg files in the Cursor workspace assets
 * Target: ~800px wide @ 16:10, mozjpeg q=88, progressive (visually lossless)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const destDir = path.join(
  root,
  "uterpy-html-package",
  "uterpy-html",
  "assets",
  "images",
  "services"
);

const srcDir = path.join(
  process.env.USERPROFILE,
  ".cursor",
  "projects",
  "c-Users-sydne-Downloads-uterpy-psychology-counseling-html-template-2026-01-07-19-20-09-utc",
  "assets"
);

// Match Windows 8.3 short names (long Cursor paths fail to resolve from PS)
const map = [
  // Relationship counseling
  { short: "JZ-SER~3.JPG", out: "services-v1-img1.jpg" },
  // Mental health & emotional wellness
  { short: "JZ-SER~1.JPG", out: "services-v1-img2.jpg" },
  // Personal therapy
  { short: "JZ-SER~2.JPG", out: "services-v1-img3.jpg" },
];

fs.mkdirSync(destDir, { recursive: true });

const fmt = (n) => `${(n / 1024).toFixed(1)} KB`;
const targetW = 800;
const targetH = 560; // ~16:11.2 — near the 370x260 card aspect

for (const item of map) {
  const src = path.join(srcDir, item.short);
  const out = path.join(destDir, item.out);
  if (!fs.existsSync(src)) {
    console.error("Missing source:", src);
    process.exitCode = 1;
    continue;
  }
  const before = fs.statSync(src).size;
  await sharp(src)
    .rotate()
    .resize(targetW, targetH, {
      fit: "cover",
      position: "attention",
    })
    .jpeg({
      quality: 88,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:4:4",
    })
    .toFile(out);
  const after = fs.statSync(out).size;
  console.log(
    `${item.out.padEnd(22)}  ${fmt(before).padStart(9)} -> ${fmt(after).padStart(9)}`
  );
}
console.log("Done.");

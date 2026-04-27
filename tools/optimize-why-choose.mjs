/**
 * “Belief, approach, and transformation” block: large + small photo.
 * Source: generated jz-why-choose-*.jpg in Cursor workspace assets.
 * Output: why-choose-v1-img1.jpg (670×630 @2x) + why-choose-v1-img2.jpg (400×385 @2x)
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
  "resources"
);

const home = process.env.USERPROFILE;
const srcBase = path.join(
  home,
  ".cursor",
  "projects",
  "c-Users-sydne-Downloads-uterpy-psychology-counseling-html-template-2026-01-07-19-20-09-utc",
  "assets"
);

// Windows 8.3 short names
const map = [
  { short: "JZ-WHY~1.JPG", w: 1340, h: 1260, out: "why-choose-v1-img1.jpg" },
  { short: "JZ-WHY~2.JPG", w: 800, h: 770, out: "why-choose-v1-img2.jpg" },
];

fs.mkdirSync(destDir, { recursive: true });

const fmt = (n) => `${(n / 1024).toFixed(1)} KB`;

for (const item of map) {
  const src = path.join(srcBase, item.short);
  const out = path.join(destDir, item.out);
  if (!fs.existsSync(src)) {
    console.error("Missing source:", src);
    process.exitCode = 1;
    continue;
  }
  const before = fs.statSync(src).size;
  await sharp(src)
    .rotate()
    .resize(item.w, item.h, { fit: "cover", position: "attention" })
    .jpeg({
      quality: 88,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:2:0",
    })
    .toFile(out);
  const after = fs.statSync(out).size;
  console.log(`${item.out.padEnd(24)}  ${fmt(before).padStart(9)} -> ${fmt(after).padStart(9)}`);
}
console.log("Done.");

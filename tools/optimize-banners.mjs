/**
 * Optimize home-banner source images: takes the HD uploads from
 * the Cursor workspace assets, runs them through sharp (mozjpeg,
 * progressive, q=88) — visually lossless, much smaller, and
 * progressive-decoded so the browser paints in passes.
 *
 * Output:
 *   uterpy-html-package/uterpy-html/assets/images/slider/home-banner-1.jpg
 *   uterpy-html-package/uterpy-html/assets/images/slider/home-banner-2.jpg
 *
 * Usage: npm run optimize:banners
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
  "slider"
);

const srcDir = path.join(
  process.env.USERPROFILE,
  ".cursor",
  "projects",
  "c-Users-sydne-Downloads-uterpy-psychology-counseling-html-template-2026-01-07-19-20-09-utc",
  "assets"
);

// Use Windows 8.3 short names — long Cursor paths don't always resolve from PowerShell
const map = [
  // sunset traveler -> banner 1
  { short: "C_91D7~1.PNG", out: "home-banner-1.jpg" },
  // therapy close-up -> banner 2
  { short: "C_839C~1.PNG", out: "home-banner-2.jpg" },
];

fs.mkdirSync(destDir, { recursive: true });

const fmt = (n) => `${(n / 1024).toFixed(1)} KB`;

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
    .jpeg({
      quality: 88,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:4:4",
    })
    .toFile(out);
  const after = fs.statSync(out).size;
  console.log(
    `${item.out.padEnd(20)}  ${fmt(before).padStart(9)} -> ${fmt(after).padStart(9)}`
  );
}
console.log("Done.");

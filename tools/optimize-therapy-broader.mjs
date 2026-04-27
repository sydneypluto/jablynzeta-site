/**
 * Broader impact / therapy column image — template frame 475×775 (@2x: 950×1550).
 * Source: jz-therapy-broader-impact.jpg in Cursor workspace assets.
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

const srcBase = path.join(
  process.env.USERPROFILE,
  ".cursor",
  "projects",
  "c-Users-sydne-Downloads-uterpy-psychology-counseling-html-template-2026-01-07-19-20-09-utc",
  "assets"
);

const src = path.join(srcBase, "JZ-THE~1.JPG");
const out = path.join(destDir, "therapy-v1-img1.jpg");

fs.mkdirSync(destDir, { recursive: true });

if (!fs.existsSync(src)) {
  console.error("Missing source:", src);
  process.exit(1);
}

const before = fs.statSync(src).size;
await sharp(src)
  .rotate()
  .resize(950, 1550, { fit: "cover", position: "attention" })
  .jpeg({ quality: 88, mozjpeg: true, progressive: true, chromaSubsampling: "4:2:0" })
  .toFile(out);

const after = fs.statSync(out).size;
console.log(
  `therapy-v1-img1.jpg  ${(before / 1024).toFixed(1)} KB -> ${(after / 1024).toFixed(1)} KB`
);
console.log("Done.");

/**
 * Second row on services.html — images 4–6 (speaking, personal therapy, concept).
 * Sources: Cursor workspace assets/*.png generated for JablynZeta.
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

const pairs = [
  ["jz-service-speaking-workshops-source.png", "services-v1-img4.jpg"],
  ["jz-service-personal-therapy-source.png", "services-v1-img5.jpg"],
  ["jz-service-concept-strategy-source.png", "services-v1-img6.jpg"],
];

fs.mkdirSync(destDir, { recursive: true });

const targetW = 800;
const targetH = 560;

for (const [srcName, outName] of pairs) {
  const src = path.join(srcDir, srcName);
  const out = path.join(destDir, outName);
  if (!fs.existsSync(src)) {
    console.error("Missing:", src);
    process.exitCode = 1;
    continue;
  }
  await sharp(src)
    .rotate()
    .resize(targetW, targetH, { fit: "cover", position: "attention" })
    .jpeg({
      quality: 88,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:4:4",
    })
    .toFile(out);
  console.log(outName, "←", srcName);
}
console.log("Done.");

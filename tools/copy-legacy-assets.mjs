/**
 * Vite only emits processed assets into dist. Legacy <script src="assets/vendors/..."> must exist
 * on disk or jQuery / Owl 404, Owl never inits, and .owl-carousel stays display:none (no hero).
 */
import { cp } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const site = resolve(root, "uterpy-html-package/uterpy-html");
const dist = resolve(root, "dist");
const out = (sub) => resolve(dist, sub);

for (const name of ["assets/vendors", "assets/js"]) {
  await cp(resolve(site, name), out(name), { recursive: true });
  console.log("Copied", name, "→ dist/" + name);
}

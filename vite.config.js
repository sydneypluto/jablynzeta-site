import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = __dirname;
const siteRoot = resolve(projectRoot, "uterpy-html-package/uterpy-html");

export default defineConfig({
  root: siteRoot,
  appType: "mpa",
  server: {
    open: true,
  },
  build: {
    outDir: resolve(projectRoot, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(siteRoot, "index.html"),
        services: resolve(siteRoot, "services.html"),
        contact: resolve(siteRoot, "contact.html"),
        harmony: resolve(siteRoot, "harmony-masterclass.html"),
      },
    },
  },
});

/**
 * Next static export nests RSC payloads as e.g. about/__next.about/__PAGE__.txt,
 * but the client requests about/__next.about.__PAGE__.txt. Static hosts (serve, GitHub Pages)
 * have no rewrite, so client navigations 404. Copy each nested __PAGE__.txt to the flat name.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "out");

function walk(dir, onFile) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, onFile);
    else onFile(full);
  }
}

function flatDestinationForFile(filePath) {
  let dir = path.dirname(filePath);
  const parts = [];
  while (true) {
    const base = path.basename(dir);
    if (base.startsWith("__next.") || base.startsWith("$")) {
      parts.unshift(base);
      dir = path.dirname(dir);
    } else {
      break;
    }
  }
  if (parts.length === 0) return null;
  const flatName = `${parts.join(".")}.${path.basename(filePath)}`;
  return path.join(dir, flatName);
}

let count = 0;
walk(outDir, (full) => {
  if (!full.endsWith(".txt")) return;
  const dest = flatDestinationForFile(full);
  if (!dest || dest === full) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(full, dest);
  count++;
});

// GitHub branch deploys run Jekyll unless this file exists at the site root.
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");

console.log(`flatten-rsc: wrote ${count} flat __PAGE__.txt alias(es) for static hosting`);

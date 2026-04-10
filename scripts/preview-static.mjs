/**
 * Local preview for `next export`. Strips NEXT_PUBLIC_BASE_PATH from URLs so
 * /Portfolio/_next/... maps to out/_next/... (GitHub Pages does this automatically).
 */
import http from "node:http";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { lookup } from "mime-types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outDir = path.join(projectRoot, "out");

/** Match `next build` base path when not set in the shell (reads `.env` then `.env.local`). */
function loadNextPublicBasePathFromEnvFiles() {
  if (process.env.NEXT_PUBLIC_BASE_PATH) return;
  let last = null;
  for (const name of [".env", ".env.local"]) {
    const fp = path.join(projectRoot, name);
    if (!fs.existsSync(fp)) continue;
    const text = fs.readFileSync(fp, "utf8");
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const m = t.match(/^NEXT_PUBLIC_BASE_PATH=(.*)$/);
      if (!m) continue;
      let v = m[1].trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      last = v;
    }
  }
  if (last !== null) process.env.NEXT_PUBLIC_BASE_PATH = last;
}
loadNextPublicBasePathFromEnvFiles();

const basePrefix = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** @returns {Promise<number>} */
function findListenPort() {
  const explicit = process.env.PORT;
  const start = explicit ? Number(explicit) : 3000;
  const maxTries = explicit ? 1 : 20;

  return new Promise((resolve, reject) => {
    let attempt = 0;

    function tryPort(port) {
      const s = net.createServer();
      s.once("error", (err) => {
        s.close();
        if (err.code !== "EADDRINUSE") {
          reject(err);
          return;
        }
        attempt++;
        if (attempt >= maxTries) {
          reject(
            new Error(
              explicit
                ? `Port ${start} is already in use. Stop the other process (e.g. next dev) or run: $env:PORT="3001"`
                : `No free port found starting at ${start} (tried ${maxTries} ports).`,
            ),
          );
          return;
        }
        if (!explicit && port === start) {
          console.warn(
            `Port ${port} is in use (often \`npm run dev\`). Trying the next port…`,
          );
        }
        tryPort(port + 1);
      });
      s.listen(port, () => {
        s.close(() => resolve(port));
      });
    }

    tryPort(start);
  });
}

function isInsideRoot(root, candidate) {
  const rel = path.relative(root, candidate);
  return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
}

function resolveFile(urlPath) {
  let p = urlPath.split("?")[0] || "/";
  if (basePrefix && (p === basePrefix || p.startsWith(basePrefix + "/"))) {
    p = p.slice(basePrefix.length) || "/";
  }
  if (!p.startsWith("/")) p = "/" + p;

  let filePath;
  if (p === "/" || p === "") {
    filePath = path.join(outDir, "index.html");
  } else {
    const trimmed = p.endsWith("/") ? p.slice(1, -1) : p.slice(1);
    filePath = path.join(outDir, trimmed);
    try {
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      } else if (!filePath.endsWith(".html") && !fs.existsSync(filePath)) {
        const withHtml = filePath + ".html";
        if (fs.existsSync(withHtml)) filePath = withHtml;
      }
    } catch {
      return null;
    }
  }

  try {
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return null;
    }
  } catch {
    return null;
  }
  const normalized = path.normalize(filePath);
  if (!isInsideRoot(outDir, normalized)) return null;
  return normalized;
}

const server = http.createServer((req, res) => {
  const urlPath = req.url || "/";
  const filePath = resolveFile(urlPath);
  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  const type = lookup(filePath) || "application/octet-stream";
  // HTML and RSC txt files must never be cached so stale chunk hashes can't
  // cause ChunkLoadErrors after a rebuild.
  const isHtml = filePath.endsWith(".html");
  const isTxt = filePath.endsWith(".txt");
  const cacheHeader =
    isHtml || isTxt
      ? "no-store, no-cache, must-revalidate"
      : "public, max-age=31536000, immutable";
  res.writeHead(200, {
    "Content-Type": type,
    "Cache-Control": cacheHeader,
  });
  fs.createReadStream(filePath).pipe(res);
});

findListenPort()
  .then((port) => {
    server.listen(port, () => {
      console.log(`Static preview → http://localhost:${port}/`);
      if (basePrefix) {
        console.log(
          `(HTML uses ${basePrefix}/…; requests are mapped to files under out/)`,
        );
      }
    });
    server.on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });

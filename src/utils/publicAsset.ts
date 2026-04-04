/**
 * Prefix root-relative URLs with `NEXT_PUBLIC_BASE_PATH` when the consumer does **not** apply
 * `basePath` itself:
 * - `next/image` with `images.unoptimized` — the rendered `src` is unchanged, so `/images/...`
 *   would 404 under a subpath (e.g. `/Portfolio`) unless prefixed here.
 * - Raw `<a href>` strings, some widgets, etc.
 * Do **not** use for `next/link` / `SmartLink` / route `href` on `Button`/`Card`/`ToggleButton`.
 * Do **not** use for `Schema` `image` when it is concatenated as `baseURL + image` (pass `/images/...`
 * only); use `schemaAssetUrl()` for OG/JSON-LD when needed.
 */
export function publicAsset(path: string | undefined | null): string {
  if (path == null || path === "") return "";
  const base = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
  if (path.startsWith("/")) return `${base}${path}`;
  return `${base}/${path}`;
}

/**
 * Build an absolute URL for JSON-LD / Open Graph when `siteBaseUrl` is e.g. `https://user.github.io/Portfolio`
 * and `path` may already include `basePath` (e.g. from `publicAsset("/images/...")`).
 */
export function schemaAssetUrl(siteBaseUrl: string, path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
  const rest = path.startsWith(base) ? path.slice(base.length) || "/" : path;
  const root = siteBaseUrl.replace(/\/$/, "");
  const suffix = rest.startsWith("/") ? rest : `/${rest}`;
  return `${root}${suffix}`;
}

/**
 * Prefix root-relative URLs with Next.js `basePath` (e.g. `/Portfolio` on GitHub project Pages).
 * Use for `/images/...`, internal `href="/..."`, etc. External URLs unchanged.
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

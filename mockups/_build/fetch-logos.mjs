// Optional: pull square app icons from logo.dev for every brand in the
// registry. The mockups ship with the bundled SVG marks, so nothing here runs
// during a normal build. Use this when you want photographic favicons in a
// later round.
//
//   LOGO_DEV_TOKEN=pk_xxxxxxxx node _build/fetch-logos.mjs
//   LOGO_DEV_TOKEN=pk_xxxxxxxx node _build/fetch-logos.mjs --limit 12
//
// logo.dev publishable tokens are safe to use in client code. Pass the token
// through the environment so it does not land in git.
//
// Output: assets/logos/<slug>.webp plus assets/logos/manifest.json
// The request format matches the documented image API:
//   https://img.logo.dev/<domain>?token=<token>&size=128&format=webp&retina=true

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const token = process.env.LOGO_DEV_TOKEN;
if (!token) {
  console.error("Set LOGO_DEV_TOKEN first. Get a publishable key at logo.dev.");
  process.exit(1);
}

const limitArg = process.argv.indexOf("--limit");
const limit = limitArg > -1 ? Number(process.argv[limitArg + 1]) || 0 : 0;

const registry = JSON.parse(readFileSync(new URL("../assets/brands.json", import.meta.url), "utf8"));
const outDir = new URL("../assets/logos/", import.meta.url);
mkdirSync(outDir, { recursive: true });

const targets = registry.brands
  .filter((b) => b.domain)
  .map((b) => ({ slug: b.slug, name: b.name, domain: b.domain.split("/")[0] }))
  .slice(0, limit || undefined);

const manifestPath = new URL("manifest.json", outDir);
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function grab(target, attempt = 0) {
  const url = `https://img.logo.dev/${encodeURIComponent(target.domain)}?token=${encodeURIComponent(token)}&size=128&format=webp&retina=true`;
  const res = await fetch(url, { headers: { accept: "image/webp,image/*" } });
  if (res.status === 429 && attempt < 3) {
    await sleep(1500 * (attempt + 1));
    return grab(target, attempt + 1);
  }
  if (!res.ok) {
    return { ok: false, status: res.status };
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) return { ok: false, status: "empty body" };
  writeFileSync(new URL(`${target.slug}.webp`, outDir), buf);
  return { ok: true, bytes: buf.length };
}

let done = 0;
let failed = 0;
let index = 0;

async function worker() {
  while (index < targets.length) {
    const target = targets[index++];
    if (existsSync(new URL(`${target.slug}.webp`, outDir))) {
      done += 1;
      continue;
    }
    try {
      const res = await grab(target);
      if (res.ok) {
        manifest[target.slug] = { name: target.name, domain: target.domain, bytes: res.bytes, source: "logo.dev" };
        done += 1;
      } else {
        failed += 1;
        console.warn("miss", target.domain, res.status);
      }
    } catch (err) {
      failed += 1;
      console.warn("error", target.domain, String(err.message || err));
    }
    if (done % 25 === 0) console.log(`${done} fetched, ${failed} missed`);
  }
}

await Promise.all(Array.from({ length: 4 }, worker));
writeFileSync(manifestPath, JSON.stringify(manifest, null, 0));
console.log(`done. ${done} icons in assets/logos, ${failed} misses.`);

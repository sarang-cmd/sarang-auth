// Brand library page: every resolved brand mark in one searchable sheet.
// Reads the registry written by brands.mjs and inlines each SVG, so the page
// works from disk with no network.

import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const registry = JSON.parse(readFileSync(new URL("../assets/brands.json", import.meta.url), "utf8"));
const brands = registry.brands;

const order = ["Identity", "Security", "Cloud", "Dev tools", "Data", "AI", "Payments", "Productivity", "Communication", "Analytics", "Commerce", "Consumer"];
const counts = Object.fromEntries(order.map((c) => [c, brands.filter((b) => b.category === c).length]));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function chip(b) {
  const [vw, , w, h] = b.viewBox.split(" ").map(Number);
  const wide = w / h > 1.35;
  const size = wide ? `width="38" height="${(38 * (h / w)).toFixed(1)}"` : `width="26" height="26"`;
  const fill = b.palette || !b.color ? "" : ` fill="${b.color}"`;
  return `<span class="chip" data-plate="${b.plate}"><svg viewBox="${b.viewBox}" ${size} aria-hidden="true" focusable="false"${fill}>${b.body}</svg></span>`;
}

const cards = brands
  .map(
    (b) => `<li class="brand" data-cat="${esc(b.category)}" data-q="${esc((b.name + " " + b.domain).toLowerCase())}">
        ${chip(b)}
        <span class="bmeta"><span class="bname">${esc(b.name)}</span><span class="bdom">${esc(b.domain || "no public domain")}</span></span>
      </li>`
  )
  .join("\n");

const catChips = order
  .map(
    (c) => `<button class="fchip" type="button" data-cat="${esc(c)}" aria-pressed="false">${esc(c)} <span class="fnum">${counts[c]}</span></button>`
  )
  .join("\n      ");

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Brand library, ${brands.length} company marks</title>
<meta name="description" content="The ${brands.length} company marks used across the Hasp mockups. Search by name or domain.">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<style>
  @font-face { font-family: "Public Sans"; src: url("assets/fonts/public-sans-latin-400-normal.woff2") format("woff2"); font-weight: 400; font-display: block; }
  @font-face { font-family: "Public Sans"; src: url("assets/fonts/public-sans-latin-500-normal.woff2") format("woff2"); font-weight: 500; font-display: block; }
  @font-face { font-family: "Public Sans"; src: url("assets/fonts/public-sans-latin-600-normal.woff2") format("woff2"); font-weight: 600; font-display: block; }

  :root {
    --bg: #ecece6;
    --panel: #f7f6f0;
    --ink: #16171a;
    --ink-2: #33353a;
    --mut: #62646b;
    --line: #d3d3ca;
    --line-2: #e0e0d7;
    --accent: #1a3bc8;
    --plate: #fdfcf8;
    --radius: 3px;
  }

  *, *::before, *::after { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: "Public Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
    font-size: 15px;
    line-height: 1.55;
    font-feature-settings: "kern" 1;
  }
  a { color: inherit; text-decoration: none; }
  a:focus-visible, button:focus-visible, input:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .skip {
    position: absolute; left: -9999px; top: 0; padding: 10px 14px;
    background: var(--ink); color: var(--panel); z-index: 10;
  }
  .skip:focus { left: 12px; top: 12px; }
  .wrap { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

  header.top { border-bottom: 1px solid var(--line); background: var(--panel); }
  .toprow { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 0; }
  .brandmark { display: flex; align-items: center; gap: 10px; font-weight: 600; letter-spacing: -0.01em; }
  .brandmark svg { display: block; }
  nav.pages { display: flex; gap: 20px; font-size: 14px; color: var(--ink-2); }
  nav.pages a { padding: 4px 0; border-bottom: 1px solid transparent; }
  nav.pages a:hover { border-color: var(--ink); }
  nav.pages a[aria-current="page"] { border-color: var(--ink); }

  .masthead { padding-top: 56px; padding-bottom: 28px; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 40px; align-items: end; }
  .eyebrow { font-size: 13px; letter-spacing: 0.02em; color: var(--mut); margin: 0 0 10px; }
  h1 { margin: 0; font-size: clamp(34px, 4vw, 52px); line-height: 1.02; letter-spacing: -0.035em; font-weight: 500; }
  .lede { margin: 14px 0 0; max-width: 56ch; color: var(--ink-2); font-size: 16px; }
  .total { text-align: right; }
  .total b { display: block; font-size: clamp(48px, 6vw, 76px); line-height: 0.9; letter-spacing: -0.05em; font-weight: 500; font-variant-numeric: tabular-nums; }
  .total span { display: block; font-size: 13px; color: var(--mut); margin-top: 8px; }

  .toolbar {
    position: sticky; top: 0; z-index: 5;
    background: var(--bg);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    padding: 14px 0;
  }
  .tools { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .searchbox { display: flex; align-items: center; gap: 10px; background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius); padding: 0 12px; height: 42px; min-width: 280px; flex: 1 1 320px; max-width: 420px; }
  .searchbox svg { color: var(--mut); flex: none; }
  .searchbox input { border: 0; background: transparent; font: inherit; color: inherit; width: 100%; height: 100%; padding: 0; }
  .searchbox input::placeholder { color: var(--mut); }
  .searchbox .keyhint { font-size: 12px; color: var(--mut); border: 1px solid var(--line); border-radius: 2px; padding: 1px 5px; }
  .filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .fchip {
    font: inherit; font-size: 13px; color: var(--ink-2);
    background: transparent; border: 1px solid var(--line);
    border-radius: var(--radius); padding: 7px 10px; cursor: pointer;
    display: inline-flex; align-items: center; gap: 7px;
  }
  .fchip:hover { border-color: var(--ink); }
  .fchip[aria-pressed="true"] { background: var(--ink); border-color: var(--ink); color: var(--panel); }
  .fnum { font-size: 12px; font-variant-numeric: tabular-nums; color: var(--mut); }
  .fchip[aria-pressed="true"] .fnum { color: #c9cacd; }
  .status { margin: 12px 0 0; font-size: 13px; color: var(--mut); }

  main { padding-bottom: 40px; }
  .grid {
    list-style: none; margin: 0; padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(226px, 1fr));
    border-left: 1px solid var(--line-2);
    border-top: 1px solid var(--line-2);
  }
  .brand {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px;
    border-right: 1px solid var(--line-2);
    border-bottom: 1px solid var(--line-2);
    background: transparent;
    min-width: 0;
  }
  .chip {
    width: 48px; height: 48px; flex: none;
    display: grid; place-items: center;
    background: var(--plate);
    border: 1px solid var(--line-2);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .chip[data-plate="dark"] { background: #12151a; border-color: #12151a; }
  .chip svg { display: block; }
  .bmeta { min-width: 0; display: flex; flex-direction: column; }
  .bname { font-weight: 500; font-size: 14px; letter-spacing: -0.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .bdom { font-size: 12px; color: var(--mut); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .empty { display: none; padding: 64px 0; text-align: left; }
  .empty.is-on { display: block; }
  .empty h2 { margin: 0 0 8px; font-size: 22px; letter-spacing: -0.02em; font-weight: 500; }
  .empty p { margin: 0 0 18px; color: var(--ink-2); }
  .btn {
    font: inherit; font-size: 14px; padding: 9px 14px;
    background: var(--ink); color: var(--panel); border: 1px solid var(--ink);
    border-radius: var(--radius); cursor: pointer;
  }
  .btn:hover { background: #000; }

  footer.foot { border-top: 1px solid var(--line); padding: 28px 0 56px; color: var(--mut); font-size: 13px; }
  .foot p { margin: 0 0 8px; max-width: 76ch; }
  .foot a { color: var(--ink-2); border-bottom: 1px solid var(--line); }
  .foot a:hover { border-color: var(--ink); }

  @media (max-width: 760px) {
    .wrap { padding: 0 18px; }
    .toprow { flex-wrap: wrap; gap: 8px 16px; }
    nav.pages { width: 100%; justify-content: space-between; }
    .masthead { grid-template-columns: 1fr; gap: 18px; padding-top: 36px; padding-bottom: 22px; }
    .total { text-align: left; }
    .grid { grid-template-columns: repeat(auto-fill, minmax(168px, 1fr)); }
    nav.pages { gap: 14px; font-size: 13px; }
  }

  @media (prefers-reduced-motion: reduce) {
    * { scroll-behavior: auto !important; transition: none !important; }
  }
</style>
</head>
<body>
<a class="skip" href="#library">Skip to brand list</a>

<header class="top">
  <div class="wrap toprow">
    <a class="brandmark" href="index.html">
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><rect width="32" height="32" fill="#17170F"/><rect x="5" y="7" width="22" height="8" rx="1" fill="#E8E6E0"/><rect x="10" y="16" width="12" height="3" fill="#B23A12"/><rect x="8" y="20" width="16" height="4" fill="#E8E6E0"/></svg>
      Hasp
    </a>
    <nav class="pages" aria-label="Mockup pages">
      <a href="index.html">Overview</a>
      <a href="browse.html">Browse directions</a>
      <a href="gallery.html">Screens</a>
      <a href="brands.html" aria-current="page">Brands</a>
    </nav>
  </div>
</header>

<div class="wrap masthead">
  <div>
    <p class="eyebrow">Shared asset, all twelve directions</p>
    <h1>Brand library</h1>
    <p class="lede">Every key, code, and account row in the mockups carries the real mark of the company it belongs to. Search all ${brands.length} marks by name or domain.</p>
  </div>
  <div class="total"><b>${brands.length}</b><span>company marks</span></div>
</div>

<main>
  <div class="toolbar">
    <div class="wrap">
      <div class="tools">
        <label class="searchbox" for="q">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.4"/><path d="M10.3 10.3 13.6 13.6"/></svg>
          <input id="q" type="search" placeholder="Search name or domain" autocomplete="off" spellcheck="false">
          <span class="keyhint" aria-hidden="true">/</span>
        </label>
        <div class="filters" role="group" aria-label="Filter by category">
      <button class="fchip" type="button" data-cat="" aria-pressed="true">All <span class="fnum">${brands.length}</span></button>
      ${catChips}
        </div>
      </div>
      <p class="status" id="status" role="status" aria-live="polite">${brands.length} marks</p>
    </div>
  </div>

  <div class="wrap" id="library">
    <ul class="grid" id="grid">
${cards}
    </ul>
    <div class="empty" id="empty">
      <h2>No brand matches that search.</h2>
      <p>Try a shorter name, or clear the filters and start again.</p>
      <button class="btn" type="button" id="reset">Clear search and filters</button>
    </div>
  </div>
</main>

<footer class="foot">
  <div class="wrap">
    <p>Marks come from the Simple Icons and SVG Logos sets, bundled with the repository. Both are CC0. Company names and marks belong to their owners. Logos appear for identification only, with no endorsement implied.</p>
    <p>Brand colours are the published values from each mark. Each direction keeps its own tile shape and border, and the plate turns light so marks stay legible on dark surfaces.</p>
    <p>To pull square app icons from logo.dev instead, run <a href="https://github.com/sarang-cmd/sarang-auth">_build/fetch-logos.mjs</a> with a token. Pages built here carry no remote requests.</p>
  </div>
</footer>

<script>
  const input = document.getElementById("q");
  const status = document.getElementById("status");
  const grid = document.getElementById("grid");
  const empty = document.getElementById("empty");
  const chips = [...document.querySelectorAll(".fchip")];
  const cards = [...grid.children];
  let cat = "";

  function apply() {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    for (const card of cards) {
      const okCat = !cat || card.dataset.cat === cat;
      const okQ = !q || card.dataset.q.includes(q);
      const on = okCat && okQ;
      card.hidden = !on;
      if (on) shown += 1;
    }
    status.textContent = shown + (shown === 1 ? " mark" : " marks") + (cat ? " in " + cat : "");
    empty.classList.toggle("is-on", shown === 0);
    grid.hidden = shown === 0;
  }

  input.addEventListener("input", apply);

  for (const chip of chips) {
    chip.addEventListener("click", () => {
      cat = chip.dataset.cat;
      for (const c of chips) c.setAttribute("aria-pressed", String(c === chip));
      apply();
    });
  }

  document.getElementById("reset").addEventListener("click", () => {
    input.value = "";
    cat = "";
    for (const c of chips) c.setAttribute("aria-pressed", String(c.dataset.cat === ""));
    apply();
    input.focus();
  });

  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement && document.activeElement.tagName;
    if (e.key === "/" && tag !== "INPUT") {
      e.preventDefault();
      input.focus();
    }
    if (e.key === "Escape" && document.activeElement === input) {
      input.value = "";
      apply();
    }
  });

  apply();
</script>
</body>
</html>
`;

writeFileSync(new URL("../brands.html", import.meta.url), page);
console.log(`wrote brands.html, ${brands.length} marks`);

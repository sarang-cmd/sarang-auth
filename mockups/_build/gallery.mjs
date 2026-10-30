import { writeFileSync } from "node:fs";
import { dirs } from "./data.mjs";

const screens = [
  ["dashboard", "Web dashboard", "1280 x 800"],
  ["popup", "Extension popup", "380 x 600"],
  ["bar", "Quick bar", "1000 x 560"],
  ["import", "Import review", "1280 x 800"],
  ["desktop", "Desktop app", "1120 x 720"],
  ["mobile", "Mobile app", "390 x 812"],
];

const nav = dirs
  .map((d) => `<a href="${d.slug}.html">${d.id.slice(1)} ${d.name}</a>`)
  .join("");

const gallery = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hasp mockups, all images</title>
<meta name="description" content="Rendered mockup images for six Hasp design directions across dashboard, extension, desktop and mobile.">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/board.css">
<style>
  .gal { margin: 0 0 8px; }
  .gal-row { display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; }
  figure.gal-item { margin: 0; }
  .gal img { display: block; width: 100%; height: auto; border: 1px solid var(--b-line); }
  .gal-item figcaption { display: flex; justify-content: space-between; gap: 12px; padding-top: 6px; font-size: 12px; color: var(--b-mut); }
  .gal-item figcaption b { font-weight: 500; color: var(--b-ink); }
  .g-dash { width: 100%; }
  .g-pop { width: 200px; }
  .g-mob { width: 205px; }
  .g-bar { width: 430px; }
  .g-desk { width: 470px; }
</style>
</head>
<body>
<header class="board-bar">
  <a class="board-brand" href="index.html">Hasp <span>Design directions</span></a>
  <nav class="board-nav" aria-label="Directions">${nav}<a href="gallery.html" aria-current="page">Images</a></nav>
</header>
<main class="board">
  <section class="dir-head">
    <p class="dir-kicker"><i></i>Rendered mockups</p>
    <h1 class="dir-name">36 images</h1>
    <p class="dir-premise">Six directions, six screens each, rendered from the same interface markup. Every image uses the same sample vault so you compare design, not data.</p>
  </section>
  ${dirs
    .map(
      (d) => `<section class="screen">
    <div class="screen-head"><h2>${d.id.slice(1)}. ${d.name}</h2><p>${d.palette[3][1]} accent, ${d.typeShort}</p></div>
    <div class="gal">
      <figure class="gal-item g-dash"><img src="png/${d.id}-dashboard.png" alt="Web dashboard in the ${d.name} direction" loading="lazy"><figcaption><b>Web dashboard</b><span>1280 x 800</span></figcaption></figure>
      <div class="gal-row">
        <figure class="gal-item g-pop"><img src="png/${d.id}-popup.png" alt="Extension popup in the ${d.name} direction" loading="lazy"><figcaption><b>Popup</b><span>380 x 600</span></figcaption></figure>
        <figure class="gal-item g-mob"><img src="png/${d.id}-mobile.png" alt="Mobile app in the ${d.name} direction" loading="lazy"><figcaption><b>Mobile</b><span>390 x 812</span></figcaption></figure>
        <figure class="gal-item g-bar"><img src="png/${d.id}-bar.png" alt="Quick bar overlay in the ${d.name} direction" loading="lazy"><figcaption><b>Quick bar</b><span>1000 x 560</span></figcaption></figure>
      </div>
      <div class="gal-row" style="margin-top:20px">
        <figure class="gal-item g-desk"><img src="png/${d.id}-desktop.png" alt="Desktop app in the ${d.name} direction" loading="lazy"><figcaption><b>Desktop app</b><span>1120 x 720</span></figcaption></figure>
        <figure class="gal-item g-desk"><img src="png/${d.id}-import.png" alt="Import review in the ${d.name} direction" loading="lazy"><figcaption><b>Import review</b><span>1280 x 800</span></figcaption></figure>
      </div>
    </div>
  </section>`
    )
    .join("")}
  <footer class="board-foot">
    <nav><a href="index.html">All directions</a><a href="sheet.html">Overview sheet</a><a href="../PLAN.md">Implementation plan</a></nav>
    <span>Sample vault data. Values are invented.</span>
  </footer>
</main>
</body>
</html>`;

writeFileSync(new URL("../gallery.html", import.meta.url), gallery);

const sheet = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hasp, six directions at a glance</title>
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/board.css">
<style>
  body { background: #e8e8e4; }
  .sheet { width: 1600px; padding: 44px 48px 52px; }
  .sheet-head { display: flex; align-items: baseline; justify-content: space-between; padding-bottom: 18px; border-bottom: 1px solid var(--b-line); }
  .sheet-head h1 { margin: 0; font-size: 34px; letter-spacing: -0.035em; font-weight: 600; }
  .sheet-head p { margin: 0; font-size: 13px; color: var(--b-mut); max-width: 46ch; text-align: right; line-height: 1.45; }
  .row { display: grid; grid-template-columns: 210px minmax(0, 1fr); gap: 28px; padding: 26px 0; border-bottom: 1px solid var(--b-line); align-items: start; }
  .row h2 { margin: 0; font-size: 22px; letter-spacing: -0.02em; font-weight: 600; }
  .row .num { font-size: 12px; color: var(--b-mut); }
  .row .prem { margin: 8px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--b-ink-2); }
  .sw { display: flex; gap: 4px; margin-top: 12px; }
  .sw i { width: 18px; height: 18px; border-radius: 50%; border: 1px solid rgba(0,0,0,.1); }
  .row .type { margin: 10px 0 0; font-size: 11px; color: var(--b-mut); }
  .shots { display: flex; gap: 14px; align-items: flex-start; }
  .shots img { display: block; border: 1px solid var(--b-line); }
  .s-dash { width: 560px; }
  .s-pop { width: 118px; }
  .s-mob { width: 122px; }
  .s-bar { width: 300px; }
</style>
</head>
<body>
<main class="sheet">
  <div class="sheet-head">
    <h1>Hasp, six directions</h1>
    <p>Same product, same sample vault, six visual systems. Full screens at mockups/gallery.html.</p>
  </div>
  ${dirs
    .map(
      (d) => `<section class="row">
    <div>
      <span class="num">${d.id.slice(1)} of 06</span>
      <h2>${d.name}</h2>
      <p class="prem">${d.premiseShort}</p>
      <div class="sw">${d.palette.map(([hex]) => `<i style="background:${hex}"></i>`).join("")}</div>
      <p class="type">${d.typeShort}</p>
    </div>
    <div class="shots">
      <img class="s-dash" src="png/${d.id}-dashboard.png" alt="Dashboard, ${d.name} direction">
      <img class="s-pop" src="png/${d.id}-popup.png" alt="Popup, ${d.name} direction">
      <img class="s-mob" src="png/${d.id}-mobile.png" alt="Mobile, ${d.name} direction">
      <img class="s-bar" src="png/${d.id}-bar.png" alt="Quick bar, ${d.name} direction">
    </div>
  </section>`
    )
    .join("")}
</main>
</body>
</html>`;
writeFileSync(new URL("../sheet.html", import.meta.url), sheet);
console.log("wrote gallery.html and sheet.html");

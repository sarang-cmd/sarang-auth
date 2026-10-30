import { writeFileSync, mkdirSync } from "node:fs";
import { popup, bar, dashboard, importReview, desktop, mobile } from "./screens.mjs";

import { dirs } from "./data.mjs";

const screens = [
  {
    key: "popup",
    title: "Extension popup, Chrome and Edge",
    spec: "380 × 600",
    note: "Opens on the active tab and suggests the key for that host.",
  },
  {
    key: "mobile",
    title: "Mobile app, iOS and Android",
    spec: "390 × 812",
    note: "One-time codes first. Keys stay one tap away.",
  },
  { key: "bar", title: "Quick bar over any page", spec: "1000 × 560", note: "Type a name, press Enter, the focused field fills." },
  { key: "dashboard", title: "Web dashboard", spec: "1280 × 800", note: "Vault, filters, detail pane with copy and reveal." },
  {
    key: "import",
    title: "Import review, Google Keep",
    spec: "1280 × 800",
    note: "A parsed note with a confidence score per field. This screen uses sample data.",
  },
  { key: "desktop", title: "Desktop app, Windows, macOS, Linux", spec: "1120 × 720", note: "The same vault, local and keyboard first." },
];

const bodies = {
  popup,
  mobile,
  bar,
  dashboard,
  import: importReview,
  desktop,
};

const nav = (current) =>
  dirs
    .map(
      (d) =>
        `<a href="${d.slug}.html"${d.id === current ? ' aria-current="page"' : ""}>${d.id.slice(1)} ${d.name}</a>`
    )
    .join("");

function page(d, prev, next) {
  const shots = screens
    .map(
      (s) => `<section class="screen" id="${s.key}">
      <div class="screen-head"><h2>${s.title}</h2><p>${s.spec}</p></div>
      <div class="stage-row">
        ${
          s.key === "popup"
            ? `<div class="zoom w380"><div class="stage stage-380" data-shot="popup">${popup()}</div></div>
               <div class="zoom w390"><div class="stage stage-390 stage-bare" data-shot="mobile">${mobile()}</div></div>`
            : s.key === "bar"
            ? `<div class="zoom w1000"><div class="stage stage-1000" data-shot="bar">${bar()}</div></div>`
            : s.key === "dashboard"
            ? `<div class="zoom w1280"><div class="stage stage-1280" data-shot="dashboard">${dashboard()}</div></div>`
            : s.key === "import"
            ? `<div class="zoom w1280"><div class="stage stage-1280" data-shot="import">${importReview()}</div></div>`
            : `<div class="zoom w1120"><div class="stage stage-1120" data-shot="desktop">${desktop()}</div></div>`
        }
      </div>
      <p class="stage-note">${s.note}</p>
    </section>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hasp design directions, ${d.name}</title>
<meta name="description" content="Design direction ${d.name} for Hasp, a vault for API keys, backup codes, and one-time codes.">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/board.css">
<link rel="stylesheet" href="assets/screens.css">
<link rel="stylesheet" href="assets/dirs.css">
</head>
<body class="${d.id}">
<header class="board-bar">
  <a class="board-brand" href="index.html">Hasp <span>Design directions</span></a>
  <nav class="board-nav" aria-label="Directions">${nav(d.id)}<a href="gallery.html">Images</a></nav>
</header>
<main class="board">
  <section class="dir-head">
    <p class="dir-kicker"><i></i>Direction ${d.id.slice(1)}, of six</p>
    <h1 class="dir-name">${d.name}</h1>
    <p class="dir-premise">${d.premise}</p>
    <div class="dir-facts">
      <div class="fact"><h3>Palette</h3>${d.palette
        .slice(0, 3)
        .map(([hex, name]) => `<p>${name}, ${hex}</p>`)
        .join("")}<div class="swatches">${d.palette
        .map(([hex]) => `<i style="background:${hex}"></i>`)
        .join("")}</div></div>
      <div class="fact"><h3>Type</h3><p>${d.type[0]}</p><p>${d.type[1]}</p></div>
      <div class="fact"><h3>Shape</h3><p>${d.shape[0]}</p><p>${d.shape[1]}</p></div>
      <div class="fact"><h3>Where it wins</h3><p>${d.wins[0]}</p><p>${d.wins[1]}</p></div>
    </div>
    <p class="stage-note">${d.signature}</p>
  </section>
  ${shots}
  <footer class="board-foot">
    <nav>${prev ? `<a href="${prev.slug}.html">Previous, ${prev.name}</a>` : ""}${
    next ? `<a href="${next.slug}.html">Next, ${next.name}</a>` : ""
  }<a href="index.html">All directions</a></nav>
    <span>Sample vault data. Values are invented.</span>
  </footer>
</main>
</body>
</html>`;
}

mkdirSync(new URL("../", import.meta.url), { recursive: true });
dirs.forEach((d, i) => {
  const html = page(d, dirs[i - 1], dirs[i + 1]);
  writeFileSync(new URL(`../${d.slug}.html`, import.meta.url), html);
  console.log("wrote", d.slug + ".html");
});

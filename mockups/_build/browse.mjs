import { writeFileSync } from "node:fs";
import { dirs } from "./data.mjs";

const screens = [
  ["dashboard", "Web dashboard", "1280 x 800"],
  ["popup", "Extension popup", "380 x 600"],
  ["bar", "Quick bar over a page", "1000 x 560"],
  ["import", "Import review", "1280 x 800"],
  ["desktop", "Desktop app", "1120 x 720"],
  ["mobile", "Mobile app", "390 x 812"],
];

const data = dirs.map((d) => ({
  id: d.id,
  name: d.name,
  trend: d.trend || null,
  dark: Boolean(d.dark),
  premise: d.premise,
  type: d.type[0],
  shape: d.shape[1],
  palette: d.palette,
  page: `${d.slug}.html`,
  screens: screens.map(([key, title, spec]) => ({
    key,
    title,
    spec,
    src: `png/${d.id}-${key}.png`,
  })),
}));

const cards = dirs
  .map(
    (d, i) => `<li class="cell" data-theme="${d.dark ? "dark" : "light"}">
      <a class="card" href="#${d.id}" data-open="${d.id}">
        <span class="shot"><img src="png/${d.id}-dashboard.png" alt="Dashboard in the ${d.name} direction" loading="lazy" width="1280" height="800"></span>
        <span class="card-body">
          <span class="card-row">
            <span class="num">${String(i + 1).padStart(2, "0")}</span>
            <span class="badge">${d.dark ? "Dark" : "Light"}</span>
          </span>
          <span class="card-name">${d.name}</span>
          <span class="card-line">${d.premiseShort}</span>
          <span class="dots">${d.palette
            .map(([hex]) => `<i style="background:${hex}" aria-hidden="true"></i>`)
            .join("")}</span>
        </span>
      </a>
    </li>`
  )
  .join("\n      ");

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Browse the twelve directions, Hasp</title>
<meta name="description" content="Thumbnail browser for twelve Hasp design directions, six light and six dark, with every screen for each.">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/board.css">
<style>
  body { background: var(--b-bg); }

  .top {
    position: sticky;
    top: 0;
    z-index: 50;
    background: var(--b-bg);
    border-bottom: 1px solid var(--b-line);
  }

  .top-inner {
    max-width: 1440px;
    margin: 0 auto;
    padding: 12px var(--board-pad);
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .brand {
    display: flex;
    align-items: baseline;
    gap: 10px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .brand span {
    font-size: 12px;
    font-weight: 400;
    color: var(--b-mut);
  }

  .top-actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  .filters {
    display: flex;
    gap: 2px;
    padding: 2px;
    border: 1px solid var(--b-line);
    border-radius: 3px;
  }

  .filters button {
    font: inherit;
    font-size: 12.5px;
    color: var(--b-mut);
    background: none;
    border: 0;
    padding: 5px 10px;
    border-radius: 2px;
    cursor: pointer;
  }

  .filters button:hover { color: var(--b-ink); }

  .filters button[aria-pressed="true"] {
    background: var(--b-ink);
    color: var(--b-bg);
  }

  .top-link {
    font-size: 12.5px;
    color: var(--b-mut);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .top-link:hover { color: var(--b-ink); }

  .wrap {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 var(--board-pad) 96px;
  }

  .head { padding: 56px 0 34px; max-width: 900px; }

  .kicker {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    color: var(--b-mut);
  }

  .kicker i {
    display: block;
    width: 28px;
    height: 1px;
    background: var(--b-line);
  }

  h1 {
    margin: 14px 0 0;
    font-size: clamp(40px, 6vw, 72px);
    line-height: 0.94;
    letter-spacing: -0.035em;
    font-weight: 600;
  }

  .head p {
    margin: 22px 0 0;
    max-width: 56ch;
    font-size: clamp(15px, 1.7vw, 19px);
    line-height: 1.5;
    color: var(--b-ink-2);
  }

  .grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 26px 24px;
  }

  .cell[hidden] { display: none; }

  .card {
    display: block;
    height: 100%;
    border: 1px solid var(--b-line);
    background: var(--b-panel);
    transition: border-color 120ms linear, background-color 120ms linear;
  }

  .card:hover { border-color: var(--b-ink); }

  .card:focus-visible {
    outline: 2px solid var(--b-accent);
    outline-offset: 3px;
  }

  .shot {
    display: block;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #101010;
    border-bottom: 1px solid var(--b-line);
  }

  .shot img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top left;
  }

  .card-body {
    display: block;
    padding: 12px 14px 14px;
  }

  .card-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .num {
    font-size: 11.5px;
    color: var(--b-mut);
    font-variant-numeric: tabular-nums;
  }

  .badge {
    font-size: 10.5px;
    color: var(--b-mut);
    border: 1px solid var(--b-line);
    padding: 1px 6px;
    border-radius: 2px;
  }

  .card-name {
    display: block;
    margin-top: 6px;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.015em;
  }

  .card-line {
    display: block;
    margin-top: 4px;
    font-size: 12.5px;
    line-height: 1.45;
    color: var(--b-ink-2);
    min-height: 2.9em;
  }

  .dots {
    display: flex;
    gap: 4px;
    margin-top: 10px;
  }

  .dots i {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.14);
  }

  /* ---------------------------------------------------------- detail view */
  #detail { padding-top: 38px; }
  #detail[hidden], #home[hidden] { display: none; }

  .crumbs {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 13px;
    color: var(--b-mut);
    flex-wrap: wrap;
  }

  .back {
    font: inherit;
    font-size: 13px;
    color: var(--b-ink);
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .d-head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 40px;
    align-items: end;
    padding: 22px 0 26px;
    border-bottom: 1px solid var(--b-line);
  }

  .d-title {
    margin: 8px 0 0;
    font-size: clamp(38px, 6vw, 72px);
    line-height: 0.96;
    letter-spacing: -0.035em;
    font-weight: 600;
  }

  .d-title:focus { outline: none; }

  .d-premise {
    margin: 18px 0 0;
    max-width: 54ch;
    font-size: 16px;
    line-height: 1.5;
    color: var(--b-ink-2);
  }

  .d-facts {
    font-size: 12.5px;
    color: var(--b-ink-2);
    display: grid;
    gap: 10px;
    padding-bottom: 4px;
  }

  .d-facts span { color: var(--b-mut); display: block; font-size: 11.5px; }
  .d-facts div p { margin: 0; }

  .d-nav {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .d-nav a,
  .d-nav button {
    font: inherit;
    font-size: 12.5px;
    border: 1px solid var(--b-line);
    background: none;
    color: var(--b-ink);
    padding: 6px 10px;
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
  }

  .d-nav a:hover,
  .d-nav button:hover { border-color: var(--b-ink); }

  .shots-head {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 26px 0 12px;
    border-bottom: 1px solid var(--b-line);
    margin-top: 0;
    font-size: 12.5px;
    color: var(--b-mut);
  }

  .shots-head span:first-child {
    color: var(--b-ink);
    font-weight: 500;
  }

  .shots {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 26px 24px;
    padding-top: 30px;
  }

  .shots figure { margin: 0; }
  .shots figure.wide { grid-column: 1 / -1; }
  .shots figure.narrow { grid-column: span 1; }

  .shot-link {
    display: block;
    border: 0;
  }

  .shot-link:focus-visible {
    outline: 2px solid var(--b-accent);
    outline-offset: 3px;
  }

  .shots img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--b-line);
    background: #101010;
  }

  .shots .frame-narrow {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .shots .frame-narrow img { width: 340px; max-width: 100%; }

  .shots figcaption {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-top: 8px;
    font-size: 12.5px;
    color: var(--b-mut);
  }

  .shots figcaption b {
    font-weight: 500;
    color: var(--b-ink);
  }

  .hint {
    margin: 12px 0 0;
    font-size: 12px;
    color: var(--b-mut);
  }

  .note {
    margin: 40px 0 0;
    padding: 16px 18px;
    background: var(--b-panel);
    border-left: 2px solid var(--b-ink);
    max-width: 760px;
    font-size: 13px;
    line-height: 1.55;
    color: var(--b-ink-2);
  }

  .foot {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 56px;
    padding-top: 18px;
    border-top: 1px solid var(--b-line);
    font-size: 12.5px;
    color: var(--b-mut);
    flex-wrap: wrap;
  }

  .foot a { color: var(--b-ink); text-decoration: underline; text-underline-offset: 3px; }

  @media (max-width: 1120px) {
    .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .d-head { grid-template-columns: minmax(0, 1fr); gap: 22px; align-items: start; }
  }

  @media (max-width: 720px) {
    .grid { grid-template-columns: minmax(0, 1fr); gap: 20px; }
    .head { padding: 36px 0 24px; }
    .shots { grid-template-columns: minmax(0, 1fr); }
    .shots figure.narrow { grid-column: auto; }
    .shots .frame-narrow img { width: 100%; }
    .top-actions { width: 100%; margin-left: 0; justify-content: space-between; }
  }

  @media (prefers-reduced-motion: reduce) {
    * { transition-duration: 0.01ms !important; }
  }
</style>
</head>
<body>
<header class="top">
  <div class="top-inner">
    <a class="brand" href="index.html">Hasp <span>Directions</span></a>
    <div class="top-actions">
      <div class="filters" role="group" aria-label="Filter directions">
        <button type="button" data-filter="all" aria-pressed="true">All 12</button>
        <button type="button" data-filter="light" aria-pressed="false">Light 6</button>
        <button type="button" data-filter="dark" aria-pressed="false">Dark 6</button>
      </div>
      <a class="top-link" href="gallery.html">Flat image list</a>
    </div>
  </div>
</header>

<main class="wrap">
  <section id="home">
    <div class="head">
      <p class="kicker"><i></i>Hasp design exploration</p>
      <h1>Twelve directions</h1>
      <p>Pick a direction to see every screen. Six light systems, six dark systems, all built from the same markup and the same sample vault.</p>
    </div>
    <ul class="grid" id="grid">
      ${cards}
    </ul>
    <p class="note">Sample vault data throughout. Values are invented, services are real, and no image shows a working product. Use the filter to compare light against dark.</p>
  </section>

  <section id="detail" hidden aria-labelledby="d-name">
    <div class="crumbs">
      <button type="button" class="back" id="back">All directions</button>
      <span id="d-count"></span>
    </div>
    <div class="d-head">
      <div>
        <p class="kicker" id="d-trend"></p>
        <h2 class="d-title" id="d-name" tabindex="-1"></h2>
        <p class="d-premise" id="d-premise"></p>
      </div>
      <div class="d-facts">
        <div><span>Type</span><p id="d-type"></p></div>
        <div><span>Shape</span><p id="d-shape"></p></div>
        <div><span>Palette</span><p class="dots" id="d-palette"></p></div>
        <div class="d-nav">
          <button type="button" id="prev">Previous</button>
          <button type="button" id="next">Next</button>
          <a id="d-page" href="index.html">Open direction page</a>
        </div>
      </div>
    </div>
    <div class="shots-head">
      <span>Six screens</span>
      <span>Select an image to open it full size</span>
    </div>
    <div class="shots" id="d-shots"></div>
    <p class="note" id="d-note"></p>
    <p class="hint">Arrow keys move between directions. Escape returns to the grid.</p>
  </section>

  <footer class="foot">
    <span>Hasp, October 2026. Twelve directions, 72 renders.</span>
    <span><a href="index.html">Index</a> &nbsp; <a href="gallery.html">All images</a> &nbsp; <a href="sheet.html">Light sheet</a> &nbsp; <a href="sheet-dark.html">Dark sheet</a> &nbsp; <a href="../PLAN.md">Plan</a></span>
  </footer>
</main>

<script type="application/json" id="data">${JSON.stringify(data)}</script>
<script>
(function () {
  var DATA = JSON.parse(document.getElementById("data").textContent);
  var byId = {};
  DATA.forEach(function (d, i) { d.index = i; byId[d.id] = d; });

  var home = document.getElementById("home");
  var detail = document.getElementById("detail");
  var grid = document.getElementById("grid");
  var cells = Array.prototype.slice.call(grid.querySelectorAll(".cell"));
  var rememberedScroll = 0;
  var lastId = null;

  function setFilter(mode) {
    document.querySelectorAll("[data-filter]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === mode));
    });
    cells.forEach(function (cell) {
      cell.hidden = mode !== "all" && cell.getAttribute("data-theme") !== mode;
    });
  }

  document.querySelectorAll("[data-filter]").forEach(function (b) {
    b.addEventListener("click", function () { setFilter(b.getAttribute("data-filter")); });
  });

  function shotFigure(s, d) {
    var narrow = s.key === "popup" || s.key === "mobile";
    var fig = document.createElement("figure");
    fig.className = narrow ? "narrow" : "wide";
    if (narrow) {
      var wrap = document.createElement("div");
      wrap.className = "frame-narrow";
      wrap.appendChild(linkFor(s, d));
      fig.appendChild(wrap);
    } else {
      fig.appendChild(linkFor(s, d));
    }
    var cap = document.createElement("figcaption");
    var b = document.createElement("b");
    b.textContent = s.title;
    var spec = document.createElement("span");
    spec.textContent = s.spec;
    cap.appendChild(b);
    cap.appendChild(spec);
    fig.appendChild(cap);
    return fig;
  }

  function linkFor(s, d) {
    var a = document.createElement("a");
    a.href = s.src;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "shot-link";
    a.setAttribute("aria-label", s.title + " in the " + d.name + " direction, open full size");
    a.appendChild(imgFor(s, d));
    return a;
  }

  function imgFor(s, d) {
    var img = document.createElement("img");
    img.src = s.src;
    img.alt = s.title + " in the " + d.name + " direction";
    img.loading = "lazy";
    img.width = 1280;
    img.height = 800;
    return img;
  }

  function render(id) {
    var d = byId[id];
    if (!d) { showHome(false); return false; }
    document.getElementById("d-count").textContent = "Direction " + String(d.index + 1).padStart(2, "0") + " of 12";
    document.getElementById("d-trend").textContent = d.trend ? d.trend : (d.dark ? "Dark system" : "Light system");
    var name = document.getElementById("d-name");
    name.textContent = d.name;
    document.getElementById("d-premise").textContent = d.premise;
    document.getElementById("d-type").textContent = d.type;
    document.getElementById("d-shape").textContent = d.shape;
    var pal = document.getElementById("d-palette");
    pal.innerHTML = "";
    d.palette.forEach(function (p) {
      var i = document.createElement("i");
      i.style.background = p[0];
      i.title = p[1] + " " + p[0];
      pal.appendChild(i);
    });
    document.getElementById("d-page").href = d.page;
    document.getElementById("d-note").textContent = d.dark
      ? "Dark system. Check text contrast on the quick bar and the inspector before shipping."
      : "Light system. Check table density at 1280 wide before shipping.";

    var shots = document.getElementById("d-shots");
    shots.innerHTML = "";
    d.screens.forEach(function (s) { shots.appendChild(shotFigure(s, d)); });

    var prev = byId[DATA[(d.index + DATA.length - 1) % DATA.length].id];
    var next = byId[DATA[(d.index + 1) % DATA.length].id];
    document.getElementById("prev").textContent = "Previous, " + prev.name;
    document.getElementById("next").textContent = "Next, " + next.name;
    document.getElementById("prev").onclick = function () { location.hash = prev.id; };
    document.getElementById("next").onclick = function () { location.hash = next.id; };

    home.hidden = true;
    detail.hidden = false;
    document.title = d.name + ", Hasp design direction";
    lastId = d.id;
    window.scrollTo(0, 0);
    name.focus({ preventScroll: true });
    return true;
  }

  function showHome(restore) {
    detail.hidden = true;
    home.hidden = false;
    document.title = "Browse the twelve directions, Hasp";
    if (restore) {
      window.scrollTo(0, rememberedScroll);
      if (lastId) {
        var card = grid.querySelector('[data-open="' + lastId + '"]');
        if (card) card.focus({ preventScroll: true });
      }
    }
  }

  function route() {
    var id = location.hash.replace("#", "");
    if (!id) { showHome(true); return; }
    if (!render(id)) { showHome(true); }
    else { rememberedScroll = 0; }
  }

  grid.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-open]");
    if (!a) return;
    rememberedScroll = window.scrollY;
    // hash change handles the rest; keeps the back button working
  });

  document.getElementById("back").addEventListener("click", function () {
    if (location.hash) {
      history.pushState("", document.title, location.pathname + location.search);
    }
    showHome(true);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !detail.hidden) {
      if (location.hash) history.pushState("", document.title, location.pathname + location.search);
      showHome(true);
    }
    if (detail.hidden) return;
    if (e.key === "ArrowRight") { document.getElementById("next").click(); }
    if (e.key === "ArrowLeft") { document.getElementById("prev").click(); }
  });

  window.addEventListener("hashchange", route);
  route();
})();
</script>
</body>
</html>`;

writeFileSync(new URL("../browse.html", import.meta.url), page);
console.log("wrote browse.html");

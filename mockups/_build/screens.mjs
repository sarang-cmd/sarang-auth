// Shared screen markup for the six directions.
// Same content in every direction so the comparison is about design, not copy.

export const items = [
  { mono: "G", name: "Groq production", sub: "console.groq.com", type: "API key", env: "prod", when: "2 hours ago", short: "2h" },
  { mono: "G", name: "Groq staging", sub: "console.groq.com", type: "API key", env: "staging", when: "6 days ago", short: "6d" },
  { mono: "S", name: "Stripe secret key", sub: "dashboard.stripe.com", type: "API key", env: "live", when: "Yesterday", short: "1d" },
  { mono: "G", name: "GitHub token, deploys", sub: "github.com", type: "Personal token", env: "prod", when: "4 days ago", short: "4d" },
  { mono: "N", name: "Neon connection string", sub: "console.neon.tech", type: "Connection string", env: "prod", when: "3 hours ago", short: "3h" },
  { mono: "C", name: "Cloudflare R2 token", sub: "dash.cloudflare.com", type: "API key", env: "prod", when: "Last week", short: "7d" },
  { mono: "L", name: "Linear API key", sub: "linear.app", type: "API key", env: "prod", when: "5 days ago", short: "5d" },
  { mono: "R", name: "Resend API key", sub: "resend.com", type: "API key", env: "prod", when: "2 weeks ago", short: "2w" },
  { mono: "G", name: "GitHub recovery codes", sub: "github.com", type: "Backup codes", env: "", when: "Never used", short: "8 left" },
  { mono: "A", name: "Google recovery codes", sub: "myaccount.google.com", type: "Backup codes", env: "", when: "Never used", short: "9 left" },
  { mono: "G", name: "GitHub 2FA", sub: "github.com", type: "One-time code", env: "", when: "3 minutes ago", short: "now" },
  { mono: "A", name: "AWS root 2FA", sub: "aws.amazon.com", type: "One-time code", env: "", when: "Yesterday", short: "1d" },
];

const icons = {
  lock: `<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3.2" y="7" width="9.6" height="6.4" rx="1.2"/><path d="M5.4 7V5.4a2.6 2.6 0 0 1 5.2 0V7"/></svg>`,
  search: `<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="7" cy="7" r="4.2"/><path d="M10.2 10.2 13.4 13.4"/></svg>`,
  copy: `<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5.4" y="5.4" width="7.2" height="7.2" rx="1"/><path d="M3.4 10.2V4.3a1 1 0 0 1 1-1h5.9"/></svg>`,
  plus: `<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3.4v9.2M3.4 8h9.2"/></svg>`,
  shield: `<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8 1.8l5 1.9v4.1c0 3-2.1 5.2-5 6.4-2.9-1.2-5-3.4-5-6.4V3.7z"/></svg>`,
  vault: `<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.4" y="2.4" width="11.2" height="11.2" rx="1.6"/><circle cx="8" cy="8" r="2.6"/><path d="M8 5.4V3.6M8 12.4v-1.8"/></svg>`,
  clock: `<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="5.6"/><path d="M8 4.8V8l2.4 1.6"/></svg>`,
  key: `<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="5.6" cy="8" r="2.6"/><path d="M8.2 8H14M11.4 8v2.2M13 8v1.6"/></svg>`,
  gear: `<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="2.1"/><path d="M8 1.8v1.7M8 12.5v1.7M14.2 8h-1.7M3.5 8H1.8M12.4 3.6l-1.2 1.2M4.8 11.2l-1.2 1.2M12.4 12.4l-1.2-1.2M4.8 4.8 3.6 3.6"/></svg>`,
  close: `<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4l8 8M12 4l-8 8"/></svg>`,
};

export const mark = {
  // A hasp: a hinged plate with a slot and a staple. Drawn flat, one color.
  1: `<svg viewBox="0 0 28 28" width="22" height="22" aria-hidden="true"><rect x="2" y="4" width="24" height="9" rx="1.5" fill="currentColor"/><rect x="8" y="13" width="12" height="4" fill="currentColor" opacity=".55"/><rect x="6" y="17" width="16" height="3.4" fill="currentColor"/><circle cx="6.6" cy="8.5" r="1.5" fill="var(--bg)"/><circle cx="21.4" cy="8.5" r="1.5" fill="var(--bg)"/><rect x="12.4" y="6.4" width="3.2" height="4.2" rx="0.6" fill="var(--bg)"/></svg>`,
  2: `<svg viewBox="0 0 28 28" width="24" height="24" aria-hidden="true"><circle cx="14" cy="14" r="11.6" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M14 6.6v6.2l4.6 3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="14" cy="14" r="1.9" fill="currentColor"/></svg>`,
  3: `<svg viewBox="0 0 28 28" width="22" height="22" aria-hidden="true"><path d="M5 4h3v20H5zM20 4h3v20h-3z" fill="currentColor"/><rect x="10.5" y="9" width="7" height="10" fill="currentColor" opacity=".9"/><rect x="12.6" y="11.4" width="2.8" height="5.2" fill="var(--bg)"/></svg>`,
  4: `<svg viewBox="0 0 28 28" width="22" height="22" aria-hidden="true"><rect x="3" y="3" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 10.5h22M10.5 10.5V25" stroke="currentColor" stroke-width="1.6"/><rect x="13.5" y="14" width="5" height="5" fill="currentColor"/></svg>`,
  5: `<svg viewBox="0 0 28 28" width="22" height="22" aria-hidden="true"><rect x="3" y="5" width="22" height="7.4" rx="2.2" fill="currentColor"/><rect x="8" y="15" width="12" height="3" rx="1.4" fill="currentColor" opacity=".5"/><rect x="8" y="20" width="8" height="3" rx="1.4" fill="currentColor" opacity=".5"/></svg>`,
  6: `<svg viewBox="0 0 28 28" width="24" height="24" aria-hidden="true"><path d="M14 3.4c4.6 0 7.4 3.2 7.4 7.8v3.2H21a1 1 0 0 1 1 1v7.6a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7.6a1 1 0 0 1 1-1h.6v-3.2c0-4.6 2.8-7.8 7.4-7.8Zm0 3.2c-2.6 0-4.2 1.8-4.2 4.6v3.2h8.4v-3.2c0-2.8-1.6-4.6-4.2-4.6Z" fill="currentColor"/><circle cx="14" cy="18.3" r="1.9" fill="var(--bg)"/></svg>`,
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function tile(item) {
  return `<span class="tile" data-type="${item.type.split(" ")[0].toLowerCase()}"><b>${item.mono}</b><i>${item.type}</i></span>`;
}

function tag(env) {
  return env ? `<span class="tag tag--${env}">${env}</span>` : `<span class="tag tag--none">no env</span>`;
}

function row(item, extra = "") {
  return `<div class="row${extra}">
      ${tile(item)}
      <span class="rmain"><span class="rtitle">${esc(item.name)}</span><span class="rsub">${esc(item.sub)}</span></span>
      ${tag(item.env)}
      <span class="rtype">${esc(item.type)}</span>
      <span class="rwhen">${esc(item.when)}</span>
    </div>`;
}

/* ---------------------------------------------------------------- popup */
export function popup() {
  return `<div class="pop">
  <div class="pop-head">
    <span class="pop-brand"><span class="mark">${mark[1]}</span>Hasp</span>
    <span class="sync"><i class="dot"></i>Synced</span>
  </div>
  <div class="pop-search">
    ${icons.search}
    <span class="ps-text">Search keys, codes, sites</span>
    <kbd>⌘</kbd><kbd>K</kbd>
  </div>
  <div class="pop-filters">
    <span class="chip is-on">All 14</span>
    <span class="chip">Keys 9</span>
    <span class="chip">Codes 3</span>
    <span class="chip">2FA 2</span>
  </div>
  <div class="suggest">
    <div class="suggest-head"><span class="slabel">For console.groq.com</span><span class="sconf">Suggested</span></div>
    <div class="suggest-item">
      ${tile(items[0])}
      <span class="rmain"><span class="rtitle">Groq production</span><span class="rsub">prod label, used 2 hours ago</span></span>
      <span class="suse">Copy key</span>
    </div>
    <p class="suggest-note">Staging key also saved.</p>
  </div>
  <div class="pop-sec">Recent</div>
  <div class="pop-list">
    ${items.slice(1, 7).map((i) => row(i)).join("")}
  </div>
  <div class="pop-foot">
    <span>14 items, 2 devices</span>
    <span class="linkish">Open dashboard</span>
  </div>
</div>`;
}

/* ------------------------------------------------------------- quick bar */
export function bar() {
  return `<div class="browser">
  <div class="btabs">
    <span class="btab is-on">API keys, Groq console</span>
    <span class="btab">Docs</span>
    <span class="btab-ghost">${icons.plus}</span>
    <span class="bwin"><i></i><i></i><i></i></span>
  </div>
  <div class="bbar">
    <span class="bnav">${icons.lock}</span>
    <span class="burl">console.groq.com/settings/keys</span>
    <span class="bmeta">${icons.shield} Hasp is filling this page</span>
  </div>
  <div class="bpage">
    <div class="bp-rail">
      <span class="bp-logo">groq</span>
      <span class="bp-nav is-on">API keys</span>
      <span class="bp-nav">Usage</span>
      <span class="bp-nav">Billing</span>
      <span class="bp-nav">Settings</span>
    </div>
    <div class="bp-col">
    <div class="bp-main">
      <div class="bp-crumb">Project, default</div>
      <h2>Create an API key</h2>
      <p class="bp-copy">Keys are shown once. Store the key somewhere safe before you close this dialog.</p>
      <label class="bp-label">Name</label>
      <div class="bp-field">production</div>
      <label class="bp-label">Key value</label>
      <div class="bp-field bp-field--focus"><span class="bp-placeholder">Paste key</span><span class="bp-caret"></span></div>
      <div class="bp-actions"><span class="bp-btn">Cancel</span><span class="bp-btn bp-btn--dark">Save key</span></div>
    </div>
    <div class="bp-side">
      <div class="bp-side-head"><span>Existing keys</span><span>4 keys</span></div>
      <div class="bp-krow"><span class="bp-kname">production</span><span class="bp-kscope">all</span><span class="bp-kwhen">used 2 hours ago</span></div>
      <div class="bp-krow"><span class="bp-kname">production-cache</span><span class="bp-kscope">read</span><span class="bp-kwhen">used yesterday</span></div>
      <div class="bp-krow"><span class="bp-kname">staging</span><span class="bp-kscope">all</span><span class="bp-kwhen">used 6 days ago</span></div>
      <div class="bp-krow"><span class="bp-kname">local-dev</span><span class="bp-kscope">all</span><span class="bp-kwhen">used 3 weeks ago</span></div>
      <p class="bp-side-note">Keys are shown once at creation. Hasp keeps a copy so you do not lose this one.</p>
    </div>
    </div>
    <div class="veil"></div>
    <div class="qbar">
      <div class="qbar-input">
        ${icons.search}
        <span class="q"><b>groq</b></span>
        <kbd>esc</kbd>
      </div>
      <div class="qbar-list">
        <div class="qrow is-pick">
          ${tile(items[0])}
          <span class="rmain"><span class="rtitle">Groq production</span><span class="rsub">Host matches console.groq.com, prod label</span></span>
          <span class="qkey">Enter</span>
        </div>
        <div class="qrow">
          ${tile(items[1])}
          <span class="rmain"><span class="rtitle">Groq staging</span><span class="rsub">Staging label, used 6 days ago</span></span>
          <span class="qkey">Tab</span>
        </div>
        <div class="qrow">
          <span class="tile"><b>N</b><i>Neon</i></span>
          <span class="rmain"><span class="rtitle">Neon connection string</span><span class="rsub">prod, 3 hours ago</span></span>
          <span class="qkey">Tab</span>
        </div>
      </div>
      <div class="qbar-foot">
        <span><b>↑↓</b> move</span>
        <span><b>Enter</b> fill</span>
        <span><b>⌘⇧K</b> open anywhere</span>
        <span class="qright">14 items</span>
      </div>
    </div>
  </div>
</div>`;
}

/* ------------------------------------------------------------- dashboard */
function rail(active = "Vault") {
  const nav = [
    ["Vault", "14", "vault"],
    ["Imports", "", "clock"],
    ["Activity", "", "key"],
    ["Devices", "", "shield"],
    ["Settings", "", "gear"],
  ];
  return `<aside class="rail">
    <div class="rail-brand"><span class="mark">${mark[1]}</span><span>Hasp</span></div>
    <div class="rail-ws">Sarang, personal</div>
    <nav class="rail-nav">
      ${nav
        .map(
          ([n, c, ic]) =>
            `<a class="${n === active ? "is-on" : ""}">${icons[ic] || icons.key}<span>${n}</span>${c ? `<em>${c}</em>` : ""}</a>`
        )
        .join("")}
    </nav>
    <div class="rail-foot">
      <div class="rail-sync"><i class="dot"></i><span>Synced 2 minutes ago</span></div>
      <div class="rail-user"><span class="avatar">SR</span><span>sarang@studio.dev<em>Neon account</em></span></div>
    </div>
  </aside>`;
}

export function dashboard() {
  return `<div class="app">
  ${rail("Vault")}
  <div class="main">
    <header class="topbar">
      <div class="titleblock"><h1>Vault</h1><p>14 items, 6 services, 2 devices</p></div>
      <div class="topact">
        <div class="search">${icons.search}<span>Search</span><kbd>⌘K</kbd></div>
        <button class="btn btn--primary">${icons.plus} Add item</button>
      </div>
    </header>
    <div class="filters">
      <span class="chip is-on">All 14</span>
      <span class="chip">API keys 9</span>
      <span class="chip">Backup codes 2</span>
      <span class="chip">One-time codes 2</span>
      <span class="chip chip--end">Environment, all</span>
    </div>
    <div class="content">
      <section class="list">
        <div class="list-head">
          <span>Item</span><span>Environment</span><span>Type</span><span>Last used</span>
        </div>
        ${items.slice(0, 9).map((i, n) => row(i, n === 0 ? " is-on" : "")).join("")}
      </section>
      <aside class="inspector">
        <div class="insp-head">
          ${tile(items[0])}
          <div><h2>Groq production</h2><p>API key, console.groq.com</p></div>
        </div>
        <div class="field">
          <span class="flabel">Secret</span>
          <div class="secret"><code>gsk_prod_7f2a<em>••••••••••••</em>9c41</code>
            <button class="btn btn--small">${icons.copy} Copy</button>
            <button class="btn btn--small btn--quiet">Reveal</button>
          </div>
          <p class="hint">Clipboard clears after 30 seconds.</p>
        </div>
        <div class="fieldgrid">
          <div><span class="flabel">Environment</span><span class="fvalue">${tag("prod")}</span></div>
          <div><span class="flabel">Rotated</span><span class="fvalue">12 August</span></div>
          <div><span class="flabel">Created</span><span class="fvalue">3 February</span></div>
          <div><span class="flabel">Devices</span><span class="fvalue">Chrome, macOS</span></div>
        </div>
        <div class="why">
          <span class="flabel">Why Hasp suggests this</span>
          <p>Host matches console.groq.com. Label reads prod. Last use was 2 hours ago in Chrome.</p>
        </div>
        <div class="activity">
          <span class="flabel">Activity</span>
          <ul>
            <li><span>Copied in Chrome</span><span>2 hours ago</span></li>
            <li><span>Filled on console.groq.com</span><span>Yesterday</span></li>
            <li><span>Rotated</span><span>12 August</span></li>
          </ul>
        </div>
        <div class="insp-foot">
          <button class="btn btn--small btn--quiet">Rotate</button>
          <button class="btn btn--small btn--quiet">Edit item</button>
        </div>
      </aside>
    </div>
  </div>
</div>`;
}

/* ---------------------------------------------------------------- import */
export function importReview() {
  const notes = [
    ["Keep note, 18 July", "groq prod key gsk_prod_7f2a... rotate every 90 days", "API key, Groq, production"],
    ["Keep note, 4 June", "github backup codes 8 left, saved after the token reset", "Backup codes, GitHub"],
    ["Keep note, 12 May", "Neon: postgres://sarang:...@ep-cool-db.eu-central-1.aws.neon.tech/main", "Connection string, Neon"],
    ["Keep note, 2 March", "stripe live sk_live_51H... only for invoicing", "API key, Stripe, live"],
    ["Keep note, 19 February", "cloudflare r2 token, bucket sarang-assets, do not delete", "API key, Cloudflare, production"],
    ["Keep note, 8 January", "aws backup codes, printed copy in the drawer", "Backup codes, AWS"],
  ];
  return `<div class="app">
  ${rail("Imports")}
  <div class="main">
    <header class="topbar">
      <div class="titleblock"><h1>Import review</h1><p>Google Keep export, 34 notes read, 21 items found</p></div>
      <div class="topact">
        <span class="chip chip--warn">3 duplicates skipped</span>
        <button class="btn">Choose another file</button>
      </div>
    </header>
    <div class="import">
      <div class="imp-left">
        <div class="imp-summary">
          <div><strong>21</strong><span>items ready</span></div>
          <div><strong>9</strong><span>api keys</span></div>
          <div><strong>3</strong><span>backup code sets</span></div>
          <div><strong>4</strong><span>one-time codes</span></div>
        </div>
        <div class="flabel imp-label">Source notes</div>
        <ul class="notes">
          ${notes
            .map(
              ([meta, text, match], n) => `<li class="note${n === 0 ? " is-on" : ""}">
            <span class="note-meta">${meta}</span>
            <p>${esc(text)}</p>
            <span class="note-match">${match}</span>
          </li>`
            )
            .join("")}
        </ul>
        <div class="imp-action">
          <span class="imp-progress"><i style="width:14%"></i></span>
          <span class="imp-count">3 of 21 accepted</span>
          <button class="btn">Review one by one</button>
          <button class="btn btn--primary">Accept remaining 18</button>
        </div>
      </div>
      <div class="imp-right">
        <div class="preview">
          <span class="flabel">Parsed from note 1 of 21</span>
          <h2>Groq production key</h2>
          <p class="preview-sub">The note held a key, a service name, and a rotation reminder. Hasp kept all three.</p>
          <div class="pv-fields">
            <div class="pv-row"><span>Service</span><span class="pv-val">console.groq.com</span><span class="conf">96%</span></div>
            <div class="pv-row"><span>Type</span><span class="pv-val">API key</span><span class="conf">99%</span></div>
            <div class="pv-row"><span>Environment</span><span class="pv-val">production</span><span class="conf">92%</span></div>
            <div class="pv-row"><span>Label</span><span class="pv-val">prod, groq</span><span class="conf">88%</span></div>
          </div>
          <div class="pv-secret">
            <span class="flabel">Value</span>
            <code>gsk_prod_7f2a<em>••••••••••••</em>9c41</code>
          </div>
          <div class="pv-actions">
            <button class="btn btn--primary">Accept item</button>
            <button class="btn">Skip</button>
            <span class="pv-count">1 of 21</span>
          </div>
        </div>
        <div class="imp-options">
          <div><span class="flabel">Also imported</span><p>4 TOTP accounts from Google Authenticator QR export, 12 images read.</p></div>
          <div><span class="flabel">Left as notes</span><p>5 notes kept word for word, no secret found.</p></div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

/* ---------------------------------------------------------------- desktop */
export function desktop() {
  const rows = [
    items[0],
    items[3],
    items[2],
    items[4],
    items[1],
    items[8],
    items[5],
    items[6],
    items[7],
    items[9],
    items[10],
    items[11],
  ];
  return `<div class="win">
  <div class="winbar">
    <span class="win-brand"><span class="mark">${mark[1]}</span>Hasp</span>
    <span class="win-title">Vault</span>
    <span class="win-kbd"><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>Space</kbd> opens from any app</span>
  </div>
  <div class="winbody">
    <div class="winrail">
      <span class="wicon is-on" title="Vault">${icons.vault}</span>
      <span class="wicon" title="Search">${icons.search}</span>
      <span class="wicon" title="Codes">${icons.clock}</span>
      <span class="wicon" title="Security">${icons.shield}</span>
      <span class="wspacer"></span>
      <span class="wicon" title="Settings">${icons.gear}</span>
    </div>
    <div class="winmain">
      <div class="wintop">
        <span class="win-label">Local vault, encrypted on this device</span>
        <span class="win-sync"><i class="dot"></i>Synced with Neon</span>
      </div>
      <div class="winvault">
        <div class="wv-head"><span>Vault</span><span>14 items</span></div>
        ${rows
          .map(
            (i, n) => `<div class="wv-row${n === 1 ? " is-on" : ""}">
          ${tile(i)}
          <span class="rmain"><span class="rtitle">${esc(i.name)}</span><span class="rsub">${esc(i.sub)}</span></span>
          ${tag(i.env)}
          <span class="wv-type">${esc(i.type)}</span>
          <span class="wv-when">${esc(i.when)}</span>
        </div>`
          )
          .join("")}
      </div>
      <div class="winveil"></div>
      <div class="palette">
        <div class="palette-input">
          ${icons.search}
          <span class="pquery">github</span>
          <kbd>esc</kbd>
        </div>
        <div class="palette-list">
          <div class="prow is-on">
            <span class="tile"><b>G</b><i>Token</i></span>
            <span class="rmain"><span class="rtitle">GitHub token, deploys</span><span class="rsub">github.com, personal token</span></span>
            <span class="pact">Copy</span>
          </div>
          <div class="prow">
            <span class="tile"><b>G</b><i>2FA</i></span>
            <span class="rmain"><span class="rtitle">GitHub 2FA</span><span class="rsub">482 913</span></span>
            <span class="ptime"><span class="ptime-bar"></span>18s</span>
          </div>
          <div class="prow">
            <span class="tile"><b>G</b><i>Codes</i></span>
            <span class="rmain"><span class="rtitle">GitHub recovery codes</span><span class="rsub">8 of 10 unused</span></span>
            <span class="pact">Open</span>
          </div>
        </div>
        <div class="palette-foot">
          <span><b>↑↓</b> move</span><span><b>Enter</b> copy</span><span><b>⌘1</b> one-time code</span>
          <span class="pright">Local cache, 14 items</span>
        </div>
      </div>
      <div class="winfoot">
        <span>Shortcut: Ctrl Shift Space from any app</span>
        <span>Windows, macOS, Linux</span>
      </div>
    </div>
  </div>
</div>`;
}

/* ----------------------------------------------------------------- mobile */
export function mobile() {
  return `<div class="phone">
  <div class="statusbar"><span>9:41</span><span class="sstatus"><i class="sbar"></i><i class="sbar"></i><i class="sbar"></i><span class="snet">5G</span><i class="sbatt"></i></span></div>
  <div class="mob">
    <div class="mob-head">
      <span class="mob-kicker">Vault</span>
      <h1>Your codes, right now</h1>
      <span class="mob-sync"><i class="dot"></i>Synced</span>
    </div>
    <div class="mob-search">${icons.search}<span>Search 14 items</span></div>
    <div class="mob-sec"><span>One-time codes</span><span class="mob-more">2 accounts</span></div>
    <div class="totp-card">
      <div class="totp-top"><span class="totp-name">GitHub</span><span class="totp-user">sarang</span></div>
      <div class="totp-code">482 913</div>
      <div class="totp-bar"><i style="width:62%"></i></div>
      <div class="totp-foot"><span>18 seconds left</span><span>Copy</span></div>
    </div>
    <div class="totp-row">
      <span class="totp-mini">AWS root</span>
      <span class="totp-small">104 776</span>
      <span class="totp-bar totp-bar--thin"><i style="width:24%"></i></span>
    </div>
    <div class="mob-sec"><span>Backup codes</span><span class="mob-more">2 sets</span></div>
    <div class="mob-row">
      ${tile(items[8])}
      <span class="rmain"><span class="rtitle">GitHub recovery codes</span><span class="rsub">8 of 10 unused</span></span>
    </div>
    <div class="mob-sec"><span>Recently used keys</span><span class="mob-more">9</span></div>
    <div class="mob-row">
      ${tile(items[0])}
      <span class="rmain"><span class="rtitle">Groq production</span><span class="rsub">2 hours ago</span></span>
    </div>
    <div class="mob-row">
      ${tile(items[2])}
      <span class="rmain"><span class="rtitle">Stripe secret key</span><span class="rsub">Yesterday</span></span>
    </div>
    <div class="mob-row">
      ${tile(items[3])}
      <span class="rmain"><span class="rtitle">GitHub token, deploys</span><span class="rsub">4 days ago</span></span>
    </div>
    <div class="mob-row">
      ${tile(items[4])}
      <span class="rmain"><span class="rtitle">Neon connection string</span><span class="rsub">3 hours ago</span></span>
    </div>
    <p class="mob-note">Vault locks after 5 minutes. Face unlock is on.</p>
    <div class="mob-tabs">
      <span class="mob-tab is-on">${icons.vault}Vault</span>
      <span class="mob-tab">${icons.clock}Codes</span>
      <span class="mob-tab">${icons.plus}Add</span>
      <span class="mob-tab">${icons.gear}Settings</span>
    </div>
  </div>
</div>`;
}

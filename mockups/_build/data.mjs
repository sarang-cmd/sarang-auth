// Direction copy used by the page builder, the gallery and the overview sheet.

export const dirs = [
  {
    id: "d1",
    slug: "01-foundry",
    name: "Foundry",
    premiseShort: "Parts catalog. Dense table, stamped labels, oxide accent.",
    typeShort: "Archivo, square corners",
    premise:
      "A parts catalog for credentials. Every key has a place, a label, and a last-used date. The interface looks like a store room that runs well.",
    palette: [
      ["#E8E6E0", "concrete"],
      ["#F1EFE9", "panel"],
      ["#17170F", "ink"],
      ["#B23A12", "oxide"],
      ["#3F6B3A", "healthy"],
    ],
    type: ["Archivo", "One family, three weights, tight tracking on titles."],
    shape: ["Square corners", "1px rules, solid ink table band, inset accent bar."],
    wins: ["Dense vaults", "Teams that read tables all day and want no ambiguity."],
    signature:
      "The table header is solid ink. The active row carries a 3px oxide bar. Codes sit in the same grotesque as labels, which keeps the catalog even.",
  },
  {
    id: "d2",
    slug: "02-reading-room",
    name: "Reading Room",
    premiseShort: "Index of records. Serif titles, hairlines, pine accent.",
    typeShort: "Newsreader, Public Sans",
    premise:
      "A reading desk for secrets. Notes keep their original wording, so the context that came with a key survives the import.",
    palette: [
      ["#E9EDEA", "stone"],
      ["#F5F7F4", "panel"],
      ["#16211D", "ink"],
      ["#1E5A48", "pine"],
      ["#5F6E67", "muted"],
    ],
    type: ["Newsreader and Public Sans", "Serif titles, sans interface, italic environment labels."],
    shape: ["Hairline rules", "3px corners, circular marks, almost no boxes."],
    wins: ["Years of notes", "Backup codes that need context to stay useful."],
    signature:
      "Titles are set in Newsreader. Environment labels are italic serif, not pills. The result is quieter than a dashboard and easier to read in long lists.",
  },
  {
    id: "d3",
    slug: "03-flight-deck",
    name: "Flight Deck",
    premiseShort: "Operations console. Dark, dense, semantic signals.",
    typeShort: "IBM Plex Sans, Plex Mono",
    premise:
      "An operations console. Environment status, countdowns, and last use read like instruments, because that is what they are.",
    palette: [
      ["#0E1417", "hull"],
      ["#141C1F", "panel"],
      ["#E7EDEE", "text"],
      ["#D9A227", "amber"],
      ["#4E9C86", "teal"],
    ],
    type: ["IBM Plex Sans and Plex Mono", "Mono for figures, countdowns, and labels."],
    shape: ["2px corners", "Inset status bars, 1px rules, no elevation."],
    wins: ["Many environments", "People on call who need production to look different."],
    signature:
      "Amber marks production, teal marks staging and healthy sync. A 2px bar on the left of each row repeats the environment, so scanning does not depend on colour alone.",
  },
  {
    id: "d4",
    slug: "04-grid",
    name: "Grid",
    premiseShort: "Swiss sheet. Visible structure, one ultramarine accent.",
    typeShort: "Instrument Sans, no radius",
    premise:
      "A Swiss sheet. The structure is the decoration. One ultramarine accent marks the thing you selected.",
    palette: [
      ["#F1F1EE", "paper"],
      ["#F8F8F5", "panel"],
      ["#0E0E0F", "ink"],
      ["#1B34C0", "ultramarine"],
      ["#5C5C5E", "muted"],
    ],
    type: ["Instrument Sans", "One family, tight display tracking, plain labels."],
    shape: ["No corners", "Visible rules, solid ink chips, flat surfaces."],
    wins: ["Documentation", "Screenshots and printed handouts that stay legible."],
    signature:
      "Labels sit in the left column and values align on a hard grid. The active chip is solid ink. Ultramarine appears only on selection, focus, and links.",
  },
  {
    id: "d5",
    slug: "05-native",
    name: "Native",
    premiseShort: "Chromeless utility. System type, icon rail, keyboard first.",
    typeShort: "System UI, soft radii",
    premise:
      "A local utility, not a website. System type, an icon rail, and a keyboard palette that opens over any app.",
    palette: [
      ["#F4F4F2", "window"],
      ["#FBFBF9", "panel"],
      ["#1A1B1E", "ink"],
      ["#2A2C31", "graphite"],
      ["#2F7D5C", "sync"],
    ],
    type: ["System UI", "SF Pro, Segoe UI, Roboto. No web font."],
    shape: ["6 to 14px radii", "No table header, one soft shadow on floating panels."],
    wins: ["Desktop app", "People who never open the dashboard."],
    signature:
      "The rail collapses to icons. The vault reads as a list, not a spreadsheet. The desktop window is one search field, because that is how people find a key at work.",
  },
  {
    id: "d6",
    slug: "06-halcyon",
    name: "Halcyon",
    premiseShort: "Consumer vault. Warm paper, soft cards, juniper accent.",
    typeShort: "Sora, rounded cards",
    premise:
      "A consumer vault that happens to hold developer keys. Warm paper, soft cards, and a calm juniper accent.",
    palette: [
      ["#F3F1EC", "paper"],
      ["#FBF9F4", "panel"],
      ["#1B1A17", "ink"],
      ["#2B6C74", "juniper"],
      ["#3E7A55", "healthy"],
    ],
    type: ["Sora", "One family, three weights, rounded terminals."],
    shape: ["10 to 18px radii", "1px borders, row cards, no shadow in the list."],
    wins: ["Mobile first", "Mixed audiences of technical and non-technical people."],
    signature:
      "Rows sit as cards on the page. Titles use one family at three weights. The accent stays on actions and one-time codes. Everything else is ink on warm paper.",
  },
];


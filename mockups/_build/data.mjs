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

  {
    id: "d7",
    slug: "07-nightshift",
    name: "Nightshift",
    trend: "Neumorphism",
    dark: true,
    premiseShort: "Neumorphism. Embossed controls, no visible borders, cool blue.",
    typeShort: "Instrument Sans, soft shadows",
    premise:
      "Neumorphism at night. Controls sit in the surface instead of on top of it, so the vault feels like a machined panel rather than a web page.",
    palette: [
      ["#14161A", "night"],
      ["#171A1F", "panel"],
      ["#E8EAED", "text"],
      ["#7FA6D8", "cool blue"],
      ["#6FA98B", "healthy"],
    ],
    type: ["Instrument Sans", "One family, light shadows carry the hierarchy."],
    shape: ["9 to 12px radii", "Paired inner and outer shadows, no visible borders."],
    wins: ["Long sessions", "People who want the interface to recede."],
    signature:
      "Surfaces carry a light top edge and a dark drop. Fields look pressed into the panel. The accent appears on selection and focus only.",
  },
  {
    id: "d8",
    slug: "08-brut",
    name: "Brut",
    trend: "Neubrutalism",
    dark: true,
    premiseShort: "Neubrutalism. Heavy outlines, hard shadows, vermilion.",
    typeShort: "Archivo 700, zero radius",
    premise:
      "Neubrutalism with the lights off. Heavy outlines, hard offset shadows, one vermilion block of colour. Nothing is subtle.",
    palette: [
      ["#0A0A0A", "black"],
      ["#111111", "panel"],
      ["#F4F1EA", "bone"],
      ["#E2542B", "vermilion"],
      ["#9A958A", "muted"],
    ],
    type: ["Archivo", "Heavy weights, tight tracking, no optical tricks."],
    shape: ["Zero radius", "2px outlines, solid ink header, hard offset shadows."],
    wins: ["A launch page", "Developers who distrust polished marketing."],
    signature:
      "Every control carries a 2px bone outline. The primary button is vermilion with a black offset. No blur appears anywhere in the system.",
  },
  {
    id: "d9",
    slug: "09-retrograde",
    name: "Retrograde",
    trend: "Retro futurism",
    dark: true,
    premiseShort: "Retro futurism, warm. Bone text, amber readouts, mono figures.",
    typeShort: "Archivo and Plex Mono",
    premise:
      "Retro futurism, warm instead of neon. Bone text, amber readouts, mono figures. It looks like a terminal a careful engineer would keep.",
    palette: [
      ["#12100E", "soot"],
      ["#191614", "panel"],
      ["#EDE3CF", "bone"],
      ["#E0A33C", "amber"],
      ["#7FA38C", "sage"],
    ],
    type: ["Archivo and IBM Plex Mono", "Mono for timestamps, counts and labels."],
    shape: ["2px corners", "Thin amber rules, square tags, no rounding."],
    wins: ["Terminal users", "Vaults full of infrastructure keys."],
    signature:
      "Timestamps and counts sit in mono. Selected rows get a 2px amber edge. The palette stays warm, which keeps the dark screen from feeling clinical.",
  },
  {
    id: "d10",
    slug: "10-weimar",
    name: "Weimar",
    trend: "Bauhaus",
    dark: true,
    premiseShort: "Bauhaus at night. Three primaries used as punctuation.",
    typeShort: "Sora, geometric marks",
    premise:
      "Bauhaus at night. Primary colours used as punctuation, a hard grid, and geometric marks. Serious, printed, a little severe.",
    palette: [
      ["#0C0C0C", "black"],
      ["#121212", "panel"],
      ["#F2EFE8", "chalk"],
      ["#D23B2A", "red"],
      ["#E3B22B", "yellow"],
    ],
    type: ["Sora", "Geometric sans, tight display tracking."],
    shape: ["No radius", "2px rules, square tiles, a 4px red bar for selection."],
    wins: ["A print-like identity", "Product pages with strong art direction."],
    signature:
      "The mark is a yellow shape on black. Selection is a 4px red bar. Blue appears on focus only. Three primaries, used like punctuation.",
  },
  {
    id: "d11",
    slug: "11-glasshouse",
    name: "Glasshouse",
    trend: "Glassmorphism",
    dark: true,
    premiseShort: "Glassmorphism, quiet. Translucent panels, hairline light edges.",
    typeShort: "Public Sans, translucent panels",
    premise:
      "Glassmorphism, kept quiet. Panels float a few pixels above a dark slate ground, with a single hairline of light on every edge.",
    palette: [
      ["#0D1218", "slate"],
      ["#16202B", "panel"],
      ["#EEF3F7", "light"],
      ["#7FB2E5", "blue"],
      ["#74C0A6", "mint"],
    ],
    type: ["Public Sans", "Neutral interface type, no display face."],
    shape: ["14 to 18px radii", "5 percent white fills, 1px borders, one deep shadow."],
    wins: ["Media heavy marketing", "Depth without noise."],
    signature:
      "Panels use a low white fill with blur behind them. Borders carry the edge, not shadows. The quick bar is the only strongly elevated object.",
  },
  {
    id: "d12",
    slug: "12-clay",
    name: "Clay",
    trend: "Claymorphism",
    dark: true,
    premiseShort: "Claymorphism at night. Thick soft forms, sage accent.",
    typeShort: "Sora, inflated cards",
    premise:
      "Claymorphism in a dark room. Thick, soft, rounded forms with a sage accent. Friendly for a tool that holds serious things.",
    palette: [
      ["#171C1B", "moss"],
      ["#1F2523", "panel"],
      ["#EAEDE6", "text"],
      ["#A8C08F", "sage"],
      ["#8DC4A0", "healthy"],
    ],
    type: ["Sora", "One family, heavy on shape rather than weight."],
    shape: ["14 to 20px radii", "Inflated cards, inner top light, soft drop."],
    wins: ["Mobile first", "Households and mixed skill teams."],
    signature:
      "Every card has a light top edge and a soft drop, which reads as clay rather than glass. Rows sit as separate objects with real gaps.",
  },
];


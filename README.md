# michael@fettiplace.net — personal research site

One scrollable page. Plain HTML, one stylesheet, one script, one data file.
No framework, no build step, no external requests, no analytics, no cookies.
Open `index.html` in a browser and it works, including straight off the filesystem.

```
fettiplace-lab-site/
├── index.html                     ← all the prose and page structure
├── data/publications.js           ← citation records
├── assets/css/style.css           ← every color is a token at the top
├── assets/js/site.js              ← publication lists + nav highlighting
├── assets/img/
│   ├── fig-pharmacovigilance.svg  ← forest plot (real VigiBase data)
│   ├── fig-dosing.svg             ← cumulative dose accumulation (schematic)
│   ├── fig-lipid.svg              ← meta-analysis forest plot (schematic)
│   ├── fig-ai.svg                 ← disclosure framework
│   └── portrait.jpg               ← the only raster file on the site
├── tools-generate-figures.py      ← optional: regenerates the four SVGs
├── .nojekyll
└── README.md
```

## Page structure

Hero → numbered index of the four research areas → the four sections → resources →
contact. Nav and index entries are anchor links; the nav underlines whichever
section is under the header as you scroll.

| # | Section | Figure |
|---|---------|--------|
| 01 | Pharmacovigilance — finding the harm | Class-level cardiac arrest ROR forest plot |
| 02 | Toxicity & dosing — preventing it | Cumulative dose vs. the 24-hour ceiling |
| 03 | Lipid emulsion — how well does it work? | Pooled meta-analytic estimate |
| 04 | Artificial intelligence — disclosure standards | The where / what / detail framework |

Three to four publications per section. No publication counts anywhere; the full
list is PubMed and Google Scholar links in the contact block.

### Wording the page holds to

- Lipid emulsion is **part of a treatment regimen** — never "the antidote".
- Never the phrase "lipid rescue" in prose; the one exception is the resource
  link, labelled by its URL.
- The page describes the science only. No clinical-practice description, no
  committee or workgroup roles.

## The graphics

All four section figures are hand-built SVG — no charting library, no raster
images, a few kilobytes each, sharp at any zoom, and they follow the reader's
light/dark setting through a `prefers-color-scheme` block inside each file.

`tools-generate-figures.py` regenerates them, but it is optional — they are
ordinary editable SVG, so opening one in a text editor or Illustrator/Figma and
changing it directly works just as well. One carries real data and says so in its
caption; the rest are schematics and say so.

**The forest plot in section 01 is real data** — the class-level reporting odds
ratios from Perez & Fettiplace, *Br J Anaesth* 2026. If any value changes, edit
the `<text>` label and move the corresponding circle and whisker; the x-axis is
log-scaled between 0.15 and 2.5 across x = 286 to 760.

The portrait is the one raster file. Supplied at 190×266, cropped to square and
upscaled for retina; a higher-resolution original would look sharper.

## Editing

### Which publications appear in a section

Each section ends with a line like:

```html
<ol class="pubs" data-pubs="40877109,42527294,40691088,42421525"></ol>
```

Those are PMIDs, rendered newest first. Add, remove or reorder them freely.
`data/publications.js` holds all 53 indexed papers, so most PMIDs you want are
already there; if one isn't, the browser console tells you which, and you add a
block:

```js
{
  title: "Full article title",
  authors: "Fettiplace MR, Coauthor A",
  journal: "Br J Anaesth",
  year: 2026,
  detail: "136(5):1625-1633",
  pmid: "41748337",
  doi: "10.1016/j.bja.2026.01.029",
  areas: ["pharmacovigilance"],
  type: "research"
}
```

### The text

All prose lives directly in `index.html` under each `<section>`, in first person.
Edit it like a document — nothing is generated.

### The look

Every color is a CSS custom property at the top of `style.css`. The page is
near-monochrome with a single accent; changing `--accent` (and its dark-mode
counterpart) re-skins the whole site, figures excluded — the SVGs carry their own
copy of the accent, so update `#1c4f7c` / `#6fa8d6` in each file's `<style>` block
to match.

## Design notes

- **Type:** system sans throughout — no web fonts, so no external requests and no
  layout shift.
- **Theme:** follows the operating system. There is no toggle: it was removed so
  the SVGs, which read the OS setting directly, can never disagree with the page.
- **Accessibility:** skip link, semantic sections, `aria-current` on the active
  nav item, visible focus rings, and a full descriptive `alt` on every figure —
  the forest plot's alt text reads out all eight values.
- **Print:** prints cleanly with navigation hidden.

## Publishing

### GitHub Pages

```bash
cd fettiplace-lab-site
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
`.nojekyll` is already present.

For `fettiplace.net`, add the domain under Settings → Pages, create a `CNAME`
file containing just the domain, and point a DNS record at GitHub.

### Anything else

Netlify, Cloudflare Pages, university hosting, or an S3 bucket — drag the folder
in. There is nothing to compile.

### Local preview

```bash
cd fettiplace-lab-site
python3 -m http.server 8000   # then visit http://localhost:8000
```

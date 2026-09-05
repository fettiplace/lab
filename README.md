# michael@fettiplace.net — personal research site

One scrollable page. Plain HTML, one stylesheet, one script, one data file.
No framework, no build step, no external requests, no analytics. Open
`index.html` in a browser and it works, including straight off the filesystem.

```
fettiplace-lab-site/
├── index.html               ← all the content
├── data/publications.js     ← citation records
├── assets/css/style.css
├── assets/js/site.js
├── assets/img/
│   ├── portrait.jpg
│   ├── area-*.svg           ← schematic artwork for sections 04–05
│   └── projects/            ← your figures for sections 01–03
├── .nojekyll
└── README.md
```

## Page structure

Hero → intro → numbered index of the five research areas → the five sections →
contact. Every index entry and every nav item is an anchor link to a section
below; the nav highlights whichever section you're reading.

1. Local anesthetic pharmacovigilance — *VigiBase cardiac arrest forest plot*
2. Toxicity & dosing recommendations — *bupivacaine/ropivacaine dosing curves*
3. Artificial intelligence in publishing — *AI disclosure infographic*
4. Retrospective cohort studies — schematic artwork
5. Lipid resuscitation science — schematic artwork

No publication counts anywhere. The full list is two links in the contact
section (PubMed, Google Scholar); each section carries a single key paper.

## Editing

### Change a section's key paper

In `index.html`, each section ends with a line like:

```html
<div data-flagship="40877109"></div>
```

That number is a PMID. Change it to any PMID present in `data/publications.js`
and the citation, links and formatting update automatically.

`data/publications.js` currently holds all 53 indexed papers, so most PMIDs you
would want are already there. To use one that isn't, add a block:

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

### Change the text

All prose lives directly in `index.html` under each `<section>`. It reads in
first person. Edit it like a document — nothing is generated.

### Swap or add a figure

Sections 01–03 use your figures at `assets/img/projects/`. Sections 04 and 05
still use schematic SVG artwork. To put a real figure in one of those, replace:

```html
<figure class="figure figure--art">
  <img src="assets/img/area-cohorts.svg" alt="" width="600" height="240" loading="lazy">
</figure>
```

with the pattern used in section 01:

```html
<figure class="figure figure--plate">
  <a href="assets/img/projects/cohorts.jpg">
    <img src="assets/img/projects/cohorts.jpg" alt="describe what the figure shows"
         width="1200" height="900" loading="lazy">
  </a>
  <figcaption>Caption. From <a href="https://doi.org/…">Author et al., <em>Journal</em> Year</a>.</figcaption>
</figure>
```

Send figures at their original resolution — I resize them to ~1000–1200px wide
and set the `width`/`height` attributes so the page doesn't jump while loading.
Figures in `figure--plate` are clickable and open full size.

**Portrait:** the headshot supplied was 190×266, upscaled to 380×506 for retina
displays. If you have the original at higher resolution it will look sharper —
replace `assets/img/portrait.jpg` and keep a 3:4 aspect ratio.

## Design notes

- **Type:** old-style serif for headings (Iowan Old Style → Palatino → Georgia),
  system sans for body. No web fonts, so no external requests and no layout shift.
- **Theme:** follows the reader's OS light/dark setting, with a manual toggle in
  the header that persists per browser. Every color is a CSS custom property at
  the top of `style.css` — change `--accent` and the five `--area-*` values to
  re-skin the page.
- **Accessibility:** skip link, semantic sections, `aria-current` on the active
  nav item, visible focus rings, descriptive alt text on every figure.
- **Print:** the whole page prints cleanly with navigation and buttons hidden.

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

For `fettiplace.net` (or a subdomain), add it under Settings → Pages and create
a `CNAME` file containing just the domain, then point a DNS record at GitHub.

### Anything else

Netlify, Cloudflare Pages, university hosting, or an S3 bucket — drag the folder
in. There is nothing to compile.

### Local preview

```bash
cd fettiplace-lab-site
python3 -m http.server 8000   # then visit http://localhost:8000
```

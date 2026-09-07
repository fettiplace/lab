#!/usr/bin/env python3
"""Regenerate the four section SVGs in assets/img/.

Optional. The .svg files it produces are plain, editable SVG — you can change
them by hand instead and never run this. Usage:  python3 tools-generate-figures.py
"""
import math, pathlib

OUT = pathlib.Path(__file__).resolve().parent / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)

STYLE = """  <style>
    .ink    { fill: #17191c; }
    .muted  { fill: #767c85; }
    .rule   { stroke: #e0dfda; stroke-width: 1; fill: none; }
    .hair   { stroke: #c9c8c3; stroke-width: 1; fill: none; }
    .mark   { fill: #1c4f7c; }
    .stroke { stroke: #1c4f7c; fill: none; }
    .soft   { fill: #1c4f7c; fill-opacity: .12; }
    .t      { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .lbl    { font-size: 13px; }
    .val    { font-size: 12px; font-variant-numeric: tabular-nums; }
    .ax     { font-size: 11px; }
    .cap    { font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; }
    @media (prefers-color-scheme: dark) {
      .ink    { fill: #e9e8e4; }
      .muted  { fill: #8d939b; }
      .rule   { stroke: #2a2e33; }
      .hair   { stroke: #3c4147; }
      .mark   { fill: #6fa8d6; }
      .stroke { stroke: #6fa8d6; }
      .soft   { fill: #6fa8d6; fill-opacity: .16; }
    }
  </style>
"""

def svg(w, h, body, label):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}" role="img" aria-label="{label}">\n'
            + STYLE + body + "</svg>\n")


# ---------------------------------------------------------------- 1. forest plot
def forest():
    W, H = 780, 380
    L, R = 286.0, 760.0
    LO, HI = 0.15, 2.5
    lo, hi = math.log10(LO), math.log10(HI)
    def x(v): return L + (math.log10(v) - lo) / (hi - lo) * (R - L)

    rows = [
        ("Reversal agents",  2.00, 1.75, 2.28),
        ("Paralytics",       1.37, 1.26, 1.50),
        ("Volatile agents",  1.25, 1.11, 1.41),
        ("IV anesthetics",   0.90, 0.83, 0.96),
        ("Amide-linked LAs", 0.64, 0.59, 0.69),
        ("Ester-linked LAs", 0.41, 0.27, 0.61),
        ("Opioids",          0.33, 0.31, 0.36),
        ("Anti-emetics",     0.19, 0.18, 0.21),
    ]
    y0, step = 56, 34
    axis_y = y0 + step * (len(rows) - 1) + 22

    b = []
    # null line
    b.append(f'  <path class="hair" d="M{x(1):.1f} 34 V{axis_y - 4:.0f}" stroke-dasharray="4 4"/>')
    b.append(f'  <text class="t ax muted" x="{x(1):.1f}" y="28" text-anchor="middle">no signal</text>')

    for i, (name, est, lo_ci, hi_ci) in enumerate(rows):
        y = y0 + i * step
        xe, xl, xh = x(est), x(lo_ci), x(hi_ci)
        b.append(f'  <g>')
        b.append(f'    <text class="t lbl ink" x="4" y="{y + 4}">{name}</text>')
        ci = f"{est:.2f} ({lo_ci:.2f}–{hi_ci:.2f})"
        b.append(f'    <text class="t val muted" x="270" y="{y + 4}" text-anchor="end">{ci}</text>')
        b.append(f'    <path class="stroke" stroke-width="2" stroke-linecap="round" d="M{xl:.1f} {y} H{xh:.1f}"/>')
        b.append(f'    <path class="stroke" stroke-width="1.5" d="M{xl:.1f} {y - 4} V{y + 4} M{xh:.1f} {y - 4} V{y + 4}"/>')
        b.append(f'    <circle class="mark" cx="{xe:.1f}" cy="{y}" r="4.5"/>')
        b.append(f'  </g>')

    # axis
    b.append(f'  <path class="rule" d="M{L} {axis_y} H{R}"/>')
    for t in (0.2, 0.5, 1, 2):
        xt = x(t)
        lab = str(t) if t != 1 else "1.0"
        b.append(f'  <path class="rule" d="M{xt:.1f} {axis_y} V{axis_y + 5}"/>')
        b.append(f'  <text class="t ax muted" x="{xt:.1f}" y="{axis_y + 19}" text-anchor="middle">{lab}</text>')
    b.append(f'  <text class="t cap muted" x="{L}" y="{axis_y + 42}">Reporting odds ratio of cardiac arrest (95% CI)</text>')
    return svg(W, H, "\n".join(b) + "\n",
               "Forest plot: reporting odds ratio of cardiac arrest by anesthetic drug class. "
               "Reversal agents 2.00, paralytics 1.37 and volatile agents 1.25 sit above 1.0; "
               "IV anesthetics 0.90, amide-linked local anesthetics 0.64, ester-linked local "
               "anesthetics 0.41, opioids 0.33 and anti-emetics 0.19 sit below.")


# ------------------------------------------------------- 2. cumulative dose curves
def dosing():
    W, H = 780, 380
    L, R, T, B = 62, 748, 40, 306
    TMAX = 24.0

    def px(t): return L + t / TMAX * (R - L)
    def py(d): return B - d / 260.0 * (B - T)      # y axis 0-260 mg

    def curve(dmax, k, n=90):
        pts = [(px(TMAX * i / n), py(dmax * (1 - math.exp(-k * TMAX * i / n)))) for i in range(n + 1)]
        return pts

    def path(pts, close_to=None):
        d = "M" + " L".join(f"{a:.1f} {b:.1f}" for a, b in pts)
        if close_to is not None:
            d += " L" + " L".join(f"{a:.1f} {b:.1f}" for a, b in reversed(close_to)) + " Z"
        return d

    upper = curve(232, 0.115)
    lower = curve(150, 0.105)
    mid   = curve(190, 0.11)

    b = []
    # grid
    for d in (65, 130, 195, 260):
        b.append(f'  <path class="rule" d="M{L} {py(d):.1f} H{R}" opacity=".7"/>')
        b.append(f'  <text class="t ax muted" x="{L - 8}" y="{py(d) + 4:.1f}" text-anchor="end">{d}</text>')
    # threshold
    b.append(f'  <path class="hair" stroke-dasharray="5 5" d="M{L} {py(200):.1f} H{R}"/>')
    b.append(f'  <text class="t ax muted" x="{R}" y="{py(200) - 9:.1f}" text-anchor="end">conventional 24-h ceiling</text>')
    # band + line
    b.append(f'  <path class="soft" d="{path(upper, lower)}"/>')
    b.append(f'  <path class="stroke" stroke-width="2" stroke-linecap="round" d="{path(mid)}"/>')
    # dosing events
    for t in (0, 6, 12, 18):
        b.append(f'  <path class="hair" d="M{px(t):.1f} {B} V{B + 6:.0f}"/>')
    # axes
    b.append(f'  <path class="rule" d="M{L} {B} H{R}"/>')
    for t in (0, 6, 12, 18, 24):
        b.append(f'  <text class="t ax muted" x="{px(t):.1f}" y="{B + 22:.0f}" text-anchor="middle">{t}</text>')
    b.append(f'  <text class="t cap muted" x="{L}" y="{B + 48:.0f}">Hours after first dose</text>')
    b.append(f'  <text class="t cap muted" x="{L - 46}" y="{T - 14}" transform="rotate(-90 {L - 46} {T - 14})">Cumulative dose (mg)</text>')
    # legend
    b.append(f'  <g>')
    b.append(f'    <path class="stroke" stroke-width="2" d="M{R - 250} 26 h18"/>')
    b.append(f'    <text class="t ax muted" x="{R - 226}" y="30">modelled accumulation</text>')
    b.append(f'    <rect class="soft" x="{R - 96}" y="21" width="18" height="10" rx="2"/>')
    b.append(f'    <text class="t ax muted" x="{R - 72}" y="30">plausible range</text>')
    b.append(f'  </g>')
    return svg(W, H, "\n".join(b) + "\n",
               "Schematic: cumulative local anesthetic dose from a continuous catheter accumulates "
               "over 24 hours toward the conventional single-injection ceiling, with a shaded band "
               "showing the plausible range across elimination rates.")


# ------------------------------------------------------ 3. AI disclosure framework
def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def ai():
    W = 780
    rows = [
        ("Where", "Online submission system, and again in the methods"),
        ("What",  "Software model and version \u00b7 publisher and location \u00b7 date used"),
    ]
    details = [
        "Writing & translation", "Hypothesis generation", "Background research",
        "Data analysis & interpretation", "Methods development", "Audio / video generation",
        "Table & figure generation", "Reference identification", "Ethical concerns of use",
    ]
    LABX, COLX = 0, 150
    b = ['  <text class="t cap muted" x="0" y="12">What must be declared</text>']
    y = 44
    for title, sub in rows:
        b.append(f'  <path class="rule" d="M0 {y - 20} H{W}"/>')
        b.append(f'  <text class="t ink" style="font-size:17px;font-weight:600" x="{LABX}" y="{y + 4}">{esc(title)}</text>')
        b.append(f'  <text class="t lbl muted" x="{COLX}" y="{y + 4}">{esc(sub)}</text>')
        y += 46

    b.append(f'  <path class="rule" d="M0 {y - 20} H{W}"/>')
    b.append(f'  <text class="t ink" style="font-size:17px;font-weight:600" x="{LABX}" y="{y + 4}">Detail</text>')
    b.append(f'  <text class="t lbl muted" x="{COLX}" y="{y + 4}">For each of these uses</text>')
    y += 34

    cols, colw, rowh = 3, 210, 28
    for i, d in enumerate(details):
        cx = COLX + (i % cols) * colw
        cy = y + (i // cols) * rowh
        b.append(f'  <circle class="mark" cx="{cx + 3}" cy="{cy - 4}" r="3"/>')
        b.append(f'  <text class="t lbl ink" x="{cx + 15}" y="{cy}">{esc(d)}</text>')
    yend = y + 3 * rowh - 8

    b.append(f'  <path class="rule" d="M0 {yend} H{W}"/>')
    b.append(f'  <text class="t ax muted" x="0" y="{yend + 22}">Responsibility for verifying every AI-assisted claim stays with the human author.</text>')
    return svg(W, yend + 34, "\n".join(b) + "\n",
               "Disclosure framework for AI use in scientific writing: where to declare it "
               "(submission system and methods), what to declare (software model and version, "
               "publisher and location, date used), and the nine categories of use requiring detail.")


# ------------------------------------------------- 5. meta-analysis of efficacy
def lipid():
    W, H = 780, 360
    L, R = 300.0, 748.0
    LO, HI = 0.12, 8.0
    lo, hi = math.log10(LO), math.log10(HI)
    def x(v): return L + (math.log10(v) - lo) / (hi - lo) * (R - L)

    studies = [
        ("Model A", 2.6, 1.10, 6.2, 3.0),
        ("Model B", 1.7, 0.72, 4.0, 2.4),
        ("Model C", 3.4, 1.40, 8.0, 2.6),
        ("Model D", 1.2, 0.45, 3.2, 2.0),
        ("Model E", 2.1, 0.95, 4.7, 2.8),
    ]
    y0, step = 62, 30
    b = []
    b.append(f'  <text class="t cap muted" x="0" y="24">Pooled effect across studies</text>')
    b.append(f'  <path class="hair" stroke-dasharray="4 4" d="M{x(1):.1f} 40 V270"/>')

    for i, (name, est, lo_ci, hi_ci, wt) in enumerate(studies):
        y = y0 + i * step
        b.append(f'  <text class="t lbl muted" x="0" y="{y + 4}">{name}</text>')
        b.append(f'  <path class="stroke" stroke-width="1.5" stroke-linecap="round" opacity=".65" d="M{x(lo_ci):.1f} {y} H{x(hi_ci):.1f}"/>')
        b.append(f'  <rect class="mark" opacity=".7" x="{x(est) - wt:.1f}" y="{y - wt:.1f}" width="{2 * wt:.1f}" height="{2 * wt:.1f}"/>')

    # pooled diamond
    yd = y0 + len(studies) * step + 16
    xe, xl, xh = x(2.15), x(1.35), x(3.4)
    b.append(f'  <text class="t lbl ink" x="0" y="{yd + 4}" style="font-weight:600">Pooled estimate</text>')
    b.append(f'  <path class="mark" d="M{xl:.1f} {yd} L{xe:.1f} {yd - 9} L{xh:.1f} {yd} L{xe:.1f} {yd + 9} Z"/>')

    ay = yd + 34
    b.append(f'  <path class="rule" d="M{L} {ay} H{R}"/>')
    for t in (0.25, 1, 4):
        xt = x(t)
        b.append(f'  <path class="rule" d="M{xt:.1f} {ay} V{ay + 5}"/>')
        b.append(f'  <text class="t ax muted" x="{xt:.1f}" y="{ay + 19}" text-anchor="middle">{t}</text>')
    b.append(f'  <text class="t ax muted" x="{x(1) - 12:.1f}" y="{ay + 40}" text-anchor="end">← no benefit</text>')
    b.append(f'  <text class="t ax muted" x="{x(1) + 12:.1f}" y="{ay + 40}">favours lipid emulsion →</text>')
    return svg(W, ay + 56, "\n".join(b) + "\n",
               "Schematic forest plot of a meta-analysis: individual study estimates with confidence "
               "intervals, sized by weight, summarised by a pooled diamond favouring lipid emulsion "
               "but with an interval that crosses close to no effect.")


for name, fn in [("fig-pharmacovigilance", forest), ("fig-dosing", dosing),
                 ("fig-ai", ai), ("fig-lipid", lipid)]:
    p = OUT / f"{name}.svg"
    p.write_text(fn(), encoding="utf-8")
    print("wrote", p, p.stat().st_size, "bytes")

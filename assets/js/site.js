/* ===========================================================================
   Single-page site behaviour. No dependencies, no build step.
   - Renders one flagship citation per section from data/publications.js
   - Highlights the nav link for the section you're reading
   - Light/dark toggle (remembered per browser)
   =========================================================================== */

(function () {
  "use strict";

  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  /* --- theme ------------------------------------------------------------ */
  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem("mf-theme"); } catch (e) { /* private mode */ }
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;

    function isDark() {
      var explicit = document.documentElement.getAttribute("data-theme");
      return explicit ? explicit === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    function sync() {
      var dark = isDark();
      btn.textContent = dark ? "Light" : "Dark";
      btn.setAttribute("aria-label", "Switch to " + (dark ? "light" : "dark") + " theme");
    }
    sync();
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("mf-theme", next); } catch (e) { /* ignore */ }
      sync();
    });
  }

  /* --- flagship citations ------------------------------------------------ *
   * Mark a spot in the HTML with  <div data-flagship="PMID"></div>          *
   * and the matching entry in data/publications.js is rendered there.       */
  function initFlagships() {
    var pubs = window.PUBLICATIONS || [];
    document.querySelectorAll("[data-flagship]").forEach(function (el) {
      var pmid = el.dataset.flagship;
      var p = pubs.filter(function (x) { return x.pmid === pmid; })[0];
      if (!p) { el.remove(); return; }

      var href = p.doi ? "https://doi.org/" + p.doi
                       : "https://pubmed.ncbi.nlm.nih.gov/" + p.pmid + "/";

      el.className = "flagship";
      el.innerHTML =
        '<p class="flagship__label">Key paper</p>' +
        '<h3 class="flagship__title"><a href="' + esc(href) + '" rel="noopener">' +
          esc(p.title) + "</a></h3>" +
        '<p class="flagship__meta">' + esc(p.authors) + "<br>" +
          "<em>" + esc(p.journal) + "</em> " + esc(p.year) +
          (p.detail ? "; " + esc(p.detail) : "") + "</p>" +
        '<div class="flagship__links">' +
          (p.doi ? '<a href="https://doi.org/' + esc(p.doi) + '" rel="noopener">Full text</a>' : "") +
          '<a href="https://pubmed.ncbi.nlm.nih.gov/' + esc(p.pmid) + '/" rel="noopener">PubMed</a>' +
        "</div>";
    });
  }

  /* --- scroll spy -------------------------------------------------------- *
   * Marks the nav link for whichever section currently sits under the       *
   * header. Uses the last section whose top has passed the header line, so  *
   * the highlight always matches the heading you are reading.               */
  function initScrollSpy() {
    var nav = document.getElementById("section-nav");
    if (!nav) return;

    var links = [];
    nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (el) links.push({ a: a, el: el });
    });
    if (!links.length) return;

    var ticking = false;
    function update() {
      ticking = false;
      var line = (parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue("--header-h")) || 60) + 24;
      var current = null;
      links.forEach(function (l) {
        if (l.el.getBoundingClientRect().top <= line) current = l;
      });
      // at the very bottom of the page, the final section wins
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = links[links.length - 1];
      }
      links.forEach(function (l) {
        if (l === current) l.a.setAttribute("aria-current", "true");
        else l.a.removeAttribute("aria-current");
      });
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  function boot() {
    initTheme();
    initFlagships();
    initScrollSpy();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

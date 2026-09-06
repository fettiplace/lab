/* ===========================================================================
   Single-page site behaviour. No dependencies, no build step.
   - Renders each section's publication list from data/publications.js
   - Highlights the nav link for the section you're reading
   Theme follows the operating system; there is no toggle.
   =========================================================================== */

(function () {
  "use strict";

  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  /* --- publication lists ------------------------------------------------- *
   * Mark a spot in the HTML with                                            *
   *   <ol class="pubs" data-pubs="40877109,42527294,40691088"></ol>         *
   * and those PMIDs are rendered there, newest first. PMIDs are looked up   *
   * in data/publications.js.                                                */
  function initPubs() {
    var pubs = window.PUBLICATIONS || [];
    var byPmid = {};
    pubs.forEach(function (p) { byPmid[p.pmid] = p; });

    document.querySelectorAll("[data-pubs]").forEach(function (el) {
      var ids = el.dataset.pubs.split(",").map(function (s) { return s.trim(); });
      var missing = ids.filter(function (id) { return !byPmid[id]; });
      if (missing.length && window.console) {
        console.warn("publications.js has no entry for PMID " + missing.join(", "));
      }

      var list = ids.map(function (id) { return byPmid[id]; }).filter(Boolean);
      list.sort(function (a, b) {
        if (b.year !== a.year) return b.year - a.year;
        return String(a.title).localeCompare(String(b.title));
      });

      el.innerHTML = list.map(function (p) {
        var doi = "https://doi.org/" + p.doi;
        var pm = "https://pubmed.ncbi.nlm.nih.gov/" + p.pmid + "/";
        return "<li>" +
          '<h3 class="pub__title"><a href="' + esc(p.doi ? doi : pm) + '" rel="noopener">' +
            esc(p.title) + "</a></h3>" +
          '<p class="pub__meta">' +
            esc(p.authors) +
            '<span class="sep">·</span>' +
            "<em>" + esc(p.journal) + "</em> " + esc(p.year) +
            (p.detail ? "; " + esc(p.detail) : "") +
            '<span class="sep">·</span>' +
            '<a href="' + esc(pm) + '" rel="noopener">PubMed</a>' +
            (p.doi ? '<span class="sep">·</span><a href="' + esc(doi) + '" rel="noopener">Full text</a>' : "") +
          "</p>" +
        "</li>";
      }).join("");
    });
  }

  /* --- scroll spy -------------------------------------------------------- *
   * Marks the nav link for whichever section sits under the header. Uses the *
   * last section whose top has passed the header line.                      */
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
        .getPropertyValue("--header-h")) || 58) + 24;
      var current = null;
      links.forEach(function (l) {
        if (l.el.getBoundingClientRect().top <= line) current = l;
      });
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
    initPubs();
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

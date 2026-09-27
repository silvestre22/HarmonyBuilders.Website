/* Harmony Builders Sdn Bhd — site interactions */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");
  var header = document.querySelector(".site-header");
  var body = document.body;

  /* Header style on scroll */
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  function setNav(open) {
    body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setNav(!body.classList.contains("nav-open"));
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setNav(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });

  /* Highlight the nav link for the section in view */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]:not(.btn)'));
  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (l) {
      var target = document.querySelector(l.getAttribute("href"));
      if (target) sectionObserver.observe(target);
    });
  }

  /* Reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el, i) {
      // small stagger for items that share a parent
      var siblings = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [];
      var idx = Array.prototype.indexOf.call(siblings, el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx, 6) * 80 + "ms";
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Generic filter helper for portfolio and properties */
  function setupFilter(buttonSelector, itemSelector, buttonAttr, itemAttr) {
    var buttons = document.querySelectorAll(buttonSelector);
    var items = document.querySelectorAll(itemSelector);
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var value = btn.getAttribute(buttonAttr);
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("active", on);
          b.setAttribute("aria-selected", String(on));
        });
        items.forEach(function (item) {
          var match = value === "all" || item.getAttribute(itemAttr) === value;
          item.classList.toggle("is-hidden", !match);
          if (match) item.classList.add("visible");
        });
      });
    });
  }
  setupFilter(".filter", ".gallery-item", "data-filter", "data-cat");
  setupFilter(".tab", ".property-card", "data-tab", "data-type");

  /* Before / after comparison slider */
  document.querySelectorAll(".compare-inner").forEach(function (box) {
    var range = box.querySelector(".compare-range");
    function update() { box.style.setProperty("--pos", range.value + "%"); }
    range.addEventListener("input", update);
    update();
  });

  /* Hide images that fail to load so the branded background shows instead */
  document.querySelectorAll("img").forEach(function (img) {
    function fail() { img.classList.add("img-failed"); }
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fail();
    img.addEventListener("error", fail);
  });

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

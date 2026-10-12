/* Behaviour for the AQ Energy migration test page. Replaces what Elementor,
   Swiper and Elementor Pro did on the WordPress page: sticky header effects,
   dropdowns and mega menu, carousels, the logo marquee, FAQ tabs and the
   mobile menu. No dependencies. */
(function () {
  "use strict";

  var mq = {
    mobile: window.matchMedia("(max-width: 767px)"),
    tablet: window.matchMedia("(max-width: 1024px)"),
  };

  /* ---------- sticky header shrink (Elementor sticky_effects_offset: 120) ---------- */
  var hdr = document.getElementById("hdr");
  function onScroll() {
    hdr.classList.toggle("is-stuck", window.scrollY > 120);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Resources dropdown (hover via CSS, click for touch/keyboard) ---------- */
  document.querySelectorAll(".has-sub").forEach(function (li) {
    var btn = li.querySelector(".sub-toggle");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = li.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
    });
  });

  /* ---------- mega menus ---------- */
  var panels = {
    solutions: document.getElementById("mm-solutions"),
    products: document.getElementById("mm-products"),
  };
  var closeTimer;
  function openMenu(name) {
    clearTimeout(closeTimer);
    Object.keys(panels).forEach(function (k) {
      var on = k === name;
      panels[k].hidden = !on;
      var item = document.querySelector('.mm-item[data-mm="' + k + '"]');
      item.classList.toggle("is-open", on);
      item.querySelectorAll("[aria-expanded]").forEach(function (b) { b.setAttribute("aria-expanded", on); });
    });
  }
  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () { openMenu(null); }, 200);
  }
  document.querySelectorAll(".mm-item").forEach(function (item) {
    var name = item.dataset.mm;
    item.addEventListener("mouseenter", function () { openMenu(name); });
    item.addEventListener("mouseleave", scheduleClose);
    item.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        if (panels[name].hidden) openMenu(name); else openMenu(null);
      });
    });
  });
  Object.keys(panels).forEach(function (k) {
    panels[k].addEventListener("mouseenter", function () { clearTimeout(closeTimer); });
    panels[k].addEventListener("mouseleave", scheduleClose);
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".mega, .mega-products, .mm-item")) openMenu(null);
    if (!e.target.closest(".has-sub")) {
      document.querySelectorAll(".has-sub.is-open").forEach(function (li) {
        li.classList.remove("is-open");
        li.querySelector(".sub-toggle").setAttribute("aria-expanded", "false");
      });
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { openMenu(null); closeMobileNav(); }
  });

  // Mega menu tabs (Commercial & Industrial / Residential)
  document.querySelectorAll(".mega-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var i = tab.dataset.tab;
      document.querySelectorAll(".mega-tab").forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on);
      });
      document.querySelectorAll(".mega-panel").forEach(function (p) {
        p.classList.toggle("is-active", p.dataset.panel === i);
      });
    });
  });

  /* ---------- mobile menu ---------- */
  var mnav = document.getElementById("mnav");
  function closeMobileNav() {
    if (mnav.hidden) return;
    mnav.hidden = true;
    document.body.style.overflow = "";
  }
  document.getElementById("burgerBtn").addEventListener("click", function () {
    mnav.hidden = false;
    document.body.style.overflow = "hidden";
  });
  document.getElementById("mnavClose").addEventListener("click", closeMobileNav);

  /* ---------- carousels (Swiper replacement) ----------
     Infinite loop by cloning one view's worth of slides at each end, then
     jumping back without animation when the track reaches a clone. */
  function Slider(root) {
    var track = root.querySelector(".sl-track");
    var vp = root.querySelector(".sl-vp");
    var originals = Array.prototype.slice.call(track.children);
    var n = originals.length;
    var speed = +root.dataset.speed || 600;
    var autoplay = +root.dataset.autoplay || 0;
    var dotsEl = root.querySelector(".sl-dots");
    var pv = 1, idx = 0, logical = 0, timer = null, moving = false, hovering = false;

    if (root.dataset.gap) root.style.setProperty("--gap", root.dataset.gap + "px");

    function perView() {
      if (mq.mobile.matches && root.dataset.perM) return +root.dataset.perM;
      if (mq.tablet.matches && root.dataset.perT) return +root.dataset.perT;
      return +root.dataset.per || 1;
    }
    function gapPx() {
      return parseFloat(getComputedStyle(track).columnGap) || 0;
    }
    function step() {
      return track.children[0].getBoundingClientRect().width + gapPx();
    }
    function place(i, animate) {
      idx = i;
      track.style.transition = animate ? "transform " + speed + "ms ease" : "none";
      track.style.transform = "translate3d(" + (-i * step()) + "px,0,0)";
      logical = ((i - pv) % n + n) % n;
      if (dotsEl) {
        Array.prototype.forEach.call(dotsEl.children, function (d, k) {
          d.classList.toggle("is-active", k === logical);
        });
      }
    }
    function build() {
      pv = Math.min(perView(), n);
      root.style.setProperty("--pv", pv);
      track.querySelectorAll(".sl-clone").forEach(function (c) { c.remove(); });
      if (n > 1) {
        var head = originals.slice(-pv).map(clone);
        var tail = originals.slice(0, pv).map(clone);
        head.reverse().forEach(function (c) { track.insertBefore(c, track.firstChild); });
        tail.forEach(function (c) { track.appendChild(c); });
      } else {
        pv = 0;
      }
      place(pv + logical, false);
    }
    function clone(el) {
      var c = el.cloneNode(true);
      c.classList.add("sl-clone");
      c.setAttribute("aria-hidden", "true");
      c.querySelectorAll("a,button").forEach(function (a) { a.tabIndex = -1; });
      return c;
    }
    function go(i) {
      if (moving || n < 2) return;
      moving = true;
      place(i, true);
    }
    track.addEventListener("transitionend", function (e) {
      if (e.target !== track) return;
      moving = false;
      if (idx >= n + pv) place(idx - n, false);
      else if (idx < pv) place(idx + n, false);
    });
    function next() { go(idx + 1); }
    function prev() { go(idx - 1); }

    var nextBtn = root.querySelector(":scope > .sl-next, :scope > * > .sl-next");
    var prevBtn = root.querySelector(":scope > .sl-prev, :scope > * > .sl-prev");
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

    if (dotsEl) {
      for (var k = 0; k < n; k++) {
        var d = document.createElement("button");
        d.type = "button";
        d.setAttribute("aria-label", "Go to slide " + (k + 1));
        (function (k) {
          d.addEventListener("click", function () { go(pv + k); restart(); });
        })(k);
        dotsEl.appendChild(d);
      }
    }

    // Swipe
    var x0 = null;
    vp.addEventListener("pointerdown", function (e) { x0 = e.clientX; }, { passive: true });
    vp.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) { if (dx < 0) next(); else prev(); restart(); }
    });

    function start() {
      if (!autoplay || timer) return;
      timer = setInterval(function () { if (!hovering && !document.hidden) next(); }, autoplay);
    }
    function restart() {
      clearInterval(timer); timer = null; start();
    }
    root.addEventListener("mouseenter", function () { hovering = true; });
    root.addEventListener("mouseleave", function () { hovering = false; });

    build();
    start();
    var lastPv = pv;
    window.addEventListener("resize", function () {
      if (perView() !== lastPv) { lastPv = perView(); build(); }
      else place(idx, false);
    });
  }
  document.querySelectorAll(".slider").forEach(function (el) { new Slider(el); });

  /* ---------- scroll parallax (Elementor Motion Effects: translateY) ----------
     Live settings: speed 1 on the photos, 1.5 on the glass cards, affected
     range 25%-75% of the element's trip through the viewport, desktop and
     tablet only. Measured on the live page, the drift is 25px per unit of
     speed either side of centre. */
  var mfx = Array.prototype.slice.call(document.querySelectorAll("[data-mfx]"));
  var mfxQueued = false;
  function runMfx() {
    mfxQueued = false;
    var vh = window.innerHeight;
    mfx.forEach(function (el) {
      if (mq.mobile.matches) { el.style.transform = ""; return; }
      el.style.transform = "";
      var r = el.getBoundingClientRect();
      var passed = (vh - r.top) / (vh + r.height) * 100;
      var p = Math.min(Math.max(passed, 25), 75);
      var t = (p - 25) / 50 * 100;
      var y = (50 - t) / 2 * parseFloat(el.dataset.mfx);
      el.style.transform = "translateY(" + y.toFixed(2) + "px)";
    });
  }
  function queueMfx() { if (!mfxQueued) { mfxQueued = true; requestAnimationFrame(runMfx); } }
  window.addEventListener("scroll", queueMfx, { passive: true });
  window.addEventListener("resize", queueMfx);
  runMfx();

  /* ---------- logo marquee ----------
     The live page runs a Swiper with linear easing, autoplay delay 0 and
     speed 5000, i.e. one logo every 5s at constant velocity. Duplicating the
     row and translating it by half reproduces that loop. */
  document.querySelectorAll(".marquee").forEach(function (m) {
    var track = m.querySelector(".mq-track");
    var count = track.children.length;
    Array.prototype.slice.call(track.children).forEach(function (img) {
      var c = img.cloneNode(true);
      c.alt = "";
      c.setAttribute("aria-hidden", "true");
      track.appendChild(c);
    });
    function size() {
      var show = +(mq.tablet.matches && !mq.mobile.matches && m.dataset.showT ? m.dataset.showT : m.dataset.show);
      var gap = +(mq.tablet.matches && !mq.mobile.matches && m.dataset.gapT ? m.dataset.gapT : m.dataset.gap);
      var w = (m.clientWidth - gap * (show - 1)) / show;
      m.style.setProperty("--mq-w", w + "px");
      m.style.setProperty("--mq-gap", gap + "px");
      m.style.setProperty("--mq-dur", count * 5 + "s");
    }
    size();
    window.addEventListener("resize", size);
  });

  /* ---------- FAQ tabs (desktop) / accordion (mobile) ---------- */
  var faqBtns = document.querySelectorAll(".faq-btn");
  faqBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var wasActive = btn.classList.contains("is-active");
      faqBtns.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
        document.getElementById(b.getAttribute("aria-controls")).classList.remove("is-active");
      });
      // On mobile a second tap closes the open answer, like the Elementor accordion.
      if (wasActive && mq.mobile.matches) return;
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      panel.classList.add("is-active");
    });
  });

  /* ---------- footer form: no backend in this test build ---------- */
  var form = document.getElementById("ftForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("ftNote").hidden = false;
  });
})();

/* ============================================================================
   REVEAL.JS  —  THINGS FADE UP AS YOU SCROLL TO THEM
   ============================================================================

   You do not need to edit this file.

   To change how the fade LOOKS, open theme.css and find the block called
   "THE SCROLL FADE". Everything is controlled from there:

       --reveal-distance   how far things slide up as they fade in
       --reveal-speed      how long the fade takes
       --reveal-stagger    the tiny delay between one item and the next
       --reveal-start      how far up the screen an item is before it fades in

   TO TURN THE WHOLE THING OFF: set --reveal-speed to 0s in theme.css.

   ----------------------------------------------------------------------------
   Two things worth knowing, in case you ever wonder why it behaves this way:

   1. The hiding is done by JavaScript, not by the stylesheet. That means if
      JavaScript ever fails to run, your page shows up perfectly normally
      instead of being invisible. There is also a failsafe below: after three
      seconds, anything still hidden is shown regardless.

   2. Anyone who has "reduce motion" switched on in their computer's
      accessibility settings sees the page appear normally, with no animation.
      That is deliberate — motion makes some people ill.
   ============================================================================ */

(function () {
  "use strict";

  /* Which things fade in. Each line is one kind of element on the page.
     Add or remove lines freely — anything not listed simply appears at once. */
  var THINGS = [
    /* --- the top of the homepage --- */
    ".hero__eyebrow",
    ".hero__title",
    ".hero__lede",
    ".hero__image",
    ".hero__metaItem",

    /* --- every section heading, and the line under it --- */
    ".sectionHead",
    ".section__lede",

    /* --- the showreel at the top of the page (the whole block, once) --- */
    ".hero__reel",

    /* --- about, contact, and the "read more" links --- */
    ".about__photo",
    ".about__text",
    ".contact__lede",
    ".contact__email",
    ".contact__links",
    ".sectionMore",

    /* --- the olive bar at the very bottom --- */
    ".footer__inner",

    /* --- story pages --- */
    ".storyHead__label",
    ".storyHead__title",
    ".storyHead__standfirst",
    ".storyHead__meta",
    ".story__hero",
    ".story__h",
    ".story__p",
    ".story__list",
    ".story__quote",
    ".story__stats",
    ".story__figure:not(.story__figure--duo)",   /* a side-by-side pair fades as one */
    ".story__duo",
    ".storyNext",
    ".story__back"
  ];

  var HIDDEN = "reveal";
  var SHOWN  = "is-visible";

  /* Someone who asked their computer for less motion gets none of this. */
  var calmRequested = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* An item's stagger position is counted WITHIN its own section, so each
     section starts its little cascade again from the top rather than
     inheriting a number from however much came before it on the page. */
  function groupOf(el) {
    return el.closest(".reelsTrack, .story__duo, section, header, footer, .storyBody") || document.body;
  }

  var observer = null;
  var revealedSoFar = 0;

  function show(el) {
    if (!el.classList.contains(SHOWN)) { revealedSoFar += 1; }
    el.classList.add(SHOWN);
  }

  function watch(el) {
    if (observer) { observer.observe(el); } else { show(el); }
  }

  /* Find anything new on the page that should fade in, hide it, and start
     watching for it to scroll into view. Safe to call as many times as you
     like — anything already handled is skipped. */
  function scan() {
    if (calmRequested) return;

    var found = [];
    THINGS.forEach(function (sel) {
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
        if (!el.classList.contains(HIDDEN)) { el.classList.add(HIDDEN); }
        found.push(el);
      });
    });

    /* Things site.js drew itself (reels, photographs, story rows) already
       carry the class, so pick those up too. */
    Array.prototype.forEach.call(document.querySelectorAll("." + HIDDEN), function (el) {
      if (found.indexOf(el) === -1) found.push(el);
    });

    var counters = [];
    var groups = [];

    found.forEach(function (el) {
      if (el.getAttribute("data-revealing") === "yes") return;
      el.setAttribute("data-revealing", "yes");

      var g = groupOf(el);
      var gi = groups.indexOf(g);
      if (gi === -1) { groups.push(g); counters.push(0); gi = groups.length - 1; }

      /* Cap the cascade at six steps so the last item in a long list is not
         left waiting a noticeable amount of time. */
      el.style.setProperty("--reveal-i", Math.min(counters[gi], 6));
      counters[gi] += 1;

      watch(el);
    });
  }

  if (!calmRequested && "IntersectionObserver" in window) {
    var howEarly = getComputedStyle(document.documentElement)
      .getPropertyValue("--reveal-start").trim() || "12%";

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -" + howEarly + " 0px", threshold: 0.02 });
  }

  scan();

  /* THE BOTTOM OF THE PAGE NEEDS ITS OWN RULE.

     --reveal-start makes something wait until it is a little way up from the
     bottom edge of the screen before it fades in. That works everywhere
     except the very end of the page: the olive footer bar can never rise
     above that line, because there is nothing left to scroll. So once you
     reach the bottom, anything on screen and still hidden is shown. */
  function sweepBottom() {
    var reachedBottom = window.innerHeight + window.pageYOffset >=
      document.documentElement.scrollHeight - 4;
    if (!reachedBottom) return;
    Array.prototype.forEach.call(document.querySelectorAll("." + HIDDEN), function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) show(el);
    });
  }
  if (!calmRequested) {
    window.addEventListener("scroll", sweepBottom, { passive: true });
    window.addEventListener("resize", sweepBottom);
    sweepBottom();
  }

  /* Let the rest of the site ask for another sweep after it redraws
     something (site.js does this when the reels re-shuffle on resize). */
  window.revealScan = scan;

  /* THE FAILSAFE. Nothing on this website is allowed to stay invisible.

     It only fires if the scroll-watching has plainly FAILED — that is, if
     after three seconds it has not revealed a single thing, which would mean
     an unusual browser or a link-preview screenshot rather than a visitor
     who simply has not scrolled yet.

     (The first version of this fired unconditionally, which quietly revealed
     the whole page three seconds after it loaded. Anything you scrolled to
     after that was already showing, so only the first section ever appeared
     to fade. That is what this check fixes.) */
  window.setTimeout(function () {
    if (revealedSoFar > 0) return;          /* it is working, leave it alone */
    Array.prototype.forEach.call(document.querySelectorAll("." + HIDDEN), show);
  }, 3000);

  /* Printing should never hide anything either. */
  window.addEventListener("beforeprint", function () {
    Array.prototype.forEach.call(document.querySelectorAll("." + HIDDEN), show);
  });
})();

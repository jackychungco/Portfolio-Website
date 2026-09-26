/* ============================================================================
   STORY.JS  —  THE ENGINE FOR THE DEEPER PAGES
   ----------------------------------------------------------------------------
   You do NOT need to edit this file. It reads stories.js, works out which
   story you asked for from the address bar, and builds the page.
   ============================================================================ */

(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  var site    = (typeof SITE    !== "undefined" && SITE)    ? SITE    : {};
  var stories = (typeof STORIES !== "undefined" && STORIES) ? STORIES : [];
  var root    = $("#story");

  /* Footer text, same as the homepage */
  [["footerLeft", site.footerLeft], ["footerRight", site.footerRight]].forEach(function (p) {
    $$('[data-site="' + p[0] + '"]').forEach(function (el) { el.textContent = p[1] || ""; });
  });

  /* ---- which story? ---------------------------------------------------- */
  var wanted = new URLSearchParams(window.location.search).get("id");
  var index  = stories.findIndex(function (s) { return s.id === wanted; });
  var story  = index > -1 ? stories[index] : null;

  if (!story) {
    root.innerHTML =
      '<div class="wrap story__missing">' +
        "<h1>Story not found</h1>" +
        "<p>There is no story with the name <code>" + esc(wanted || "(none given)") +
        "</code>. It may have been renamed in stories.js.</p>" +
        (stories.length
          ? "<p>These exist:</p><ul>" + stories.map(function (s) {
              return '<li><a href="story.html?id=' + esc(s.id) + '">' + esc(s.title) + "</a></li>";
            }).join("") + "</ul>"
          : "") +
        '<p><a class="story__back" href="index.html">Back to the homepage</a></p>' +
      "</div>";
    return;
  }

  document.title = story.title + (site.name ? ", " + site.name : "");
  var descTag = document.querySelector('meta[name="description"]');
  if (descTag && story.standfirst) descTag.setAttribute("content", story.standfirst);

  /* ---- blocks ---------------------------------------------------------- */
  /* "2:3" -> "2 / 3". Anything that isn't two plain numbers is ignored. */
  function ratioCSS(text) {
    var m = String(text || "").match(/^\s*(\d{1,5})\s*[:\/]\s*(\d{1,5})\s*$/);
    return m ? m[1] + " / " + m[2] : "";
  }

  /* Giving a picture its shape up front reserves the space before the file
     arrives, so the page does not jump as you scroll. */
  function imageTag(file, cls, ratio, caption) {
    var r = ratioCSS(ratio);
    return '<img class="' + cls + '" src="' + esc(file) + '" alt="' + esc(caption || "") + '" loading="lazy"' +
      (r ? ' style="--img-ratio: ' + r + '"' : "") +
      (caption ? ' data-caption="' + esc(caption) + '"' : "") +
      ' data-zoom="' + esc(file) + '">';
  }

  /* Same link-reading as the home page, kept short. YouTube or Vimeo. */
  function videoOf(url) {
    if (!url || /CHANGE_THIS/.test(url)) return null;
    if (/youtu\.?be/i.test(url)) {
      var y = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/) ||
              url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/) ||
              url.match(/\/shorts\/([A-Za-z0-9_-]{6,})/) ||
              url.match(/\/embed\/([A-Za-z0-9_-]{6,})/);
      return y ? { host: "youtube", id: y[1], hash: "" } : null;
    }
    if (/vimeo\.com/i.test(url)) {
      var clean = url.split("?")[0].replace(/\/+$/, "").split("/");
      var qs = url.split("?")[1] || "";
      var qh = qs.match(/(?:^|&)h=([A-Za-z0-9]+)/);
      var hash = qh ? qh[1] : "";
      for (var i = clean.length - 1; i >= 0; i--) {
        if (/^\d{6,}$/.test(clean[i])) return { host: "vimeo", id: clean[i], hash: hash };
        if (!hash && /^[A-Za-z0-9]{6,}$/.test(clean[i]) && i === clean.length - 1) hash = clean[i];
      }
    }
    return null;
  }

  function playerURL(url) {
    var v = videoOf(url);
    if (!v) return "";
    if (v.host === "youtube") {
      return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.id) +
             "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
    }
    return "https://player.vimeo.com/video/" + encodeURIComponent(v.id) +
           "?autoplay=1&title=0&byline=0&portrait=0&dnt=1" +
           (v.hash ? "&h=" + encodeURIComponent(v.hash) : "");
  }

  function renderBlock(b) {
    if (!b || !b.type) return "";
    switch (b.type) {
      case "text":
        return '<p class="story__p">' + esc(b.body) + "</p>";

      case "heading":
        return '<h2 class="story__h">' + esc(b.text) + "</h2>";

      case "list":
        return '<ul class="story__list">' + (b.items || []).map(function (i) {
          return "<li>" + esc(i) + "</li>";
        }).join("") + "</ul>";

      case "quote":
        return '<blockquote class="story__quote"><p>' + esc(b.text) + "</p>" +
          (b.who ? "<cite>" + esc(b.who) + "</cite>" : "") + "</blockquote>";

      case "stats":
        return '<div class="story__stats">' + (b.items || []).map(function (s) {
          return '<div class="stat"><span class="stat__value">' + esc(s.value) +
            '</span><span class="stat__label">' + esc(s.label) + "</span></div>";
        }).join("") + "</div>";

      case "image":
        return '<figure class="story__figure">' + imageTag(b.file, "story__img", b.ratio, b.caption) +
          (b.caption ? '<figcaption>' + esc(b.caption) + "</figcaption>" : "") + "</figure>";

      /* TWO OR THREE PICTURES SIDE BY SIDE.
         `caption` is the line printed under the whole row.
         `captions` is a list, one per picture, shown when that picture is
         clicked open. Give it either, both, or neither. */
      case "duo":
      case "trio":
        var rowCaps = b.captions || [];
        return '<figure class="story__figure story__figure--duo"><div class="story__' + b.type + '">' +
          (b.files || []).map(function (f, i) {
            return imageTag(f, "story__img", b.ratio, rowCaps[i]);
          }).join("") +
          "</div>" + (b.caption ? "<figcaption>" + esc(b.caption) + "</figcaption>" : "") + "</figure>";

      /* A CLICKABLE VIDEO. Tall thumbnail; clicking plays it in a pop-up on
         this page rather than sending the reader off to YouTube. */
      case "video":
        var live = !!playerURL(b.url);
        var vRatio = ratioCSS(b.ratio) || "9 / 16";
        var inner =
          '<span class="storyVideo__frame" style="--img-ratio: ' + vRatio + '">' +
            (b.thumb
              ? '<img src="' + esc(b.thumb) + '" alt="' + esc(b.title || "") + '" loading="lazy">'
              : '<span class="storyVideo__empty">' +
                  esc(b.thumb ? "Add " + b.thumb : "No thumbnail yet") + "</span>") +
            (live ? '<span class="storyVideo__play" aria-hidden="true"></span>' : "") +
          "</span>" +
          (b.title ? '<span class="storyVideo__title">' + esc(b.title) + "</span>" : "") +
          (b.caption ? '<span class="storyVideo__caption">' + esc(b.caption) + "</span>" : "");

        /* NUMBERS UNDER THE THUMBNAIL.
           Add `stats: [{ value: "3.2K", label: "likes" }, ...]` to a video
           block and they print in a small row directly beneath the picture,
           the same width as the picture. Leave it out and nothing appears. */
        var vStats = (b.stats && b.stats.length)
          ? '<div class="storyVideo__stats">' + b.stats.map(function (t) {
              return '<div class="storyVideo__stat">' +
                '<span class="storyVideo__statValue">' + esc(t.value) + "</span>" +
                '<span class="storyVideo__statLabel">' + esc(t.label) + "</span></div>";
            }).join("") + "</div>"
          : "";

        return '<div class="storyVideo">' + (live
          ? '<button class="storyVideo__btn" type="button" data-play="' + esc(b.url) +
            '" aria-label="Play ' + esc(b.title || "video") + '">' + inner + "</button>"
          : '<div class="storyVideo__btn">' + inner + "</div>") + vStats + "</div>";

      default:
        return "";
    }
  }

  /* ---- next story ------------------------------------------------------ */
  var next = stories[(index + 1) % stories.length];

  root.innerHTML =
    '<header class="storyHead"><div class="wrap">' +
      '<a class="story__back" href="index.html">&#8592; All stories</a>' +
      (story.label ? '<p class="storyHead__label">' + esc(story.label) + "</p>" : "") +
      '<h1 class="storyHead__title">' + esc(story.title) + "</h1>" +
      (story.standfirst ? '<p class="storyHead__standfirst">' + esc(story.standfirst) + "</p>" : "") +
      (story.meta && story.meta.length
        ? '<dl class="storyHead__meta">' + story.meta.map(function (m) {
            return "<div><dt>" + esc(m.label) + "</dt><dd>" + esc(m.value) + "</dd></div>";
          }).join("") + "</dl>"
        : "") +
    "</div></header>" +

    (story.hero ? '<div class="wrap"><figure class="story__hero">' + imageTag(story.hero, "story__img") + "</figure></div>" : "") +

    '<div class="wrap"><div class="storyBody">' +
      (story.blocks || []).map(renderBlock).join("") +
    "</div></div>" +

    '<div class="wrap"><nav class="storyNext">' +
      '<span class="storyNext__label">Next</span>' +
      '<a class="storyNext__link" href="story.html?id=' + esc(next.id) + '">' + esc(next.title) + " &#8594;</a>" +
    "</nav></div>";

  /* Missing image -> tidy note rather than a broken icon */
  $$("img", root).forEach(function (img) {
    img.addEventListener("error", function () {
      var note = document.createElement("div");
      note.className = "story__imgMissing";
      note.textContent = "Image not found: " + img.getAttribute("src");
      img.parentNode.replaceChild(note, img);
    });
  });

  /* ---- lightbox for story images --------------------------------------- */
  var lb = $("#lightbox"), lbStage = $("#lbStage"), lbCap = $("#lbCaption"), lbClose = $("#lbClose");

  document.addEventListener("click", function (e) {
    var play = e.target.closest ? e.target.closest("[data-play]") : null;
    if (play) {
      lbStage.innerHTML =
        '<div class="lightbox__frame lightbox__frame--tall"><iframe src="' +
        esc(playerURL(play.getAttribute("data-play"))) +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video"></iframe></div>';
      var t = play.querySelector(".storyVideo__title");
      lbCap.textContent = t ? t.textContent : "";
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      lbClose.focus();
      return;
    }
    var img = e.target.closest ? e.target.closest("[data-zoom]") : null;
    if (!img) return;
    /* Its own caption first; the line under the whole row only as a fallback. */
    var own = img.getAttribute("data-caption");
    var fig = img.closest("figure");
    var cap = fig ? fig.querySelector("figcaption") : null;
    lbStage.innerHTML = '<img src="' + esc(img.getAttribute("data-zoom")) + '" alt="">';
    lbCap.textContent = own || (cap ? cap.textContent : "");
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  });

  function closeLb() {
    lb.hidden = true; lbStage.innerHTML = ""; document.body.style.overflow = "";
  }
  lbClose.addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target === lbStage) closeLb(); });
  document.addEventListener("keydown", function (e) { if (!lb.hidden && e.key === "Escape") closeLb(); });

  /* ---- going back to where the reader was --------------------------------
     The homepage saved its scroll position when they clicked into this story.
     All we do here is raise a flag; site.js does the restoring. Without this
     the #stories link drops them at whatever is at that spot now, which is
     rarely where they left off. */
  document.addEventListener("click", function (e) {
    var back = e.target.closest ? e.target.closest(".story__back") : null;
    if (!back) return;
    try { sessionStorage.setItem("returnToHome", "1"); } catch (err) { /* private mode */ }
  });

  /* ---- sticky nav border ------------------------------------------------ */
  var nav = $("#nav");
  function onScroll() { nav.classList.toggle("is-stuck", window.scrollY > 12); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

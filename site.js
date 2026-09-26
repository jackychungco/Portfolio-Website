/* ============================================================================
   SITE.JS  —  THE ENGINE
   ----------------------------------------------------------------------------
   You do NOT need to edit this file. It reads content.js and builds the page.
   If you want a new feature, ask Claude to change this file for you.
   ============================================================================ */

(function () {
  "use strict";

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  var site      = (typeof SITE      !== "undefined" && SITE)      ? SITE      : {};
  var videos    = (typeof VIDEOS    !== "undefined" && VIDEOS)    ? VIDEOS    : [];
  var reels     = (typeof REELS     !== "undefined" && REELS)     ? REELS     : [];
  var interiors = (typeof INTERIORS !== "undefined" && INTERIORS) ? INTERIORS : [];

  /* ---------------------------------------------------------------------- */
  /* 1. Simple text slots                                                    */
  /* ---------------------------------------------------------------------- */
  var slots = {
    name: site.name,
    role: site.role,
    location: site.location,
    heroTitle: site.heroTitle,
    heroText: site.heroText,
    reelsText: site.reelsText,
    interiorsText: site.interiorsText,
    storiesText: site.storiesText,
    aboutText: site.aboutText,
    contactText: site.contactText,
    footerLeft: site.footerLeft,
    footerRight: site.footerRight
  };
  Object.keys(slots).forEach(function (key) {
    if (slots[key] == null) return;
    /* PRESSING ENTER IN THE MIDDLE OF A LINE.
       Type \n anywhere in one of the texts above and the page breaks the
       line there, so you decide where a headline turns over instead of
       leaving it to whatever fits. Without this the browser treats it as an
       ordinary space and the break never appears.

       Each line is wrapped in its own <span class="line">. That is what lets
       the gap ABOVE each line be set on its own, instead of every gap being
       the same. The dials live in theme.css under "THE HEADLINE, LINE BY
       LINE". If you leave them all at 0 nothing changes and the headline
       looks exactly as it does now. */
    $$('[data-site="' + key + '"]').forEach(function (el) {
      var value = slots[key];
      if (typeof value === "string" && value.indexOf("\n") !== -1) {
        el.innerHTML = value.split("\n").map(function (piece) {
          return '<span class="line">' + esc(piece) + '</span>';
        }).join("");
      } else {
        el.textContent = value;
      }
    });
  });

  /* The browser-tab title lives in index.html, on the <title> line near the
     top. It used to be rebuilt here from name + role, which showed a
     different title in the tab from the one Google and LinkedIn read. */

  $$('[data-site="emailLink"]').forEach(function (el) {
    el.textContent = site.email || "";
    el.setAttribute("href", "mailto:" + (site.email || ""));
  });

  /* Hero image ----------------------------------------------------------- */
  if (site.heroImage) {
    var heroWrap = $("#heroImage");
    var heroImg = new Image();
    heroImg.alt = site.name ? site.name + " — cover image" : "Cover image";
    heroImg.addEventListener("error", function () {
      heroWrap.hidden = true;
      var g = $("#heroGrid");
      if (g) g.classList.remove("has-side");
    });
    heroImg.src = site.heroImage;
    heroWrap.appendChild(heroImg);
    heroWrap.hidden = false;
    var heroGrid = $("#heroGrid");
    if (heroGrid) heroGrid.classList.add("has-side");
  }

  /* ---------------------------------------------------------------------- */
  /* 2. About section                                                        */
  /* ---------------------------------------------------------------------- */
  var aboutText = $("#aboutText");
  if (aboutText) {
    var html = (site.aboutParagraphs || []).map(function (p) {
      return "<p>" + esc(p) + "</p>";
    }).join("");

    if (site.aboutFacts && site.aboutFacts.length) {
      html += '<dl class="about__list">' + site.aboutFacts.map(function (f) {
        return "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>";
      }).join("") + "</dl>";
    }
    aboutText.innerHTML = html;
  }

  if (site.aboutPhoto) {
    var apWrap = $("#aboutPhoto");
    var apImg = new Image();
    apImg.alt = (site.name || "") + " portrait";
    apImg.addEventListener("error", function () { apWrap.hidden = true; });
    apImg.src = site.aboutPhoto;
    apWrap.appendChild(apImg);
    apWrap.hidden = false;
  }

  /* ---------------------------------------------------------------------- */
  /* 3. Contact links                                                        */
  /* ---------------------------------------------------------------------- */
  var contactLinks = $("#contactLinks");
  if (contactLinks) {
    var parts = [];
    if (site.phone) {
      parts.push('<a href="tel:' + esc(String(site.phone).replace(/[^\d+]/g, "")) + '">' + esc(site.phone) + "</a>");
    }
    (site.links || []).forEach(function (l) {
      if (!l || !l.url || /CHANGE_THIS/.test(l.url)) return;
      parts.push('<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>");
    });
    contactLinks.innerHTML = parts.join("");
  }

  /* ---------------------------------------------------------------------- */
  /* 3b. Turn whole sections off when they have nothing to show              */
  /* ---------------------------------------------------------------------- */
  var showVideos = (typeof SHOW_VIDEOS !== "undefined") ? !!SHOW_VIDEOS : true;

  function dropSection(id) {
    var sec = document.getElementById(id);
    if (sec) sec.parentNode.removeChild(sec);
    var link = $('.nav__links a[href="#' + id + '"]');
    if (link) link.parentNode.removeChild(link);
    var skip = $(".skip-link");
    if (skip && skip.getAttribute("href") === "#" + id) skip.setAttribute("href", "#interiors");
  }

  var showReels = (typeof SHOW_REELS !== "undefined") ? !!SHOW_REELS : true;

  var storyItems = (typeof STORIES !== "undefined" && STORIES) ? STORIES : [];

  if (!showVideos || !videos.length) dropSection("work");
  if (!showReels || !reels.length) dropSection("reels");
  if (!interiors.length) dropSection("interiors");
  if (!storyItems.length) dropSection("stories");

  /* ---------------------------------------------------------------------- */
  /* 4. Video grid                                                           */
  /* ---------------------------------------------------------------------- */
  var workGrid = $("#workGrid");

  function vimeoPageUrl(v) {
    if (!v.vimeoId) return "";
    return "https://vimeo.com/" + v.vimeoId + (v.vimeoHash ? "/" + v.vimeoHash : "");
  }

  function vimeoPlayerUrl(v) {
    if (!v.vimeoId) return "";
    var url = "https://player.vimeo.com/video/" + encodeURIComponent(v.vimeoId) + "?autoplay=1&title=0&byline=0&portrait=0&dnt=1";
    if (v.vimeoHash) url += "&h=" + encodeURIComponent(v.vimeoHash);
    return url;
  }

  if (workGrid) {
    workGrid.innerHTML = videos.map(function (v, i) {
      var meta = [v.client, v.year, v.role].filter(Boolean)
        .map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("");

      var media = v.poster
        ? '<img src="' + esc(v.poster) + '" alt="' + esc(v.title) + '">'
        : '<div class="workCard__empty"><strong>Vimeo ID not set</strong><span>Open content.js and paste the numbers from your Vimeo link into vimeoId</span></div>';

      return '' +
        '<article class="work ' + (v.featured ? "work--featured" : "") + ' reveal">' +
          '<button class="workCard" type="button" data-video="' + i + '">' +
            '<div class="workCard__media" data-media="' + i + '">' + media +
              '<span class="workCard__play" aria-hidden="true"></span>' +
            "</div>" +
            '<div class="workCard__body">' +
              '<h3 class="workCard__title">' + esc(v.title) + "</h3>" +
              '<p class="workCard__meta">' + meta + "</p>" +
              (v.award ? '<span class="workCard__award">' + esc(v.award) + "</span>" : "") +
            "</div>" +
          "</button>" +
        "</article>";
    }).join("");

    /* Ask Vimeo for each cover image automatically. */
    videos.forEach(function (v, i) {
      if (v.poster || !v.vimeoId) return;
      var target = workGrid.querySelector('[data-media="' + i + '"]');
      if (!target) return;

      var api = "https://vimeo.com/api/oembed.json?url=" +
        encodeURIComponent(vimeoPageUrl(v)) + "&width=1280";

      fetch(api)
        .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
        .then(function (data) {
          if (!data || !data.thumbnail_url) return;
          var big = data.thumbnail_url.replace(/_\d+(x\d+)?(\.\w+)?$/, "_1280");
          var img = new Image();
          img.alt = v.title || "";
          img.src = big;
          img.addEventListener("load", function () {
            var empty = target.querySelector(".workCard__empty");
            if (empty) empty.remove();
            target.insertBefore(img, target.firstChild);
          });
        })
        .catch(function () {
          var empty = target.querySelector(".workCard__empty");
          if (empty) {
            empty.innerHTML = "<strong>Preview unavailable</strong><span>The video still plays. Check the Vimeo privacy setting is not " +
              '&quot;Only me&quot;, or set a poster image in content.js.</span>';
          }
        });
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 4b. Social reels — staggered tracks, pop-up player on this page         */
  /* ---------------------------------------------------------------------- */
  var reelsTracks = $("#reelsTracks");
  var showreel    = (typeof SHOWREEL    !== "undefined" && SHOWREEL)    ? SHOWREEL    : null;
  var reelsMore   = (typeof REELS_MORE  !== "undefined" && REELS_MORE)  ? REELS_MORE  : null;

  function isLive(u) { return !!u && !/CHANGE_THIS/.test(u); }

  /* ---------------------------------------------------------------------
     WHERE YOUR VIDEOS LIVE

     You can paste a YouTube link or a Vimeo link into any reel's `url` and
     the site works out which is which on its own. Mixing the two is fine.
     Every shape of link these two sites hand out is understood:

       https://youtu.be/dQw4w9WgXcQ
       https://www.youtube.com/watch?v=dQw4w9WgXcQ
       https://www.youtube.com/shorts/dQw4w9WgXcQ
       https://vimeo.com/876543210
       https://vimeo.com/876543210/a1b2c3d4e5        (unlisted, with its code)
     --------------------------------------------------------------------- */

  function parseYouTube(url) {
    if (!isLive(url)) return null;
    if (!/youtu\.?be/i.test(url)) return null;
    var m =
      url.match(/[?&]v=([A-Za-z0-9_-]{6,})/) ||
      url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/) ||
      url.match(/\/shorts\/([A-Za-z0-9_-]{6,})/) ||
      url.match(/\/embed\/([A-Za-z0-9_-]{6,})/) ||
      url.match(/\/live\/([A-Za-z0-9_-]{6,})/);
    return m ? { host: "youtube", id: m[1], hash: "" } : null;
  }

  function parseVimeo(url) {
    if (!isLive(url)) return null;
    if (!/vimeo\.com/i.test(url)) return null;
    var clean = String(url).split("?")[0].split("#")[0];
    var hash = "";
    var qs = String(url).split("?")[1] || "";
    var qh = qs.match(/(?:^|&)h=([A-Za-z0-9]+)/);
    if (qh) hash = qh[1];
    var parts = clean.replace(/\/+$/, "").split("/");
    var id = "";
    for (var i = parts.length - 1; i >= 0; i--) {
      if (/^\d{6,}$/.test(parts[i])) { id = parts[i]; break; }
      if (!hash && /^[A-Za-z0-9]{6,}$/.test(parts[i]) && i === parts.length - 1) hash = parts[i];
    }
    return id ? { host: "vimeo", id: id, hash: hash } : null;
  }

  function videoOf(r) {
    if (!r || !r.url) return null;
    return parseYouTube(r.url) || parseVimeo(r.url);
  }

  /* The public page, for the "watch it on their site" link. */
  function reelPageUrl(r) {
    var v = videoOf(r);
    if (!v) return "";
    if (v.host === "youtube") return "https://www.youtube.com/watch?v=" + v.id;
    return "https://vimeo.com/" + v.id + (v.hash ? "/" + v.hash : "");
  }

  /* The address of the player that goes inside your own pop-up.
     youtube-nocookie.com is YouTube's own privacy-friendly domain: same
     player, but it does not set tracking cookies on your visitors until
     they actually press play. */
  function reelPlayerUrl(r) {
    var v = videoOf(r);
    if (!v) return "";
    if (v.host === "youtube") {
      return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.id) +
             "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
    }
    var u = "https://player.vimeo.com/video/" + encodeURIComponent(v.id) +
            "?autoplay=1&title=0&byline=0&portrait=0&dnt=1";
    if (v.hash) u += "&h=" + encodeURIComponent(v.hash);
    return u;
  }

  /* No thumbnail file of your own? Borrow the one the host already made.

     YOUR OWN PICTURE IS ALWAYS BETTER. YouTube stores every thumbnail as a
     wide 16:9 frame, so for a vertical reel it pads the sides with black and
     the site has to crop back in to the middle. That crop lands on the right
     part of the picture, but it is a rescued thumbnail, not a chosen one. */
  function fillFromHost(frameEl, r, altText) {
    var v = videoOf(r);
    if (!v || !frameEl) return;

    function place(src, onFail) {
      var img = new Image();
      img.alt = altText || "";
      img.loading = "lazy";
      img.addEventListener("load", function () {
        /* YouTube answers a missing maxresdefault with a 120x90 grey holder
           rather than an error, so judge it by size, not by whether it loaded. */
        if (img.naturalWidth < 200 && onFail) { onFail(); return; }
        var ph = frameEl.querySelector(".reel__empty");
        if (ph) frameEl.removeChild(ph);
        frameEl.insertBefore(img, frameEl.firstChild);
      });
      if (onFail) img.addEventListener("error", onFail);
      img.src = src;
    }

    if (v.host === "youtube") {
      var big = "https://i.ytimg.com/vi/" + v.id + "/maxresdefault.jpg";
      var small = "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
      place(big, function () { place(small); });
      return;
    }

    /* Vimeo does not publish a guessable thumbnail address, so ask it. */
    fetch("https://vimeo.com/api/oembed.json?url=" +
          encodeURIComponent(reelPageUrl(r)) + "&width=1280")
      .then(function (res) { return res.ok ? res.json() : Promise.reject(); })
      .then(function (data) {
        if (data && data.thumbnail_url) {
          place(String(data.thumbnail_url).replace(/_\d+(x\d+)?(\.\w+)?$/, "_1280"));
        }
      })
      .catch(function () { /* offline, or the video is private — leave the tile */ });
  }

  /* The friendly grey tile shown while a cover is being fetched, or when
     there is nothing to show yet. */
  function placeholderHTML(kind, note) {
    return '<span class="reel__empty"><strong>' + esc(kind) + "</strong><span>" +
      esc(note) + "</span></span>";
  }

  /* --- the showreel, beside the headline at the top of the page ---
     Tall thumbnail, title and a play cue underneath. Clicking it opens the
     same pop-up player the reels lower down use. If you empty SHOWREEL's
     thumb and url it disappears and a plain heroImage photo takes its place. */
  var heroReelEl = $("#heroReel");
  if (heroReelEl) {
    var srUsable = !!(showreel && (showreel.thumb || isLive(showreel.url)));
    if (!srUsable) {
      heroReelEl.parentNode.removeChild(heroReelEl);
    } else {
      var srLive = !!reelPlayerUrl(showreel);
      var srTitle = showreel.title || "Showreel";

      /* THE SILENT PREVIEW.
         The showreel starts playing by itself, muted, on a loop, the moment
         the page opens. Browsers only allow that with the sound off — which
         is also the polite way round: nobody wants a website that makes a
         noise at them. Clicking it opens the real thing, with sound.

         Two ways to feed it, in order of preference:
           1. SHOWREEL.preview — your own short silent .mp4 in the images
              folder. Fastest, and no other company's player on your page.
           2. Nothing set — it falls back to a muted YouTube or Vimeo embed
              of the full showreel. Costs the visitor the player's own
              download before your page has finished settling.

         Anyone who has asked their computer for less motion sees the still
         thumbnail instead. */
      var calm = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      var previewHTML = "";
      if (!calm) {
        if (showreel.preview) {
          previewHTML =
            '<video class="showreel__preview" src="' + esc(showreel.preview) +
            '" autoplay muted loop playsinline preload="auto" ' +
            'tabindex="-1" aria-hidden="true"></video>';
        } else {
          var pv = videoOf(showreel);
          if (pv && pv.host === "youtube") {
            previewHTML =
              '<iframe class="showreel__preview showreel__preview--embed" ' +
              'src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(pv.id) +
              "?autoplay=1&mute=1&loop=1&playlist=" + encodeURIComponent(pv.id) +
              '&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3" ' +
              'title="" tabindex="-1" aria-hidden="true" allow="autoplay"></iframe>';
          } else if (pv && pv.host === "vimeo") {
            previewHTML =
              '<iframe class="showreel__preview showreel__preview--embed" ' +
              'src="https://player.vimeo.com/video/' + encodeURIComponent(pv.id) +
              "?autoplay=1&muted=1&loop=1&background=1&dnt=1" +
              (pv.hash ? "&h=" + encodeURIComponent(pv.hash) : "") + '" ' +
              'title="" tabindex="-1" aria-hidden="true" allow="autoplay"></iframe>';
          }
        }
      }

      var srFrame =
        '<span class="showreel__frame' + (previewHTML ? " has-preview" : "") + '" id="showreelFrame">' +
          (showreel.thumb
            ? '<img id="showreelImg" src="' + esc(showreel.thumb) + '" alt="' + esc(srTitle) + '">'
            : placeholderHTML("Showreel", "Fetching the cover")) +
          previewHTML +
          (srLive ? '<span class="showreel__play" aria-hidden="true"></span>' : "") +
          (showreel.meta ? '<span class="reel__time">' + esc(showreel.meta) + "</span>" : "") +
        "</span>";

      heroReelEl.hidden = false;
      heroReelEl.innerHTML =
        (srLive
          ? '<button class="showreel__link" type="button" data-reel-open="showreel" aria-label="Play ' + esc(srTitle) + '">' + srFrame + "</button>"
          : '<div class="showreel__link">' + srFrame + "</div>") +
        '<div class="showreel__body">' +
          '<h2 class="showreel__title">' + esc(srTitle) + "</h2>" +
          (srLive
            ? (showreel.meta ? '<p class="showreel__foot">' + esc(showreel.meta) + "</p>" : "")
            : '<p class="showreel__foot">Video link not set yet</p>') +
        "</div>" +
        "";

      var heroGrid = $("#heroGrid");
      if (heroGrid) heroGrid.classList.add("has-side");

      var srFrameEl = $("#showreelFrame");
      var srImg = $("#showreelImg");
      if (srImg && srFrameEl) {
        srImg.addEventListener("error", function () {
          srFrameEl.removeChild(srImg);
          srFrameEl.insertAdjacentHTML("afterbegin", placeholderHTML("Showreel", "Fetching the cover"));
          fillFromHost(srFrameEl, showreel, srTitle);
        });
      } else if (srFrameEl) {
        fillFromHost(srFrameEl, showreel, srTitle);
      }
    }
  }

  /* --- the eight, dealt into staggered tracks ---
     Reels go into the tracks in order, one each, left to right, so reading
     across the page still follows the order in content.js. The big / medium /
     small pattern below is what stops it looking like a grid. */
  /* Four slots down each track, then the pattern repeats. Mixing the widths
     AND the shapes is what stops the columns leaving gaps beside each other:
     a squarer tile next to a tall one closes the hole a tall pair leaves. */
  var SIZE_GRID = [
    ["lg", "lg", "md", "md"],
    ["md", "lg", "md", "lg"],
    ["lg", "sm", "lg", "md"]
  ];
  var RATIO_GRID = [
    ["9:16", "4:5",  "9:16", "4:5" ],
    ["4:5",  "9:16", "9:16", "4:5" ],
    ["9:16", "9:16", "4:5",  "1:1" ]
  ];
  var RIGHT_GRID = [
    [false, true,  false, true ],
    [false, false, true,  false],
    [false, true,  false, true ]
  ];

  /* "4:5" -> "4 / 5", which is what CSS aspect-ratio wants. Anything that
     isn't two plain numbers falls back to 9:16 rather than breaking. */
  function ratioCSS(text) {
    var m = String(text || "").match(/^\s*(\d{1,5})\s*[:\/]\s*(\d{1,5})\s*$/);
    if (!m) return "9 / 16";
    return m[1] + " / " + m[2];
  }

  function trackCount() {
    var v = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue("--reels-tracks"), 10);
    return (v > 0 && v < 7) ? v : 3;
  }

  function renderReels() {
    if (!reelsTracks) return;
    var n = trackCount();
    var buckets = [];
    var t;
    for (t = 0; t < n; t++) buckets.push([]);
    reels.forEach(function (r, i) { buckets[i % n].push({ reel: r, i: i }); });

    reelsTracks.innerHTML = buckets.map(function (bucket, ti) {
      var inner = bucket.map(function (item, pos) {
        var r  = item.reel;
        var i  = item.i;
        var num = ("0" + (i + 1)).slice(-2);
        var size  = r.size || SIZE_GRID[ti % 3][pos % 4];
        var ratio = ratioCSS(r.ratio || RATIO_GRID[ti % 3][pos % 4]);
        var right = RIGHT_GRID[ti % 3][pos % 4];
        var live  = !!reelPlayerUrl(r);
        var title = r.title || "Reel " + num;

        var cls = "reel reveal" +
          (size === "md" ? " reel--md" : size === "sm" ? " reel--sm" : "") +
          (right ? " reel--right" : "");

        var label =
          '<span class="reel__label">' +
            '<span class="reel__name">' + esc(title) + "</span>" +
            (r.tag ? '<span class="reel__tag">' + esc(r.tag) + "</span>" : "") +
          "</span>";

        var frame =
          '<span class="reel__frame" data-reel-frame="' + i + '">' +
            (r.thumb
              ? '<img src="' + esc(r.thumb) + '" alt="' + esc(title) + '" loading="lazy" data-reel-img="' + i + '">'
              : placeholderHTML("Reel " + num, live ? "Fetching the cover" : "No thumbnail or link yet")) +
            (live ? '<span class="reel__play" aria-hidden="true"></span>' : "") +
            (r.duration ? '<span class="reel__time">' + esc(r.duration) + "</span>" : "") +
          "</span>";

        var copy = r.text ? '<p class="reel__copy">' + esc(r.text) + "</p>" : "";

        var shape = ' style="--reel-ratio: ' + ratio + '"';
        r._ratio = ratio;          /* so the pop-up player opens the same shape */

        return live
          ? '<button class="' + cls + '"' + shape + ' type="button" data-reel-open="' + i + '" aria-label="Play ' + esc(title) + '">' +
              label + frame + copy + "</button>"
          : '<div class="' + cls + '"' + shape + ">" + label + frame + copy + "</div>";
      }).join("");

      /* the short note that closes the last track */
      if (ti === n - 1 && reelsMore && reelsMore.text) {
        inner += '<div class="reelsMore reveal"><p>' + esc(reelsMore.text) + "</p>" +
          (isLive(reelsMore.url)
            ? '<a class="showreel__cta" href="' + esc(reelsMore.url) + '" target="_blank" rel="noopener">' +
                esc(reelsMore.label || "Watch the rest") + " &#8594;</a>"
            : "") +
          "</div>";
      }

      return '<div class="reelsTrack">' + inner + "</div>";
    }).join("");

    /* A thumbnail file that is missing or misspelled falls back to the
       host's own cover rather than showing a broken-image icon. */
    $$("[data-reel-img]", reelsTracks).forEach(function (img) {
      img.addEventListener("error", function () {
        var i = Number(img.getAttribute("data-reel-img"));
        var frameEl = img.parentNode;
        var num = ("0" + (i + 1)).slice(-2);
        frameEl.removeChild(img);
        frameEl.insertAdjacentHTML("afterbegin",
          placeholderHTML("Reel " + num, "Fetching the cover"));
        fillFromHost(frameEl, reels[i] || {}, (reels[i] && reels[i].title) || "Reel " + num);
      });
    });

    /* Reels with no thumbnail of their own: borrow the host's. */
    reels.forEach(function (r, i) {
      if (r.thumb) return;
      var frameEl = $('[data-reel-frame="' + i + '"]', reelsTracks);
      if (frameEl) fillFromHost(frameEl, r, r.title || "Reel");
    });
  }

  renderReels();

  /* The number of tracks changes at tablet and phone widths, so the reels
     have to be dealt again when the window crosses one of those lines. */
  var lastTracks = trackCount();
  var reelTimer;
  window.addEventListener("resize", function () {
    clearTimeout(reelTimer);
    reelTimer = setTimeout(function () {
      var now = trackCount();
      if (now !== lastTracks) {
        lastTracks = now;
        renderReels();
        if (window.revealScan) {
          window.revealScan();
        } else {
          $$(".reveal", reelsTracks || document).forEach(function (el) {
            el.classList.add("is-visible");
          });
        }
      }
    }, 160);
  });

  /* ---------------------------------------------------------------------- */
  /* 5. Interiors gallery                                                    */
  /* ---------------------------------------------------------------------- */
  var gallery = $("#gallery");
  if (gallery) {
    gallery.innerHTML = interiors.map(function (p, i) {
      return '' +
        '<figure class="photo reveal">' +
          '<button class="photo__btn" type="button" data-photo="' + i + '">' +
            '<span class="photo__frame"' +
              (p.ratio ? ' style="--photo-ratio: ' + ratioCSS(p.ratio) + '"' : "") + ">" +
              '<img src="' + esc(p.file) + '" alt="' + esc(p.caption || "Interior photograph") + '" loading="lazy">' +
            "</span>" +
          "</button>" +
          (p.caption ? '<figcaption class="photo__caption">' + esc(p.caption) + "</figcaption>" : "") +
        "</figure>";
    }).join("");

    /* THE SHAPE OF EACH PHOTO, TAKEN FROM THE PHOTO.
       The `ratio:` line in content.js reserves the right amount of room before
       the picture arrives, which is what stops the page jumping while it loads.
       But if that number does not match the actual file, the leftover space
       shows as a bar of empty colour under the picture. So the moment the file
       is here we ask it how tall it really is and correct the frame. Get the
       ratio wrong, or leave it out entirely, and the gallery still comes out
       right \u2014 you just lose a little of the no-jumping protection. */
    $$("img", gallery).forEach(function (img) {
      function fit() {
        if (!img.naturalWidth || !img.naturalHeight) return;
        var frame = img.parentNode;
        if (!frame || !frame.classList.contains("photo__frame")) return;
        frame.style.setProperty("--photo-ratio",
          img.naturalWidth + " / " + img.naturalHeight);
      }
      if (img.complete) fit(); else img.addEventListener("load", fit);
    });

    /* If a photo file is missing, show a friendly placeholder instead of a broken icon. */
    $$("img", gallery).forEach(function (img) {
      img.addEventListener("error", function () {
        var frame = img.parentNode;
        frame.innerHTML = '<span class="photo__empty"><strong>Photo not found</strong><span>' +
          esc(img.getAttribute("src")) + "</span></span>";
      });
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 5b. Stories list — each row opens its own page                          */
  /* ---------------------------------------------------------------------- */
  var storyList = $("#storyList");
  if (storyList) {
    storyList.innerHTML = storyItems.map(function (s, i) {
      return '<a class="storyRow reveal" href="story.html?id=' + esc(s.id) + '">' +
          "<div>" +
            '<h3 class="storyRow__title">' + esc(s.title) + "</h3>" +
          "</div>" +
          '<p class="storyRow__blurb">' + esc(s.standfirst || "") + "</p>" +
          '<span class="storyRow__go" aria-hidden="true">&#8594;</span>' +
        "</a>";
    }).join("");
  }

  /* ---------------------------------------------------------------------- */
  /* 6. Lightbox                                                             */
  /* ---------------------------------------------------------------------- */
  var lb        = $("#lightbox");
  var lbStage   = $("#lbStage");
  var lbCaption = $("#lbCaption");
  var lbPrev    = $("#lbPrev");
  var lbNext    = $("#lbNext");
  var lbClose   = $("#lbClose");
  var lastFocus = null;
  var mode = null;
  var index = 0;

  function renderLightbox() {
    if (mode === "reel") {
      var r = (index === "showreel") ? showreel : reels[index];
      var rTitle = (r && r.title) || "Reel";
      /* THE PLAYER'S SHAPE IS THE VIDEO'S, NOT THE THUMBNAIL'S.
         A tile can be any shape you like — that is a design choice. The
         video inside it has a real shape of its own, and forcing the player
         to match the tile would put black bars on a vertical film sitting in
         a squarer tile. So the player is 9:16 unless that reel says
         otherwise with a videoRatio line. */
      var lbRatio = (index === "showreel")
        ? (ratioCSS(showreel && showreel.videoRatio) || "9 / 16")
        : (ratioCSS(r && r.videoRatio) || "9 / 16");
      lbStage.innerHTML =
        '<div class="lightbox__frame lightbox__frame--tall" style="--lb-ratio: ' + lbRatio + '">' +
        '<iframe src="' + esc(reelPlayerUrl(r)) +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(rTitle) + '"></iframe></div>';
      lbCaption.textContent = [rTitle, r && r.tag, r && r.duration].filter(Boolean).join(" · ");
      /* arrows step through the eight; the showreel sits on its own */
      lbPrev.hidden = lbNext.hidden = (index === "showreel" || reels.length < 2);
      return;
    }
    if (mode === "video") {
      var v = videos[index];
      lbStage.innerHTML = '<div class="lightbox__frame"><iframe src="' + esc(vimeoPlayerUrl(v)) +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(v.title) + '"></iframe></div>';
      lbCaption.textContent = [v.title, v.client, v.year].filter(Boolean).join(" · ");
      lbPrev.hidden = lbNext.hidden = videos.length < 2;
    } else {
      var p = interiors[index];
      lbStage.innerHTML = '<img src="' + esc(p.file) + '" alt="' + esc(p.caption || "") + '">';
      lbCaption.textContent = p.caption || "";
      lbPrev.hidden = lbNext.hidden = interiors.length < 2;
    }
  }

  function openLightbox(newMode, i, trigger) {
    mode = newMode; index = i; lastFocus = trigger || null;
    renderLightbox();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }

  function closeLightbox() {
    lb.hidden = true;
    lbStage.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(dir) {
    if (mode === "reel") {
      if (index === "showreel") return;      /* the showreel is not in the run */
      index = (index + dir + reels.length) % reels.length;
      renderLightbox();
      return;
    }
    var list = mode === "video" ? videos : interiors;
    index = (index + dir + list.length) % list.length;
    renderLightbox();
  }

  document.addEventListener("click", function (e) {
    var vBtn = e.target.closest ? e.target.closest("[data-video]") : null;
    if (vBtn) {
      var vi = Number(vBtn.getAttribute("data-video"));
      if (!videos[vi] || !videos[vi].vimeoId) {
        window.alert("This project has no Vimeo ID yet.\n\nOpen content.js and paste the number from your Vimeo link into vimeoId.");
        return;
      }
      openLightbox("video", vi, vBtn);
      return;
    }
    var rBtn = e.target.closest ? e.target.closest("[data-reel-open]") : null;
    if (rBtn) {
      var key = rBtn.getAttribute("data-reel-open");
      openLightbox("reel", key === "showreel" ? "showreel" : Number(key), rBtn);
      return;
    }
    var pBtn = e.target.closest ? e.target.closest("[data-photo]") : null;
    if (pBtn) { openLightbox("photo", Number(pBtn.getAttribute("data-photo")), pBtn); }
  });

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", function () { step(-1); });
  lbNext.addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) {
    if (e.target === lb || e.target === lbStage) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* ---------------------------------------------------------------------- */
  /* 6b. Remembering where the reader was                                    */
  /* ----------------------------------------------------------------------
     Clicking into a story used to lose your place: coming back dropped you
     wherever the #stories link happened to point. So before leaving we note
     how far down the page you were, and when you come back we put you there.

     sessionStorage lasts for the browser tab only, and is cleared the moment
     it is used, so a fresh visit is never affected. It is wrapped in
     try/catch because private browsing can refuse it outright. */
  $$('a[href^="story.html"]').forEach(function (a) {
    a.addEventListener("click", function () {
      try { sessionStorage.setItem("homeScrollY", String(Math.round(window.pageYOffset))); }
      catch (err) { /* private mode — we just lose the position */ }
    });
  });

  (function restoreHomePosition() {
    var flag, y;
    try {
      flag = sessionStorage.getItem("returnToHome");
      y = sessionStorage.getItem("homeScrollY");
      sessionStorage.removeItem("returnToHome");
      sessionStorage.removeItem("homeScrollY");
    } catch (err) { return; }
    if (flag !== "1" || y === null) return;

    var target = parseInt(y, 10);
    if (!(target > 0)) return;

    /* Put them back, without the smooth animation — a restored position
       should feel like the page never moved, not like it slid there.

       We try more than once. Fonts finishing, or a late image, can nudge the
       page in the first moment after load, and a single attempt lands slightly
       off. Any real scroll or keypress from the reader cancels the rest
       immediately, so we never fight someone who has taken over. */
    var cancelled = false;
    function stopTrying() { cancelled = true; }
    ["wheel", "touchstart", "keydown"].forEach(function (evt) {
      window.addEventListener(evt, stopTrying, { passive: true, once: true });
    });

    function putBack() {
      if (cancelled) return;
      var root = document.documentElement;
      var previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, target);
      root.style.scrollBehavior = previous;
    }

    requestAnimationFrame(function () { requestAnimationFrame(putBack); });
    window.addEventListener("load", putBack);
    window.setTimeout(putBack, 260);
    window.setTimeout(function () { putBack(); cancelled = true; }, 700);
  })();

  /* ---------------------------------------------------------------------- */
  /* 7. Sticky nav border                                                   */
  /* ---------------------------------------------------------------------- */
  var nav = $("#nav");
  function onScroll() { nav.classList.toggle("is-stuck", window.scrollY > 12); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* The fade-in-as-you-scroll lives in reveal.js, which loads straight after
     this file. It handles everything on the page, including the cards drawn
     above, so there is nothing to do here. */
})();

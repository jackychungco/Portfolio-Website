/* ============================================================================
   FOOTER-STATUS.JS  —  "ON THE FLOOR"
   ----------------------------------------------------------------------------
   You do NOT need to edit this file. Everything you change lives in the
   FLOOR block at the bottom of content.js.

   This prints a short dispatch list in the footer of every page: what kit
   went out this week and where it went. It is the one thing on your site
   that nobody else applying for the same job could put there.

   It dates itself from the FLOOR.updated field, and it HIDES ITSELF once
   that date is older than staleAfterDays. A portfolio caught saying
   "this week" about something from March is worse than saying nothing.
   ============================================================================ */

(function () {
  "use strict";

  var wrap = document.getElementById("footerFloor");
  if (!wrap) return;

  var f = (typeof FLOOR !== "undefined" && FLOOR) ? FLOOR : null;
  if (!f || !Array.isArray(f.items) || !f.items.length) return;

  var staleAfter = typeof f.staleAfterDays === "number" ? f.staleAfterDays : 21;

  /* ---- is it still current? --------------------------------------------- */
  function daysSince(iso) {
    if (!iso) return null;
    var then = new Date(String(iso) + "T00:00:00");
    if (isNaN(then.getTime())) return null;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    return Math.round((today.getTime() - then.getTime()) / 86400000);
  }

  var days = daysSince(f.updated);
  if (days === null || days > staleAfter) return;   /* stale: show nothing */

  /* ---- "Week of 8 September" -------------------------------------------- */
  function weekOf(iso) {
    var d = new Date(String(iso) + "T00:00:00");
    if (isNaN(d.getTime())) return "";
    try {
      return "Week of " + new Intl.DateTimeFormat("en-GB", {
        day: "numeric", month: "long"
      }).format(d);
    } catch (e) {
      return "";
    }
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---- build ------------------------------------------------------------- */
  var head = document.getElementById("floorHead");
  var list = document.getElementById("floorList");

  if (head) {
    head.innerHTML =
      '<span class="footer__floorLabel">' + esc(f.label || "On the floor") + "</span>" +
      '<span class="footer__floorWeek">' + esc(weekOf(f.updated)) + "</span>";
  }

  if (list) {
    list.innerHTML = f.items.map(function (item) {
      if (!item || !item.kit) return "";
      return '<li class="floorRow">' +
        '<span class="floorRow__kit">' + esc(item.kit) + "</span>" +
        '<span class="floorRow__job">' + esc(item.job || "") + "</span>" +
      "</li>";
    }).join("");
  }

  wrap.hidden = false;
})();

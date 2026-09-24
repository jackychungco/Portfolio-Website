/* ============================================================================
   CONTENT.JS  —  YOUR WORDS, YOUR VIDEOS, YOUR PHOTOS
   ============================================================================

   This is the second (and last) file you ever need to open.

   THE FIVE RULES OF THIS FILE — break one and the page goes blank:

     1. Text always goes inside "double quotes".
            title: "Sephora Holiday Reel",          <-- correct
            title: Sephora Holiday Reel,            <-- WRONG, page breaks

     2. Every line inside a { } block ends with a COMMA ,

     3. Every { } block in a list ends with },  and the whole list ends with ];

     4. If your text contains a double quote, put a backslash before it:
            title: "The \"Golden Hour\" Series",

     5. Never delete a { } or [ ] bracket. Copy whole blocks, don't half-copy.

   IF THE PAGE GOES BLANK/WHITE: you broke rule 1, 2 or 3. Press Cmd + Z to
   undo until it works again, save, reload. Nothing is permanently lost.
   ============================================================================ */


/* ============================================================================
   PART 1 — WHO YOU ARE
   ============================================================================ */

const SITE = {

  /* Your name, top-left of the menu bar */
  name: "Jacky Chung",

  /* Shown under "Currently" in the hero */
  role: "Head of Camera + Light & Grip, 2117 Rentals. Also Content Videographer",

  /* Shown under "Based in" and in the small line above your big title */
  location: "Petaling Jaya, Malaysia",

  /* THE BIG TITLE on the homepage. Keep it short — one sentence. */
  heroTitle: "I make brand films,\nrun a camera\ndepartment, and\nhunt old\nfurniture.",

  /* The paragraph under the big title */
  heroText: "I run camera and light & grip departments at an equipment rental house, shoot brand films with crews I met through work, and own more chairs than one person needs.",

  /* OPTIONAL photo beside the big title.
     Your SHOWREEL sits there now, so leave this as "".
     If you ever want a still photograph there instead, empty the SHOWREEL
     thumb and url further down, then write: heroImage: "images/hero.jpg" */
  heroImage: "",

  /* The line under the "Interiors" heading */
  /* The one line under the SOCIAL REELS heading. This is the first thing a
     visitor reads after your headline, so it carries a client name and a
     number rather than a description. Set to "" to remove it. */
  reelsText: "Short-form work for Chuck’s, Sephora and 2117 Rentals. Twelve pieces, one of them at 118K views.",

  /* The one line under the STORIES heading. It tells someone in a hurry
     which one to open. */
  storiesText: "Five pieces on how the work actually gets made. Start with the rental house if you only read one.",

  /* The one line under the ABOUT heading. Four things you get booked for,
     written as jobs rather than adjectives. */
  aboutText: "What I get booked for\nConcept and shot planning, camera and lighting.",

  interiorsText: "The slower half. A studio apartment in Petaling Jaya, furnished secondhand, one piece at a time.",

  /* The line under the "Contact" heading */
  contactText: "",

  /* Your contact details */
  email: "jackychung819@gmail.com",
  phone: "+60 19-746 7878",

  /* Links at the bottom of the Contact section.
     Delete a whole { } block if you don't want that link.
     Add one by copying a block. */
  links: [
    { label: "Instagram @jackychngg_", url: "https://instagram.com/jackychngg_" },
  ],

  /* THE ABOUT SECTION.
     Each "..." inside the [ ] is one paragraph. Add or remove paragraphs. */
  aboutParagraphs: [
    "I joined 2117 Rentals in 2022 as an intern. Four years later, I am the head of the Camera and Light & Grip departments, and since September 2024 I’ve been one of the company’s content videographers.",
    "The department job is people, equipment and the day-to-day workflow behind the rental operation. Rental schedules, prepping kits, servicing equipment, checking everything before it leaves the building. Basically, making sure the gear is ready before someone discovers it isn’t.",
    "The videographer job is the short-form content, for 2117 and for its clients. I take it from the client brief through concept and shot planning, then run camera and lighting on the day. Recent brand work includes social reels for Sephora and Chuck’s. I also launched 2117’s sensor and lens cleaning service, and shot the campaign video that sells it.",
    "I started out as a videographer and editor, and kept that going part-time from home through my first months at 2117. Alongside it I took freelance jobs around Kuala Lumpur, and one of those was Malaysia’s first audio-described cinema premiere. In 2026 I won Best Video under the AI Social Media Avatar category at the BytePlus Seedance 2.0 hackathon.",
    "Working in a rental house changes the way you look at equipment. You see what gets used constantly, what comes back in rough shape, what tends to fail, and what crews actually reach for when they have a choice. You also find out pretty quickly what happens when the wrong piece of gear gets sent out. A lot of what I know about cameras came from dealing with those situations rather than just reading technical specs.",
    "Outside the rental house, I work on commercial shoots as a camera assistant and take on Ronin 2 gimbal technician jobs. One of the more recent ones was the OCBC CLP commercial in Singapore.",
    "When I’m not working with cameras, I’m usually looking at furniture. I collect vintage pieces from different parts of the country, sometimes before I even know where they’re going to go.",
    "Most people learn cameras by owning one. I learned mine by prepping them, sending them out, and seeing what came back. Turns out, that’s a pretty good way to learn.",
  ],

  /* OPTIONAL portrait photo for the About section.
     Leave as "" for no photo, or: aboutPhoto: "images/portrait.jpg",       */
  aboutPhoto: "images/house-01.jpeg",

  /* The small facts listed under your About text.
     Delete or add { } blocks freely. */
  aboutFacts: [
    { label: "Based in",         value: "Petaling Jaya, Malaysia" },
    { label: "Languages",        value: "English, Mandarin, Bahasa Malaysia" },
    { label: "Selected clients", value: "Sephora, Chuck’s, 2117 Rentals" },
    { label: "Shooting since",   value: "2018" },
    { label: "Education",        value: "BA Cinematic Arts, MMU Cyberjaya" },
    { label: "Recent",           value: "Best Video, AI Social Media Avatar category, BytePlus Seedance 2.0 Hackathon, 2026" },
  ],

  /* The two lines in the olive footer bar */
  footerLeft: "© 2026 Jacky Chung",
  footerRight: "Petaling Jaya, Malaysia",
};


/* ============================================================================
   PART 2 — YOUR VIDEOS
   ============================================================================

   HOW TO GET A VIMEO ID:
     Your Vimeo link looks like one of these:

       https://vimeo.com/876543210                 <- public video
                        ^^^^^^^^^  this is the ID

       https://vimeo.com/876543210/a1b2c3d4e5      <- unlisted / private link
                        ^^^^^^^^^ ^^^^^^^^^^  ID   and    HASH

     Put the numbers in vimeoId. If there is a second code after a slash,
     put that in vimeoHash. If there isn't one, leave vimeoHash as "".

   THE THUMBNAIL IS AUTOMATIC. The site asks Vimeo for the cover image of
   each video. You do not need to make thumbnails. (If you want to force a
   specific one, drop a picture in the images folder and set
   poster: "images/whatever.jpg")

   featured: true   makes that video full-width at the top. Use it on ONE only.
   award: "..."     shows a small pill badge. Leave "" for no badge.
   ============================================================================ */

/* ---------------------------------------------------------------------------
   THE VIDEO SWITCH

   false  = the whole "Selected Work" section disappears from the website,
            and "Work" disappears from the top menu. Visitors never see
            empty grey boxes. Use this while you are still waiting for
            files or Vimeo links.

   true   = the section is on.

   Change the one word below. No quote marks around it.
   --------------------------------------------------------------------------- */

const SHOW_VIDEOS = false;


const VIDEOS = [

  {
    title:     "Beauty Pass Social Campaign",
    client:    "Sephora Malaysia",
    year:      "2025",
    role:      "Videographer, Editor",
    vimeoId:   "",           /* <-- PASTE THE NUMBERS HERE */
    vimeoHash: "",
    poster:    "",
    featured:  true,
    award:     "",
  },

  {
    title:     "AI Social Media Avatar",
    client:    "Seedance 2.0 by BytePlus",
    year:      "2026",
    role:      "Director, AI Generation, Edit",
    vimeoId:   "",
    vimeoHash: "",
    poster:    "",
    featured:  false,
    award:     "Best Video — Hackathon Winner",
  },

  {
    title:     "Brand Social Film",
    client:    "Chuck’s",
    year:      "2025",
    role:      "Videographer, Editor",
    vimeoId:   "",
    vimeoHash: "",
    poster:    "",
    featured:  false,
    award:     "",
  },

  {
    title:     "Rental House Reel",
    client:    "2117 Rentals",
    year:      "2026",
    role:      "Director, Videographer, Editor",
    vimeoId:   "",
    vimeoHash: "",
    poster:    "",
    featured:  false,
    award:     "",
  },

  /* ---- TO ADD ANOTHER VIDEO ----
     Copy everything from the { above down to its },
     paste it right here, and change the words. ---- */

];


/* ============================================================================
   PART 3 — YOUR SOCIAL REELS
   ============================================================================

   Your showreel, then eight reels laid out in staggered columns.

   CLICKING A THUMBNAIL NO LONGER LEAVES YOUR WEBSITE. It opens the video in
   a pop-up player on your own page, and closes again with Esc, the X, or a
   click on the dark background. Arrow keys move between reels.

   YOUTUBE OR VIMEO, YOUR CHOICE, AND YOU CAN MIX THEM.
   Paste whichever link you have into `url` and the site works out the rest.
   Every shape of link works:
       https://youtu.be/dQw4w9WgXcQ
       https://www.youtube.com/watch?v=dQw4w9WgXcQ
       https://www.youtube.com/shorts/dQw4w9WgXcQ
       https://vimeo.com/876543210

   ON YOUTUBE, the two settings that matter:
     - Visibility: "Unlisted" or "Public". NOT "Private" — a private video
       cannot be embedded, and your pop-up will show an error.
     - In YouTube Studio -> the video -> Show more -> make sure
       "Allow embedding" is ticked. It is on by default; just check it.

   ON VIMEO, if you use it: Settings -> Privacy -> "Where can this be
   embedded?" -> "Anywhere". On Vimeo's free plan you also have to set the
   video to Public, because the free plan has no Unlisted option.

   ---------------------------------------------------------------------------
   EACH REEL HAS SIX THINGS. Only `url` is truly required.

     title     The name people read. Keep it short: client, then what it is.
     tag       The little word on the right of the label: Social, Brand,
               Award, Personal. Anything you like. "" for none.
     duration  Shown in the corner of the thumbnail. "" for none.
     size      HOW WIDE THE THUMBNAIL IS inside its column. "" lets the
               site alternate for you. "lg" fills the column, "md" is about
               four fifths of it, "sm" about two thirds. Widening one is the
               way to close a gap beside it.
     videoRatio  THE SHAPE OF THE VIDEO ITSELF, used by the pop-up player.
               Leave "" and it plays 9:16, which is what a YouTube Short is.
               Set it only if a particular film is genuinely a different
               shape — "16:9" for a landscape piece, say. This has nothing
               to do with the thumbnail's shape below.
     ratio     THE SHAPE OF THE THUMBNAIL. Leave "" and the site picks for
               you, alternating tall and squarer tiles down each column so
               they pack together without gaps. Override any single one with
               "9:16" (tall), "4:5" (a little squarer), "3:4", "1:1" (square)
               or "16:9" (wide). Set it to match the real shape of the video
               and the pop-up player matches too.
     text      TWO OR THREE SENTENCES under the thumbnail. This is the part
               that does the work — what the brief was, how you shot it, what
               it had to achieve. Roughly 30 to 45 words. "" for none.
     thumb     YOUR OWN COVER PICTURE. See below.
     url       The YouTube or Vimeo link, copied from the address bar.

   ---------------------------------------------------------------------------
   THE THUMBNAIL — you have two options, and you can mix them freely.

   OPTION A, let YouTube or Vimeo do it (easiest, but read the catch):
     Leave thumb as "". The site fetches that video's own cover frame.
     THE CATCH WITH YOUTUBE: it stores every thumbnail as a wide 16:9 frame,
     so a vertical reel gets black bars down the sides and the site has to
     crop back into the middle. The crop lands on the right part of the
     picture, but it is a rescued thumbnail, not a chosen one. For the eight
     reels people actually look at, do Option B.

   OPTION B, upload your own (better looking):
     - Export one still from the reel. In Resolve: park on the frame you
       want, right-click the viewer, Grab Still, then export it.
     - Crop it VERTICAL, 9:16. 1080 x 1920 is perfect. Keep it under 400 KB.
     - Name it lowercase with dashes, drag it into the images folder, and
       write the name here:  thumb: "images/reel-01.jpg",
     - To swap a thumbnail later, just replace that file in the images folder
       with a new one of the same name. Nothing here needs changing.

   If a thumbnail file is missing or misspelled, the site quietly falls back
   to the host's cover rather than showing a broken image.

   ---------------------------------------------------------------------------
   THE LAYOUT IS AUTOMATIC. Reels are dealt into the tracks in the order they
   appear below, and the big / medium / small sizes repeat in a set pattern so
   the page stays composed however many you have. To override one reel, add
   size: "lg", size: "md" or size: "sm" to its line.

   TO ADD OR REMOVE A REEL: copy or delete a whole { } block. There is
   nothing magic about the number eight.
   ============================================================================ */

/* false = the whole Social Reels section disappears, and "Reels" disappears
   from the top menu, same as the video switch above. */
const SHOW_REELS = true;


/* --- YOUR SHOWREEL ----------------------------------------------------------
   This sits at the VERY TOP of the page, beside your big title. Tall 9:16
   thumbnail, with the name and length underneath it. Clicking it opens the
   player in a pop-up, the same as the reels further down.

   It is the first thing anyone sees, so give it your best frame.

   caption is no longer shown on the page — your big title does that job now.
   Leave it, or empty it, either is fine.

   Set thumb to "" and url to "" and the showreel disappears; a plain photo
   takes its place if you have set heroImage above.
   --------------------------------------------------------------------------- */

const SHOWREEL = {
  title:   "Showreel",
  caption: "Three years of brand films, social campaigns and rental-house work cut down to ninety seconds. Shot across Klang Valley on everything from an FX3 to an Alexa Mini.",
  meta:    "",
  thumb:   "Reels-Thumbnail/Jacky-Chung-Showreel-Thumbnail_1.96.1.png",   /* tall 9:16, 1080 x 1920 — or "" to borrow theirs */

  /* A SHORT SILENT CLIP that plays by itself at the top of the page, on a
     loop, with no sound. Think of it as a moving thumbnail, not a deliverable.
     8 to 12 seconds, 1080 x 1920, no audio track, about 1-2 MB:
         preview: "images/showreel-loop.mp4",
     Leave it "" and the full video plays muted from YouTube instead, which
     works but makes every visitor download YouTube's player before your page
     has settled. Your own file is faster and cleaner. */
  preview: "",
  url:     "https://vimeo.com/1228108905",                                /* paste the full YouTube or Vimeo link here */
};


/* --- THE EIGHT --------------------------------------------------------------
   The text on each one is a placeholder. Replace every «FILL» with your own
   two or three sentences, or set text to "" to show the label only.
   --------------------------------------------------------------------------- */

const REELS = [

  {
    title:    "Chuck’s Better Body Butter Stick — Jane Chuck",
    ratio:    "4:5",
    tag:      "",
    duration: "",
    text:     "Shot & Lit",
    thumb:    "Reels-Thumbnail/Chuck's-Better-Body-Jane.png",
    url:      "https://youtube.com/shorts/rlyRScwc71Y",
  },

  {
    title:    "Sephora Beauty (Products) 2026",
    size:     "lg",
    tag:      "",
    duration: "",
    ratio:    "",
    text:     "Shot & Lit",
    thumb:    "Reels-Thumbnail/Sephora-Beauty-Products.png",
    url:      "https://youtube.com/shorts/xRrIcLzQW4Y",
  },

  {
    title:    "Chuck’s Prime Time",
    tag:      "",
    duration: "",
    ratio:    "",
    text:     "Shot & Lit",
    thumb:    "Reels-Thumbnail/Chucks-Prime-Time_2.png",
    url:      "https://youtube.com/shorts/NRFSFVGjn-0",
  },

  {
    title:    "Chuck’s Better Body Butter Stick — Nia Atasha",
    tag:      "",
    duration: "",
    ratio:    "",
    text:     "Shot & Lit",
    thumb:    "Reels-Thumbnail/Chuck's-Better-Body-Nia-Atasha.png",
    url:      "https://youtube.com/shorts/EKIDSfHVdUc",
  },

  {
    title:    "Sephora Beauty (Models) 2026",
    tag:      "",
    duration: "",
    ratio:    "",
    text:     "Shot & Lit",
    thumb:    "Reels-Thumbnail/Sephora-Beauty-Model.png",
    url:      "https://youtube.com/shorts/-cYbmQFrcSo",
  },

  {
    title:    "Sony Burano Cinema Package",
    size:     "md",
    tag:      "",
    duration: "",
    ratio:    "",
    text:     "Shot & Lit",
    thumb:    "Reels-Thumbnail/Burano-Package.jpg",
    url:      "https://youtube.com/shorts/NYJJ2R1F308",
  },

  {
    title:    "2117 Tee Restocked",
    tag:      "",
    duration: "",
    ratio:    "",
    text:     "Shot & Lit",
    thumb:    "Reels-Thumbnail/2117-Tee-Restocked.png",
    url:      "https://youtube.com/shorts/PNrNW_UbCI0",
  },

  {
    title:    "My 5-9 After My 9-5",
    size:     "lg",
    tag:      "",
    duration: "",
    ratio:    "",
    text:     "Shot & Lit",
    thumb:    "Reels-Thumbnail/My-5-9-After-My-9-5.png",
    url:      "https://youtube.com/shorts/WRFKL2MlCJY",
  },

  {
    title:    "Jaecoo J7 x Amanda",
    tag:      "",
    duration: "",
    ratio:    "",
    text:     "Shot · Lit  · Edit  · Color",
    thumb:    "Reels-Thumbnail/JaecooxAmanda-Reel.png",
    url:      "https://youtube.com/shorts/5lUze0z6c5c",
  },

  {
    title:    "Easy Exposure Hack with the Sony Burano",
    ratio:    "9:16",
    tag:      "",
    duration: "",
    text:     "Shot · Lit  · Edit  · Color",
    thumb:    "Reels-Thumbnail/Burano-Exposure-Hack.png",
    url:      "https://youtube.com/shorts/ZugGH-qo-d8",
  },

  {
    title:    "2117 Camera and Lens Spa Packages",
    tag:      "",
    duration: "",
    ratio:    "",
    text:     "Shot · Lit  · Edit  · Color",
    thumb:    "Reels-Thumbnail/2117-Camera-Spa-Service.png",
    url:      "https://youtube.com/shorts/P1k6Xw-UbD8",
  },

  {
    title:    "Prep Day at 2117 — Commercial Pro Package",
    tag:      "",
    duration: "",
    ratio:    "",
    text:     "Shot & Lit",
    thumb:    "Reels-Thumbnail/Commercial-Pro-Package-Prep.png",
    url:      "https://youtube.com/shorts/JEpXmuOkAZ8",
  },

  /* ---- TO ADD ANOTHER REEL ----
     Copy one whole { } block above, paste it here, change the words. ---- */

];


/* --- THE NOTE THAT CLOSES THE LAST COLUMN -----------------------------------
   A short line at the bottom of the right-hand track, pointing at your Vimeo
   channel. Set text to "" to remove it completely. */

const REELS_MORE = {
  text:  "",
  label: "",
  url:   "",          /* your YouTube or Vimeo channel address */
};


/* ============================================================================
   PART 4 — YOUR INTERIOR PHOTOS
   ============================================================================

   1. Drag your photos into the "images" folder.
   2. Rename each file to something simple: lowercase, no spaces, use dashes.
        GOOD:  living-room-01.jpg      BAD:  Living Room (1).JPG
   3. Add one { } block below per photo.

   The "caption" shows under the photo. Leave it as "" for no caption.
   Photos appear on the page in the order you list them here.
   Any size and shape works — tall, wide, square all sit together fine.
   Keep each file under about 2 MB so the site loads fast.
   ============================================================================ */

/* `ratio` is the shape of the picture, and it matters more than it sounds:
   it reserves the space in the page before the file arrives. Without it the
   gallery grows as the photos load, everything below jumps down, and jump
   links land in the wrong place. These six are measured from your files. */

const INTERIORS = [

  { file: "images/house-13.jpeg", ratio: "960:1280", caption: "" },
  { file: "images/house-07.jpeg", ratio: "1333:2000", caption: "" },
  { file: "images/house-02.jpeg", ratio: "994:1280", caption: "" },
  { file: "images/house-05.jpeg", ratio: "960:1280", caption: "" },
  { file: "images/house-10.jpeg", ratio: "960:1280", caption: "" },
  { file: "images/house-04.jpg", ratio: "1500:2000", caption: "" },

  /* ---- TO ADD ANOTHER PHOTO ----
     Copy one whole line above, paste it here, change the filename. ---- */

];

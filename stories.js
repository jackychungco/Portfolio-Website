/* ============================================================================
   STORIES.JS  —  THE DEEPER PAGES
   ============================================================================

   Each { } block below becomes its own page at:
       story.html?id=whatever-you-put-in-id

   The same five rules as content.js apply. Text in "double quotes", comma at
   the end of every line, never delete a bracket.

   ---------------------------------------------------------------------------
   ANYTHING WRAPPED IN «FILL: ...» IS A GAP I COULD NOT FILL FOR YOU.
   I have not invented a single number or fact. Search the file for the «
   character, replace each one with the truth, and delete the brackets.
   Leave one in by accident and it will be visible on your live site, which
   is deliberate — it is better to look unfinished than to look untrue.
   ---------------------------------------------------------------------------

   THE BLOCK TYPES you can use inside "blocks":

     { type: "text",    body: "One paragraph." }
     { type: "heading", text: "A sub-heading" }
     { type: "list",    items: ["First point", "Second point"] }
     { type: "quote",   text: "A pulled-out line.", who: "Who said it" }
     { type: "stats",   items: [{ value: "1.2M", label: "views" }] }
     { type: "image",   file: "images/x.jpg", caption: "Optional caption" }
     { type: "duo",     files: ["images/a.jpg", "images/b.jpg"], caption: "" }

   To reorder a page, move the blocks. To add a page, copy a whole { } block
   and give it a new id.
   ============================================================================ */

const STORIES = [

/* ========================================================================== */
{
  id: "three-reels",
  label: "Social",
  title: "Seven Reels That Worked",
  standfirst: "Most reels get made to a deadline and forgotten by the next one. These seven did something. All of them were shot in a single day.",
  hero: "",
  meta: [
    { label: "Role",    value: "Videographer, Editor" },
    { label: "Years",   value: "2023 to 2026" },
    { label: "Shoot",   value: "One day each" },
    { label: "Clients", value: "Chuck’s, 2117 Rentals" },
  ],
  blocks: [
    { type: "heading", text: "My 5-9 after my 9-5 in 2117" },
    { type: "video",
      thumb:   "Reels-Thumbnail/My-5-9-After-My-9-5.png",
      url:     "https://youtube.com/shorts/WRFKL2MlCJY",
      title:   "",
      ratio:   "941:1672",
      caption: "",
      stats:   [ { value: "3.2K", label: "likes" },
                 { value: "118K", label: "views" } ,
                 { value: "Shot & Lit", label: "role" } ] },
    { type: "text", body: "The video promotes 2117 Rentals’ after-hours prep space and services by highlighting the relatable shift from a standard day job to late-night camera prep. It opens with the universal panic of formatting an SD card, then leans into the hands-on routine of running a rental house. The reel shows practical equipment maintenance and what working in a rental house is actually like." },
    { type: "text", body: "The vibe is relatable, energetic and candid. Fast-paced hip-hop and exaggerated reactions turn routine gear maintenance into a behind-the-scenes look at rental house life." },

    { type: "heading", text: "Chuck’s Patisserie: The Nara Smith Parody" },
    { type: "video",
      thumb:   "Reels-Thumbnail/Chuck's-Patisserie-The-Nara-Smith-Parody.png",
      url:     "https://youtube.com/shorts/c33ztP7TL3Y",
      title:   "",
      ratio:   "941:1672",
      caption: "",
      stats:   [ { value: "1.7K", label: "likes" },
                 { value: "85.3K", label: "views" } ,
                 { value: "Shot & Lit", label: "role" } ] },
    { type: "text", body: "The video promotes Chuck’s limited Valentine’s Day chocolate hazelnut doughnuts, a collaboration with Donut Plan. It parodies Nara Smith’s viral content style, with founder Jane Chuck mimicking Nara’s deadpan delivery, calm tone and from-scratch baking concept. The reel frames the step-by-step doughnut making as a luxury home project, then packs the finished batch into custom Chuck’s Patisserie boxes." },
    { type: "text", body: "The vibe is soft, muted and satirically polished. Deadpan voiceover and gentle orchestral music play up the Nara Smith aesthetic. A commercial bakery launch ends up feeling like quiet luxury." },

    { type: "heading", text: "Prepping 2117 Commercial Pro Package" },
    { type: "video",
      thumb:   "Reels-Thumbnail/Commercial-Pro-Package-Prep.png",
      url:     "https://youtube.com/shorts/JEpXmuOkAZ8",
      title:   "",
      ratio:   "1122:1402",
      caption: "",
      stats:   [ { value: "800", label: "likes" },
                 { value: "18.7K", label: "views" } ,
                 { value: "Shot & Lit", label: "role" } ] },
    { type: "text", body: "The video promotes 2117 Rentals’ Commercial Pro package through a fast camera prep routine. Sandra builds out a full camera kit with her teammate, covering tripod mounting, cable management, wireless monitor testing and gear labelling. It shows how renting the Commercial Pro package from 2117 gets you a complete, production-ready system." },
    { type: "text", body: "The vibe is clean, high-energy and professional. Fast edits and upbeat music give the bright studio prep a polished, collaborative feel." },

    { type: "heading", text: "Easy Exposure Hack with the Sony Burano" },
    { type: "video",
      thumb:   "Reels-Thumbnail/Burano-Exposure-Hack.png",
      url:     "https://youtube.com/shorts/ZugGH-qo-d8",
      title:   "",
      ratio:   "1080:1920",
      caption: "",
      stats:   [ { value: "540", label: "likes" },
                 { value: "20.5K", label: "views" } ,
                 { value: "Shot · Lit · Edit · Color", label: "role" } ] },
    { type: "text", body: "The video promotes the Sony Burano by highlighting its dual native ISO. It breaks down how switching between the base ISO 800 and ISO 3200 lets you adapt to low-light setups without adding noise to the image." },
    { type: "text", body: "It shows the exposure difference through a side-by-side of the same dimly lit room, where the higher base ISO brightens the scene cleanly. The clip pitches the camera as a practical answer to shooting clean, low-noise footage in tricky lighting." },

    { type: "heading", text: "Building a Sony Burano Kit" },
    { type: "video",
      thumb:   "Reels-Thumbnail/Burano-Package.jpg",
      url:     "https://youtube.com/shorts/NYJJ2R1F308",
      title:   "",
      ratio:   "1080:1920",
      caption: "",
      stats:   [ { value: "540", label: "likes" },
                 { value: "16.4K", label: "views" } ,
                 { value: "Shot & Lit", label: "role" } ] },
    { type: "text", body: "The video promotes renting 2117 Rentals’ Sony Burano cinema package at RM2,000 per day instead of spending around RM200,000 to buy the complete setup. It shows how the production accessories build the camera out into a production-ready rig: Tilta cage, Vaxis wireless transmission, matte box, wireless follow focus and CFexpress media." },
    { type: "text", body: "The vibe is fast, tactile and practical. Snappy sound effects and quick edits carry the value of renting a kit that turns up already rigged." },

    { type: "heading", text: "2117’s New Camera Sensor and Lens Cleaning Service" },
    { type: "video",
      thumb:   "Reels-Thumbnail/2117-Camera-Spa-Service.png",
      url:     "https://youtube.com/shorts/P1k6Xw-UbD8",
      title:   "",
      ratio:   "1122:1402",
      caption: "",
      stats:   [ { value: "290", label: "likes" },
                 { value: "10K", label: "views" } ,
                 { value: "Shot · Lit · Edit · Color", label: "role" } ] },
    { type: "text", body: "The video promotes 2117 Rentals’ new Camera Sensor and Lens Cleaning package, a service that clears smudges, dust and fingerprints off camera gear. It shows the specialised tools that lift debris off delicate optics, and a dirty sensor and a smudged lens coming back to spotless." },
    { type: "text", body: "The vibe is sharp, precise and deeply satisfying. Crisp, rhythmic edits sync to a drum track, so the maintenance reads as smooth and methodical." },

    { type: "heading", text: "2117 T-Shirt Restocked Announcement" },
    { type: "video",
      thumb:   "Reels-Thumbnail/2117-Tee-Restocked.png",
      url:     "https://youtube.com/shorts/PNrNW_UbCI0",
      title:   "",
      ratio:   "1080:1920",
      caption: "",
      stats:   [ { value: "228", label: "likes" },
                 { value: "11K", label: "views" } ,
                 { value: "Shot & Lit", label: "role" } ] },
    { type: "text", body: "The video promotes the restock of the official 2117 black logo t-shirt. It hooks viewers with a split concept: the production setup on one side, the final polished shot on the other. The clip shows how a gimbal rig works in a studio, tracking smoothly around talent for high-energy apparel shots. Damon picks up the tee, packs it and changes into it, so you see the relaxed fit." },
    { type: "text", body: "The vibe is fast, playful and high-energy. Rapid whip pans and upbeat music keep the momentum up, and a simple restock announcement ends up with some creative edge." },

    { type: "heading", text: "What the seven have in common" },
    { type: "list", items: [
      "The two that went furthest both start with something the viewer already knows. One is the tension of formatting a memory card (audience can relate). The other is a format they’ve probably already seen on their feed (trend). The gear reels have to work harder to get that attention. Those two already have it.",
      "All seven show a process instead of a finished thing.",
      "None of them needs to explain the product. If you have to say what it is, the shot probably isn’t doing enough.",
      "The biggest thing is knowing how to catch someone’s attention in the first few seconds.",
    ] },

    { type: "text", body: "I shoot social the way I prep a rental order: decide what can go wrong before the day, then build around it so that when something does, it matters less." },
  ],
},

/* ========================================================================== */
{
  id: "rental-house",
  label: "Craft",
  title: "What a Rental House Taught Me About Shooting",
  standfirst: "Four years of prepping cameras, checking gear back in, fixing things that came back from set slightly less alive than when they left, and watching crews build their kits has changed the way I shoot.",
  hero: "",
  meta: [
    { label: "Where", value: "2117 Rentals, Petaling Jaya" },
    { label: "Since", value: "2022" },
    { label: "Scope", value: "Camera, Light & Grip" },
  ],
  blocks: [
    { type: "trio",
      files: ["images/Jacky-Chung-2.jpg",
              "images/Jacky-Chung-3.jpg",
              "images/Jacky-Chung-5.jpg"],
      ratio: "2:3",
      caption: "" },

    { type: "text", body: "Working in a rental house gives you a pretty good view of what actually happens on set. You see what people ask for, what they actually use, what comes back damaged, and which piece of gear somehow survives everything thrown at it." },
    { type: "heading", text: "Gear is judged by what survives" },
    { type: "text", body: "I don’t really judge gear by how impressive the spec sheet looks anymore. I care about whether it works when someone needs it to." },
    { type: "text", body: "After seeing the same cameras, lenses, monitors, transmitters and lights go out on hundreds of jobs, you start noticing patterns. Some equipment is brilliant on paper but annoying in real life. Some older gear just refuses to die." },
    { type: "text", body: "The Sony FX3 is a good example. It’s small, reliable, and easy to build around, which is probably why it keeps getting picked up for all sorts of jobs. The same goes for a lot of gear I trust. Not necessarily because it is the newest or most expensive, but because I’ve seen it come back from set again and again without giving us a headache." },
    { type: "text", body: "And then there’s the gear I don’t trust as much. Usually, it’s not because I read a bad review somewhere. It’s because I’ve personally seen the same problem happen more than once." },
    { type: "text", body: "That kind of experience is difficult to get from a YouTube review." },
    { type: "heading", text: "Prep day is part of the shoot" },
    { type: "text", body: "At 2117, we build and test the kits before they leave. Camera gets built. Monitors get powered. Wireless gets checked. Batteries get charged. Everything gets looked at before it goes into a case." },
    { type: "text", body: "It sounds basic, but this is where a lot of problems get caught." },
    { type: "text", body: "A cable that looked fine but isn’t. A monitor that suddenly decides it doesn’t want to receive a signal. A battery that says it’s full but clearly has other plans. A lens that needs attention. Small things that are very cheap to fix in the prep room and suddenly become very expensive when you’re standing in the middle of a shoot." },
    { type: "text", body: "Nobody really notices when prep goes well. That’s usually the point." },
    { type: "heading", text: "You start building for real life" },
    { type: "text", body: "I used to think about what gear would make the shot better." },
    { type: "text", body: "Now I also think about what will make the day easier." },
    { type: "text", body: "If a crew is changing setups quickly, I’d rather give them something familiar and reliable than add another piece of equipment just because it looks good on a kit list." },
    { type: "text", body: "I’ve also learned where redundancy actually matters. You don’t necessarily need two of everything. You need a backup for the things that can stop the entire shoot." },
    { type: "text", body: "That’s something you learn pretty quickly when you’re the person standing there looking at a dead piece of equipment while everyone else is waiting." },
    { type: "image", file: "images/Jacky-Chung-1.jpg", ratio: "1718:2000", caption: "" },

    { type: "heading", text: "What I bring onto a shoot" },
    { type: "text", body: "When I’m working as a camera assistant or Ronin 2 Gimbal technician, I approach the kit a little differently now." },
    { type: "text", body: "I know what the rental house is going to worry about when the gear comes back. I know which batteries I want charged properly. I know which cables I want an extra of. I know what needs to be tested before we leave and what probably doesn’t." },
    { type: "text", body: "More importantly, I know that a camera package isn’t just a list of equipment. It’s a system. If one small part of that system doesn’t work, suddenly five people are standing around waiting for it." },
    { type: "text", body: "Four years in a rental house has made me much more practical about shooting." },
    { type: "text", body: "I still like nice cameras and expensive lenses. I’m not going to pretend I don’t." },
    { type: "text", body: "But these days, if something is reliable, quick to use and unlikely to ruin someone’s day, it gets my vote." },
    { type: "text", body: "That’s probably the biggest thing the rental house taught me: the best gear isn’t always the most exciting gear. It’s the gear that lets everyone get on with the shoot." },

    { type: "quote", text: "Knowing what breaks is worth more than knowing what’s new.", who: "" },

    { type: "heading", text: "What this means on a shoot" },
    { type: "list", items: [
      "I build kits around the actual job, not just the wishlist. If something is likely to fail, I’d rather have a backup than another fancy accessory nobody touches.",
      "I know what gear costs to rent, replace, and, more importantly, what it costs when a shoot loses an hour because of it.",
      "I know how rental houses think, which makes it easier to get the right gear without overcomplicating the package.",
      "And when something goes wrong, there’s a good chance I’ve already seen it happen before, so I usually have a pretty good idea of where to start and how to sort it out.",
    ] },

    { type: "text", body: "None of this makes me a better shooter overnight. I still need to know where to put the camera and how to light the scene." },
    { type: "text", body: "It just means I spend a little less time worrying about the gear, and a little more time getting the shot." },

  ],
},

/* ========================================================================== */
{
  id: "intern-to-head",
  label: "Leadership",
  title: "From Intern to Department Head",
  standfirst: "I started at 2117 as an intern. Four years later I head both the Camera and the Light & Grip departments. Here is what actually changed.",
  hero: "",
  meta: [
    { label: "Started", value: "May 2022, as an intern" },
    { label: "Now",     value: "Head of two departments" },
    { label: "Scope",   value: "Camera, Light & Grip" },
  ],
  blocks: [
    { type: "duo",
      files: ["images/Jacky-Chung-7.jpg", "images/Jacky-Chung-4.jpg"],
      ratio: "2:3",
      caption: "" },

    { type: "text", body: "I joined 2117 in 2022 as an intern, mostly doing whatever nobody else had time for. Cleaning kit, checking things back in, learning where everything lived." },
    { type: "text", body: "Nobody sits you down and explains an inventory. You learn it by handling it, usually while someone is waiting for you to find something." },

    { type: "stats", items: [
      { value: "May 2022", label: "camera dept intern" },
      { value: "Aug 2022", label: "rental house technician" },
      { value: "Mar 2023", label: "head of light & grip" },
      { value: "Mar 2024", label: "camera dept supervisor" },
      { value: "Mar 2026", label: "head of camera, light & grip" },
    ] },

    { type: "heading", text: "Getting good at the job is the easy part" },
    { type: "text", body: "Being good at the work is what gets you promoted. Then it quietly becomes the thing standing in your way." },
    { type: "text", body: "When you know you can do something faster yourself, you do it yourself. I did that for a long time. It works fine until there is more work than there are hours, and then it stops working all at once." },
    { type: "text", body: "The hardest part of my first year running a department was not the work. It was giving the work away and then not hovering while someone else did it differently." },

    { type: "heading", text: "What the job actually is now" },
    { type: "text", body: "Most of my week is not spent touching cameras. It is quotes and pricing, deciding what we buy and what we do not, chasing repairs, talking to clients about what they actually need rather than what they asked for, and making sure the people in both departments know what they are doing on Monday." },
    { type: "text", body: "When something expensive breaks, the repair is mine to organise. Serial numbers, paperwork, shipping it across the world to whoever can fix it, and explaining the cost to the person who has to sign it off. It is not exciting. It is a very good education in what things really cost." },

    { type: "heading", text: "How I hand work out" },
    { type: "list", items: [
      "Simple, repeatable work goes to whoever is newest. It is how they learn the inventory, and it is how I learned it.",
      "Anything technical goes to whoever is actually technical, not to whoever happens to be free.",
      "If it goes wrong, it is mine. If it goes well, it is theirs. That is not generosity, it is just the only version that keeps people around.",
    ] },

    { type: "quote", text: "Manage people, not tasks.", who: "" },

    { type: "heading", text: "Two departments, one floor" },
    { type: "text", body: "Camera and Light & Grip used to run separately. Two prep rooms, two inventories, and two different answers to the question of what was actually available on Thursday." },
    { type: "text", body: "Running both means there is one answer. Quotes go out faster because I am not waiting to hear back from myself, and a job stops getting double-booked against itself." },

    { type: "heading", text: "What this has to do with shooting" },
    { type: "text", body: "On paper this is a logistics job. In practice it has been four years of watching how a shoot gets put together, from the side most people never see." },
    { type: "text", body: "So when I turn up as a camera assistant or a gimbal technician, I am not learning the package on the day. I already know how it goes together, what it does when it has had a hard week, and which part of it is going to need attention before anyone else notices." },
    { type: "text", body: "And when something does fail at the worst possible moment, there is a good chance I have seen that exact failure before, from the other side of the counter. I am not the person standing there hoping somebody else sorts it out." },
    { type: "text", body: "That is the part that comes with me onto a shoot." },

    { type: "duo",
      files: ["images/Jacky-Chung-6.jpg", "images/About-Me.jpg"],
      ratio: "2:3",
      caption: "" },
  ],
},

/* ========================================================================== */
{
  id: "ai-hackathon",
  label: "AI",
  title: "Winning an AI Video Hackathon",
  standfirst: "Best Video in the AI Social Media Avatar category at the BytePlus Seedance 2.0 hackathon, March 2026. Over 600 creators entered. We had five hours from the brief to the deadline.",
  hero: "",
  meta: [
    { label: "Event",  value: "Seedance 2.0 by BytePlus" },
    { label: "Result", value: "Best Video, AI Social Media Avatar" },
    { label: "Field",  value: "600+ creators" },
    { label: "Time",   value: "5 hours, brief to deadline" },
  ],
  blocks: [
    { type: "text", body: "I entered because brand social is heading this way whether I like it or not, and I would rather understand the tools than have an opinion about them." },

    { type: "heading", text: "The brief" },
    { type: "text", body: "Design a captivating AI avatar for a modern brand on TikTok or Instagram Reels. Creativity, brand fit, engagement potential. That was the whole brief." },
    { type: "text", body: "Five hours from the brief being read out to the deadline. No pre-production, no shot list waiting in a drawer, and no second attempt." },

    { type: "heading", text: "What I made" },
    { type: "text", body: "A short promotional film for Cirello, an electric crossover SUV. The avatar is a young woman taking her new car out for a drive, cut the way she would actually post it." },
    { type: "text", body: "Cirello is not a real company. I invented the brand, the car and the person who drives it, because the brief asked for an avatar for a modern brand and did not supply one. So the first hour went on deciding who she was and what the car was for, before a single shot existed." },
    { type: "list", items: [
      "She records a greeting in front of the car, parked near the city skyline, and introduces it.",
      "She gets in, the touchscreen comes up with ENGINE ON, and she pulls away.",
      "The panoramic sunroof opens onto high-rise views, and the dashboard gets its own beat.",
      "Tracking shots follow the red car through city streets and up onto elevated highways.",
      "It ends on the Cirello logo animation.",
    ] },

    { type: "video",
      thumb:   "Reels-Thumbnail/Cirello-Car.png",
      url:     "https://youtube.com/shorts/XV7gd18uofo",
      title:   "",
      ratio:   "1080:1920",
      caption: "" },

    { type: "heading", text: "Why it looks real" },
    { type: "text", body: "This is the part I think actually won it, and it has nothing to do with prompting." },
    { type: "text", body: "I have worked on car commercials at 2117, including Honda and Porsche shoots. I was the camera assistant on those jobs. You stand close enough to watch how a DP picks a focal length for a car, where the light gets put, and how the camera moves alongside the thing. Car commercials have their own grammar and you pick it up by being there." },
    { type: "text", body: "So when I generated shots, I asked for the things I had watched those crews build." },
    { type: "list", items: [
      "Name the lens. Left alone these tools default to something wide and weightless. Asking for a 35mm or an 85mm gives you the perspective and compression a real lens would have produced, and the eye reads that before it reads anything else.",
      "Decide where the light comes from. On set you pick the key and everything answers to it. Generated footage will happily light a face from nowhere, from two directions at once, with no shadow to pay for it. Choosing the source first and holding it across every shot is most of the difference.",
      "Give the camera mass. A real dolly has inertia. A real handheld frame is always making small corrections. Asking for a slow push instead of a cinematic camera move gets you something that behaves like it weighs something.",
      "Move it like a car commercial. The tracking shots came from jobs I have actually been on. Cars get covered in a particular way, and it is obvious when a generated one does not know that.",
      "Shoot coverage, not clips. Eyelines, screen direction, a wide before a close. Four years of watching edits fall apart over continuity is what tells you which shots you still need before you have generated a single one.",
    ] },
    { type: "text", body: "Knowing what the tool cannot do is the other half of it. Generated footage still comes apart on the small things a client spots first. Hands. Reflections in glass and paint. Anything that has to behave like it has weight. On a car that matters more than usual, because reflection is most of what a car looks like." },
    { type: "text", body: "So I framed and cut around the places where it showed. That is a decision you can only make if you already know what you are looking at." },
    { type: "text", body: "None of that is an AI skill. It is the same judgement you use standing behind a camera, pointed at a different tool." },

    { type: "heading", text: "Where the tools are genuinely good now" },
    { type: "list", items: [
      "One face, all the way through. The avatar is the same person in the vlog frame, behind the wheel and in profile at speed. Character consistency was the thing that gave these videos away until recently, and it is mostly solved.",
      "The product holds its shape. The car stays the same car from shot to shot, same body line, same red. For brand work that matters more than anything else on this list, because a client will forgive a soft frame and will never forgive their product looking wrong.",
      "Everything that normally eats the day. No car to book, no location, no permits, no crew call. A shot I did not like could be changed in minutes instead of costing a reshoot. In five hours that is the only reason the piece exists at all.",
    ] },

    { type: "quote", text: "The tool can make almost any shot. It still cannot tell you which shot you need.", who: "" },

    { type: "heading", text: "Why this matters to a content team" },
    { type: "text", body: "Prompting is the easy part. The useful skill is knowing which shots are worth generating and which are faster to just go and film, and being able to tell the difference before the money is spent." },
    { type: "text", body: "Four years around real shoots is what makes that judgement possible." },
  ],
},

/* ========================================================================== */
{
  id: "interiors",
  label: "Interiors",
  title: "480 Square Feet of Malayan Deco",
  standfirst: "I moved into an empty studio in Petaling Jaya and furnished it almost entirely secondhand, piece by piece, found across four states.",
  hero: "images/house-02.jpeg",
  meta: [
    { label: "Size",    value: "480 sq ft, studio" },
    { label: "Style",   value: "Malayan Deco and mid-century" },
    { label: "Sourced", value: "Ipoh, Penang, Melaka, Johor" },
  ],
  blocks: [
    { type: "text", body: "I moved into an empty studio in Petaling Jaya with very little to start with. There was no furniture, nothing built in to work around, and no option to make structural changes. I wanted to see how far I could take the place anyway, using nothing but furniture, colour, lighting and the things that sit on top of them. So I treated the apartment as a small exercise in collecting. Almost everything came secondhand, found piece by piece over several months from sellers, dealers and old homes around Malaysia." },
    { type: "text", body: "The room eventually became a mix of Malayan Deco and mid-century modern, with teak, darker timber, old ceramics, coloured glass and a few things I bought simply because I liked them." },
    { type: "text", body: "Nothing came as a set. That was the point." },

    { type: "heading", text: "How I approach a space" },
    { type: "text", body: "I didn’t start with a furniture set or a reference image. I started with pieces I liked, then worked out what belonged around them." },
    { type: "text", body: "So nothing got bought on its own merits. Size, material, age, colour and where a thing would sit all changed how everything near it would feel, and I had to guess at that before handing over any money. Some things worked straight away. Others got moved, replaced, or taken out." },

    { type: "heading", text: "Building a room one piece at a time" },
    { type: "text", body: "I spent months looking through Carousell, Facebook Marketplace, antique dealers and listings that disappeared almost as quickly as they appeared." },
    { type: "text", body: "There is a bookmatched Burmese teak wardrobe from Ipoh that became one of the anchors of the room. An Art Deco cabinet came out of an old kampung house in Melaka shortly before the house was demolished. I found a solid 1930s teak table from Penang, a mid-century desk from Johor, and a 1960s teak veneer sideboard." },

    { type: "image",
      file:    "images/house-10.jpeg",
      ratio:   "1015:1280",
      caption: "" },

    { type: "text", body: "Then there are the pieces I still haven’t managed to identify properly. A spindle-back chair that looks French. A ceramic lamp with no maker’s mark. Small objects picked up because the shape, material or colour felt right." },
    { type: "text", body: "I like that part of collecting. You don’t always know exactly what something is when you find it. Sometimes you have to look at the construction, the timber, the hardware and the proportions, then work backwards from there." },

    /* `captions` runs in step with `files`: the first line belongs to the
       first picture, and appears when that picture is clicked open. */
    { type: "trio",
      files: ["images/house-14.jpeg", "images/house-07.jpeg", "images/house-11.jpeg"],
      ratio: "3:4",
      captions: [
        "The bookmatched Burmese teak wardrobe, found in Ipoh.",
        "The Art Deco cabinet, out of a kampung house in Melaka shortly before it came down.",
        "Vintage venetian mirror gifted from an antique seller.",
      ],
      caption: "" },

    { type: "heading", text: "Making different periods work together" },
    { type: "text", body: "The hardest part wasn’t finding old furniture. It was stopping the room from looking like a collection of old furniture." },
    { type: "text", body: "I wanted the larger pieces to do most of the talking. The dark wardrobe gives the room some weight. The lighter timber sideboard keeps that weight from taking over. The geometric Art Deco cabinet sits between them without trying to match either one." },
    { type: "text", body: "The coffee table is deliberately heavy. The sofa and chairs are quieter. Smaller objects are kept fairly sparse." },
    { type: "text", body: "I was paying attention to proportion as much as style. If everything is trying to be interesting, nothing is." },

    { type: "heading", text: "Butter yellow, olive and teak" },
    { type: "text", body: "The whole apartment was white when I moved in. I wanted to get away from that blank, rental-apartment feeling, so I started with colour. The butter yellow walls were inspired by the old Malacca shophouses I kept coming back to, particularly the combination of warm painted walls and worn olive-green tiles." },
    { type: "text", body: "I carried the olive into the carpet and the kitchen backsplash, then let the different tones of teak and darker timber do the rest." },
    { type: "text", body: "The palette wasn’t meant to make everything match. It was more about giving furniture from different periods somewhere to sit together." },
    { type: "text", body: "The yellow changes quite a lot with the light, too. During the day it feels soft and slightly dusty. At night, with the lamps on, it becomes warmer and deeper." },

    { type: "image",
      file:    "images/house-13.jpeg",
      caption: "Olive green in the kitchen, from the same family of colours as the shophouse tiles." },

    { type: "heading", text: "The details matter" },
    { type: "text", body: "A lot of the character ended up coming from things that weren’t part of the original furniture plan." },
    { type: "list", items: [
      "The tassels on the wardrobe handles.",
      "The old wall sconces.",
      "The framed mirror above the dining cabinet.",
      "The coloured glasses on the kitchen shelf.",
      "The pleated fabric under the kitchen counter.",
    ] },
    { type: "text", body: "None of these things are particularly important on their own. Together, they change how the room feels." },
    { type: "text", body: "That’s probably what I enjoy most about interiors: finding the small decisions that make a space feel like someone actually lives there." },

    { type: "heading", text: "A small room, but not a minimal one" },
    { type: "text", body: "At 480 square feet, there isn’t much room to hide a bad decision." },
    { type: "text", body: "Every large piece affects the next one. A cabinet that’s slightly too deep changes the walkway. A dark piece in the wrong place can make the room feel heavy. A colour that works on its own can become completely different once it sits next to timber, fabric and natural light." },
    { type: "text", body: "So I kept adjusting. Moving furniture around. Swapping objects. Taking things away. Bringing something back a week later." },
    { type: "text", body: "The final room isn’t really a single style. It’s a collection of things I found interesting, held together by colour, proportion and a fairly stubborn refusal to buy furniture just because it matches." },

    { type: "heading", text: "What this is, as a skill" },
    { type: "text", body: "None of this was a job. It is somewhere I live, and I paid for all of it myself." },
    { type: "text", body: "The parts that took the longest are the parts that transfer. Spotting a piece worth buying before somebody else does. Working out what something is from its construction when there is no label on it. Making a room work inside a rental agreement, in 480 square feet, with nothing structural allowed to change. Choosing a colour and then living with it long enough to know whether it was right." },
    { type: "text", body: "That is most of the work, whether the room is mine or somebody else’s." },

    { type: "quote", text: "Find good things. Understand why they work. Then give them somewhere to belong.", who: "" },
  ],
},

];

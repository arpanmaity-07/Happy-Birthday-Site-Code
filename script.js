/* ============================================================
   CINEMATIC BIRTHDAY — SCRIPT (vanilla)
============================================================ */

(function () {
  "use strict";

  /* ---------- DATA ---------- */
  // Royalty-free Unsplash images (swap with your own at any time)
  const MEMORIES = [
    {
      src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1600&q=80&auto=format&fit=crop",
      caption: "“The first laugh I ever heard from you — instant friendship, no warning, no take-backs.”",
    },
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80&auto=format&fit=crop",
      caption: "“Golden hour, terrible photo, perfect memory. The trinity of any good friendship.”",
    },
    {
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80&auto=format&fit=crop",
      caption: "“We laughed loudly. We agreed to never speak of it. A great day.”",
    },
    {
      src: "https://images.unsplash.com/photo-1496843916299-590492c751f4?w=1600&q=80&auto=format&fit=crop",
      caption: "“Some afternoons exist so we have something to quote at each other for the rest of our lives.”",
    },
    {
      src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=80&auto=format&fit=crop",
      caption: "“You, framed by the city lights — main character energy, as always.”",
    },
    {
      src: "https://images.unsplash.com/photo-1529635388087-3afd28d260e1?w=1600&q=80&auto=format&fit=crop",
      caption: "“If I could keep one frame from this year, it'd probably be this one. Don't tell the others.”",
    },
  ];

  const TIMELINE = [
    {
      month: "January",
      title: "A quiet beginning.",
      text: "The year opened like a slow page-turn — and you, already the funniest sentence on it.",
      src: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1200&q=80&auto=format&fit=crop",
    },
    {
      month: "March",
      title: "First spring rain.",
      text: "You laughed because we forgot the umbrella again. I laughed because of course we did.",
      src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80&auto=format&fit=crop",
    },
    {
      month: "June",
      title: "Sunlit afternoons.",
      text: "Long days, longer voice notes, and that one ice cream you absolutely refused to share.",
      src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80&auto=format&fit=crop&sat=-100",
    },
    {
      month: "September",
      title: "Almost autumn.",
      text: "We walked nowhere in particular and somehow solved most of our lives along the way.",
      src: "https://images.unsplash.com/photo-1476611317561-60117649dd94?w=1200&q=80&auto=format&fit=crop",
    },
    {
      month: "December",
      title: "Frozen lights.",
      text: "The world wore tiny stars in its windows — but you were still the loudest one in the room.",
      src: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1200&q=80&auto=format&fit=crop&hue=200",
    },
  ];

  const QUOTES = [
    {
      text: "You are the calm during chaos, and the chaos during calm. A complete package, really.",
      meta: "01 · A truth",
    },
    {
      text: "I hope your year is gentle, your coffee is hot, and your group chats are blessedly drama-free.",
      meta: "02 · A small wish",
    },
    {
      text: "Some people light up rooms. You light up entire group chats.",
      meta: "03 · A compliment",
    },
    {
      text: "If joy had a face, it would probably copy your terrible dance moves.",
      meta: "04 · A promise",
    },
    {
      text: "Happy birthday to my favourite recurring character.",
      meta: "05 · The headline",
    },
  ];

  /* ---------- LOADER ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 700);
  });
  // Safety: hide after 2.5s no matter what
  setTimeout(() => loader && loader.classList.add("hidden"), 2500);

  /* ---------- CUSTOM CURSOR ---------- */
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
  function tickCursor() {
    if (dot) { dot.style.left = mx + "px"; dot.style.top = my + "px"; }
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    if (ring) { ring.style.left = rx + "px"; ring.style.top = ry + "px"; }
    requestAnimationFrame(tickCursor);
  }
  tickCursor();
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, .thumb, .quote-card, .timeline-image")) {
      document.body.classList.add("cursor-hover");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, .thumb, .quote-card, .timeline-image")) {
      document.body.classList.remove("cursor-hover");
    }
  });

  /* ---------- PROGRESS BAR ---------- */
  const progressBar = document.getElementById("progressBar");
  function onScrollProgress() {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progressBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", onScrollProgress, { passive: true });

  /* ---------- FLOATING NAV ---------- */
  const nav = document.querySelector(".floating-nav");
  const navLinks = document.querySelectorAll(".nav-pill");
  const sections = ["hero", "message", "gallery", "timeline", "quotes", "surprise", "ending"]
    .map((id) => document.getElementById(id));

  function onScrollNav() {
    if (window.scrollY > 200) nav.classList.add("visible");
    else nav.classList.remove("visible");
    let current = "hero";
    for (const s of sections) {
      if (!s) continue;
      const rect = s.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) current = s.id;
    }
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------- HERO TITLE TYPEWRITER / REVEAL ---------- */
  const words = document.querySelectorAll(".hero-title .word");
  setTimeout(() => {
    words.forEach((w, i) => setTimeout(() => w.classList.add("in"), i * 280));
  }, 600);

  /* ---------- REVEAL ON SCROLL ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- PARTICLES ---------- */
  const pCanvas = document.getElementById("particles");
  const pCtx = pCanvas.getContext("2d");
  let particles = [];
  function resizeParticles() {
    pCanvas.width = window.innerWidth * window.devicePixelRatio;
    pCanvas.height = window.innerHeight * window.devicePixelRatio;
    pCanvas.style.width = window.innerWidth + "px";
    pCanvas.style.height = window.innerHeight + "px";
    pCtx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }
  resizeParticles();
  window.addEventListener("resize", resizeParticles);
  function initParticles() {
    const count = Math.min(60, Math.floor(window.innerWidth / 22));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.25 - 0.05,
        a: Math.random() * 0.5 + 0.15,
        hue: Math.random() < 0.5 ? 45 : 320, // gold or pink
      });
    }
  }
  initParticles();
  window.addEventListener("resize", initParticles);
  function drawParticles() {
    pCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = window.innerHeight + 10; p.x = Math.random() * window.innerWidth; }
      if (p.x < -10) p.x = window.innerWidth + 10;
      if (p.x > window.innerWidth + 10) p.x = -10;
      pCtx.beginPath();
      pCtx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.a})`;
      pCtx.shadowBlur = 10;
      pCtx.shadowColor = `hsla(${p.hue}, 90%, 70%, 0.6)`;
      pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pCtx.fill();
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* ---------- GALLERY REEL ---------- */
  const reelStage = document.getElementById("reelStage");
  const reelCounter = document.getElementById("reelCounter");
  const reelCaption = document.getElementById("reelCaption");
  const reelFill = document.getElementById("reelProgressFill");
  const reelThumbs = document.getElementById("reelThumbs");
  const reelPrev = document.getElementById("reelPrev");
  const reelNext = document.getElementById("reelNext");
  const reelPlay = document.getElementById("reelPlay");
  const reelPlayIcon = document.getElementById("reelPlayIcon");

  // Render slides + thumbs
  MEMORIES.forEach((m, i) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.dataset.idx = i;
    slide.innerHTML = `<img src="${m.src}" alt="memory ${i + 1}" loading="${i < 2 ? "eager" : "lazy"}" />`;
    reelStage.appendChild(slide);

    const t = document.createElement("button");
    t.className = "thumb";
    t.dataset.testid = `reel-thumb-${i}`;
    t.dataset.idx = i;
    t.innerHTML = `<img src="${m.src}" alt="" />`;
    t.addEventListener("click", () => goTo(i, true));
    reelThumbs.appendChild(t);
  });

  // Letterbox bars
  const barTop = document.createElement("div"); barTop.className = "bar top";
  const barBot = document.createElement("div"); barBot.className = "bar bot";
  reelStage.appendChild(barTop); reelStage.appendChild(barBot);
  setTimeout(() => reelStage.classList.add("cinema"), 1200);

  const slides = reelStage.querySelectorAll(".slide");
  const thumbs = reelThumbs.querySelectorAll(".thumb");

  let current = 0;
  let playing = true;
  const HOLD = 5200; // ms per slide
  let timerStart = 0, raf = null;

  function paintProgress(now) {
    const elapsed = now - timerStart;
    const pct = Math.min(100, (elapsed / HOLD) * 100);
    reelFill.style.width = pct + "%";
    if (playing && elapsed >= HOLD) {
      goTo((current + 1) % MEMORIES.length);
    } else {
      raf = requestAnimationFrame(paintProgress);
    }
  }

  function startTimer() {
    cancelAnimationFrame(raf);
    timerStart = performance.now();
    reelFill.style.width = "0%";
    raf = requestAnimationFrame(paintProgress);
  }

  function pauseTimer() {
    cancelAnimationFrame(raf);
  }

  function goTo(idx, userTriggered) {
    if (idx === current) return;
    const prev = current;
    current = idx;
    slides[prev].classList.remove("active");
    slides[prev].classList.add("out");
    setTimeout(() => slides[prev].classList.remove("out"), 1600);
    slides[current].classList.add("active");

    thumbs.forEach((t, i) => t.classList.toggle("active", i === current));

    reelCounter.textContent = String(current + 1).padStart(2, "0") + " / " + String(MEMORIES.length).padStart(2, "0");
    reelCaption.classList.remove("in");
    setTimeout(() => {
      reelCaption.textContent = MEMORIES[current].caption;
      reelCaption.classList.add("in");
    }, 320);

    if (playing) startTimer();
    if (userTriggered && !playing) reelFill.style.width = "0%";
  }

  function setPlay(on) {
    playing = on;
    reelPlay.classList.toggle("paused", !on);
    if (on) {
      reelPlayIcon.innerHTML = '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>'; // pause icon
      startTimer();
    } else {
      reelPlayIcon.innerHTML = '<path d="M6 4l14 8L6 20z"/>'; // play icon
      pauseTimer();
    }
  }

  reelPrev.addEventListener("click", () => goTo((current - 1 + MEMORIES.length) % MEMORIES.length, true));
  reelNext.addEventListener("click", () => goTo((current + 1) % MEMORIES.length, true));
  reelPlay.addEventListener("click", () => setPlay(!playing));

  // Pause when not in viewport (perf)
  const reelIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && playing) startTimer();
        else pauseTimer();
      }
    },
    { threshold: 0.25 }
  );
  reelIO.observe(reelStage);

  // initialise first slide
  slides[0].classList.add("active");
  thumbs[0].classList.add("active");
  reelCounter.textContent = "01 / " + String(MEMORIES.length).padStart(2, "0");
  reelCaption.textContent = MEMORIES[0].caption;
  setTimeout(() => reelCaption.classList.add("in"), 700);

  /* ---------- TIMELINE ---------- */
  const timelineTrack = document.getElementById("timelineTrack");
  TIMELINE.forEach((t, i) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.dataset.testid = `timeline-item-${i}`;
    item.innerHTML = `
      <div class="timeline-image"><img src="${t.src}" alt="${t.title}" loading="lazy"/></div>
      <div class="timeline-card">
        <div class="timeline-month">${t.month}</div>
        <h3 class="timeline-title">${t.title}</h3>
        <p class="timeline-text">${t.text}</p>
      </div>
      <div class="timeline-dot"></div>
    `;
    timelineTrack.appendChild(item);
  });
  const timelineItems = timelineTrack.querySelectorAll(".timeline-item");
  const timelineIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.18 }
  );
  timelineItems.forEach((el) => timelineIO.observe(el));

  /* ---------- QUOTES ---------- */
  const qGrid = document.getElementById("quoteGrid");
  QUOTES.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "quote-card reveal";
    card.dataset.testid = `quote-card-${i}`;
    card.innerHTML = `
      <div class="q-mark">“</div>
      <p class="q-text">${q.text}</p>
      <div class="q-meta">${q.meta}</div>
    `;
    qGrid.appendChild(card);
    io.observe(card);
  });

  /* ---------- SURPRISE / CONFETTI ---------- */
  const surpriseBtn = document.getElementById("surpriseBtn");
  const surpriseReveal = document.getElementById("surpriseReveal");
  const confettiCanvas = document.getElementById("confettiCanvas");
  const cctx = confettiCanvas.getContext("2d");
  let confettiPieces = [];
  let confettiRAF = null;

  function resizeConfetti() {
    const rect = confettiCanvas.getBoundingClientRect();
    confettiCanvas.width = rect.width * window.devicePixelRatio;
    confettiCanvas.height = rect.height * window.devicePixelRatio;
    cctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }
  window.addEventListener("resize", resizeConfetti);

  function fireConfetti() {
    resizeConfetti();
    const rect = confettiCanvas.getBoundingClientRect();
    const palette = ["#f7d27c", "#9ec8ff", "#c79bff", "#fff0c2", "#a0e8d0"];
    for (let i = 0; i < 220; i++) {
      confettiPieces.push({
        x: rect.width / 2 + (Math.random() - 0.5) * 80,
        y: rect.height * 0.55 + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 16 - 6,
        g: 0.35 + Math.random() * 0.2,
        size: Math.random() * 8 + 4,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: palette[(Math.random() * palette.length) | 0],
        life: 0,
        shape: Math.random() < 0.35 ? "star" : "rect",
      });
    }
    if (!confettiRAF) tickConfetti();
  }

  function drawStar(x, y, size, color, rot) {
    cctx.save();
    cctx.translate(x, y);
    cctx.rotate(rot);
    cctx.fillStyle = color;
    cctx.beginPath();
    const spikes = 5;
    const outer = size * 0.9;
    const inner = size * 0.38;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (Math.PI / spikes) * i - Math.PI / 2;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (i === 0) cctx.moveTo(px, py); else cctx.lineTo(px, py);
    }
    cctx.closePath();
    cctx.fill();
    cctx.restore();
  }

  function tickConfetti() {
    const rect = confettiCanvas.getBoundingClientRect();
    cctx.clearRect(0, 0, rect.width, rect.height);
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const c = confettiPieces[i];
      c.vy += c.g;
      c.x += c.vx;
      c.y += c.vy;
      c.rot += c.vr;
      c.life++;
      if (c.shape === "star") {
        drawStar(c.x, c.y, c.size, c.color, c.rot);
      } else {
        cctx.save();
        cctx.translate(c.x, c.y);
        cctx.rotate(c.rot);
        cctx.fillStyle = c.color;
        cctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
        cctx.restore();
      }
      if (c.y > rect.height + 30 || c.life > 500) confettiPieces.splice(i, 1);
    }
    if (confettiPieces.length > 0) {
      confettiRAF = requestAnimationFrame(tickConfetti);
    } else {
      confettiRAF = null;
      cctx.clearRect(0, 0, rect.width, rect.height);
    }
  }

  surpriseBtn.addEventListener("click", () => {
    fireConfetti();
    surpriseReveal.classList.add("in");
    // Dynamically tint background briefly
    document.body.style.transition = "background 1.6s ease";
    document.body.style.backgroundColor = "#16092e";
    setTimeout(() => (document.body.style.backgroundColor = ""), 2500);
    spawnHeartsBurst();
  });

  /* ---------- ENDING: sparkles + word reveal ---------- */
  const heartsRain = document.getElementById("heartsRain");
  function spawnHeart(persistentEl) {
    const h = document.createElement("span");
    h.className = "heart-float";
    h.textContent = "✦";
    const size = Math.random() * 1.4 + 0.7;
    h.style.left = Math.random() * 100 + "%";
    h.style.fontSize = size + "rem";
    h.style.opacity = (Math.random() * 0.5 + 0.4).toFixed(2);
    h.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
    h.style.animationDuration = (Math.random() * 6 + 7) + "s";
    h.style.animationDelay = (Math.random() * 4) + "s";
    (persistentEl || heartsRain).appendChild(h);
  }

  // pre-fill some sparkles in ending
  for (let i = 0; i < 24; i++) spawnHeart();
  // continuously add more
  setInterval(() => {
    const ending = document.getElementById("ending").getBoundingClientRect();
    if (ending.top < window.innerHeight && ending.bottom > 0) {
      spawnHeart();
      const all = heartsRain.querySelectorAll(".heart-float");
      if (all.length > 60) all[0].remove();
    }
  }, 800);

  function spawnHeartsBurst() {
    // Temporary sparkles across the screen
    for (let i = 0; i < 22; i++) {
      const h = document.createElement("span");
      h.className = "heart-float";
      h.textContent = Math.random() < 0.5 ? "✦" : "✺";
      h.style.position = "fixed";
      h.style.left = Math.random() * 100 + "%";
      h.style.top = "0";
      h.style.fontSize = (Math.random() * 1.6 + 0.9) + "rem";
      h.style.zIndex = 50;
      h.style.pointerEvents = "none";
      h.style.color = Math.random() < 0.5 ? "#f7d27c" : "#9ec8ff";
      h.style.textShadow = "0 0 18px rgba(247, 210, 124, 0.7)";
      h.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
      h.style.animationDuration = (Math.random() * 4 + 5) + "s";
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 9000);
    }
  }

  // Ending title word reveal
  const endingWords = document.querySelectorAll(".ending-title span");
  const endingIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          endingWords.forEach((w, i) => setTimeout(() => w.classList.add("in"), i * 300));
          endingIO.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  endingIO.observe(document.getElementById("ending"));

  /* ---------- MUSIC TOGGLE ---------- */
  const musicBtn = document.getElementById("musicToggle");
  const musicLabel = document.getElementById("musicLabel");
  const audio = document.getElementById("ambientAudio");
  let musicOn = false;

  musicBtn.addEventListener("click", () => {
    musicOn = !musicOn;
    if (musicOn) {
      audio.volume = 0;
      const p = audio.play();
      if (p && p.catch) {
        p.then(() => {
          musicBtn.classList.add("playing");
          musicLabel.textContent = "Pause music";
          fadeVolume(0, 0.5, 1200);
        }).catch(() => {
          musicOn = false;
          musicBtn.classList.remove("playing");
          musicLabel.textContent = "No audio file";
          setTimeout(() => (musicLabel.textContent = "Play music"), 1800);
        });
      } else {
        musicBtn.classList.add("playing");
        musicLabel.textContent = "Pause music";
      }
    } else {
      fadeVolume(audio.volume, 0, 600, () => {
        audio.pause();
        musicBtn.classList.remove("playing");
        musicLabel.textContent = "Play music";
      });
    }
  });
  function fadeVolume(from, to, ms, cb) {
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / ms);
      audio.volume = from + (to - from) * t;
      if (t < 1) requestAnimationFrame(step);
      else if (cb) cb();
    }
    requestAnimationFrame(step);
  }

  /* ---------- PARALLAX MOUSE EFFECT ---------- */
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    const orbs = document.querySelectorAll(".ambient-orb");
    orbs.forEach((o, i) => {
      const f = (i + 1) * 8;
      o.style.transform = `translate(${x * f}px, ${y * f}px)`;
    });
    // Hero bg text subtle parallax
    const bgText = document.querySelector(".hero-bg-text");
    if (bgText) {
      bgText.style.transform = `translate(calc(-50% + ${x * 18}px), calc(-50% + ${y * 12}px))`;
    }
  });

  /* ---------- NAV SMOOTH SCROLL OFFSET ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 10, behavior: "smooth" });
    });
  });

  /* ---------- KEYBOARD SHORTCUTS for reel ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") reelNext.click();
    else if (e.key === "ArrowLeft") reelPrev.click();
    else if (e.key === " " && document.activeElement === document.body) {
      e.preventDefault(); reelPlay.click();
    }
  });
})();

/* =========================================================
   Iron Pulse — main script
   ========================================================= */
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const state = { lang: "ar", day: todayIndex(), yearly: false, quote: 0, booked: new Set() };
  try { state.lang = localStorage.getItem("lang") || "ar"; } catch (e) {}

  const t = (key, vars = {}) =>
    (I18N[state.lang][key] || key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
  const L = (obj) => obj[state.lang];
  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (n) => n.toLocaleString("en-US");
  const photo = (src, alt = "") =>
    `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.classList.add('img-failed')">`;

  // Saturday-first week (index 0 = Saturday)
  function todayIndex() { return (new Date().getDay() + 1) % 7; }

  /* ---------- Renderers ---------- */
  function renderMarquee() {
    const words = t("marquee").split(" — ");
    const once = words.map((w) => `<span>${w}</span>`).join("");
    $("#marquee").innerHTML = once + once + once + once;
  }

  function renderManifesto() {
    const el = $("#manifesto");
    el.innerHTML = t("about.text").split(" ").map((w) => `<span class="w">${w}</span>`).join(" ");
    updateManifesto();
  }

  function renderPrograms() {
    $("#programsList").innerHTML = PROGRAMS.map((p, i) => `
      <li class="prog" data-img="${p.image}">
        <span class="prog__num">${pad(i + 1)}</span>
        <h3 class="prog__title">${L(p.title)}</h3>
        <p class="prog__desc">${L(p.text)}</p>
        <div class="prog__meta"><b>${L(p.level)}</b>${p.sessions} ${t("programs.perWeek")}</div>
        <div class="prog__thumb">${photo(p.image)}</div>
      </li>`).join("");
  }

  function renderDays() {
    $("#dayTabs").innerHTML = DAYS.map((d, i) => `
      <button type="button" role="tab" class="day ${i === state.day ? "is-active" : ""}"
        aria-selected="${i === state.day}" data-day="${i}">${L(d)}</button>`).join("");
  }

  function renderSchedule() {
    $("#scheduleList").innerHTML = SCHEDULE[state.day].map((c, i) => {
      const id = `${state.day}-${i}`;
      const booked = state.booked.has(id);
      const full = c.spots === 0;
      const spots = c.spots - (booked ? 1 : 0);
      return `
      <div class="sched ${full ? "is-full" : ""}" style="animation-delay:${i * 70}ms">
        <div class="sched__time" dir="ltr">${c.time}<small>${c.dur} ${t("schedule.min")}</small></div>
        <div class="sched__name">${L(c.name)}</div>
        <div class="sched__coach">${L(TRAINERS[c.coach].name)}</div>
        <div class="sched__spots">${full ? t("schedule.full") : `<b>${spots}</b> ${t("schedule.spots")}`}</div>
        <button type="button" class="book-btn ${booked ? "is-booked" : ""}" data-book="${id}" ${full || booked ? "disabled" : ""}>
          ${booked ? t("schedule.booked") : full ? t("schedule.full") : t("schedule.book")}
        </button>
      </div>`;
    }).join("");
  }

  function renderTrainers() {
    $("#trainersGrid").innerHTML = TRAINERS.map((m) => `
      <article class="member fade">
        <div class="member__media reveal-media">
          <span class="member__initials">${L(m.name).split(" ").map((w) => w[0]).join("")}</span>
          ${photo(m.image, L(m.name))}
        </div>
        <div class="member__body">
          <div><h3>${L(m.name)}</h3><p>${L(m.role)}</p></div>
          <span class="member__exp">${m.years}+ ${t("trainers.exp")}</span>
        </div>
      </article>`).join("");
  }

  function planPrice(p) { return state.yearly ? Math.round(p.monthly * 0.8) : p.monthly; }

  function renderPricing() {
    $("#pricingGrid").innerHTML = PLANS.map((p) => `
      <article class="plan ${p.popular ? "plan--popular" : ""}">
        <div class="plan__top">
          <h3>${L(p.name)}</h3>
          ${p.popular ? `<span class="plan__tag">${t("pricing.popular")}</span>` : ""}
        </div>
        <div class="plan__price">
          <strong data-price="${p.id}">${fmt(planPrice(p))}</strong>
          <span>${t("pricing.currency")} ${t("pricing.perMonth")}</span>
        </div>
        <div class="plan__note" data-note="${p.id}">${planNote(p)}</div>
        <ul>${L(p.features).map((f) => `<li>${f}</li>`).join("")}</ul>
        <a href="#contact" class="btn ${p.popular ? "btn--paper" : "btn--ink"} btn--block" data-plan="${p.id}">
          <span>${t("pricing.choose")}</span><i class="btn__arrow"></i>
        </a>
      </article>`).join("");
  }

  function planNote(p) {
    return state.yearly ? `${fmt(planPrice(p) * 12)} ${t("pricing.currency")} — ${t("pricing.billedYearly")}` : "";
  }

  function renderQuote() {
    const q = TESTIMONIALS[state.quote];
    $("#quote").innerHTML = `
      <figure style="margin:0">
        <blockquote class="q-in">“${L(q.text)}”</blockquote>
        <figcaption class="q-in"><strong>${L(q.name)}</strong><span>${L(q.result)}</span></figcaption>
      </figure>`;
    $("#quoteCount").textContent = `${pad(state.quote + 1)} / ${pad(TESTIMONIALS.length)}`;
  }

  /* ---------- Language ---------- */
  function applyLang() {
    const html = document.documentElement;
    html.lang = state.lang;
    html.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.title = t("meta.title");
    $("#langBtn").textContent = state.lang === "ar" ? "EN" : "عربي";

    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $("#badgeText").textContent = t("hero.badge");

    renderMarquee();
    renderManifesto();
    renderPrograms();
    renderDays();
    renderSchedule();
    renderTrainers();
    renderPricing();
    renderQuote();
    updateBmi();
    observeMotion();
  }

  $("#langBtn").addEventListener("click", () => {
    state.lang = state.lang === "ar" ? "en" : "ar";
    try { localStorage.setItem("lang", state.lang); } catch (e) {}
    applyLang();
  });

  /* ---------- Reveal on scroll ---------- */
  // Clipped elements (.reveal-media) report no visible area, so we watch
  // their parent and reveal them through this map.
  const proxies = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      if (e.target.matches(".split-lines, .fade")) e.target.classList.add("is-in");
      (proxies.get(e.target) || []).forEach((el) => el.classList.add("is-in"));
      proxies.delete(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

  function observeMotion() {
    $$(".split-lines:not(.is-in), .fade:not(.is-in)").forEach((el) => io.observe(el));
    $$(".reveal-media:not(.is-in)").forEach((el) => {
      const parent = el.parentElement;
      if (!proxies.has(parent)) proxies.set(parent, []);
      proxies.get(parent).push(el);
      io.observe(parent);
    });
  }

  /* ---------- Navbar ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  let lastY = window.scrollY;

  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }));

  const linkObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      $$("#navLinks a").forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => linkObserver.observe(s));

  /* ---------- Scroll-driven effects ---------- */
  const heroImg = $("#heroParallax img");
  const heroMedia = $(".hero__media");
  const heroReveal = $("#heroParallax");

  function updateManifesto() {
    const el = $("#manifesto");
    const words = el.querySelectorAll(".w");
    if (reducedMotion) { words.forEach((w) => w.classList.add("on")); return; }
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.85;
    const end = vh * 0.35;
    const progress = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * 0.6)));
    const lit = Math.round(progress * words.length);
    words.forEach((w, i) => w.classList.toggle("on", i < lit));
  }

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 10);
    if (!nav.classList.contains("is-open")) nav.classList.toggle("is-hidden", y > lastY && y > 400);
    lastY = y;

    updateManifesto();

    if (!reducedMotion && heroReveal.classList.contains("is-settled")) {
      const r = heroMedia.getBoundingClientRect();
      if (r.bottom > 0) heroImg.style.transform = `translateY(${Math.max(-13, -((window.innerHeight - r.top) / window.innerHeight) * 9)}%)`;
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  // Once the hero image has revealed, hand its transform over to the parallax
  heroMedia.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "clip-path") return;
    setTimeout(() => {
      heroImg.style.transition = "transform .25s linear";
      heroReveal.classList.add("is-settled");
      onScroll();
    }, 500);
  });

  /* ---------- Counters ---------- */
  function tween(el, from, to, dur, fmtFn = fmt, suffix = "") {
    if (reducedMotion) { el.textContent = fmtFn(to) + suffix; return; }
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmtFn(Math.round(from + (to - from) * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      tween(e.target, 0, +e.target.dataset.count, 1800, fmt, e.target.dataset.suffix || "");
      counterIO.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counterIO.observe(el));

  /* ---------- Program hover preview (desktop) ---------- */
  const preview = $("#progPreview");
  const previewImg = preview.querySelector("img");
  const mouse = { x: 0, y: 0 }, pos = { x: 0, y: 0 };
  let previewRaf = null;

  function followLoop() {
    pos.x += (mouse.x - pos.x) * 0.14;
    pos.y += (mouse.y - pos.y) * 0.14;
    preview.style.left = `${pos.x}px`;
    preview.style.top = `${pos.y}px`;
    previewRaf = requestAnimationFrame(followLoop);
  }

  if (finePointer) {
    const list = $("#programsList");
    list.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      const row = e.target.closest(".prog");
      if (row && previewImg.getAttribute("src") !== row.dataset.img) previewImg.src = row.dataset.img;
    });
    list.addEventListener("mouseenter", (e) => {
      mouse.x = pos.x = e.clientX; mouse.y = pos.y = e.clientY;
      preview.classList.add("is-on");
      if (!previewRaf) followLoop();
    });
    list.addEventListener("mouseleave", () => {
      preview.classList.remove("is-on");
      cancelAnimationFrame(previewRaf); previewRaf = null;
    });
  }

  /* ---------- Schedule ---------- */
  $("#dayTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-day]");
    if (!btn) return;
    state.day = +btn.dataset.day;
    renderDays();
    renderSchedule();
  });
  $("#scheduleList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-book]");
    if (!btn || btn.disabled) return;
    state.booked.add(btn.dataset.book);
    renderSchedule();
    $$(".sched").forEach((r) => { r.style.animation = "none"; });
    toast(t("schedule.bookedToast"));
  });

  /* ---------- BMI (live sliders) ---------- */
  const hIn = $("#height"), wIn = $("#weight");
  function paintRange(input) {
    const p = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty("--p", `${p}%`);
  }
  function updateBmi() {
    const h = +hIn.value, w = +wIn.value;
    $("#heightOut").innerHTML = `${h}<small>${t("bmi.cm")}</small>`;
    $("#weightOut").innerHTML = `${w}<small>${t("bmi.kg")}</small>`;
    paintRange(hIn); paintRange(wIn);
    const bmi = w / Math.pow(h / 100, 2);
    const cat = bmi < 18.5 ? "under" : bmi < 25 ? "normal" : bmi < 30 ? "over" : "obese";
    const box = $(".bmi__result");
    box.dataset.cat = cat;
    $("#bmiValue").textContent = bmi.toFixed(1);
    $("#bmiLabel").textContent = t(`bmi.${cat}`);
    // Scale runs 15 → 40
    $("#bmiPointer").style.left = `${Math.max(0, Math.min(100, ((bmi - 15) / 25) * 100))}%`;
  }
  hIn.addEventListener("input", updateBmi);
  wIn.addEventListener("input", updateBmi);

  /* ---------- Pricing ---------- */
  $$("[data-billing]").forEach((btn) => btn.addEventListener("click", () => {
    const yearly = btn.dataset.billing === "yearly";
    if (yearly === state.yearly) return;
    const before = PLANS.map(planPrice);
    state.yearly = yearly;
    $$("[data-billing]").forEach((b) => b.classList.toggle("is-active", b === btn));
    PLANS.forEach((p, i) => {
      tween($(`[data-price="${p.id}"]`), before[i], planPrice(p), 700);
      $(`[data-note="${p.id}"]`).textContent = planNote(p);
    });
  }));

  $("#pricingGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-plan]");
    if (!btn) return;
    const plan = PLANS.find((p) => p.id === btn.dataset.plan);
    toast(t("pricing.chosenToast", { plan: L(plan.name) }));
    setTimeout(() => $("#name").focus({ preventScroll: true }), 900);
  });

  /* ---------- Testimonials ---------- */
  let quoteTimer;
  function goQuote(i) {
    state.quote = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    renderQuote();
    clearInterval(quoteTimer);
    quoteTimer = setInterval(() => goQuote(state.quote + 1), 8000);
  }
  $("#nextQuote").addEventListener("click", () => goQuote(state.quote + 1));
  $("#prevQuote").addEventListener("click", () => goQuote(state.quote - 1));
  quoteTimer = setInterval(() => goQuote(state.quote + 1), 8000);

  /* ---------- Contact form ---------- */
  const form = $("#contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name"), phone = $("#phone");
    const nameOk = name.value.trim().length >= 2;
    const phoneOk = /^\+?[\d\s-]{8,15}$/.test(phone.value.trim());
    name.closest(".field").classList.toggle("has-error", !nameOk);
    phone.closest(".field").classList.toggle("has-error", !phoneOk);
    if (!nameOk || !phoneOk) return;

    const btn = form.querySelector("[type=submit]");
    btn.classList.add("is-loading");
    // Demo only: simulate sending to a server
    setTimeout(() => {
      toast(t("form.success", { name: name.value.trim().split(" ")[0] }));
      form.reset();
      btn.classList.remove("is-loading");
    }, 900);
  });
  $$("#contactForm input").forEach((i) =>
    i.addEventListener("input", () => i.closest(".field").classList.remove("has-error")));

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-show"), 3600);
  }

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  applyLang();
  onScroll();
})();

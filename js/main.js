/* =========================================================
   Iron Pulse — main script
   ========================================================= */
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const state = {
    lang: "ar",
    day: todayIndex(),
    yearly: false,
    slide: 0,
    booked: new Set()
  };

  try { state.lang = localStorage.getItem("lang") || "ar"; } catch (e) {}

  const t = (key, vars = {}) =>
    (I18N[state.lang][key] || key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
  const L = (obj) => obj[state.lang];
  const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

  // Saturday-first week (index 0 = Saturday)
  function todayIndex() { return (new Date().getDay() + 1) % 7; }

  /* ---------- Images: graceful fallback if a photo fails to load ---------- */
  function photo(src, alt, cls = "") {
    return `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy" onerror="this.classList.add('img-failed')">`;
  }

  /* ---------- Renderers ---------- */
  function renderFeatures() {
    $("#featuresGrid").innerHTML = FEATURES.map((f) => `
      <article class="feature reveal">
        <div class="feature__icon">${icon(f.icon)}</div>
        <h3>${L(f.title)}</h3>
        <p>${L(f.text)}</p>
      </article>`).join("");
  }

  function renderPrograms() {
    $("#programsGrid").innerHTML = PROGRAMS.map((p) => `
      <article class="program reveal">
        <div class="program__media">${photo(p.image, L(p.title))}</div>
        <div class="program__body">
          <h3>${L(p.title)}</h3>
          <p>${L(p.text)}</p>
          <div class="program__meta">
            <span>${icon("pulse")} ${L(p.level)}</span>
            <span>${icon("clock")} ${p.sessions} ${t("programs.perWeek")}</span>
          </div>
        </div>
      </article>`).join("");
  }

  function renderTabs() {
    $("#dayTabs").innerHTML = DAYS.map((d, i) => `
      <button type="button" role="tab" class="tab ${i === state.day ? "is-active" : ""}"
        aria-selected="${i === state.day}" data-day="${i}">${L(d)}</button>`).join("");
  }

  function renderSchedule() {
    const list = SCHEDULE[state.day];
    $("#scheduleList").innerHTML = list.map((c, i) => {
      const id = `${state.day}-${i}`;
      const booked = state.booked.has(id);
      const spots = c.spots - (booked ? 1 : 0);
      const full = c.spots === 0;
      const coach = TRAINERS[c.coach];
      return `
      <div class="class-row ${full ? "is-full" : ""}">
        <div class="class-row__time"><strong dir="ltr">${c.time}</strong><span>${c.dur} ${state.lang === "ar" ? "دقيقة" : "min"}</span></div>
        <div class="class-row__info">
          <h4>${L(c.name)}</h4>
          <span>${L(coach.name)}</span>
        </div>
        <div class="class-row__spots">${full ? t("schedule.full") : `<b>${spots}</b> ${t("schedule.spots")}`}</div>
        <button type="button" class="btn btn--sm ${booked ? "btn--done" : "btn--outline"}"
          data-book="${id}" ${full || booked ? "disabled" : ""}>
          ${booked ? t("schedule.booked") : full ? t("schedule.full") : t("schedule.book")}
        </button>
      </div>`;
    }).join("");
  }

  function renderTrainers() {
    $("#trainersGrid").innerHTML = TRAINERS.map((tr) => `
      <article class="trainer reveal">
        <div class="trainer__media">
          ${photo(tr.image, L(tr.name))}
          <span class="trainer__initials">${L(tr.name).split(" ").map((w) => w[0]).join("")}</span>
        </div>
        <div class="trainer__body">
          <h3>${L(tr.name)}</h3>
          <p>${L(tr.role)}</p>
          <span class="trainer__exp">${tr.years}+ ${t("trainers.exp")}</span>
        </div>
      </article>`).join("");
  }

  function renderPricing() {
    $("#pricingGrid").innerHTML = PLANS.map((p) => {
      const price = state.yearly ? Math.round(p.monthly * 0.8) : p.monthly;
      return `
      <article class="plan ${p.popular ? "plan--popular" : ""} reveal">
        ${p.popular ? `<span class="plan__tag">${t("pricing.popular")}</span>` : ""}
        <h3>${L(p.name)}</h3>
        <div class="plan__price">
          <strong>${price.toLocaleString("en-US")}</strong>
          <span>${t("pricing.currency")} ${t("pricing.perMonth")}</span>
        </div>
        <small class="plan__note">${state.yearly ? `${(price * 12).toLocaleString("en-US")} ${t("pricing.currency")} — ${t("pricing.billedYearly")}` : "&nbsp;"}</small>
        <ul>${L(p.features).map((f) => `<li>${icon("check")}<span>${f}</span></li>`).join("")}</ul>
        <a href="#contact" class="btn ${p.popular ? "btn--primary" : "btn--outline"} btn--block" data-plan="${p.id}">${t("pricing.choose")}</a>
      </article>`;
    }).join("");
  }

  function renderTestimonials() {
    $("#sliderTrack").innerHTML = TESTIMONIALS.map((r) => `
      <figure class="review">
        <div class="review__stars">${icon("star").repeat(5)}</div>
        <blockquote>“${L(r.text)}”</blockquote>
        <figcaption><strong>${L(r.name)}</strong><span>${L(r.result)}</span></figcaption>
      </figure>`).join("");
    $("#sliderDots").innerHTML = TESTIMONIALS.map((_, i) =>
      `<button type="button" aria-label="${i + 1}" data-slide="${i}"></button>`).join("");
    goToSlide(state.slide);
  }

  /* ---------- Language ---------- */
  function applyLang() {
    const html = document.documentElement;
    html.lang = state.lang;
    html.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.title = t("meta.title");
    $("#langBtn").textContent = state.lang === "ar" ? "EN" : "ع";

    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });

    renderFeatures();
    renderPrograms();
    renderTabs();
    renderSchedule();
    renderTrainers();
    renderPricing();
    renderTestimonials();
    if (lastBmi) showBmi(lastBmi);
    observeReveals();
  }

  $("#langBtn").addEventListener("click", () => {
    state.lang = state.lang === "ar" ? "en" : "ar";
    try { localStorage.setItem("lang", state.lang); } catch (e) {}
    applyLang();
  });

  /* ---------- Navbar ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }));

  // Highlight the link of the section in view
  const sections = $$("main section[id]");
  const linkObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      $$("#navLinks a").forEach((a) =>
        a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => linkObserver.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); revealObserver.unobserve(e.target); }
        });
      }, { threshold: 0.12 })
    : null;

  function observeReveals() {
    $$(".reveal:not(.is-visible)").forEach((el) => {
      revealObserver ? revealObserver.observe(el) : el.classList.add("is-visible");
    });
  }

  /* ---------- Counters ---------- */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString("en-US") + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$("[data-count]").forEach((el) => counterObserver.observe(el));

  /* ---------- Schedule ---------- */
  $("#dayTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-day]");
    if (!btn) return;
    state.day = +btn.dataset.day;
    renderTabs();
    renderSchedule();
  });

  $("#scheduleList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-book]");
    if (!btn || btn.disabled) return;
    state.booked.add(btn.dataset.book);
    renderSchedule();
    toast(t("schedule.bookedToast"));
  });

  /* ---------- BMI ---------- */
  let lastBmi = null;
  $("#bmiForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const h = parseFloat($("#height").value);
    const w = parseFloat($("#weight").value);
    if (!(h >= 100 && h <= 250 && w >= 30 && w <= 300)) {
      toast(t("bmi.error"), true);
      return;
    }
    lastBmi = w / Math.pow(h / 100, 2);
    showBmi(lastBmi);
  });

  function showBmi(bmi) {
    const cat = bmi < 18.5 ? "under" : bmi < 25 ? "normal" : bmi < 30 ? "over" : "obese";
    const box = $("#bmiResult");
    box.hidden = false;
    box.dataset.cat = cat;
    $("#bmiValue").textContent = bmi.toFixed(1);
    $("#bmiLabel").textContent = t(`bmi.${cat}`);
    // Map BMI 15–40 onto 0–100% of the bar
    const pct = Math.max(0, Math.min(100, ((bmi - 15) / 25) * 100));
    $("#bmiPointer").style.insetInlineStart = `${pct}%`;
  }

  /* ---------- Pricing ---------- */
  const billing = $("#billingSwitch");
  billing.addEventListener("click", () => {
    state.yearly = !state.yearly;
    billing.setAttribute("aria-checked", state.yearly);
    billing.classList.toggle("is-on", state.yearly);
    renderPricing();
    $$("#pricingGrid .reveal").forEach((el) => el.classList.add("is-visible"));
  });

  $("#pricingGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-plan]");
    if (!btn) return;
    const plan = PLANS.find((p) => p.id === btn.dataset.plan);
    toast(t("pricing.chosenToast", { plan: L(plan.name) }));
    setTimeout(() => $("#name").focus({ preventScroll: true }), 700);
  });

  /* ---------- Testimonials slider ---------- */
  function goToSlide(i) {
    state.slide = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    const dir = state.lang === "ar" ? 1 : -1;
    $("#sliderTrack").style.transform = `translateX(${dir * state.slide * 100}%)`;
    $$("#sliderDots button").forEach((d, n) => d.classList.toggle("is-active", n === state.slide));
  }
  $("#sliderDots").addEventListener("click", (e) => {
    const d = e.target.closest("[data-slide]");
    if (d) { goToSlide(+d.dataset.slide); restartAuto(); }
  });
  let auto;
  const restartAuto = () => { clearInterval(auto); auto = setInterval(() => goToSlide(state.slide + 1), 5500); };
  restartAuto();

  // Swipe support
  let startX = null;
  const track = $("#sliderTrack");
  track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) {
      const forward = state.lang === "ar" ? dx > 0 : dx < 0;
      goToSlide(state.slide + (forward ? 1 : -1));
      restartAuto();
    }
    startX = null;
  });

  /* ---------- Contact form ---------- */
  const form = $("#contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name");
    const phone = $("#phone");
    const nameOk = name.value.trim().length >= 2;
    const phoneOk = /^\+?[\d\s-]{8,15}$/.test(phone.value.trim());
    name.closest(".field").classList.toggle("has-error", !nameOk);
    phone.closest(".field").classList.toggle("has-error", !phoneOk);
    if (!nameOk || !phoneOk) return;

    const btn = form.querySelector("[type=submit]");
    btn.disabled = true;
    btn.classList.add("is-loading");
    // Demo only: simulate sending to a server
    setTimeout(() => {
      toast(t("form.success", { name: name.value.trim().split(" ")[0] }));
      form.reset();
      btn.disabled = false;
      btn.classList.remove("is-loading");
    }, 900);
  });
  $$("#contactForm input").forEach((i) =>
    i.addEventListener("input", () => i.closest(".field").classList.remove("has-error")));

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg, isError = false) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.toggle("is-error", isError);
    el.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-show"), 3500);
  }

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  applyLang();
})();

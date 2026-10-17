// TODO: replace with the real contact email before launch
const ORDER_EMAIL = "info@artgifts.bg";

/* Photos live in assets/products/: <id>.jpg (on the wall), <id>-close.jpg (detail),
   and <id>-2.jpg … for variants, each with a -sm.jpg copy for the grid. */
const WORKS = [
  { id: "plodorodie", cat: "kartina", name: "Дърво на плодородието", size: "30 × 40 см", price: 80, frame: "дървена, 3 см, по избор",
    text: "Семейно дърво на живота. Изработено върху стъкло със специални професионални бои и цветни стъкла. Двойно темперирано в пещ за стъкло." },
  // ---- PICTURES (framed) ----
  { id: "kartina-yabalka", cat: "kartina", name: "Дърво на живота — Ябълка", photos: 2, frame: "дървена, платина",
    sizes: [["Малко", "14 × 16 см", 28], ["Средно", "18 × 22 см", 38], ["Голямо", "26 × 36 см", 89], ["Най-голямо", "30 × 40 см", 98]] },
  { id: "kartina-prestizh", cat: "kartina", name: "Дърво на живота — Престиж", price: 68, frame: "масивна ретро рамка",
    text: "Дърво с широки клони и дебел ствол, стъпило здраво на земята и пуснало дълбоки корени. Усещане за зрялост, сила и непоклатимост." },
  { id: "kartina-prolet", cat: "kartina", name: "Дърво на живота — Пролет", size: "24 × 36 см", price: 76, frame: "златна, със закопчалка",
    text: "Носи радост, топлина и много цвят в дома и офиса. Усещане за изисканост, прецизност и блестяща чистота. Предлага се само в този размер." },
  { id: "kartina-proletno-darvo", cat: "kartina", name: "Пролетно дърво", size: "26 × 36 см", price: 89, photos: 2, frame: "дървена, платина" },
  { id: "kartina-blagodat", cat: "kartina", name: "Дърво на живота — Благодат", size: "19,5 × 19,5 см с рамката", price: 35,
    frame: "дървена, със златен кант", text: "Изработено върху керамична плочка." },
  { id: "kartina-semeino", cat: "kartina", name: "Семейно дърво" },
  { id: "kartina-barok", cat: "kartina", name: "Дърво на живота — Барок", frame: "барокова" },
  { id: "kartina-byalo", cat: "kartina", name: "Дърво на живота — Бяло", frame: "бяла" },
  { id: "kartina-cheresha", cat: "kartina", name: "Дърво на живота — Череша" },
  { id: "kartina-razvitie", cat: "kartina", name: "Дърво на живота — Развитие" },
  { id: "kartina-zlatno-lyato", cat: "kartina", name: "Дърво на живота — Златно лято", frame: "златна" },

  // ---- PANELS (no frame) ----
  { id: "pana-buhal", cat: "pana", name: "Бухал", size: "12 × 12 см", price: 20, text: "Символ на мъдрост и благополучие." },
  { id: "pana-taralezh", cat: "pana", name: "Таралеж", size: "12 × 12 см", price: 20, photos: 3,
    text: "Предвестник на есента. Символизира упорития труд на този, който събира узрели плодове за зимнина. Събира слънчевите лъчи и ги пренася в дома ни." },
  { id: "pana-angel", cat: "pana", name: "Ангел Хранител", size: "12 × 14 см", price: 24, photos: 2,
    text: "Рамката на паното е изрисувана с висококачествени професионални бои за стъкло. Ангелът е от сребърна тел, огънат на ръка. Всеки има свой собствен чар и индивидуалност." },
  { id: "pana-cherno-kote", cat: "pana", name: "Черно коте за късмет", size: "12 × 12 см", price: 20,
    text: "Подарява се за късмет и безстрашие. За да си кажем: „Ще пречупя карък и ще започна без страх отново!“" },
  { id: "pana-yabalka", cat: "pana", name: "Дърво на живота — Ябълка", size: "12 × 15 см", price: 24, photos: 2,
    text: "Освен нарисуваната символика има и 8 узрели ябълкови плода. Числото 8 е символ на успех и безкрайност." },
  { id: "pana-sharena-maca", cat: "pana", name: "Шарената маца", size: "12 × 12 см", price: 20,
    text: "Подарява се за нежност, вярност, приятелство, игри и усмивки." },
  { id: "pana-sartse", cat: "pana", name: "Сърце", size: "12 × 12 см", price: 20,
    text: "Подарява се за любов, вярност и надежда. И за да не забравяш себе си и да се обичаш!" },
  { id: "pana-mazhko-sartse", cat: "pana", name: "Мъжко сърце", size: "12 × 12 см", price: 20,
    text: "Освен червено има и добавен син цвят: връзка с небето и със силния мъжки пол." },
  { id: "pana-urozhay", cat: "pana", name: "Дърво на живота — Урожай" },
  { id: "pana-rache", cat: "pana", name: "Раче", size: "12 × 12 см", price: 20,
    text: "Усещане за идването на лятото, топлината, морските почивки и плажовете." },
];
const CAT_NOTE = {
  kartina: "Дървета на живота, рисувани върху стъкло и сплавени с цветни стъкълца, в дървена рамка.",
  pana: "Без рамка. Висят на метална закачалка-кобилица, завършваща със спирала — символ на развитие и извисеност. Лесни за поставяне, подхождат на всякаква стена и лесно се почистват.",
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const P = "assets/products/";
const money = n => `${n} €`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const prices = w => w.sizes ? w.sizes.map(s => s[2]) : w.price != null ? [w.price] : [];
const priceLabel = w => w.sizes ? `от ${money(Math.min(...prices(w)))}` : w.price != null ? money(w.price) : "по запитване";
const sizeLabel = w => w.size || (w.sizes ? w.sizes.map(s => s[1].replace(" см", "")).join(" · ") + " см" : "размер при запитване");
const vid = (w, i) => w.id + (i > 1 ? `-${i}` : "");
const byId = id => WORKS.find(w => w.id === id);
const FRAMES = { platinum: "Платина", walnut: "Тъмен орех", black: "Черно и сребро" };
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
document.documentElement.classList.add("js");
const bar = $(".bar");
addEventListener("scroll", () => bar.classList.toggle("lined", scrollY > 20), { passive: true });

/* ---------- reveal ---------- */
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { rootMargin: "0px 0px -6% 0px" }) : null;
function observe(root = document) {
  const els = $$(".rv:not(.in)", root);
  els.forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 90}ms`; io ? io.observe(el) : el.classList.add("in"); });
  setTimeout(() => els.forEach(el => el.classList.add("in")), 1800);
}

/* ---------- light through glass: sheen follows the pointer ---------- */
document.addEventListener("pointermove", e => {
  const g = e.target.closest && e.target.closest(".glass"); if (!g) return;
  const r = g.getBoundingClientRect();
  g.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
  g.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
});

/* ---------- cards ---------- */
const lot = w => String(WORKS.indexOf(w) + 1).padStart(2, "0");
const card = w => `
  <a class="work rv" href="#tvorba-${w.id}">
    <span class="mat glass">
      <img class="main" src="${P}${w.id}-sm.jpg" alt="${esc(w.name)}" loading="lazy" width="720" height="964">
      <img class="alt" src="${P}${w.id}-close-sm.jpg" alt="" loading="lazy" width="720" height="964">
    </span>
    <span class="cap">
      <span class="lot">№ ${lot(w)}${(w.photos || 1) > 1 ? ` · ${w.photos} варианта` : ""}</span>
      <h3>${esc(w.name)}</h3>
      <span class="size">${sizeLabel(w)}</span>
      <span class="price">${priceLabel(w)}</span>
    </span>
  </a>`;

/* ---------- collection ---------- */
let curCat = "kartina";
function renderGrid(cat) {
  curCat = cat;
  const soon = cat === "soon";
  $("#soon").hidden = !soon; $("#grid").hidden = soon;
  $("#catNote").textContent = soon ? "" : CAT_NOTE[cat];
  if (!soon) $("#grid").innerHTML = WORKS.filter(w => w.cat === cat).map(card).join("");
  observe($("#grid"));
}
$$(".tabs button").forEach(t => t.addEventListener("click", () => {
  $$(".tabs button").forEach(x => x.setAttribute("aria-selected", x === t));
  renderGrid(t.dataset.cat);
}));
renderGrid("kartina");

/* ---------- work page with magnifier ---------- */
const wpMain = $("#wpMain"), wpImg = $("#wpImg"), lens = $("#lens");
let cur = null, shots = [], shotI = 0;
function showShot(i) {
  shotI = i;
  wpImg.style.opacity = 0;
  const s = shots[i];
  const next = new Image(); next.src = s.src;
  next.onload = () => { wpImg.src = s.src; wpImg.style.opacity = 1; lens.style.backgroundImage = `url("${s.src}")`; };
  wpImg.alt = cur.name;
  $$("#wpThumbs button").forEach((b, k) => b.setAttribute("aria-pressed", k === i));
}
function renderWork(id) {
  cur = byId(id); if (!cur) return false;
  shots = [];
  if (cur.id === "plodorodie") {
    Object.keys(FRAMES).forEach(f => shots.push({ src: `assets/img/framed-${f}.jpg`, th: `assets/img/swatch-${f}.jpg`, v: 1, label: `рамка ${FRAMES[f]}` }));
    shots.push({ src: `${P}plodorodie-close.jpg`, th: `${P}plodorodie-close-sm.jpg`, v: 1 });
  } else for (let i = 1; i <= (cur.photos || 1); i++) {
    shots.push({ src: `${P}${vid(cur, i)}.jpg`, th: `${P}${vid(cur, i)}-sm.jpg`, v: i });
    shots.push({ src: `${P}${vid(cur, i)}-close.jpg`, th: `${P}${vid(cur, i)}-close-sm.jpg`, v: i });
  }
  $("#wpThumbs").innerHTML = shots.map((s, i) => `<button type="button" data-shot="${i}" aria-label="Снимка ${i + 1}${s.label ? ", " + s.label : ""}"><img src="${s.th}" alt=""></button>`).join("");
  $("#wpCat").textContent = `№ ${lot(cur)} · ` + (cur.cat === "pana" ? "Стъклено пано · без рамка" : "Стъклена картина · с рамка");
  $("#wpName").textContent = cur.name;
  $("#wpPrice").textContent = priceLabel(cur);
  $("#wpText").textContent = cur.text || (cur.cat === "pana" ? CAT_NOTE.pana : "Дърво на живота, рисувано върху стъкло и сплавено в пещ с цветни стъкълца.");
  $("#wpSizes").innerHTML = cur.sizes ? `<fieldset><legend>Размер</legend><div class="chips">${cur.sizes.map((s, k) =>
    `<label><input type="radio" name="psize" value="${k}" ${k ? "" : "checked"}><span>${s[1].replace(" см", "")} · ${money(s[2])}</span></label>`).join("")}</div></fieldset>` : "";
  const specs = [["Размер", cur.sizes ? "по избор" : sizeLabel(cur)],
    [cur.cat === "pana" ? "Окачване" : "Рамка", cur.cat === "pana" ? "метална закачалка-кобилица" : (cur.frame || "дървена")],
    ["Материал", "стъкло, цветни стъкълца, бои за стъкло"], ["Автор", "Лъки Михайлова"]];
  if ((cur.photos || 1) > 1) specs.push(["Варианти", `${cur.photos} — вижте снимките`]);
  $("#wpSpecs").innerHTML = specs.map(([a, b]) => `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join("");
  const rel = WORKS.filter(w => w.cat === cur.cat && w.id !== cur.id && w.id !== "plodorodie");
  const start = Math.max(0, rel.findIndex(w => WORKS.indexOf(w) > WORKS.indexOf(cur)));
  $("#related").innerHTML = [...rel.slice(start), ...rel.slice(0, start)].slice(0, 3).map(card).join("");
  observe($("#related"));
  showShot(0);
  return true;
}
$("#wpThumbs").addEventListener("click", e => { const b = e.target.closest("[data-shot]"); if (b) showShot(+b.dataset.shot); });
$("#wpSizes").addEventListener("change", () => { $("#wpPrice").textContent = money(cur.sizes[+$("input[name=psize]:checked").value][2]); });
wpMain.addEventListener("pointermove", e => {
  if (e.pointerType === "touch") return;
  const r = wpMain.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, Z = 3;
  wpMain.classList.add("zooming");
  lens.style.left = `${x}px`; lens.style.top = `${y}px`;
  lens.style.backgroundSize = `${r.width * Z}px ${r.height * Z}px`;
  lens.style.backgroundPosition = `${-(x * Z - 95)}px ${-(y * Z - 95)}px`;
});
wpMain.addEventListener("pointerleave", () => wpMain.classList.remove("zooming"));
$("#wpAdd").addEventListener("click", () => {
  const s = shots[shotI];
  let price = cur.price ?? null, detail = sizeLabel(cur);
  if (cur.sizes) { const z = cur.sizes[+$("input[name=psize]:checked").value]; detail = `${z[0].toLowerCase()}, ${z[1]}`; price = z[2]; }
  if (cur.id === "plodorodie") detail += ` · ${s.label || "рамка Платина"}`;
  if ((cur.photos || 1) > 1) detail += ` · вариант ${s.v}`;
  addToList({ name: cur.name, detail, price, img: s.th.includes("swatch") ? s.src : `${P}${vid(cur, s.v)}-sm.jpg` });
});

/* ---------- commission ---------- */
const wedForm = $("#wedForm");
const KIND = { svatba: "Сватбено Дърво на живота", darvo: "Дърво на живота по поръчка", pano: "Пано по поръчка" };
const KSIZE = { svatba: ["18 × 22", "26 × 36", "30 × 40"], darvo: ["14 × 16", "18 × 22", "26 × 36", "30 × 40"], pano: ["12 × 12", "12 × 15"] };
const val = n => ($(`input[name=${n}]:checked`) || {}).value;
function renderWSizes() {
  const k = val("wkind"), list = KSIZE[k];
  $("#wSizes").innerHTML = list.map((s, i) => `<label><input type="radio" name="wsize" value="${s} см" ${i === list.length - 1 ? "checked" : ""}><span>${s}</span></label>`).join("");
}
function updateWed() {
  const k = val("wkind"), f = val("wframe"), img = $("#wedImg");
  const src = k === "svatba" ? `assets/img/framed-wedding-${f}.jpg` : k === "darvo" ? `assets/img/framed-${f}.jpg` : `${P}pana-yabalka.jpg`;
  if (img.getAttribute("src") !== src) {
    img.style.opacity = 0;
    const n = new Image(); n.src = src; n.onload = () => { img.src = src; img.style.opacity = 1; };
  }
  $("#namesField").hidden = k !== "svatba";
  $("#wFrameSet").hidden = k === "pano";
  const names = $("#wedNames").value.trim();
  $("#wedCap").hidden = !(k === "svatba" && names); $("#wedCap").textContent = names;
}
wedForm.addEventListener("change", e => { if (e.target.name === "wkind") renderWSizes(); updateWed(); });
wedForm.addEventListener("input", updateWed);
wedForm.addEventListener("submit", e => {
  e.preventDefault();
  const k = val("wkind"), bits = [val("wsize")];
  if (k !== "pano") bits.push(`рамка ${FRAMES[val("wframe")]}`);
  const wishes = $$("input[name=wish]:checked").map(i => i.value);
  if (wishes.length) bits.push(`цветове: ${wishes.join(", ")}`);
  if (k === "svatba" && $("#wedNames").value.trim()) bits.push(`имена: ${$("#wedNames").value.trim()}`);
  if ($("#wedNote").value.trim()) bits.push($("#wedNote").value.trim());
  addToList({ name: KIND[k], detail: bits.join(" · "), price: null, img: $("#wedImg").getAttribute("src") });
});
renderWSizes(); updateWed();

$$("[data-goto]").forEach(a => a.addEventListener("click", () => {
  const t = $(`.tabs [data-cat="${a.dataset.goto}"]`); if (t) t.click();
}));

/* ---------- router: one main page with sections, plus work and commission pages ---------- */
const SECTIONS = ["kolekcia", "avtor", "kontakti", "svatba"];
let curView = null;
function route() {
  const h = location.hash.slice(1) || "kolekcia";
  let view = "nachalo", section = null;
  if (h.startsWith("tvorba-")) view = renderWork(h.slice(7)) ? "tvorba" : "nachalo";
  else if (h === "poruchka") view = "poruchka";
  else section = SECTIONS.includes(h) ? h : "kolekcia";
  const navKey = view === "tvorba" ? "kolekcia" : view === "poruchka" ? "poruchka" : section;
  $$("[data-nav]").forEach(a => a.dataset.nav === navKey ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  document.title = view === "tvorba" ? `${cur.name} — Лъки Михайлова` : view === "poruchka" ? "По поръчка — Лъки Михайлова" : "Лъки Михайлова — Магия от стъкло";
  $("#mnav").hidden = true; $("#menuBtn").setAttribute("aria-expanded", "false");
  const go = () => {
    if (section) {
      const el = document.getElementById(section);
      const top = section === "kolekcia" ? 0 : el.getBoundingClientRect().top + scrollY - 70;
      scrollTo({ top, behavior: changed ? "instant" : "smooth" });
    } else scrollTo({ top: 0, behavior: "instant" });
  };
  const changed = view !== curView;
  if (changed) {
    const swap = () => { $$(".view").forEach(v => (v.hidden = v.dataset.view !== view)); curView = view; observe($(`.view[data-view="${view}"]`)); go(); };
    document.startViewTransition ? document.startViewTransition(swap) : swap();
  } else go();
}
addEventListener("hashchange", route);
$("#menuBtn").addEventListener("click", () => {
  const open = $("#mnav").hidden;
  $("#mnav").hidden = !open; $("#menuBtn").setAttribute("aria-expanded", open);
});

/* ---------- intro: drifting glass beads in earth tones, name, "Влез" ---------- */
const intro = $("#intro");
(function introScene() {
  const cv = $("#introCanvas"), ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLORS = ["154,74,46", "179,133,54", "85,88,63", "196,98,48", "120,60,40", "205,160,90"];
  let W, H, dpr, beads = [], raf, t0 = performance.now();
  function size() {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    const n = Math.round(Math.min(46, innerWidth / 26));
    beads = Array.from({ length: n }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      r: (18 + Math.random() * 70) * dpr * (innerWidth < 600 ? .7 : 1),
      c: COLORS[i % COLORS.length], a: .18 + Math.random() * .3,
      vx: (Math.random() - .5) * .12 * dpr, vy: (-.05 - Math.random() * .18) * dpr, ph: Math.random() * 6.28,
    }));
  }
  function frame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    for (const b of beads) {
      if (!reduce) {
        b.x += b.vx + Math.sin(t * .3 + b.ph) * .15 * dpr; b.y += b.vy;
        if (b.y < -b.r) { b.y = H + b.r; b.x = Math.random() * W; }
      }
      const g = ctx.createRadialGradient(b.x - b.r * .3, b.y - b.r * .35, b.r * .05, b.x, b.y, b.r);
      const fade = Math.min(1, t / 2.5);
      g.addColorStop(0, `rgba(255,240,215,${.55 * b.a * fade})`);
      g.addColorStop(.35, `rgba(${b.c},${b.a * fade})`);
      g.addColorStop(1, `rgba(${b.c},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283); ctx.fill();
    }
    if (!reduce) raf = requestAnimationFrame(frame);
  }
  size(); addEventListener("resize", size);
  raf = requestAnimationFrame(frame);
  function shatter(done) {
    const btn = $("#enterBtn"), r = btn.getBoundingClientRect();
    if (reduce || !btn.animate) return done();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const flash = document.createElement("div"); flash.className = "flash";
    flash.style.left = `${cx - 130}px`; flash.style.top = `${cy - 130}px`; document.body.appendChild(flash);
    flash.animate([{ opacity: 0, transform: "scale(.4)" }, { opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(1.5)" }], { duration: 700, easing: "ease-out" }).onfinish = () => flash.remove();
    btn.classList.add("broken");
    const N = 18;
    for (let i = 0; i < N; i++) {
      const s = document.createElement("div"); s.className = "shard";
      const w = r.width * (.18 + Math.random() * .22), h = r.height * (.18 + Math.random() * .25);
      s.style.width = `${w}px`; s.style.height = `${h}px`;
      const ang = (i / N) * Math.PI * 2 + Math.random() * .4;
      const ox = Math.cos(ang) * r.width * .22, oy = Math.sin(ang) * r.height * .22;
      s.style.left = `${cx + ox - w / 2}px`; s.style.top = `${cy + oy - h / 2}px`;
      const p = () => `${Math.round(Math.random() * 100)}% ${Math.round(Math.random() * 100)}%`;
      s.style.clipPath = `polygon(${p()}, ${p()}, ${p()}${Math.random() > .5 ? ", " + p() : ""})`;
      document.body.appendChild(s);
      const dist = 160 + Math.random() * 260, dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist + 120;
      const rot = (Math.random() - .5) * 720;
      s.animate([{ transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: `translate(${dx * .6}px,${dy * .4 - 60}px) rotate(${rot * .6}deg)`, opacity: 1, offset: .55 },
        { transform: `translate(${dx}px,${dy}px) rotate(${rot}deg)`, opacity: 0 }],
        { duration: 900 + Math.random() * 400, easing: "cubic-bezier(.2,.6,.3,1)" }).onfinish = () => s.remove();
    }
    setTimeout(done, 520);
  }
  let entering = false;
  function enter() {
    if (entering) return; entering = true;
    shatter(leave);
  }
  function leave() {
    intro.classList.add("leaving");
    document.body.classList.remove("locked");
    setTimeout(() => { cancelAnimationFrame(raf); intro.hidden = true; }, 1300);
    try { sessionStorage.setItem("entered", "1"); } catch {}
  }
  $("#enterBtn").addEventListener("click", enter);
  $("#enterBtn").setAttribute("aria-label", "Влез в сайта");
  addEventListener("keydown", e => { if (!intro.hidden && e.key === "Enter") enter(); });
  let ci = 0;
  $$(".intro-name .w").forEach(w => { w.setAttribute("aria-hidden", "true");
    w.innerHTML = [...w.textContent].map(c => `<span class="ch" style="--i:${ci++}">${c}</span>`).join(""); });
  let seen = false; try { seen = sessionStorage.getItem("entered") === "1"; } catch {}
  const deep = location.hash && location.hash !== "#kolekcia";
  if (seen || deep) { intro.hidden = true; cancelAnimationFrame(raf); }
  else { document.body.classList.add("locked"); requestAnimationFrame(() => intro.classList.add("play")); }
})();

/* ---------- list ---------- */
let cart = store.get("cart2", []);
const drawer = $("#drawer");
function renderList() {
  $("#cartCount").textContent = cart.length;
  $("#cartBtn").classList.toggle("has", cart.length > 0);
  $("#cartEmpty").hidden = cart.length > 0;
  $("#orderForm").hidden = !cart.length;
  $("#cartList").innerHTML = cart.map((c, i) => `<li><img src="${c.img}" alt=""><div><b>${esc(c.name)}</b><small>${esc(c.detail)}</small></div>
    <div class="pr"><span>${c.price != null ? money(c.price) : "по запитване"}</span><button type="button" class="rm" data-rm="${i}">Премахни</button></div></li>`).join("");
  const known = cart.filter(c => c.price != null), sum = known.reduce((s, c) => s + c.price, 0);
  $("#cartTotal").textContent = known.length ? money(sum) + (known.length < cart.length ? " + запитване" : "") : "по запитване";
}
function addToList(item) { cart.push(item); store.set("cart2", cart); renderList(); openDrawer(); }
$("#cartList").addEventListener("click", e => {
  const b = e.target.closest("[data-rm]"); if (!b) return;
  cart.splice(+b.dataset.rm, 1); store.set("cart2", cart); renderList();
});
function openDrawer() { drawer.hidden = false; document.body.style.overflow = "hidden"; }
function closeDrawer() { drawer.hidden = true; document.body.style.overflow = ""; }
$("#cartBtn").addEventListener("click", openDrawer);
$$("[data-close-drawer]").forEach(b => b.addEventListener("click", closeDrawer));
addEventListener("keydown", e => { if (e.key === "Escape" && !drawer.hidden) closeDrawer(); });
$("#orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target)), note = $("#orderNote");
  if (!d.name.trim() || !d.phone.trim()) { note.textContent = "Моля, въведете име и телефон."; return; }
  const body = ["Запитване от сайта", "",
    ...cart.map((c, i) => `${i + 1}. ${c.name} — ${c.detail} — ${c.price != null ? money(c.price) : "цена по запитване"}`),
    "", `Получаване: ${d.delivery}`, `Име: ${d.name}`, `Телефон: ${d.phone}`, ...(d.email ? [`Имейл: ${d.email}`] : [])].join("\n");
  $("#orderText").value = body; $("#orderMail").textContent = ORDER_EMAIL; $("#orderOut").hidden = false;
  note.textContent = "Отваряме имейл с готовото запитване.";
  location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("Запитване от сайта")}&body=${encodeURIComponent(body)}`;
});
$("#copyOrder").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText($("#orderText").value); $("#copyOrder").textContent = "Копирано"; }
  catch { $("#orderText").select(); }
});
renderList();
route();
$("#yr").textContent = new Date().getFullYear();

// TODO: replace with the real contact email before launch
const ORDER_EMAIL = "info@artgifts.bg";

/* Photos live in assets/products/: <id>.jpg (on the wall), <id>-close.jpg (detail),
   and <id>-2.jpg … for variants, each with a -sm.jpg copy for the grid. */
const TREE = "Дърво на живота", PANE = "Стъклено пано";
const YAB_SIZES = [["Малко", "14 × 16 см", 28], ["Средно", "18 × 22 см", 38], ["Голямо", "26 × 36 см", 89], ["Най-голямо", "30 × 40 см", 98]];
// every piece is its own listing; "series" is the small line above the title
const WORKS = [
  // ---- PICTURES (framed) ----
  { id: "plodorodie", cat: "kartina", series: TREE, name: "Плодородие", size: "30 × 40 см", price: 80, frame: "дървена, 3 см, по избор",
    text: "Семейно дърво на живота. Изработено върху стъкло със специални професионални бои и цветни стъкла. Двойно темперирано в пещ за стъкло." },
  { id: "kartina-yabalka", cat: "kartina", series: TREE, name: "Ябълка", frame: "дървена, платина", sizes: YAB_SIZES },
  { id: "kartina-yabalka-2", cat: "kartina", series: TREE, name: "Ябълкова градина", frame: "дървена, платина", sizes: YAB_SIZES },
  { id: "kartina-prestizh", cat: "kartina", series: TREE, name: "Престиж", price: 68, frame: "масивна ретро рамка",
    text: "С масивна ретро рамка. Дърво с широки клони и дебел ствол, стъпило здраво на земята и пуснало дълбоки корени в недрата ѝ. Усещане за зрялост, сила и непоклатимост!" },
  { id: "kartina-blagodat", cat: "kartina", series: TREE, name: "Благодат", size: "19,5 × 19,5 см с рамката", price: 35,
    frame: "дървена, със златен кант", text: "Изработено върху керамична плочка." },
  { id: "kartina-prolet", cat: "kartina", series: TREE, name: "Пролет злато", size: "24 × 36 см", price: 76, frame: "златна, със закопчалка",
    text: "Носи радост, топлина и много цвят в дома и офиса. Усещане за изисканост, прецизност и блестяща чистота. Предлага се само в този размер." },
  { id: "kartina-proletno-darvo", cat: "kartina", series: TREE, name: "Пролет", size: "26 × 36 см", price: 89, frame: "дървена, платина" },
  { id: "kartina-proletno-darvo-2", cat: "kartina", series: TREE, name: "Пролетен цвят", size: "26 × 36 см", price: 89, frame: "дървена, платина" },
  { id: "kartina-semeino", cat: "kartina", series: TREE, name: "Семейно", size: "25 × 25 см", price: 68, frame: "дървена, със златен кант" },
  { id: "kartina-barok", cat: "kartina", series: TREE, name: "Барок", size: "19 × 19 см", price: 34, frame: "бяло-златна, с флорални барокови мотиви",
    text: "Бяло-златна рамка с флорални барокови мотиви. Стволът е дебел и плътен, а короната на дървото е в кръг." },
  { id: "kartina-byalo", cat: "kartina", series: TREE, name: "Бяло", size: "малък размер", price: 24, frame: "бяла, със златен кант",
    text: "Малко дърво на живота в бяла рамка със златен кант." },
  { id: "kartina-cheresha", cat: "kartina", series: TREE, name: "Череша" },
  { id: "kartina-razvitie", cat: "kartina", series: TREE, name: "Развитие" },
  { id: "kartina-zlatno-lyato", cat: "kartina", series: TREE, name: "Златно лято", frame: "златна" },

  // ---- PANELS (no frame) ----
  { id: "pana-buhal", cat: "pana", series: PANE, name: "Бухал", size: "12 × 12 см", price: 20, text: "Символ на мъдрост и благополучие." },
  { id: "pana-taralezh", cat: "pana", series: PANE, name: "Таралеж с ябълка", size: "12 × 12 см", price: 20,
    text: "Предвестник на есента. Символизира упорития труд на този, който събира узрели плодове за зимнина. Събира слънчевите лъчи и ги пренася в дома ни." },
  { id: "pana-taralezh-2", cat: "pana", series: PANE, name: "Таралеж в градината", size: "12 × 12 см", price: 20,
    text: "Предвестник на есента. Символизира упорития труд на този, който събира узрели плодове за зимнина. Събира слънчевите лъчи и ги пренася в дома ни." },
  { id: "pana-taralezh-3", cat: "pana", series: PANE, name: "Таралеж и слънце", size: "12 × 12 см", price: 20,
    text: "Предвестник на есента. Символизира упорития труд на този, който събира узрели плодове за зимнина. Събира слънчевите лъчи и ги пренася в дома ни." },
  { id: "pana-angel", cat: "pana", series: PANE, name: "Ангел Хранител", size: "12 × 14 см", price: 24,
    text: "Рамката на паното е направена от висококачествени професионални бои за стъкло. А самият ангел е от сребърна тел, ръчно огънат. Всеки има свой собствен чар и индивидуалност." },
  { id: "pana-angel-2", cat: "pana", series: PANE, name: "Ангел на светлината", size: "12 × 14 см", price: 24,
    text: "Рамката на паното е направена от висококачествени професионални бои за стъкло. А самият ангел е от сребърна тел, ръчно огънат. Всеки има свой собствен чар и индивидуалност." },
  { id: "pana-cherno-kote", cat: "pana", series: PANE, name: "Черно коте за късмет", size: "12 × 12 см", price: 20,
    text: "Подарява се за късмет и безстрашие. За да си кажем: „Ще пречупя карък и ще започна без страх отново!“" },
  { id: "pana-yabalka", cat: "pana", series: TREE, name: "Ябълково дръвче", size: "12 × 15 см", price: 24,
    text: "Освен цялата нарисувана символика има и 8 узрели ябълкови плода! Числото не е случайно — то е символ на успех и безкрайност." },
  { id: "pana-yabalka-2", cat: "pana", series: TREE, name: "Ябълков цвят", size: "12 × 15 см", price: 24,
    text: "Освен цялата нарисувана символика има и 8 узрели ябълкови плода! Числото не е случайно — то е символ на успех и безкрайност." },
  { id: "pana-sharena-maca", cat: "pana", series: PANE, name: "Шарената маца", size: "12 × 12 см", price: 20,
    text: "Подарява се за нежност, вярност, приятелство, игри и усмивки." },
  { id: "pana-sartse", cat: "pana", series: PANE, name: "Сърце", size: "12 × 12 см", price: 20,
    text: "Подарява се за любов, вярност и надежда. И за да не забравяш себе си и да се обичаш!" },
  { id: "pana-mazhko-sartse", cat: "pana", series: PANE, name: "Мъжко сърце", size: "12 × 12 см", price: 20,
    text: "Освен червено има и добавен син цвят: връзка с небето и със силния мъжки пол." },
  { id: "pana-urozhay", cat: "pana", series: TREE, name: "Урожай" },
  { id: "pana-rache", cat: "pana", series: PANE, name: "Раче", size: "12 × 12 см", price: 20,
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
const priceLabel = w => w.sizes ? money(w.sizes[0][2]) : w.price != null ? money(w.price) : "по запитване";
const sizeLabel = w => w.size || (w.sizes ? w.sizes.map(s => s[1].replace(" см", "")).join(" · ") + " см" : "размер при запитване");
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
const hung = w => w.cat === "kartina" || w.cat === "pana"; // works are cut from the photo and hung on the page wall
const wallSrc = (id, cat, sm) => `${P}${id}-wall${sm ? "-sm" : ""}` + (cat === "pana" ? ".webp?v=2" : ".jpg?v=2"); // panels keep their wire, so they need transparency
const fullName = w => `${w.series} „${w.name}“`;
const sizeSelect = (w, cls) => `<label class="${cls}"><span class="vh">Размер</span><select data-sizes="${w.id}">${w.sizes.map((z, k) =>
  `<option value="${k}">${z[1]}</option>`).join("")}</select></label>`;
const card = w => `
  <article class="work rv${hung(w) ? " hung" : ""}${w.cat === "pana" ? " pane" : ""}">
    <a class="mat glass" href="#tvorba-${w.id}" aria-label="${esc(fullName(w))}">
      <img class="main" src="${hung(w) ? wallSrc(w.id, w.cat, 1) : `${P}${w.id}-sm.jpg`}" alt="${esc(fullName(w))}" loading="lazy">
    </a>
    <div class="cap">
      <span class="series">${esc(w.series)}</span>
      <h3><a href="#tvorba-${w.id}">${esc(w.name)}</a></h3>
      ${w.sizes ? sizeSelect(w, "size-pick") : `<span class="size">${esc(w.size || "размер при запитване")}</span>`}
      <span class="price" data-price="${w.id}">${w.sizes ? money(w.sizes[0][2]) : w.price != null ? money(w.price) : "по запитване"}</span>
    </div>
  </article>`;
// a size picked on a card updates its price
document.addEventListener("change", e => {
  const sel = e.target.closest("select[data-sizes]"); if (!sel) return;
  const w = byId(sel.dataset.sizes), z = w.sizes[+sel.value];
  const scope = sel.closest(".work, .wp-info") || document;
  const pr = scope.querySelector(`[data-price="${w.id}"]`) || $("#wpPrice"); if (pr) pr.textContent = money(z[2]);
});

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
  next.onload = () => { wpMain.classList.toggle("hung", !!s.hung); wpMain.classList.toggle("pane", !!s.hung && cur.cat === "pana"); wpImg.src = s.src; wpImg.style.opacity = 1; lens.style.backgroundImage = `url("${s.src}")`; };
  wpImg.alt = fullName(cur);
  $$("#wpThumbs button").forEach((b, k) => b.setAttribute("aria-pressed", k === i));
}
function renderWork(id) {
  cur = byId(id); if (!cur) return false;
  shots = [];
  if (cur.id === "plodorodie") {
    Object.keys(FRAMES).forEach(f => shots.push({ src: `assets/img/framed-${f}-wall.jpg`, th: `assets/img/swatch-${f}.jpg`, v: 1, hung: true, label: `рамка ${FRAMES[f]}` }));
    shots.push({ src: `${P}plodorodie-close.jpg`, th: `${P}plodorodie-close-sm.jpg`, v: 1 });
  } else {
    shots.push({ src: wallSrc(cur.id, cur.cat), th: `${P}${cur.id}-sm.jpg`, v: 1, hung: true });
    shots.push({ src: `${P}${cur.id}-close.jpg`, th: `${P}${cur.id}-close-sm.jpg`, v: 1 });
  }
  $("#wpThumbs").innerHTML = shots.map((s, i) => `<button type="button" data-shot="${i}" aria-label="Снимка ${i + 1}${s.label ? ", " + s.label : ""}"><img src="${s.th}" alt=""></button>`).join("");
  $("#wpCat").textContent = cur.series + (cur.cat === "pana" ? " · без рамка" : " · стъклена картина с рамка");
  $("#wpName").textContent = cur.name;
  $("#wpPrice").textContent = priceLabel(cur);
  $("#wpText").textContent = cur.text || (cur.cat === "pana" ? CAT_NOTE.pana : "Дърво на живота, рисувано върху стъкло и сплавено в пещ с цветни стъкълца.");
  $("#wpSizes").innerHTML = cur.sizes ? sizeSelect(cur, "size-pick big") : "";
  const specs = [["Размер", cur.sizes ? "по избор" : sizeLabel(cur)],
    [cur.cat === "pana" ? "Окачване" : "Рамка", cur.cat === "pana" ? "метална закачалка-кобилица" : (cur.frame || "дървена")],
    ["Материал", "стъкло, цветни стъкълца, бои за стъкло"], ["Автор", "Лъки Михайлова"]];
  $("#wpSpecs").innerHTML = specs.map(([a, b]) => `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join("");
  const rel = WORKS.filter(w => w.cat === cur.cat && w.id !== cur.id && w.id !== "plodorodie");
  const start = Math.max(0, rel.findIndex(w => WORKS.indexOf(w) > WORKS.indexOf(cur)));
  $("#related").innerHTML = [...rel.slice(start), ...rel.slice(0, start)].slice(0, 3).map(card).join("");
  observe($("#related"));
  showShot(0);
  return true;
}
$("#wpThumbs").addEventListener("click", e => { const b = e.target.closest("[data-shot]"); if (b) showShot(+b.dataset.shot); });
wpMain.addEventListener("pointermove", e => {
  if (e.pointerType === "touch") return;
  const r = wpMain.getBoundingClientRect(), ir = wpImg.getBoundingClientRect(), Z = 3;
  const x = e.clientX - ir.left, y = e.clientY - ir.top; // relative to the photo itself (a hung frame is smaller than the box)
  if (x < 0 || y < 0 || x > ir.width || y > ir.height) return wpMain.classList.remove("zooming");
  wpMain.classList.add("zooming");
  lens.style.left = `${e.clientX - r.left}px`; lens.style.top = `${e.clientY - r.top}px`;
  lens.style.backgroundSize = `${ir.width * Z}px ${ir.height * Z}px`;
  lens.style.backgroundPosition = `${-(x * Z - 95)}px ${-(y * Z - 95)}px`;
});
wpMain.addEventListener("pointerleave", () => wpMain.classList.remove("zooming"));
$("#wpAdd").addEventListener("click", () => {
  const s = shots[shotI];
  let price = cur.price ?? null, detail = sizeLabel(cur);
  if (cur.sizes) { const z = cur.sizes[+$("#wpSizes select").value]; detail = z[1]; price = z[2]; }
  if (cur.id === "plodorodie") detail += ` · ${s.label || "рамка Платина"}`;
  addToList({ name: fullName(cur), detail, price, img: s.th.includes("swatch") ? s.src : `${P}${cur.id}-sm.jpg` });
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
  const src = k === "svatba" ? `assets/img/framed-wedding-${f}-wall.jpg` : k === "darvo" ? `assets/img/framed-${f}-wall.jpg` : `${P}pana-yabalka-wall.webp?v=2`;
  if (img.getAttribute("src") !== src) {
    img.style.opacity = 0;
    const n = new Image(); n.src = src; n.onload = () => { img.classList.toggle("hung", k !== "pano"); img.classList.toggle("pane", k === "pano"); img.src = src; img.style.opacity = 1; };
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
  document.title = view === "tvorba" ? `${fullName(cur)} — Лъки Михайлова` : view === "poruchka" ? "По поръчка — Лъки Михайлова" : "Лъки Михайлова — Магия от стъкло";
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

/* ---------- intro: the name is laid bead by bead, the trunk is painted, the crown is set chip by chip; "Влез" glows ---------- */
const intro = $("#intro");
(function introScene() {
  const cv = $("#introCanvas"), ctx = cv.getContext("2d"), btn = $("#enterBtn"), tag = $(".intro-tag"), foot = $(".intro-foot");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rnd = (a, b) => a + Math.random() * (b - a), pick = arr => arr[Math.random() * arr.length | 0];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), ease = t => 1 - Math.pow(1 - t, 3);
  const CROWN = {
    core: [[236, 182, 92], [226, 154, 60], [224, 118, 46]],
    mid: [[226, 102, 40], [212, 74, 34], [232, 142, 58], [198, 60, 30]],
    edge: [[176, 50, 30], [144, 36, 26], [200, 80, 36], [118, 30, 22]],
    leaf: [[110, 138, 58], [80, 112, 54]], dark: [[64, 36, 22]]
  };
  // timeline (seconds)
  const T = { nameEnd: 2.5, paint: 3.1, paintDur: 1.9, crown: 4.7, crownDur: 3.4, lit: 8.3 };
  let W, H, dpr, beads = [], raf, t0 = 0, done = false, bursting = false, L = {}, sprites = new Map(), layer, lctx, next = 0;

  function sprite(c, r, v) {               // one glossy glass chip, cached by colour / size / shape
    const key = c.join() + "|" + r + "|" + v; let s = sprites.get(key); if (s) return s;
    const S = Math.ceil(r * 2 + 4), m = S / 2, o = document.createElement("canvas"); o.width = o.height = S;
    const g = o.getContext("2d"), [R, G, B] = c, lt = (x, f) => Math.min(255, x + (255 - x) * f) | 0, dk = (x, f) => x * f | 0;
    const sx = [1, .9, .84, .8, .88, .82][v], rot = [0, .7, -.9, .4, 1.3, -.3][v];
    g.translate(m, m); g.rotate(rot); g.scale(1, sx);
    const body = g.createRadialGradient(-r * .3, -r * .35, r * .08, 0, 0, r);
    body.addColorStop(0, `rgb(${lt(R, .42)},${lt(G, .4)},${lt(B, .34)})`);
    body.addColorStop(.5, `rgb(${R},${G},${B})`);
    body.addColorStop(1, `rgb(${dk(R, .55)},${dk(G, .55)},${dk(B, .55)})`);
    g.fillStyle = body; g.beginPath(); g.arc(0, 0, r, 0, 6.283); g.fill();
    const glow = g.createRadialGradient(r * .3, r * .38, 0, r * .3, r * .38, r * .6);   // light passing through the glass
    glow.addColorStop(0, `rgba(${lt(R, .65)},${lt(G, .55)},${lt(B, .35)},.55)`); glow.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = glow; g.beginPath(); g.arc(0, 0, r, 0, 6.283); g.fill();
    g.fillStyle = "rgba(255,250,238,.82)"; g.beginPath(); g.ellipse(-r * .34, -r * .4, r * .28, r * .14, -.6, 0, 6.283); g.fill();
    sprites.set(key, o); return o;
  }
  const bead = (x, y, r, c, delay, v) => ({ x, y, r, c, delay, dur: .24, img: sprite(c, Math.max(1, Math.round(r * dpr * 2) / 2), v) });
  function layout() {
    dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px";
    layer = document.createElement("canvas"); layer.width = cv.width; layer.height = cv.height;
    lctx = layer.getContext("2d"); lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    beads = []; next = 0; sprites.clear();
    // the name is real text (molten-glass letters in CSS); measure it to compose the tree below
    const nameEl = $(".intro-name"), tagH = 60;
    let top = Math.max(H * .07, 30);
    nameEl.style.top = `${top}px`;
    const nameH = nameEl.getBoundingClientRect().height;
    const TH = Math.max(160, Math.min((H - top - nameH - tagH - 70) / .99, W * .9 / .76, 640));
    const spare = Math.max(0, H - 64 - TH * .99 - tagH - nameH - top - 40);
    top += spare * .42; nameEl.style.top = `${top}px`;
    const y1 = top + nameH;
    tag.style.top = `${y1 + 4}px`;

    // tree geometry: painted trunk and limbs (drawn progressively), crown of chips
    const cx = W / 2, baseY = H - 64 - spare * .3, ccY = baseY - TH * .64, RC = TH * .34, rw = TH * .105;
    const trunkTop = baseY - TH * .36;
    L = { cx, ccY, rw, TH, baseY, trunkTop, blades: [], fallen: [],
      limbs: [[-62, .3], [-38, .34], [-16, .3], [8, .33], [30, .32], [54, .3]].map(([ang, len], i) => ({ ang, len: len * TH, x: cx + ang / 62 * TH * .012, y: trunkTop + TH * .02, w: TH * .034, seed: i })) };
    const gw = Math.min(TH * .42, W * .4);
    for (let i = 0; i < 230; i++) { const x = cx + rnd(-gw, gw) * Math.sqrt(Math.random()), k = 1 - Math.abs(x - cx) / gw;
      L.blades.push({ x, h: TH * rnd(.01, .05) * Math.pow(k, .6), lean: rnd(-.45, .45), w: rnd(.6, 1.5), at: Math.abs(x - cx) / gw,
        c: Math.random() < .7 ? "rgba(30,20,13,.92)" : "rgba(62,58,30,.85)" }); }
    for (let i = 0; i < 9; i++) { const x = cx + rnd(-gw * .8, gw * .8);
      const b = bead(x, baseY + TH * .006 - rnd(0, TH * .01), TH * rnd(.006, .01), pick(CROWN.mid.concat(CROWN.core)), T.paint + .2 + Math.abs(x - cx) / gw * .5, 2 + (Math.random() * 4 | 0));
      b.kind = "crown"; beads.push(b); }
    // crown chips: packed, honey near the light, deep reds at the rim, a little green
    const rmin = TH * .0105, rmax = TH * .022, grid = new Map(), cell = rmax * 2, placed = [];
    const edge = th => RC * (1 + .045 * Math.sin(3 * th + 1.3) + .035 * Math.sin(5 * th + .4) + .02 * Math.sin(9 * th));
    const fits = (x, y, r) => { const gx = Math.floor(x / cell), gy = Math.floor(y / cell);
      for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (const q of grid.get((gx + i) + "," + (gy + j)) || [])
        if ((q[0] - x) ** 2 + (q[1] - y) ** 2 < ((q[2] + r) * .9) ** 2) return false; return true; };
    const tries = Math.round((RC / rmin) ** 2 * 10);
    for (let n = 0; n < tries; n++) {
      const th = rnd(0, 6.283), rad = Math.sqrt(Math.random()) * RC * 1.06, x = cx + Math.cos(th) * rad * 1.08, y = ccY + Math.sin(th) * rad * .94;
      const e = edge(th); if (rad > e || rad < rw * 1.02) continue;
      const k = (rad - rw) / (e - rw), r = rmin + (rmax - rmin) * Math.pow(Math.random(), 1.6) * (k < .15 ? .6 : 1);
      if (!fits(x, y, r)) continue;
      const key = Math.floor(x / cell) + "," + Math.floor(y / cell); (grid.get(key) || grid.set(key, []).get(key)).push([x, y, r]);
      placed.push([x, y, r, k]);
    }
    const crown = [];
    for (const [x, y, r, k] of placed) if (Math.random() < .12)   // a few deep-red chips underneath give depth
      crown.push({ x: x + rnd(-r, r), y: y + rnd(-r, r), r: r * .85, c: pick([[118, 30, 22], [146, 40, 26], [92, 28, 20]]), key: rnd(0, .45) });
    for (const [x, y, r, k] of placed) {
      const z = Math.random(), c = z < .045 ? pick(CROWN.leaf) : z < .08 ? pick(CROWN.dark)
        : k < .22 ? pick(CROWN.core) : k < .62 ? pick(Math.random() < .25 ? CROWN.core : CROWN.mid) : pick(Math.random() < .3 ? CROWN.mid : CROWN.edge);
      crown.push({ x, y, r, c, key: .25 + rnd(0, 1) + k * .2 });
    }
    crown.sort((p, q) => p.key - q.key).forEach((q, i) => {   // set one by one, scattered over the crown like hands placing chips
      const b = bead(q.x, q.y, q.r, q.c, T.crown + i / crown.length * T.crownDur, 2 + (Math.random() * 4 | 0)); b.kind = "crown"; beads.push(b); });
    btn.style.left = `${cx - rw * 1.3}px`; btn.style.top = `${ccY - rw * 1.3}px`; btn.style.width = btn.style.height = `${rw * 2.6}px`;
    btn.style.fontSize = `${Math.max(13, rw * .3)}px`;
    beads.sort((p, q) => p.delay + p.dur - q.delay - q.dur);
  }

  // the trunk is painted like her glass paint: dark, glossy, brushed; p runs 0..1
  function paintTree(g, p) {
    const { cx, baseY, trunkTop, TH } = L; if (p <= 0) return;
    g.save(); g.lineCap = "round"; g.lineJoin = "round";
    const pg = clamp(p / .25, 0, 1);       // grass first, spreading from the root
    g.save(); g.translate(cx, baseY + TH * .014); g.scale(1, .075);          // soft ground shadow
    const sh = g.createRadialGradient(0, 0, 0, 0, 0, TH * .42);
    sh.addColorStop(0, `rgba(40,24,14,${.18 * pg})`); sh.addColorStop(1, "rgba(40,24,14,0)");
    g.fillStyle = sh; g.fillRect(-TH * .42, -TH * .42, TH * .84, TH * .84); g.restore();
    for (const b of L.blades) { if (b.at > pg) continue; const k = clamp((pg - b.at) * 4, 0, 1);
      g.strokeStyle = b.c; g.lineWidth = b.w; g.beginPath(); g.moveTo(b.x, baseY + TH * .012); g.quadraticCurveTo(b.x + b.lean * b.h * .4, baseY + TH * .012 - b.h * .6 * k, b.x + b.lean * b.h, baseY + TH * .012 - b.h * k); g.stroke(); }
    const pt = clamp((p - .1) / .45, 0, 1);  // trunk rises from the ground
    if (pt > 0) {
      const yTop = baseY - (baseY - trunkTop + TH * .02) * ease(pt);
      g.save(); g.beginPath(); g.rect(cx - TH * .2, yTop, TH * .4, baseY - yTop + TH * .03); g.clip();
      const grd = g.createLinearGradient(cx - TH * .05, 0, cx + TH * .05, 0);
      grd.addColorStop(0, "#160d08"); grd.addColorStop(.38, "#3a2619"); grd.addColorStop(.55, "#5a3d29"); grd.addColorStop(.72, "#2c1c12"); grd.addColorStop(1, "#120a06");
      g.fillStyle = grd; g.beginPath();
      g.moveTo(cx - TH * .09, baseY + TH * .012); g.quadraticCurveTo(cx - TH * .03, baseY - TH * .05, cx - TH * .03, baseY - TH * .2);
      g.lineTo(cx - TH * .022, trunkTop); g.lineTo(cx + TH * .022, trunkTop); g.lineTo(cx + TH * .03, baseY - TH * .2);
      g.quadraticCurveTo(cx + TH * .03, baseY - TH * .05, cx + TH * .095, baseY + TH * .012); g.closePath(); g.fill();
      for (let i = -5; i <= 5; i++) {        // brush streaks in the paint
        g.strokeStyle = i % 2 ? "rgba(10,6,4,.25)" : "rgba(160,118,84,.16)"; g.lineWidth = i % 3 ? .8 : 1.4; g.beginPath();
        g.moveTo(cx + i * TH * .008, baseY + TH * .01); g.bezierCurveTo(cx + i * TH * .004 + TH * .004, baseY - TH * .12, cx + i * TH * .003 - TH * .003, baseY - TH * .26, cx + i * TH * .0035, trunkTop); g.stroke(); }
      const gl = g.createLinearGradient(cx - TH * .02, 0, cx + TH * .02, 0);   // a glossy highlight, as on fired glass paint
      gl.addColorStop(0, "rgba(255,230,200,0)"); gl.addColorStop(.6, "rgba(255,230,200,.16)"); gl.addColorStop(1, "rgba(255,230,200,0)");
      g.fillStyle = gl; g.fillRect(cx - TH * .02, trunkTop, TH * .04, baseY - trunkTop);
      g.restore(); g.save();
      g.fillStyle = "#1e130c";                                   // roots: tapering, hugging the ground
      [[-1, .15, .02], [1, .13, .018], [-1, .07, .012], [1, .06, .01]].forEach(([sd, l, w]) => {
        const rx = cx + sd * TH * .05, tx = cx + sd * TH * (.06 + l), ty = baseY + TH * .013;
        g.beginPath(); g.moveTo(rx, baseY - TH * .02 - w * TH * .5);
        g.quadraticCurveTo(cx + sd * TH * (.07 + l * .45), baseY - TH * .004, tx, ty);
        g.quadraticCurveTo(cx + sd * TH * (.06 + l * .4), baseY + TH * .01, rx, baseY + TH * .012); g.closePath(); g.fill(); });
      g.restore();
    }
    const pl = clamp((p - .45) / .55, 0, 1);  // limbs reach out, then their twigs
    if (pl > 0) for (const l of L.limbs) limb(g, l.x, l.y, l.ang, l.len, l.w, 1, ease(clamp(pl * 1.15 - l.seed * .02, 0, 1)));
    g.restore();
  }
  function limb(g, x, y, ang, len, wd, depth, q) {
    if (q <= 0) return;
    const a = ang * Math.PI / 180, ex = x + Math.sin(a) * len, ey = y - Math.cos(a) * len, n = 10, m = Math.ceil(n * q);
    g.strokeStyle = "#24170f";
    for (let i = 0; i < m; i++) {
      const t1 = i / n, t2 = Math.min(q, (i + 1) / n), bend = Math.sin(t2 * 3) * len * .06 * Math.sign(ang || 1);
      g.lineWidth = wd * (1 - t1 * .75); g.beginPath();
      g.moveTo(x + (ex - x) * t1 + Math.sin(t1 * 3) * len * .06 * Math.sign(ang || 1), y + (ey - y) * t1); g.lineTo(x + (ex - x) * t2 + bend, y + (ey - y) * t2); g.stroke();
    }
    if (depth && q > .55) [-1, 1].forEach(sd => limb(g, x + (ex - x) * .55, y + (ey - y) * .55, ang + sd * 26, len * .5, wd * .45, depth - 1, (q - .55) / .45));
  }

  let lastT = 0;
  function render(t) {
    const dt = Math.max(0, Math.min(.05, t - lastT)); lastT = t;
    // chips that have landed are baked into a layer; only the ones in flight are drawn each frame
    while (next < beads.length && beads[next].delay + beads[next].dur <= t) {
      const b = beads[next++], w = b.img.width / dpr; lctx.drawImage(b.img, b.x - w / 2, b.y - w / 2, w, w);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    paintTree(ctx, (t - T.paint) / T.paintDur);
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(layer, 0, 0); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (let i = next; i < beads.length && beads[i].delay - 1 <= t; i++) {
      const b = beads[i]; if (b.delay > t) continue;
      const p = clamp((t - b.delay) / b.dur, 0, 1), e = ease(p);
      let x = b.x, y = b.y - (1 - e) * 6, s = 1 + (1 - e) * .7, a = e;
      const w = b.img.width / dpr * s; ctx.globalAlpha = a; ctx.drawImage(b.img, x - w / 2, y - w / 2, w, w);
    }
    ctx.globalAlpha = 1;
    if (t >= T.nameEnd - .2) tag.classList.add("on");
    if (t >= T.lit) { btn.classList.add("lit"); foot.classList.add("on"); }
    return next < beads.length || t < T.paint + T.paintDur;
  }
  const freeze = +(new URLSearchParams(location.search).get("introt") || 0);   // test hook: ?introt=5 renders one moment
  let clock = 0, last = 0;
  function frame(now) {
    if (bursting) return burstFrame((now - t0) / 1000);
    clock += last ? Math.min(.05, (now - last) / 1000) : 0; last = now;   // a stalled or hidden page pauses the show instead of skipping it
    const t = freeze || clock;
    if (render(t) && !freeze) raf = requestAnimationFrame(frame); else done = !freeze || t >= T.lit;
  }
  function finish() { cancelAnimationFrame(raf); render(99); done = true; }
  function start() {
    $(".intro-name").classList.add("on");
    layout();
    if (reduce) return finish();
    render(0); raf = requestAnimationFrame(frame);
  }
  // click: the glass scatters from the glowing centre, the painted tree fades, then the curtain lifts
  function burstFrame(dt) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = Math.max(0, 1 - dt / .5); paintTree(ctx, 1);
    for (const b of beads) {
      const x = b.x + b.vx * dt, y = b.y + b.vy * dt + 900 * dt * dt, w = b.img.width / dpr;
      ctx.globalAlpha = Math.max(0, 1 - dt / .9); ctx.drawImage(b.img, x - w / 2, y - w / 2, w, w);
    }
    ctx.globalAlpha = 1; if (dt < 1) raf = requestAnimationFrame(frame);
  }
  let entering = false;
  function enter() {
    if (entering) return;
    if (!done) return finish();               // first click during the show skips to the finished tree
    entering = true;
    if (reduce) return leave();
    for (const b of beads) {
      const dx = b.x - L.cx, dy = b.y - L.ccY, d = Math.hypot(dx, dy) || 1, sp = rnd(260, 620) * (b.kind === "name" ? .5 : 1);
      b.vx = dx / d * sp + rnd(-40, 40); b.vy = dy / d * sp - rnd(120, 300);
    }
    btn.classList.add("gone");
    const f = document.createElement("div"); f.className = "flash";
    f.style.left = `${L.cx - 130}px`; f.style.top = `${L.ccY - 130}px`; intro.appendChild(f);
    cancelAnimationFrame(raf); bursting = true; t0 = performance.now(); raf = requestAnimationFrame(frame);
    setTimeout(leave, 420);
  }
  function leave() {
    intro.classList.add("leaving");
    document.body.classList.remove("locked");
    setTimeout(() => { cancelAnimationFrame(raf); intro.hidden = true; }, 1300);
    try { sessionStorage.setItem("entered", "1"); } catch {}
  }
  btn.addEventListener("click", e => { e.stopPropagation(); enter(); });
  intro.addEventListener("click", () => { if (!done && !entering) finish(); });
  btn.setAttribute("aria-label", "Влез в сайта");
  addEventListener("keydown", e => { if (!intro.hidden && e.key === "Enter") enter(); });
  addEventListener("resize", () => { if (intro.hidden || bursting) return; cancelAnimationFrame(raf); layout(); finish(); });
  let ci = 0;
  $$(".intro-name .w").forEach(w => { w.setAttribute("aria-hidden", "true");
    w.innerHTML = [...w.textContent].map(c => `<span class="ch" style="--i:${ci++}">${c}</span>`).join(""); });
  let seen = false; try { seen = sessionStorage.getItem("entered") === "1"; } catch {}
  const deep = location.hash && location.hash !== "#kolekcia";
  if (seen || deep) { intro.hidden = true; return; }
  document.body.classList.add("locked"); requestAnimationFrame(() => intro.classList.add("play"));
  const ready = document.fonts && document.fonts.load ? Promise.race([document.fonts.load('100px "Prata"', "Лъки"), new Promise(r => setTimeout(r, 1800))]) : Promise.resolve();
  const loaded = document.readyState === "complete" ? Promise.resolve() : new Promise(r => addEventListener("load", r, { once: true }));
  const visible = () => new Promise(r => { if (!document.hidden) return r(); document.addEventListener("visibilitychange", function v() { if (!document.hidden) { document.removeEventListener("visibilitychange", v); r(); } }); });
  Promise.all([ready.catch(() => {}), Promise.race([loaded, new Promise(r => setTimeout(r, 4000))])]).then(visible).then(start, start);
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

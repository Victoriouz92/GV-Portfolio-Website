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
const hung = w => w.cat === "kartina" || w.cat === "pana"; // works are cut from the photo and hung on the page wall
const wallSrc = (id, cat, sm) => `${P}${id}-wall${sm ? "-sm" : ""}` + (cat === "pana" ? ".webp?v=2" : ".jpg?v=2"); // panels keep their wire, so they need transparency
const card = w => `
  <a class="work rv${hung(w) ? " hung" : ""}${w.cat === "pana" ? " pane" : ""}" href="#tvorba-${w.id}">
    <span class="mat glass">
      <img class="main" src="${hung(w) ? wallSrc(w.id, w.cat, 1) : `${P}${w.id}-sm.jpg`}" alt="${esc(w.name)}" loading="lazy">
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
  next.onload = () => { wpMain.classList.toggle("hung", !!s.hung); wpMain.classList.toggle("pane", !!s.hung && cur.cat === "pana"); wpImg.src = s.src; wpImg.style.opacity = 1; lens.style.backgroundImage = `url("${s.src}")`; };
  wpImg.alt = cur.name;
  $$("#wpThumbs button").forEach((b, k) => b.setAttribute("aria-pressed", k === i));
}
function renderWork(id) {
  cur = byId(id); if (!cur) return false;
  shots = [];
  if (cur.id === "plodorodie") {
    Object.keys(FRAMES).forEach(f => shots.push({ src: `assets/img/framed-${f}-wall.jpg`, th: `assets/img/swatch-${f}.jpg`, v: 1, hung: true, label: `рамка ${FRAMES[f]}` }));
    shots.push({ src: `${P}plodorodie-close.jpg`, th: `${P}plodorodie-close-sm.jpg`, v: 1 });
  } else for (let i = 1; i <= (cur.photos || 1); i++) {
    const h = hung(cur);
    shots.push({ src: h ? wallSrc(vid(cur, i), cur.cat) : `${P}${vid(cur, i)}.jpg`, th: `${P}${vid(cur, i)}-sm.jpg`, v: i, hung: h });
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

/* ---------- intro: the name and a Tree of Life assemble from fused-glass beads; "Влез" glows in the crown ---------- */
const intro = $("#intro");
(function introScene() {
  const cv = $("#introCanvas"), ctx = cv.getContext("2d"), btn = $("#enterBtn"), tag = $(".intro-tag");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rnd = (a, b) => a + Math.random() * (b - a), pick = arr => arr[Math.random() * arr.length | 0];
  const ease = t => 1 - Math.pow(1 - t, 3), back = t => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
  // palettes taken from her glass: a copper-to-honey name, an autumn crown, a dark glossy trunk
  const NAME = [[122, 52, 22], [150, 66, 26], [176, 86, 34], [196, 110, 44], [210, 136, 58], [222, 160, 76]];
  const CROWN = {
    core: [[236, 182, 92], [226, 154, 60], [224, 118, 46]],
    mid: [[226, 102, 40], [212, 74, 34], [232, 142, 58], [198, 60, 30]],
    edge: [[176, 50, 30], [144, 36, 26], [200, 80, 36], [118, 30, 22]],
    leaf: [[110, 138, 58], [80, 112, 54]], dark: [[64, 36, 22]]
  };
  const BARK = [[38, 24, 17], [52, 33, 22], [70, 45, 30], [30, 19, 13], [96, 66, 44]];
  const GROUND = [[92, 108, 52], [70, 84, 42], [120, 128, 64], [58, 38, 24]];
  let W, H, dpr, beads = [], raf, t0 = 0, settled = false, bursting = false, L = {}, sprites = new Map();

  function sprite(c, r, v) {               // one glossy glass bead, cached by colour / size / shape variant
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
  function bead(x, y, r, c, kind, delay, from) {
    const rr = Math.max(1, Math.round(r * dpr * 2) / 2);
    beads.push({ x, y, r, c, kind, delay, sx: from ? from[0] : x, sy: from ? from[1] : y, img: sprite(c, rr, kind === "crown" ? 2 + (Math.random() * 4 | 0) : Math.random() * 2 | 0) });
  }
  // hex-grid samples inside whatever is painted on a mask canvas
  function sampleMask(draw, w, h, sp) {
    const c = document.createElement("canvas"); c.width = Math.ceil(w); c.height = Math.ceil(h);
    const g = c.getContext("2d"); draw(g); const d = g.getImageData(0, 0, c.width, c.height).data, out = [];
    for (let row = 0, y = sp / 2; y < h; y += sp * .866, row++)
      for (let x = (row % 2 ? sp / 2 : 0) + sp / 4; x < w; x += sp) {
        const jx = x + rnd(-.22, .22) * sp, jy = y + rnd(-.22, .22) * sp, i = ((jy | 0) * c.width + (jx | 0)) * 4 + 3;
        if (d[i] > 140) out.push([jx, jy]);
      }
    return out;
  }
  function layout() {
    dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px";
    beads = []; sprites.clear();
    const font = '"Great Vibes", "Marck Script", cursive', text = "Лъки Михайлова";
    // name: size to fit, thicken the hairlines a little so every stroke can hold a bead
    ctx.font = `100px ${font}`; const w100 = ctx.measureText(text).width;
    const fs = Math.min(100 * W * .84 / w100, H * .15, 180), sp = Math.max(2, Math.min(4.2, fs * .031));
    const tw = w100 * fs / 100, mw = tw + fs * .8, mh = fs * 1.7;
    const pts = sampleMask(g => { g.font = `${fs}px ${font}`; g.lineJoin = "round"; g.lineWidth = fs * .024;
      g.fillText(text, fs * .4, fs * 1.15); g.strokeText(text, fs * .4, fs * 1.15); }, mw, mh, sp);
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const [x, y] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    // vertical composition: name, tagline, tree; spare height is shared above and between so nothing floats apart
    const nameH = y1 - y0, tagH = fs * .55 + 18;
    let top = Math.max(H * .06, 28);
    const TH = Math.max(160, Math.min((H - top - nameH - tagH - 70) / .99, W * .9 / .76, 640));
    const spare = Math.max(0, H - 64 - TH * .99 - tagH - nameH - top - 40);
    top += spare * .42;
    const ox = (W - (x1 - x0)) / 2 - x0, oy = top - y0;
    for (const [x, y] of pts) {
      const u = (x - x0) / (x1 - x0), ci = Math.min(NAME.length - 1, Math.max(0, Math.round(u * 3.2 + rnd(-.9, 1.6))));
      const ang = rnd(0, 6.283), dist = rnd(.25, .6) * Math.max(W, H);
      bead(x + ox, y + oy, sp * rnd(.64, .76), NAME[ci], "name", .25 + u * 1.9 + rnd(0, .18),
        [x + ox + Math.cos(ang) * dist, y + oy + Math.sin(ang) * dist * .6 + H * .25]);
    }
    const nameBottom = y1 + oy;
    tag.style.top = `${nameBottom + Math.max(6, fs * .08)}px`;
    // tree: fits between the tagline and the footer
    const cx = W / 2, baseY = H - 64 - spare * .3, ccY = baseY - TH * .64, RC = TH * .34, rw = TH * .105;
    L = { cx, ccY, rw, TH };
    const bsp = Math.max(2.2, TH * .0105), T0 = 2.15;
    // trunk, roots and limbs painted as tapered strokes, then filled with dark glossy beads
    const limbs = [[-62, .3], [-38, .34], [-16, .3], [8, .33], [30, .32], [54, .3]];
    const trunkTop = baseY - TH * .36;
    const tree = sampleMask(g => {
      g.translate(-cx + TH * .6, -baseY + TH * 1.05); g.fillStyle = g.strokeStyle = "#000"; g.lineCap = "round";
      g.beginPath(); g.moveTo(cx - TH * .085, baseY); g.quadraticCurveTo(cx - TH * .03, baseY - TH * .05, cx - TH * .03, baseY - TH * .2);
      g.lineTo(cx - TH * .022, trunkTop); g.lineTo(cx + TH * .022, trunkTop); g.lineTo(cx + TH * .03, baseY - TH * .2);
      g.quadraticCurveTo(cx + TH * .03, baseY - TH * .05, cx + TH * .09, baseY); g.closePath(); g.fill();
      const limb = (x, y, ang, len, wd, depth) => {
        const a = ang * Math.PI / 180, ex = x + Math.sin(a) * len, ey = y - Math.cos(a) * len, n = 8;
        for (let i = 0; i < n; i++) {
          const t1 = i / n, t2 = (i + 1) / n, bend = Math.sin(t2 * 3) * len * .06 * Math.sign(ang || 1);
          g.lineWidth = wd * (1 - t1 * .75); g.beginPath();
          g.moveTo(x + (ex - x) * t1, y + (ey - y) * t1); g.lineTo(x + (ex - x) * t2 + bend, y + (ey - y) * t2); g.stroke();
        }
        if (depth) [-1, 1].forEach(sd => limb(x + (ex - x) * .55, y + (ey - y) * .55, ang + sd * 26, len * .5, wd * .45, depth - 1));
      };
      for (const [ang, len] of limbs) limb(cx + ang / 62 * TH * .012, trunkTop + TH * .02, ang, len * TH, TH * .034, 1);
      g.lineWidth = TH * .016; [[-1, .14], [1, .13], [-1, .07]].forEach(([sd, l]) => {
        g.beginPath(); g.moveTo(cx + sd * TH * .04, baseY - TH * .01); g.quadraticCurveTo(cx + sd * TH * .09, baseY + TH * .004, cx + sd * TH * (.06 + l), baseY + TH * .012); g.stroke(); });
    }, TH * 1.2, TH * 1.12, bsp);
    for (const [x, y] of tree) {
      const X = x + cx - TH * .6, Y = y + baseY - TH * 1.05;
      const grow = (baseY - Y) / (TH * .62) + Math.abs(X - cx) / TH * .5;   // grows from the root up and out along the limbs
      bead(X, Y, bsp * rnd(.56, .72), pick(BARK), "bark", T0 + Math.min(1, grow) * 1.25 + rnd(0, .08));
    }
    // ground: a soft line of grass-glass with a few fallen leaves
    const gw = Math.min(TH * .42, W * .4);
    for (let x = cx - gw; x < cx + gw; x += bsp * .9) {
      const k = 1 - Math.pow(Math.abs(x - cx) / gw, 2), hgt = k * TH * .028 * rnd(.3, 1);
      for (let y = 0; y < hgt; y += bsp * .9) bead(x + rnd(-1, 1), baseY + TH * .016 - y, bsp * rnd(.45, .62),
        Math.random() < .08 ? pick(CROWN.mid) : pick(GROUND), "ground", 1.95 + Math.abs(x - cx) / TH * .9 + rnd(0, .1));
    }
    // crown: packed chips, honey near the glowing centre, deep reds at the rim, a few greens for life
    const rmin = TH * .0062, rmax = TH * .0145, grid = new Map(), cell = rmax * 2, placed = [];
    const edge = th => RC * (1 + .045 * Math.sin(3 * th + 1.3) + .035 * Math.sin(5 * th + .4) + .02 * Math.sin(9 * th));
    const fits = (x, y, r) => { const gx = Math.floor(x / cell), gy = Math.floor(y / cell);
      for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (const q of grid.get((gx + i) + "," + (gy + j)) || [])
        if ((q[0] - x) ** 2 + (q[1] - y) ** 2 < ((q[2] + r) * .74) ** 2) return false; return true; };
    const tries = Math.round((RC / rmin) ** 2 * 14);
    for (let n = 0; n < tries; n++) {
      const th = rnd(0, 6.283), rad = Math.sqrt(Math.random()) * RC * 1.06, x = cx + Math.cos(th) * rad * 1.08, y = ccY + Math.sin(th) * rad * .94;
      const e = edge(th); if (rad > e || rad < rw * 1.02) continue;
      const k = (rad - rw) / (e - rw), r = rmin + (rmax - rmin) * Math.pow(Math.random(), 1.6) * (k < .15 ? .6 : 1);
      if (!fits(x, y, r)) continue;
      const key = Math.floor(x / cell) + "," + Math.floor(y / cell); (grid.get(key) || grid.set(key, []).get(key)).push([x, y, r]);
      placed.push([x, y, r, k]);
    }
    for (const [x, y, r, k] of placed) if (Math.random() < .3)   // deep-red under-layer gives the crown depth
      bead(x + rnd(-r, r), y + rnd(-r, r), r * .85, pick([[118, 30, 22], [146, 40, 26], [92, 28, 20]]), "crown", T0 + 1.05 + k * 1.3, [x, y]);
    for (const [x, y, r, k] of placed) {
      const z = Math.random(), col = z < .06 ? pick(CROWN.leaf) : z < .1 ? pick(CROWN.dark)
        : k < .22 ? pick(CROWN.core) : k < .62 ? pick(Math.random() < .25 ? CROWN.core : CROWN.mid) : pick(Math.random() < .3 ? CROWN.mid : CROWN.edge);
      bead(x, y, r, col, "crown", T0 + 1.15 + k * 1.35 + rnd(0, .22), [cx + (x - cx) * .55, ccY + (y - ccY) * .55]);
    }
    beads.sort((p, q) => (p.kind === "name") - (q.kind === "name"));
    btn.style.left = `${cx - rw * 1.3}px`; btn.style.top = `${ccY - rw * 1.3}px`; btn.style.width = btn.style.height = `${rw * 2.6}px`;
    btn.style.fontSize = `${Math.max(13, rw * .3)}px`;
  }
  function draw(t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    let busy = false;
    for (const b of beads) {
      const dur = b.kind === "name" ? 1.15 : b.kind === "crown" ? .55 : .4;
      let p = (t - b.delay) / dur; if (p < 1) busy = true; if (p <= 0) continue; p = Math.min(1, p);
      let x = b.x, y = b.y, s = 1, a = 1;
      if (b.kind === "name") { const e = ease(p); x = b.sx + (b.x - b.sx) * e; y = b.sy + (b.y - b.sy) * e - Math.sin(p * Math.PI) * 30; a = Math.min(1, p * 3); s = .5 + .5 * e; }
      else if (b.kind === "crown") { const e = back(p); x = b.sx + (b.x - b.sx) * ease(p); y = b.sy + (b.y - b.sy) * ease(p); s = Math.max(0, e); a = Math.min(1, p * 2.5); }
      else { s = back(p); a = Math.min(1, p * 3); }
      const w = b.img.width / dpr * s; if (w <= 0) continue;
      ctx.globalAlpha = a; ctx.drawImage(b.img, x - w / 2, y - w / 2, w, w);
    }
    ctx.globalAlpha = 1; return busy;
  }
  const freeze = +(new URLSearchParams(location.search).get("introt") || 0);
  function frame(now) {
    const t = freeze || (now - t0) / 1000;
    if (bursting) return burstFrame(t);
    const busy = draw(t);
    if (!btn.classList.contains("lit") && t > 4.7) btn.classList.add("lit");
    if (busy && !freeze) raf = requestAnimationFrame(frame); else settled = true;
  }
  function start() {
    layout();
    if (reduce) { draw(99); btn.classList.add("lit"); settled = true; return; }
    t0 = performance.now(); raf = requestAnimationFrame(frame);
  }
  // click: the glass scatters from the glowing centre, then the curtain lifts
  let bt0 = 0;
  function burstFrame(t) {
    const dt = t - bt0; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    for (const b of beads) {
      const x = b.x + b.vx * dt, y = b.y + b.vy * dt + 900 * dt * dt, w = b.img.width / dpr;
      ctx.globalAlpha = Math.max(0, 1 - dt / .9); ctx.drawImage(b.img, x - w / 2, y - w / 2, w, w);
    }
    ctx.globalAlpha = 1; if (dt < 1) raf = requestAnimationFrame(frame);
  }
  let entering = false;
  function enter() {
    if (entering) return; entering = true;
    if (reduce) return leave();
    for (const b of beads) {
      const dx = b.x - L.cx, dy = b.y - L.ccY, d = Math.hypot(dx, dy) || 1, sp = rnd(260, 620) * (b.kind === "name" ? .5 : 1);
      b.vx = dx / d * sp + rnd(-40, 40); b.vy = dy / d * sp - rnd(120, 300);
    }
    btn.classList.add("gone");
    const f = document.createElement("div"); f.className = "flash";
    f.style.left = `${L.cx - 130}px`; f.style.top = `${L.ccY - 130}px`; intro.appendChild(f);
    cancelAnimationFrame(raf); bursting = true; t0 = performance.now(); bt0 = 0; raf = requestAnimationFrame(frame);
    setTimeout(leave, 420);
  }
  function leave() {
    intro.classList.add("leaving");
    document.body.classList.remove("locked");
    setTimeout(() => { cancelAnimationFrame(raf); intro.hidden = true; }, 1300);
    try { sessionStorage.setItem("entered", "1"); } catch {}
  }
  btn.addEventListener("click", enter);
  btn.setAttribute("aria-label", "Влез в сайта");
  addEventListener("keydown", e => { if (!intro.hidden && e.key === "Enter") enter(); });
  addEventListener("resize", () => { if (intro.hidden || bursting) return; cancelAnimationFrame(raf); layout(); draw(99); btn.classList.add("lit"); });
  let seen = false; try { seen = sessionStorage.getItem("entered") === "1"; } catch {}
  const deep = location.hash && location.hash !== "#kolekcia";
  if (seen || deep) { intro.hidden = true; return; }
  document.body.classList.add("locked"); requestAnimationFrame(() => intro.classList.add("play"));
  const ready = document.fonts && document.fonts.load ? Promise.race([document.fonts.load('100px "Great Vibes"', "Лъки"), new Promise(r => setTimeout(r, 1800))]) : Promise.resolve();
  ready.then(start, start);
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

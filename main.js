/* Content lives in data/works.json and data/site.json, so the artist can edit it in the admin panel (Pages CMS).
   Product photos (WebP): assets/products/<id>-wall(-sm).webp (cut out, hung on the page wall), <id>-close(-sm).webp (detail), <id>-sm.webp (thumb);
   a piece added in the panel can instead carry its own uploaded photo in "image". */
const SITE = window.SITE || {};
const ORDER_EMAIL = SITE.email || "artgifts.bg@gmail.com";
const WORKS = (window.WORKS_DATA || []).filter(w => w && w.id && w.name);
const PANE_PERKS = ["Лесно се поставя", "Подхожда на стена във всякакъв цвят", "Почиства се лесно", "Внася цвят, стил и настроение в дома или офиса", "Подходящ подарък за мъже и жени"];
const CAT_NOTE = {
  kartina: "Дървета на живота, рисувани върху стъкло и сплавени с цветни стъкълца, в дървена рамка.",
  pana: "Без рамка. Висят на метална закопчалка във формата на кобилица, завършваща със спирала — символ на развитие и желание за извисеност, целящо да затвори кръга.",
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const P = "assets/products/";
const money = n => `${Number.isInteger(+n) ? +n : (+n).toFixed(2).replace(".", ",")} €`; // 68 €, 4,04 €
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const hasSizes = w => Array.isArray(w.sizes) && w.sizes.length > 0;
const hasPrice = v => v !== null && v !== undefined && v !== "";
const priceLabel = w => hasSizes(w) ? money(w.sizes[0].price) : hasPrice(w.price) ? money(w.price) : "по запитване";
const sizeLabel = w => w.size || "размер при запитване";
// physical area in cm², used to order the collection from the largest piece to the smallest
const area = w => { const m = String(hasSizes(w) ? w.sizes[w.sizes.length - 1].size : w.size || "").replace(",", ".").match(/([\d.]+)\s*[×x]\s*([\d.]+)/);
  return m ? m[1] * m[2] : 0; };
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
const hung = w => !w.image || w.cat === "kartina"; // works are cut from the photo and hung on the page wall
const wallSrc = (id, cat, sm) => `${P}${id}-wall${sm ? "-sm" : ""}.webp?v=3`; // WebP keeps the transparency around the panels' wire
const imgSrc = (w, sm) => w.image ? esc(String(w.image).replace(/^\//, "")) : wallSrc(w.id, w.cat, sm);
const fullName = w => `${w.series} „${w.name}“`;
// every work has its own address (/tvorba/<id>/) so search engines and shared links can point at it
const PATHS = !!document.querySelector("base") && /^https?:$/.test(location.protocol);
const workHref = id => PATHS ? `tvorba/${id}/` : `#tvorba-${id}`;
// every work is one piece unless the admin panel says otherwise
const stockOf = w => w.sold ? 0 : hasPrice(w.stock) ? Math.max(0, +w.stock) : 1;
const stockLabel = w => stockOf(w) ? `${stockOf(w)} бр. в наличност` : "Продадена";
const sizeSelect = (w, cls) => `<label class="${cls}"><span class="vh">Размер</span><select data-sizes="${w.id}">${w.sizes.map((z, k) =>
  `<option value="${k}">${esc(z.size)}</option>`).join("")}</select></label>`;
const card = w => `
  <article class="work rv${hung(w) ? " hung" : ""}${w.cat === "pana" && !w.image ? " pane" : ""}${w.sold ? " sold" : ""}">
    <a class="mat glass" href="${workHref(w.id)}" aria-label="${esc(fullName(w))}">
      <img class="main" src="${imgSrc(w, 1)}" alt="${esc(fullName(w))}" loading="lazy">
    </a>
    <div class="cap">
      <span class="series">${esc(w.series)}</span>
      <h3><a href="${workHref(w.id)}">${esc(w.name)}</a></h3>
      ${hasSizes(w) ? sizeSelect(w, "size-pick") : `<span class="size">${esc(w.size || "размер при запитване")}</span>`}
      <span class="price" data-price="${w.id}">${w.sold ? "Продадена" : priceLabel(w)}</span>
      ${w.sold ? "" : `<span class="stock-mini">${stockLabel(w)}</span>`}
    </div>
  </article>`;
// a size picked on a card updates its price
document.addEventListener("change", e => {
  const sel = e.target.closest("select[data-sizes]"); if (!sel) return;
  const w = byId(sel.dataset.sizes), z = w.sizes[+sel.value];
  const scope = sel.closest(".work, .wp-info") || document;
  const pr = scope.querySelector(`[data-price="${w.id}"]`) || $("#wpPrice"); if (pr) pr.textContent = money(z.price);
});

/* ---------- collection ---------- */
let curCat = "kartina";
function renderGrid(cat) {
  curCat = cat;
  const soon = cat === "soon";
  $("#soon").hidden = !soon; $("#grid").hidden = soon;
  $("#catNote").textContent = soon ? "" : CAT_NOTE[cat];
  if (!soon) $("#grid").innerHTML = WORKS.filter(w => w.cat === cat).sort((a, b) => (area(b) || -1) - (area(a) || -1)).map(card).join("");
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
    Object.keys(FRAMES).forEach(f => shots.push({ src: `assets/img/framed-${f}-wall.webp`, th: `assets/img/swatch-${f}.webp`, v: 1, hung: true, label: `рамка ${FRAMES[f]}` }));
    shots.push({ src: `${P}plodorodie-close.webp`, th: `${P}plodorodie-close-sm.webp`, v: 1 });
  } else if (cur.image) {
    shots.push({ src: imgSrc(cur), th: imgSrc(cur), v: 1, hung: cur.cat === "kartina" });
  } else {
    shots.push({ src: wallSrc(cur.id, cur.cat), th: `${P}${cur.id}-sm.webp`, v: 1, hung: true });
    shots.push({ src: `${P}${cur.id}-close.webp`, th: `${P}${cur.id}-close-sm.webp`, v: 1 });
  }
  $("#wpThumbs").innerHTML = shots.map((s, i) => `<button type="button" data-shot="${i}" aria-label="Снимка ${i + 1}${s.label ? ", " + s.label : ""}"><img src="${s.th}" alt=""></button>`).join("");
  $("#wpCat").textContent = cur.series + (cur.cat === "pana" ? " · без рамка" : " · стъклена картина с рамка");
  $("#wpName").textContent = cur.name;
  $("#wpPrice").textContent = priceLabel(cur);
  $("#wpPerks").innerHTML = cur.cat === "pana" ? PANE_PERKS.map(t => `<li>${t}</li>`).join("") : "";
  $("#wpText").textContent = cur.text || (cur.cat === "pana" ? CAT_NOTE.pana : "Дърво на живота, рисувано върху стъкло и сплавено в пещ с цветни стъкълца.");
  $("#wpSizes").innerHTML = hasSizes(cur) ? sizeSelect(cur, "size-pick big") : "";
  if (cur.sold) $("#wpPrice").textContent = "Продадена";
  $("#wpAdd").hidden = !stockOf(cur);
  $("#wpStock").innerHTML = stockOf(cur) ? `<span>${stockLabel(cur)}</span> Търсите повече бройки? <a href="#kontakti">Пишете ни</a>` : "<span>Продадена</span> Може да се изработи подобна — <a href=\"#poruchka\">по поръчка</a>";
  const specs = [["Размер", hasSizes(cur) ? "по избор" : sizeLabel(cur)],
    [cur.cat === "pana" ? "Окачване" : "Рамка", cur.cat === "pana" ? "метална закопчалка-кобилица със спирала" : (cur.frame || "дървена")],
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
  let price = hasPrice(cur.price) ? cur.price : null, detail = sizeLabel(cur), size = null;
  if (hasSizes(cur)) { size = +$("#wpSizes select").value; const z = cur.sizes[size]; detail = z.size; price = z.price; }
  if (cart.filter(c => c.id === cur.id).length >= stockOf(cur)) { openDrawer(); $("#cartNote").textContent = `„${cur.name}“ вече е в количката — наличността е ${stockOf(cur)} бр.`; return; }
  if (cur.id === "plodorodie") detail += ` · ${s.label || "рамка Платина"}`;
  addToList({ id: cur.id, size, name: fullName(cur), detail, price, img: s.th.includes("swatch") ? s.src : cur.image ? imgSrc(cur) : `${P}${cur.id}-sm.webp` });
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
  const src = k === "svatba" ? `assets/img/framed-wedding-${f}-wall.webp` : k === "darvo" ? `assets/img/framed-${f}-wall.webp` : `${P}pana-yabalka-wall.webp?v=3`;
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
  const pm = location.pathname.match(/\/tvorba\/([\w-]+)\/?$/);
  const h = pm ? `tvorba-${pm[1]}` : location.hash.slice(1) || "kolekcia";
  let view = "nachalo", section = null;
  if (h.startsWith("tvorba-")) view = renderWork(h.slice(7)) ? "tvorba" : "nachalo";
  else if (h === "poruchka") view = "poruchka";
  else section = SECTIONS.includes(h) ? h : "kolekcia";
  const navKey = view === "tvorba" ? "kolekcia" : view === "poruchka" ? "poruchka" : section;
  $$("[data-nav]").forEach(a => a.dataset.nav === navKey ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  const canon = $('link[rel="canonical"]'); if (canon) canon.href = "https://luckyglass.eu/" + (view === "tvorba" ? `tvorba/${cur.id}/` : "");
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
addEventListener("popstate", route);
// inside the site, moving between /tvorba/<id>/ and the sections happens without reloading the page
document.addEventListener("click", e => {
  if (!PATHS || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest("a[href]"); if (!a || a.target) return;
  const href = a.getAttribute("href");
  if (href.startsWith("tvorba/")) { e.preventDefault(); history.pushState(null, "", "/" + href); route(); }
  else if (href.startsWith("#") && location.pathname !== "/") { e.preventDefault(); history.pushState(null, "", "/" + href); route(); }
});
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
  const deep = (location.hash && location.hash !== "#kolekcia") || /\/tvorba\//.test(location.pathname);
  if (seen || deep) { intro.hidden = true; return; }
  document.body.classList.add("locked"); requestAnimationFrame(() => intro.classList.add("play"));
  const ready = document.fonts && document.fonts.load ? Promise.race([document.fonts.load('100px "Prata"', "Лъки"), new Promise(r => setTimeout(r, 1800))]) : Promise.resolve();
  const loaded = document.readyState === "complete" ? Promise.resolve() : new Promise(r => addEventListener("load", r, { once: true }));
  const visible = () => new Promise(r => { if (!document.hidden) return r(); document.addEventListener("visibilitychange", function v() { if (!document.hidden) { document.removeEventListener("visibilitychange", v); r(); } }); });
  Promise.all([ready.catch(() => {}), Promise.race([loaded, new Promise(r => setTimeout(r, 4000))])]).then(visible).then(start, start);
})();

/* ---------- cart & checkout ---------- */
let cart = store.get("cart2", []);
const drawer = $("#drawer");
// delivery: fixed prices from the admin panel, BOX NOW lockers from its own map
const DELIV = (Array.isArray(SITE.delivery) && SITE.delivery.length ? SITE.delivery : [{ label: "От галерията", note: SITE.address || "", type: "pickup", price: 0 }])
  .map(o => ({ ...o, price: hasPrice(o.price) ? +o.price : null }));
const WHERE = { office: "Град и офис на куриера", address: "Град и адрес за доставка", boxnow: "Автомат BOX NOW" };
const shipLabel = p => p === 0 ? "безплатно" : p != null ? money(p) : "по тарифа";
// card payments: Stripe's own secure field, switched on once the key and the small payment server are set in site.json.
// ?karta=demo shows it with Stripe's public test key, so the design can be checked before the account is connected.
const DEMO = /[?&]karta=demo\b/.test(location.search);
const STRIPE_KEY = DEMO ? "pk_test_TYooMQauvdEDq54NiTphI7jx" : SITE.stripeKey, STRIPE_API = SITE.stripeApi;
const CARD_ON = !!(DEMO || (STRIPE_KEY && STRIPE_API));
const PAY = [
  { id: "card", label: "С карта онлайн", note: "Visa, Mastercard, Apple Pay, Google Pay", ok: () => CARD_ON },
  { id: "cod", label: "Наложен платеж", note: "плащате на куриера при получаване", ok: t => t === "office" || t === "address" },
  { id: "cod", label: "При получаване", note: "с карта, по линк от BOX NOW преди отварянето на автомата", ok: t => t === "boxnow" },
  { id: "gallery", label: "При вземане от галерията", note: "в брой или с карта", ok: t => t === "pickup" },
  { id: "bank", label: "Банков превод", note: "изпращаме данните за превода с потвърждението", ok: () => true }];
const opt = (name, i, o, right, on) => `<label class="opt"><input type="radio" name="${name}" value="${i}"${on ? " checked" : ""}>
  <span class="dot" aria-hidden="true"></span><span class="ot"><b>${esc(o.label)}</b>${o.note ? `<small>${esc(o.note)}</small>` : ""}</span>${right ? `<em>${right}</em>` : ""}</label>`;
$("#delivList").innerHTML = DELIV.map((o, i) => opt("delivery", i, o, shipLabel(o.price), !i)).join("");
const deliv = () => DELIV[+(($("input[name=delivery]:checked") || {}).value || 0)];
const payM = () => { const t = deliv().type || "pickup", v = ($("input[name=pay]:checked") || {}).value; return PAY.find(m => m.id === v && m.ok(t)) || PAY[PAY.length - 1]; };
const totals = () => {
  const known = cart.filter(c => c.price != null), items = known.reduce((s, c) => s + c.price, 0), ship = deliv().price;
  return { items, ship, sum: items + (ship || 0), exact: known.length === cart.length && ship != null, any: known.length > 0 };
};
function renderPay() {
  const t = deliv().type || "pickup", was = ($("input[name=pay]:checked") || {}).value;
  const list = PAY.filter(m => m.ok(t)), keep = list.some(m => m.id === was) ? was : list[0].id;
  $("#payList").innerHTML = list.map(m => opt("pay", m.id, m, "", m.id === keep)).join("");
  updatePay();
}
function updatePay() {
  const card = payM().id === "card", { exact } = totals();
  $("#cardBox").hidden = !card;
  if (card && !exact) $("#orderNote").textContent = "Някоя цена е „по запитване“ — за картово плащане изберете творби с цена или друг начин на плащане.";
  else if ($("#orderNote").dataset.auto) $("#orderNote").textContent = "";
  $("#orderNote").dataset.auto = card && !exact ? "1" : "";
  if (card) mountCard();
  renderList();
}
function updateDeliv() {
  const o = deliv(), t = o.type || "pickup";
  $("#delivWhere").hidden = t === "pickup";
  $("#whereLabel").textContent = WHERE[t] || WHERE.address;
  $("#oWhere").placeholder = t === "boxnow" ? "Изберете от картата или напишете адреса на автомата" : t === "office" ? "напр. Пловдив, офис Централен" : "напр. Варна, ул. „Шипка“ 12, ет. 3";
  $("#bnBox").hidden = t !== "boxnow";
  renderPay();
}
$("#delivList").addEventListener("change", updateDeliv);
$("#payList").addEventListener("change", updatePay);
// the official BOX NOW map runs in a frame and posts the chosen locker back to the page
$("#bnOpen").addEventListener("click", () => {
  const box = $("#bnMap"); box.hidden = false;
  if (box.firstChild) return;
  const q = new URLSearchParams({ gps: "yes", autoselect: "yes", autoclose: "no", countryCode: "bg", language: "bg" });
  if (SITE.boxnowPartnerId) q.set("partnerId", SITE.boxnowPartnerId);
  box.innerHTML = `<iframe src="https://map.boxnow.bg/iframe.html?${q}" title="Карта на автоматите BOX NOW" allow="geolocation" loading="lazy"></iframe>`;
});
addEventListener("message", e => {
  if (!/^https:\/\/(map|widget(-v\d+)?)\.boxnow\.bg$/.test(e.origin)) return;
  let l = e.data; if (typeof l === "string") try { l = JSON.parse(l); } catch { return; }
  if (!l || typeof l !== "object") return;
  const txt = [l.boxnowLockerName, l.boxnowLockerAddressLine1, l.boxnowLockerPostalCode].filter(Boolean).join(", ");
  if (!txt) return;
  $("#oWhere").value = txt + (l.boxnowLockerId ? ` (автомат № ${l.boxnowLockerId})` : "");
  $("#bnMap").hidden = true; $("#bnOpen").textContent = "Смени автомата";
});

/* Stripe Payment Element, styled to match the site: sand, umber ink, Jost, soft rounded fields */
let stripe = null, elements = null, cardLoading = null;
const cents = n => Math.round(n * 100);
function mountCard() {
  if (cardLoading) return cardLoading;
  cardLoading = new Promise((ok, no) => {
    const sc = document.createElement("script"); sc.src = "https://js.stripe.com/v3/"; sc.onload = ok; sc.onerror = no; document.head.appendChild(sc);
  }).then(() => {
    stripe = window.Stripe(STRIPE_KEY, { locale: "bg" });
    elements = stripe.elements({
      mode: "payment", currency: "eur", amount: Math.max(50, cents(totals().sum)), locale: "bg",
      fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap" }],
      appearance: {
        theme: "flat", labels: "above",
        variables: { fontFamily: "Jost, 'Avenir Next', sans-serif", fontSizeBase: "16px", fontWeightNormal: "300", colorPrimary: "#9a4a2e",
          colorBackground: "#f4ece8", colorText: "#33241b", colorTextSecondary: "#6e5a4c", colorTextPlaceholder: "#a8968a",
          colorDanger: "#a3361f", borderRadius: "14px", spacingUnit: "4px", gridRowSpacing: "14px", focusBoxShadow: "0 0 0 3px rgba(154,74,46,.16)" },
        rules: {
          ".Input": { border: "1px solid rgba(51,36,27,.16)", boxShadow: "none", padding: "14px 16px" },
          ".Input:focus": { border: "1px solid #9a4a2e", boxShadow: "0 0 0 3px rgba(154,74,46,.14)" },
          ".Label": { fontSize: "11px", fontWeight: "400", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6e5a4c", marginBottom: "8px" },
          ".Tab": { border: "1px solid rgba(51,36,27,.16)", borderRadius: "14px", boxShadow: "none", backgroundColor: "#f4ece8" },
          ".Tab--selected": { borderColor: "#33241b", backgroundColor: "#fbf7f5", boxShadow: "none" },
          ".Tab:hover": { color: "#33241b" }, ".TabIcon--selected": { fill: "#9a4a2e" }, ".TabLabel": { fontWeight: "400" } } } });
    $("#cardEl").innerHTML = "";
    elements.create("payment", { layout: { type: "tabs", defaultCollapsed: false }, fields: { billingDetails: { name: "never", email: "never", phone: "never" } } }).mount("#cardEl");
  }).catch(() => { cardLoading = null; $("#cardEl").innerHTML = `<p class="fine">Полето за карта не се зареди. Проверете връзката или изберете друг начин на плащане.</p>`; });
  return cardLoading;
}

function renderList() {
  $("#cartCount").textContent = cart.length;
  $("#cartBtn").classList.toggle("has", cart.length > 0);
  $("#cartEmpty").hidden = cart.length > 0;
  $("#orderForm").hidden = !cart.length;
  $("#cartList").innerHTML = cart.map((c, i) => `<li><img src="${c.img}" alt=""><div><b>${esc(c.name)}</b><small>${esc(c.detail)}${c.id ? " · 1 бр." : ""}</small></div>
    <div class="pr"><span>${c.price != null ? money(c.price) : "по запитване"}</span><button type="button" class="rm" data-rm="${i}">Премахни</button></div></li>`).join("");
  const t = totals(), ask = cart.some(c => c.price == null);
  $("#sumItems").textContent = t.any ? money(t.items) + (ask ? " + по запитване" : "") : "по запитване";
  $("#sumShip").textContent = shipLabel(t.ship);
  $("#cartTotal").textContent = t.any ? money(t.sum) + (t.exact ? "" : " + …") : "по запитване";
  const m = payM().id;
  $("#payBtn").textContent = m === "card" ? `Плати ${t.exact ? money(t.sum) : ""}`.trim() : `Поръчай${t.exact ? " · " + money(t.sum) : ""}`;
  if (elements && t.exact) elements.update({ amount: Math.max(50, cents(t.sum)) });
}
function addToList(item) { cart.push(item); store.set("cart2", cart); $("#orderDone").hidden = true; $("#cartNote").textContent = ""; renderList(); openDrawer(); }
$("#cartList").addEventListener("click", e => {
  const b = e.target.closest("[data-rm]"); if (!b) return;
  cart.splice(+b.dataset.rm, 1); store.set("cart2", cart); $("#cartNote").textContent = ""; renderList();
});
function openDrawer() { drawer.hidden = false; document.body.style.overflow = "hidden"; }
function closeDrawer() { drawer.hidden = true; document.body.style.overflow = ""; }
$("#cartBtn").addEventListener("click", openDrawer);
$$("[data-close-drawer]").forEach(b => b.addEventListener("click", closeDrawer));
$("#drawer").addEventListener("click", e => { if (e.target.closest(".panel a[href^='#']")) closeDrawer(); });
addEventListener("keydown", e => { if (e.key === "Escape" && !drawer.hidden) closeDrawer(); });
const orderNo = () => "LG-" + Date.now().toString(36).slice(-6).toUpperCase();
function orderDone(no, text) {
  cart.length = 0; store.set("cart2", cart); renderList();
  $("#orderNote").textContent = ""; $("#doneNo").textContent = `Поръчка № ${no}`; $("#doneText").textContent = text;
  $("#orderDone").hidden = false; $("#orderDone").focus();
}
const DONE = {
  card: "Плащането е успешно. Ще получите потвърждение по имейл и ще ви се обадим за доставката.",
  cod: "Поръчката е приета. Ще ви се обадим до един работен ден, за да я потвърдим, и я изпращаме. Плащате при получаване.",
  gallery: "Поръчката е приета. Ще ви се обадим до един работен ден, когато творбата ви чака в галерията.",
  bank: "Поръчката е приета. До един работен ден ще ви изпратим данните за банковия превод на имейла ви." };
$("#orderForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target, d = Object.fromEntries(new FormData(f)), note = $("#orderNote"), btn = $("#payBtn"), m = payM(), t = totals();
  const fail = (msg, el) => { note.textContent = msg; note.dataset.auto = ""; if (el) el.focus(); };
  const dv = deliv();
  if (dv.type !== "pickup" && !d.where.trim()) return fail(dv.type === "boxnow" ? "Моля, изберете автомат BOX NOW." : "Моля, напишете къде да доставим.", $("#oWhere"));
  if (!d.name.trim()) return fail("Моля, въведете име и фамилия.", $("#oName"));
  if (!/\d{6,}/.test(d.phone.replace(/\D/g, ""))) return fail("Моля, въведете телефон за връзка.", $("#oPhone"));
  if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) return fail("Моля, въведете имейл — там ще получите потвърждението.", $("#oEmail"));
  if (!f.consent.checked) return fail("Моля, приемете Общите условия.");
  if (d._honey) return;                                  // filled only by spam bots
  if (m.id === "card" && !t.exact) return fail("Някоя цена е „по запитване“ — изберете друг начин на плащане.");
  const no = orderNo();
  const where = dv.type !== "pickup" ? ` — ${d.where.trim()}` : dv.note ? ` — ${dv.note}` : "";
  const delivery = `${dv.label} (${shipLabel(dv.price)})${where}`;
  const lines = cart.map((c, i) => `${i + 1}. ${c.name} — ${c.detail} — ${c.price != null ? money(c.price) : "цена по запитване"}`);
  const fields = { "Поръчка": no, "Плащане": m.label, "Име": d.name, "Телефон": d.phone, "Имейл": d.email, "Доставка": delivery,
    "Фактура": d.invoice ? "да" : "не", "Творби": lines.join("\n"), "Общо": $("#cartTotal").textContent };
  const send = extra => fetch(SITE.formEndpoint || `https://formsubmit.co/ajax/${ORDER_EMAIL}`, {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ _subject: `Поръчка ${no} от сайта — ${d.name}`, _template: "table", _captcha: "false", ...fields, ...extra }) })
    .then(async r => { const o = await r.json().catch(() => ({})); if (!r.ok || String(o.success) === "false") throw new Error(o.message || r.status); });
  btn.disabled = true;
  try {
    if (m.id === "card") {
      note.textContent = "Обработваме плащането…";
      await mountCard();
      const { error: inErr } = await elements.submit(); if (inErr) throw { user: inErr.message };
      if (DEMO) throw { user: "Това е демо на полето за карта — плащането не е истинско. Изберете друг начин, за да поръчате." };
      const r = await fetch(STRIPE_API, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: no, items: cart.filter(c => c.id).map(c => ({ id: c.id, size: c.size })), delivery: DELIV.indexOf(dv),
          name: d.name, email: d.email, phone: d.phone, where: d.where.trim(), invoice: !!d.invoice }) });
      const pi = await r.json().catch(() => ({}));
      if (!r.ok || !pi.clientSecret) throw { user: pi.error || "Плащането не може да започне. Опитайте отново или изберете друг начин." };
      if (cents(t.sum) !== pi.amount) throw { user: "Цените току-що са обновени. Презаредете страницата и опитайте отново." };
      const { error } = await stripe.confirmPayment({ elements, clientSecret: pi.clientSecret, redirect: "if_required",
        confirmParams: { return_url: `${location.origin}/?poruchka=${no}`, payment_method_data: { billing_details: { name: d.name, email: d.email, phone: d.phone } } } });
      if (error) throw { user: error.message };
      await send({ "Плащане": `С карта онлайн — ПЛАТЕНО (${pi.id})` }).catch(() => {});  // Stripe keeps the full record either way
      return orderDone(no, DONE.card);
    }
    note.textContent = "Изпращаме поръчката…";
    await send({});
    orderDone(no, DONE[m.id]);
  } catch (err) {
    if (err && err.user) return fail(err.user);
    // the form service is unreachable: hand the visitor a ready e-mail and the text to copy
    const body = [`Поръчка ${no}`, "", ...Object.entries(fields).map(([k, v]) => `${k}: ${v}`)].join("\n");
    $("#orderText").value = body; $("#orderMail").textContent = ORDER_EMAIL; $("#orderOut").hidden = false;
    fail("Не успяхме да изпратим автоматично. Отваряме имейл с готовата поръчка.");
    location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(`Поръчка ${no} от сайта`)}&body=${encodeURIComponent(body)}`;
  } finally { btn.disabled = false; }
});
$("#copyOrder").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText($("#orderText").value); $("#copyOrder").textContent = "Копирано"; }
  catch { $("#orderText").select(); }
});
// back from a bank or wallet page that Stripe redirected to
(() => {
  const q = new URLSearchParams(location.search), no = q.get("poruchka");
  if (!no || q.get("redirect_status") !== "succeeded") return;
  history.replaceState(null, "", location.pathname + location.hash);
  openDrawer(); orderDone(no, DONE.card);
})();
updateDeliv();
renderList();
route();
$("#yr").textContent = new Date().getFullYear();

/* ---------- contact details from data/site.json ---------- */
$$("[data-site]").forEach(el => { const v = SITE[el.dataset.site]; if (!v) return;
  if (el.tagName === "A") el.href = el.dataset.site === "email" ? `mailto:${v}` : el.dataset.site === "phone" ? `tel:${v.replace(/\s/g, "")}` : v;
  el.textContent = el.dataset.site === "website" ? v.replace(/^https?:\/\//, "") + " ↗" : v; });

/* ---------- structured data for search engines: the catalogue as products with prices ---------- */
(() => {
  const base = "https://luckyglass.eu/";
  const items = WORKS.map((w, i) => {
    const price = hasSizes(w) ? w.sizes.map(z => z.price) : hasPrice(w.price) ? [w.price] : [];
    const p = { "@type": "Product", name: fullName(w), description: w.text || CAT_NOTE[w.cat], url: `${base}tvorba/${w.id}/`,
      image: base + (w.image ? String(w.image).replace(/^\//, "") : `assets/products/${w.id}-wall.webp`),
      brand: { "@type": "Brand", name: "Лъки Михайлова" }, material: "стъкло", category: w.cat === "pana" ? "Стъклено пано" : "Картина от стъкло" };
    if (price.length) p.offers = { "@type": price.length > 1 ? "AggregateOffer" : "Offer", priceCurrency: "EUR",
      ...(price.length > 1 ? { lowPrice: Math.min(...price), highPrice: Math.max(...price) } : { price: price[0] }),
      availability: w.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock", seller: { "@id": `${base}#gallery` } };
    return { "@type": "ListItem", position: i + 1, item: p };
  });
  const s = document.createElement("script"); s.type = "application/ld+json";
  s.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: "Колекция", itemListElement: items });
  document.head.appendChild(s);
})();

/* ---------- quick contact: Viber and a call, always at hand ---------- */
(() => {
  const phone = (SITE.viber || SITE.phone || "").replace(/[^\d+]/g, ""); if (!phone) return;
  $("#qViber").href = `viber://chat?number=${encodeURIComponent(phone)}`;
  $("#qCall").href = `tel:${phone}`;
  $("#quick").hidden = false;
})();

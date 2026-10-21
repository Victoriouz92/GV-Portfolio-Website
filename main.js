/* Content lives in data/works.json and data/site.json, so the artist can edit it in the admin panel (Pages CMS).
   Product photos (WebP): assets/products/<id>-wall(-sm).webp (cut out, hung on the page wall), <id>-close(-sm).webp (detail), <id>-sm.webp (thumb);
   a piece added in the panel can instead carry its own uploaded photo in "image". */
const SITE = window.SITE || {};
const ORDER_EMAIL = SITE.email || "artgifts.bg@gmail.com";
const WORKS = (window.WORKS_DATA || []).filter(w => w && w.id && w.name);
const PANE_PERKS = ["Лесно се поставя", "Подхожда на стена във всякакъв цвят", "Почиства се лесно", "Внася цвят, стил и настроение в дома или офиса", "Подходящ подарък за мъже и жени"];
const CAT_NOTE = {
  kartina: "Дървета на живота, рисувани върху стъкло и сплавени с цветни стъкълца, в дървена рамка.",
  plastika: "Бронзови пластики и металопластика — авторски фигури, релефи и малки скулптурни композиции.",
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
const area = w => { const t = String(hasSizes(w) ? w.sizes[0].size : w.size || ""), m = t.replace(",", ".").match(/([\d.]+)\s*[×x]\s*([\d.]+)/);
  return m ? m[1] * m[2] : /малък/i.test(t) ? 1 : 0; };  // "малък размер" sorts with the smallest
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
  window.SculpturePhotos?.prepare(root);
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
const stockLabel = w => stockOf(w) ? w.stockUnknown ? "Налично" : `${stockOf(w)} бр. в наличност` : "Продадена";
const sizeSelect = (w, cls) => `<label class="${cls}"><span class="vh">Размер</span><select data-sizes="${w.id}">${w.sizes.map((z, k) =>
  `<option value="${k}">${esc(z.size)}</option>`).join("")}</select></label>`;
const card = w => `
  <article class="work rv${hung(w) ? " hung" : ""}${w.cat === "plastika" ? " sculpture" : ""}${w.cat === "pana" && !w.image ? " pane" : ""}${w.sold ? " sold" : ""}">
    <a class="mat glass" href="${workHref(w.id)}" aria-label="${esc(fullName(w))}">
      <img class="main" src="${imgSrc(w, 1)}" ${w.cat === "plastika" ? `data-sculpture="600" data-sculpture-mode="${w.photoMode || "mask"}"` : ""} alt="${esc(fullName(w))}" loading="lazy" decoding="async">
    </a>
    <div class="cap">
      <span class="series">${esc(w.series)}</span>
      <h3><a href="${workHref(w.id)}">${esc(w.name)}</a></h3>
      ${w.cat === "plastika" && w.author ? `<span class="work-author">${esc(w.author)}</span>` : ""}
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
let curCat = "kartina", curSold = false, catalogLimit = 24;
const catalogAuthor = w => w.author || (w.cat === "plastika" ? "" : "Лъки Михайлова");
const catalogMaterial = w => w.origin ? "Декоративни аксесоари" : w.technique === "Металопластика" ? "Металопластика" : w.cat === "plastika" ? "Бронз" : "Стъкло";
const cataloguePrice = w => hasSizes(w) ? Math.min(...w.sizes.map(s => +s.price)) : hasPrice(w.price) ? +w.price : null;
const catalogueScope = () => WORKS.filter(w => w.cat === curCat && (curCat !== "plastika" || !!w.sold === curSold));
const normalizeSearch = value => String(value || "").normalize("NFKC").toLocaleLowerCase("bg").replace(/[„“”"'—–-]/g, " ").replace(/\s+/g, " ").trim();
function renderCatalogue(reset = true) {
  if (reset) catalogLimit = 24;
  const query = normalizeSearch($("#catalogSearch").value).split(" ").filter(Boolean);
  const author = $("#catalogAuthor").value, material = $("#catalogMaterial").value;
  const min = $("#catalogMin").value === "" ? null : Number($("#catalogMin").value);
  const max = $("#catalogMax").value === "" ? null : Number($("#catalogMax").value);
  const list = catalogueScope().filter(w => {
    const price = cataloguePrice(w);
    const haystack = normalizeSearch([w.name, w.series, catalogAuthor(w), w.material, w.text, w.size].join(" "));
    return query.every(word => haystack.includes(word)) && (!author || catalogAuthor(w) === author)
      && (!material || catalogMaterial(w) === material)
      && (curSold || ((min === null || (price !== null && price >= min)) && (max === null || (price !== null && price <= max))));
  });
  const sort = $("#catalogSort").value;
  list.sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name, "bg");
    if (sort.startsWith("price")) {
      const ap = cataloguePrice(a), bp = cataloguePrice(b);
      if (ap === null || bp === null) return ap === bp ? 0 : ap === null ? 1 : -1;
      return sort === "price-up" ? ap - bp : bp - ap;
    }
    return (area(a) || Infinity) - (area(b) || Infinity);
  });
  const shown = Math.min(catalogLimit, list.length);
  if (reset) $("#grid").innerHTML = list.slice(0, shown).map(card).join("");
  else $("#grid").insertAdjacentHTML("beforeend", list.slice(Math.max(0, catalogLimit - 24), shown).map(card).join(""));
  $("#catalogResults").textContent = min !== null && max !== null && min > max && !curSold ? "Началната цена трябва да е по-малка от крайната." : `${list.length} ${list.length === 1 ? "творба" : "творби"}${list.length > shown ? ` · показани ${shown}` : ""}`;
  $("#filterSummary").textContent = `${list.length}`;
  $("#catalogEmpty").hidden = list.length > 0;
  $("#catalogMore").hidden = shown >= list.length;
  $("#catalogMore").textContent = `Покажи още ${Math.min(24, list.length - shown)}`;
  observe($("#grid"));
}
function resetCatalogue() {
  ["#catalogSearch", "#catalogAuthor", "#catalogMaterial", "#catalogMin", "#catalogMax"].forEach(s => $(s).value = "");
  $("#catalogSort").value = "default";
  renderCatalogue();
}
$("#catalogSearch").addEventListener("input", () => renderCatalogue());
["#catalogAuthor", "#catalogMaterial", "#catalogSort", "#catalogMin", "#catalogMax"].forEach(s => $(s).addEventListener("change", () => renderCatalogue()));
$("#catalogReset").addEventListener("click", resetCatalogue);
$("#catalogEmptyReset").addEventListener("click", resetCatalogue);
$("#catalogMore").addEventListener("click", () => { catalogLimit += 24; renderCatalogue(false); });
if (matchMedia("(max-width: 640px)").matches) $("#catalogFilters").open = false;
function renderGrid(cat, sold = false) {
  const categoryChanged = curCat !== cat;
  curCat = cat;
  curSold = cat === "plastika" && sold;
  $("#collectionTitle").innerHTML = cat === "plastika" ? "Пластики" : 'Стъкло, което <i class="glow">свети</i>';
  const soon = cat === "soon" || !WORKS.some(w => w.cat === cat);  // a category with no works yet says it is coming
  $("#soon").hidden = !soon; $("#grid").hidden = soon;
  $("#catNote").textContent = soon ? "" : CAT_NOTE[cat];
  $("#sculptureViews").hidden = cat !== "plastika";
  $("#soldIntro").hidden = !curSold;
  $$("[data-stock-view]").forEach(a => {
    const archive = a.dataset.stockView === "sold";
    a.querySelector("span").textContent = WORKS.filter(w => w.cat === "plastika" && !!w.sold === archive).length;
    archive === curSold ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
  });
  $("#catalogFilters").hidden = soon;
  $("#catalogResults").hidden = soon;
  $("#catalogPrice").hidden = curSold;
  $$("#catalogSort option[value^=price]").forEach(o => o.disabled = curSold);
  if (curSold && $("#catalogSort").value.startsWith("price")) $("#catalogSort").value = "default";
  const populate = (selector, values, label) => {
    const el = $(selector), previous = el.value;
    el.innerHTML = `<option value="">${label}</option>` + [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "bg")).map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join("");
    if ([...el.options].some(o => o.value === previous)) el.value = previous;
  };
  populate("#catalogAuthor", catalogueScope().map(catalogAuthor), "Всички автори");
  populate("#catalogMaterial", catalogueScope().map(catalogMaterial), "Всички материали");
  if (!soon) categoryChanged ? resetCatalogue() : renderCatalogue();
  else { $("#grid").innerHTML = ""; $("#catalogMore").hidden = true; $("#catalogEmpty").hidden = true; }
}
$$(".tabs button").forEach(t => t.addEventListener("click", () => {
  $$(".tabs button").forEach(x => x.setAttribute("aria-selected", x === t));
  renderGrid(t.dataset.cat);
  if (location.pathname === "/") history.replaceState(null, "", t.dataset.cat === "plastika" ? "#plastiki" : "#kolekcia");
}));
renderGrid("kartina");

/* ---------- work page with magnifier ---------- */
const wpMain = $("#wpMain"), wpImg = $("#wpImg"), lens = $("#lens");
let cur = null, shots = [], shotI = 0;
async function showShot(i) {
  shotI = i;
  wpImg.style.opacity = 0;
  const s = shots[i];
  const workId = cur.id;
  const src = cur.cat === "plastika" && window.SculpturePhotos ? await window.SculpturePhotos.source(s.src, 1200, cur.photoMode) : s.src;
  if (cur.id !== workId || shotI !== i) return;
  const next = new Image();
  next.onload = () => { if (cur.id !== workId || shotI !== i) return; wpMain.classList.toggle("hung", !!s.hung); wpMain.classList.toggle("pane", !!s.hung && cur.cat === "pana"); wpImg.src = src; wpImg.style.opacity = 1; lens.style.backgroundImage = `url("${src}")`; };
  next.src = src;
  wpImg.alt = `${fullName(cur)}${s.label ? " — " + s.label : ""}`;
  $$("#wpThumbs button").forEach((b, k) => b.setAttribute("aria-pressed", k === i));
}
function renderWork(id) {
  cur = byId(id); if (!cur) return false;
  $(".work-page > .back").href = cur.cat === "plastika" ? "#plastiki" : "#kolekcia";
  shots = [];
  wpMain.classList.toggle("sculpture", cur.cat === "plastika");
  wpImg.dataset.sculptureMode = cur.cat === "plastika" ? cur.photoMode || "mask" : "";
  if (Array.isArray(cur.photos) && cur.photos.length) {
    shots = cur.photos.map(s => ({ src: s.src, th: s.src, label: s.label, hung: false }));
  } else if (cur.id === "plodorodie") {
    Object.keys(FRAMES).forEach(f => shots.push({ src: `assets/img/framed-${f}-wall.webp`, th: `assets/img/swatch-${f}.webp`, v: 1, hung: true, label: `рамка ${FRAMES[f]}` }));
    shots.push({ src: `${P}plodorodie-close.webp`, th: `${P}plodorodie-close-sm.webp`, v: 1 });
  } else if (cur.image) {
    shots.push({ src: imgSrc(cur), th: imgSrc(cur), v: 1, hung: cur.cat === "kartina" });
  } else {
    shots.push({ src: wallSrc(cur.id, cur.cat), th: `${P}${cur.id}-sm.webp`, v: 1, hung: true });
    shots.push({ src: `${P}${cur.id}-close.webp`, th: `${P}${cur.id}-close-sm.webp`, v: 1 });
  }
  $("#wpThumbs").hidden = shots.length < 2;
  $("#wpThumbs").innerHTML = shots.map((s, i) => `<button type="button" data-shot="${i}" aria-label="Снимка ${i + 1}${s.label ? ", " + s.label : ""}"><img src="${s.th}" ${cur.cat === "plastika" ? `data-sculpture="180" data-sculpture-mode="${cur.photoMode || "mask"}"` : ""} alt=""></button>`).join("");
  window.SculpturePhotos?.prepare($("#wpThumbs"));
  $("#wpCat").textContent = cur.series + (cur.cat === "plastika" ? "" : cur.cat === "pana" ? " · без рамка" : " · стъклена картина с рамка");
  $("#wpName").textContent = cur.name;
  $(".view[data-view=tvorba] .back").href = cur.cat === "plastika" ? cur.sold ? "#plastiki-prodadeni" : "#plastiki" : "#kolekcia";
  $("#wpHint").textContent = cur.cat === "plastika" ? "Посочете снимката, за да разгледате детайлите отблизо." : "Посочете снимката, за да видите стъклото отблизо.";
  $("#wpEnquiry").textContent = cur.repeatInquiry ? cur.origin ? "Попитайте за бъдеща наличност" : "Попитайте за нова изработка" : cur.cat === "plastika" ? "Въпрос за творбата" : "Искам подобна по поръчка";
  $("#wpEnquiry").href = cur.repeatInquiry ? `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(`Запитване за „${cur.name}“ — ${cur.author || cur.series}`)}&body=${encodeURIComponent(`Здравейте,\n\nИнтересувам се дали е възможна нова изработка или бъдеща наличност на „${cur.name}“. Моля за информация за възможностите, цена и срок.\n\nhttps://luckyglass.eu/tvorba/${cur.id}/`)}` : cur.cat === "plastika" ? "#kontakti" : "#poruchka";
  $("#wpVariationNote").textContent = cur.cat === "plastika" ? "Възможни са фини разлики в оттенъците спрямо снимките." : "Всяка творба е ръчно изработена. Възможни са фини разлики спрямо снимките.";
  $("#wpPrice").textContent = priceLabel(cur);
  $("#wpPerks").innerHTML = cur.cat === "pana" ? PANE_PERKS.map(t => `<li>${t}</li>`).join("") : "";
  $("#wpText").textContent = cur.text || (cur.cat === "kartina" ? "Дърво на живота, рисувано върху стъкло и сплавено в пещ с цветни стъкълца." : CAT_NOTE[cur.cat]);
  $("#wpSizes").innerHTML = hasSizes(cur) ? sizeSelect(cur, "size-pick big") : "";
  if (cur.sold) $("#wpPrice").textContent = "Продадена";
  $("#wpAdd").hidden = !stockOf(cur);
  $("#wpStock").classList.toggle("sold", !stockOf(cur));
  const cheapest = Math.min(...DELIV.filter(o => o.type !== "pickup" && o.price != null).map(o => o.price));
  $("#wpShip").innerHTML = stockOf(cur) ? (PICKUP_ONLY
    ? ["Безплатно вземане от галерията в София", "Плащане при вземане · след потвърждение", "Куриерска доставка · предстои скоро"]
    : [isFinite(cheapest) ? `Доставка от ${money(cheapest)} · 1–2 работни дни` : "", "Безплатно вземане от галерията в София", "Плащане с карта, наложен платеж или превод", "14 дни за връщане"]).filter(Boolean).map(t => `<li>${t}</li>`).join("") : "";
  $("#wpStock").innerHTML = stockOf(cur)
    ? `<span>${stockLabel(cur)}</span>${cur.author === "Борислав Русинов" ? "" : ' Търсите повече бройки? <a href="#kontakti">Пишете ни</a>'}`
    : cur.cat === "plastika"
      ? '<span>Продадена · от архива</span> Възможността за нова изработка или бъдеща наличност се проверява индивидуално след запитване. Цена и срок се уточняват само при потвърдена възможност.'
      : '<span>Продадена</span> Може да се изработи подобна — <a href="#poruchka">по поръчка</a>';
  const sculpture = cur.cat === "plastika";
  const specs = [["Размер", hasSizes(cur) ? "по избор" : sizeLabel(cur)],
    sculpture ? null : [cur.cat === "pana" ? "Окачване" : "Рамка", cur.cat === "pana" ? "метална закопчалка-кобилица със спирала" : (cur.frame || "дървена")],
    ["Материал", cur.material || (sculpture ? "по запитване" : "темперирано стъкло, цветни стъклени топчета, специализирани бои за стъкло „Marabu“")],
    sculpture ? cur.technique ? ["Техника", cur.technique] : null : ["Техника", "фюзинг — две изпичания в пещ, над 760 °C"],
    cur.support ? ["Постамент", cur.support] : null,
    cur.weight ? ["Тегло", cur.weight] : null,
    cur.origin ? ["Произход", cur.origin] : null,
    cur.author || !sculpture ? ["Автор", cur.author || "Лъки Михайлова"] : null].filter(Boolean);
  $("#wpSpecs").innerHTML = specs.map(([a, b]) => `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join("");
  const rel = WORKS.filter(w => w.cat === cur.cat && (cur.cat !== "plastika" || !!w.sold === !!cur.sold) && w.id !== cur.id && w.id !== "plodorodie");
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
  const fit = cur.cat === "plastika" ? Math.min(ir.width / wpImg.naturalWidth, ir.height / wpImg.naturalHeight) : 1;
  const photoWidth = cur.cat === "plastika" ? wpImg.naturalWidth * fit : ir.width;
  const photoHeight = cur.cat === "plastika" ? wpImg.naturalHeight * fit : ir.height;
  const x = e.clientX - ir.left - (ir.width - photoWidth) / 2, y = e.clientY - ir.top - (ir.height - photoHeight) / 2;
  if (x < 0 || y < 0 || x > photoWidth || y > photoHeight) return wpMain.classList.remove("zooming");
  wpMain.classList.add("zooming");
  lens.style.left = `${e.clientX - r.left}px`; lens.style.top = `${e.clientY - r.top}px`;
  lens.style.backgroundSize = `${photoWidth * Z}px ${photoHeight * Z}px`;
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
  else {
    section = SECTIONS.includes(h) ? h : "kolekcia";
    if (h === "plastiki" || h === "plastiki-prodadeni") {
      const sold = h === "plastiki-prodadeni";
      if (curCat !== "plastika" || curSold !== sold) renderGrid("plastika", sold);
      $$(".tabs button").forEach(t => t.setAttribute("aria-selected", t.dataset.cat === "plastika"));
    }
  }
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
    // The entrance owns the initial reveal; avoid overlapping page transitions.
    const entranceVisible = !$("#intro").hidden;
    document.startViewTransition && curView !== null && !entranceVisible ? document.startViewTransition(swap) : swap();
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

/* ---------- cart & checkout ---------- */
// Withdrawn or sold catalogue items must also leave carts saved before this update.
let cart = store.get("cart2", []).filter(c => !c.id || (byId(c.id) && stockOf(byId(c.id)) > 0));
store.set("cart2", cart);
const drawer = $("#drawer");
// Launch mode: only pickup and payment in the gallery are ready for customers.
const PICKUP_ONLY = SITE.pickupOnly !== false;
// delivery: fixed prices from the admin panel, BOX NOW lockers from its own map
const DELIV = (Array.isArray(SITE.delivery) && SITE.delivery.length ? SITE.delivery : [{ label: "От галерията", note: SITE.address || "", type: "pickup", price: 0 }])
  .map(o => ({ ...o, price: hasPrice(o.price) ? +o.price : null, available: !PICKUP_ONLY || o.type === "pickup" }));
if (!DELIV.some(o => o.available)) DELIV.unshift({ label: "От галерията", note: SITE.address || "", type: "pickup", price: 0, available: true });
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
const paymentAvailable = m => (!PICKUP_ONLY || m.id === "gallery") && m.ok(deliv().type || "pickup");
const opt = (name, i, o, right, on) => `<label class="opt${o.available === false ? " unavailable" : ""}"><input type="radio" name="${name}" value="${i}"${on ? " checked" : ""}${o.available === false ? " disabled" : ""}>
  <span class="dot" aria-hidden="true"></span><span class="ot"><b>${esc(o.label)}</b>${o.note ? `<small>${esc(o.note)}</small>` : ""}</span>${right ? `<em>${right}</em>` : ""}</label>`;
$("#delivList").innerHTML = DELIV.map((o, i) => opt("delivery", i, o.available ? o : { ...o, note: "Тази доставка все още не е активна." }, o.available ? shipLabel(o.price) : "Предстои скоро", i === DELIV.findIndex(d => d.available))).join("");
const deliv = () => {
  const selected = DELIV[+$("input[name=delivery]:checked")?.value];
  return selected?.available ? selected : DELIV.find(o => o.available);
};
const payM = () => { const v = $("input[name=pay]:checked")?.value; return PAY.find(m => m.id === v && paymentAvailable(m)) || PAY.find(paymentAvailable); };
const totals = () => {
  const known = cart.filter(c => c.price != null), items = known.reduce((s, c) => s + c.price, 0), ship = deliv().price;
  return { items, ship, sum: items + (ship || 0), exact: known.length === cart.length && ship != null, any: known.length > 0 };
};
function renderPay() {
  const t = deliv().type || "pickup", was = ($("input[name=pay]:checked") || {}).value;
  const list = PAY.filter(m => m.ok(t) || (PICKUP_ONLY && ["card", "bank"].includes(m.id)));
  const keep = list.some(m => m.id === was && paymentAvailable(m)) ? was : list.find(paymentAvailable).id;
  $("#payList").innerHTML = list.map(m => opt("pay", m.id, { ...m, available: paymentAvailable(m), note: paymentAvailable(m) ? m.note : "Този начин на плащане все още не е активен." }, paymentAvailable(m) ? "" : "Предстои скоро", m.id === keep)).join("");
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
  $("#cartList").innerHTML = cart.map((c, i) => `<li><img src="${esc(c.img)}" alt=""><div><b>${esc(c.name)}</b><small>${esc(c.detail)}${c.id ? " · 1 бр." : ""}</small></div>
    <div class="pr"><span>${c.price != null ? money(c.price) : "по запитване"}</span><button type="button" class="rm" data-rm="${i}">Премахни</button></div></li>`).join("");
  const t = totals(), ask = cart.some(c => c.price == null);
  $("#sumItems").textContent = t.any ? money(t.items) + (ask ? " + по запитване" : "") : "по запитване";
  $("#sumShip").textContent = shipLabel(t.ship);
  $("#cartTotal").textContent = t.any ? money(t.sum) + (t.exact ? "" : " + …") : "по запитване";
  const m = payM().id;
  $("#payBtn").textContent = m === "card" ? `Плати ${t.exact ? money(t.sum) : ""}`.trim() : "Изпрати поръчката";
  if (elements && t.exact) elements.update({ amount: Math.max(50, cents(t.sum)) });
  renderCheckoutReview();
}
let checkoutStep = 0, submittingOrder = false;
function checkoutError(message, el) {
  $("#orderNote").textContent = message;
  $("#orderNote").dataset.auto = "";
  if (el) { el.setAttribute("aria-invalid", "true"); el.focus(); }
  return false;
}
function validateCheckoutStep(step) {
  if (!cart.length) return checkoutError("Добавете творба в количката.");
  if (step === 0) {
    if (!deliv()?.available) return checkoutError("Изберете активен начин на получаване.");
    return true;
  }
  if ($("#oName").value.trim().length < 2) return checkoutError("Моля, въведете име и фамилия.", $("#oName"));
  const phone = $("#oPhone").value.replace(/\D/g, "");
  if (phone.length < 7 || phone.length > 15) return checkoutError("Моля, въведете валиден телефон за връзка.", $("#oPhone"));
  if (!/^\S+@\S+\.\S+$/.test($("#oEmail").value.trim())) return checkoutError("Моля, въведете валиден имейл.", $("#oEmail"));
  return true;
}
function renderCheckoutReview() {
  const rows = [["Получаване", `${deliv().label} · ${deliv().note || SITE.address || ""}`],
    ["Име", $("#oName").value.trim()], ["Телефон", $("#oPhone").value.trim()], ["Имейл", $("#oEmail").value.trim()]];
  $("#checkoutReview").innerHTML = rows.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value || "—")}</dd></div>`).join("");
}
function setCheckoutStep(step, focus = true) {
  checkoutStep = Math.max(0, Math.min(2, step));
  $$("[data-checkout-step]").forEach(el => el.hidden = +el.dataset.checkoutStep !== checkoutStep);
  $$(".checkout-progress li").forEach((el, i) => i === checkoutStep ? el.setAttribute("aria-current", "step") : el.removeAttribute("aria-current"));
  $("#checkoutBack").hidden = checkoutStep === 0;
  $("#checkoutNext").hidden = checkoutStep === 2;
  $("#checkoutNext").textContent = checkoutStep === 0 ? "Продължи към данните →" : "Прегледай поръчката →";
  $("#orderNote").textContent = "";
  renderCheckoutReview();
  if (focus) $(`[data-checkout-step="${checkoutStep}"] h3`).focus();
}
$("#checkoutNext").addEventListener("click", () => { if (validateCheckoutStep(checkoutStep)) setCheckoutStep(checkoutStep + 1); });
$("#checkoutBack").addEventListener("click", () => setCheckoutStep(checkoutStep - 1));
$("#orderForm").addEventListener("input", e => e.target.removeAttribute("aria-invalid"));
function addToList(item) { cart.push(item); store.set("cart2", cart); $("#orderDone").hidden = true; $("#cartNote").textContent = ""; setCheckoutStep(0, false); renderList(); openDrawer(); }
$("#cartList").addEventListener("click", e => {
  const b = e.target.closest("[data-rm]"); if (!b) return;
  cart.splice(+b.dataset.rm, 1); store.set("cart2", cart); $("#cartNote").textContent = ""; $("#orderOut").hidden = true; renderList();
});
let lastFocus = null;
function openDrawer() { if (drawer.hidden) lastFocus = document.activeElement; drawer.hidden = false; document.body.style.overflow = "hidden"; $("#drawer .x").focus({ preventScroll: true }); }
function closeDrawer() { drawer.hidden = true; document.body.style.overflow = ""; if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); }
$("#cartBtn").addEventListener("click", openDrawer);
$$("[data-close-drawer]").forEach(b => b.addEventListener("click", closeDrawer));
$("#drawer").addEventListener("click", e => { if (e.target.closest(".panel a[href^='#']")) closeDrawer(); });
addEventListener("keydown", e => {
  if (drawer.hidden) return;
  if (e.key === "Escape") return closeDrawer();
  if (e.key !== "Tab") return;
  const focusable = $$("button, a[href], input, select, textarea, [tabindex]", drawer)
    .filter(el => !el.disabled && el.tabIndex >= 0 && !el.closest("[hidden]") && el.getClientRects().length);
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
});
const orderNo = () => "LG-" + Date.now().toString(36).slice(-6).toUpperCase();
function orderDone(no, text) {
  cart.length = 0; store.set("cart2", cart); renderList();
  $("#orderNote").textContent = ""; $("#doneNo").textContent = `Поръчка № ${no}`; $("#doneText").textContent = text;
  $("#orderDone").hidden = false; $("#orderDone").focus();
}
const DONE = {
  card: "Плащането е успешно. Ще получите потвърждение по имейл и ще ви се обадим за доставката.",
  cod: "Поръчката е приета. Ще ви се обадим до един работен ден, за да я потвърдим, и я изпращаме. Плащате при получаване.",
  gallery: "Поръчката е изпратена. Ще се свържем с вас до един работен ден, за да потвърдим наличността и да уточним вземането от галерията. Плащате при вземане.",
  bank: "Поръчката е приета. До един работен ден ще ви изпратим данните за банковия превод на имейла ви." };
$("#orderForm").addEventListener("submit", async e => {
  e.preventDefault();
  if (submittingOrder) return;
  if (checkoutStep < 2) { if (validateCheckoutStep(checkoutStep)) setCheckoutStep(checkoutStep + 1); return; }
  if (!validateCheckoutStep(0)) { const error = $("#orderNote").textContent; setCheckoutStep(0); checkoutError(error); return; }
  if (!validateCheckoutStep(1)) { const error = $("#orderNote").textContent; setCheckoutStep(1, false); checkoutError(error, $("#orderForm [aria-invalid=true]")); return; }
  if (cart.some(c => c.id && (!byId(c.id) || stockOf(byId(c.id)) < cart.filter(item => item.id === c.id).length))) return checkoutError("Наличността е променена. Презаредете страницата, преди да изпратите поръчката.");
  const f = e.target, d = Object.fromEntries(new FormData(f)), note = $("#orderNote"), btn = $("#payBtn"), m = payM(), t = totals();
  ["name", "email", "phone"].forEach(key => d[key] = d[key].trim());
  const fail = (msg, el) => { note.textContent = msg; note.dataset.auto = ""; if (el) el.focus(); };
  const dv = deliv();
  if (dv.type !== "pickup" && !d.where.trim()) return fail(dv.type === "boxnow" ? "Моля, изберете автомат BOX NOW." : "Моля, напишете къде да доставим.", $("#oWhere"));
  const consent = f.elements.namedItem("consent");
  if (!consent?.checked) return fail("Моля, приемете Общите условия.", consent);
  if (d._honey) return;                                  // filled only by spam bots
  if (m.id === "card" && !t.exact) return fail("Някоя цена е „по запитване“ — изберете друг начин на плащане.");
  const no = orderNo();
  const where = dv.type !== "pickup" ? ` — ${d.where.trim()}` : dv.note ? ` — ${dv.note}` : "";
  const delivery = `${dv.label} (${shipLabel(dv.price)})${where}`;
  const lines = cart.map((c, i) => `${i + 1}. ${c.name} — ${c.detail} — ${c.price != null ? money(c.price) : "цена по запитване"}`);
  const fields = { "Поръчка": no, "Плащане": m.label, "Име": d.name, "Телефон": d.phone, "Имейл": d.email, "Доставка": delivery,
    "Фактура": d.invoice ? "да" : "не", "Творби": lines.join("\n"), "Общо": $("#cartTotal").textContent };
  const send = async extra => {
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(SITE.formEndpoint || `https://formsubmit.co/ajax/${ORDER_EMAIL}`, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ _subject: `Поръчка ${no} от сайта — ${d.name}`, _template: "table", _captcha: "false", email: d.email,
          _autoresponse: `Благодарим за поръчката! Номерът ѝ е ${no}. Ще се свържем с вас до един работен ден, за да я потвърдим. Лъки Михайлова · luckyglass.eu · ${SITE.phone || ""}`,
          ...fields, ...extra }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || ![true, "true"].includes(result.success)) throw new Error("Order delivery was not confirmed");
    } finally { clearTimeout(timer); }
  };
  submittingOrder = true;
  $("#orderOut").hidden = true;
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
    fail("Не получихме потвърждение за изпращането. Можете да опитате отново или да изпратите подготвения текст по имейл. Количката ви е запазена.");
    $("#orderMailLink").href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(`Поръчка ${no} от сайта`)}&body=${encodeURIComponent(body)}`;
  } finally { submittingOrder = false; btn.disabled = false; }
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
      ...(w.author || w.cat !== "plastika" ? { brand: { "@type": "Brand", name: w.author || "Лъки Михайлова" } } : {}),
      material: w.material || "стъкло", category: w.cat === "plastika" ? w.series : w.cat === "pana" ? "Стъклено пано" : "Картина от стъкло" };
    if (price.length) p.offers = { "@type": price.length > 1 ? "AggregateOffer" : "Offer", priceCurrency: "EUR",
      ...(price.length > 1 ? { lowPrice: Math.min(...price), highPrice: Math.max(...price) } : { price: price[0] }),
      availability: stockOf(w) ? "https://schema.org/InStock" : "https://schema.org/SoldOut", seller: { "@id": `${base}#gallery` } };
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

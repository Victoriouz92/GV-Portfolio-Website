// TODO: replace with the real contact email before launch
const ORDER_EMAIL = "info@artgifts.bg";

/* Photos live in assets/products/: <id>.jpg (wall photo), <id>-close.jpg (detail),
   <id>-cut.webp (cut-out used by the grid and the light simulator), <id>-2… for variants. */
const WORKS = [
  // ---- PICTURES (framed) ----
  { id: "plodorodie", cat: "kartina", name: "Дърво на плодородието", size: "30 × 40 см", price: 80, frames: true,
    note: "Семейно дърво на живота", frame: "дървена, 3 см, по избор",
    text: "Изработено върху стъкло със специални професионални бои и цветни стъкла. Двойно темперирано в пещ за стъкло." },
  { id: "kartina-yabalka", cat: "kartina", name: "Дърво на живота — Ябълка", photos: 2, frame: "дървена, платина",
    sizes: [["Малко", "14 × 16 см", 28], ["Средно", "18 × 22 см", 38], ["Голямо", "26 × 36 см", 89], ["Най-голямо", "30 × 40 см", 98]] },
  { id: "kartina-prestizh", cat: "kartina", name: "Дърво на живота — Престиж", price: 68, frame: "масивна ретро рамка",
    text: "Дърво с широки клони и дебел ствол, стъпило здраво на земята и пуснало дълбоки корени. Усещане за зрялост, сила и непоклатимост." },
  { id: "kartina-prolet", cat: "kartina", name: "Дърво на живота — Пролет", size: "24 × 36 см", price: 76, frame: "златна, със закопчалка",
    note: "Само в този размер",
    text: "Носи радост, топлина и много цвят в дома и офиса. Усещане за изисканост, прецизност и блестяща чистота." },
  { id: "kartina-proletno-darvo", cat: "kartina", name: "Пролетно дърво", size: "26 × 36 см", price: 89, photos: 2, frame: "дървена, платина" },
  { id: "kartina-blagodat", cat: "kartina", name: "Дърво на живота — Благодат", size: "19,5 × 19,5 см с рамката", price: 35,
    frame: "дървена, със златен кант", note: "Върху керамична плочка" },
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
const PANEL_TEXT = "Рисувано пано с професионални бои за стъкло и начупени цветни стъкълца. Закачалката е метална, във формата на кобилица, завършваща със спирала — символ на развитие и желание за извисеност. Лесно се поставя, подхожда на всякакъв цвят стена и лесно се почиства.";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const P = "assets/products/";
const money = n => `${n} €`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const prices = w => w.sizes ? w.sizes.map(s => s[2]) : w.price != null ? [w.price] : [];
const priceLabel = w => w.sizes ? `от ${money(Math.min(...prices(w)))}` : w.price != null ? money(w.price) : "по запитване";
const sizeLabel = w => w.size || (w.sizes ? `${w.sizes.length} размера` : "размер при запитване");
const vid = (w, i) => w.id + (i > 1 ? `-${i}` : "");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
document.documentElement.classList.add("js");

/* ---------- theme ---------- */
const savedTheme = store.get("theme", null);
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
$("#themeBtn").addEventListener("click", () => {
  const t = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = t;
  store.set("theme", t);
});

/* ---------- bar ---------- */
const bar = $(".bar");
addEventListener("scroll", () => bar.classList.toggle("solid", scrollY > 40), { passive: true });

/* ---------- hero: cursor light + parallax ---------- */
const hero = $("#hero"), heroArt = $("#heroArt");
heroArt.querySelector(".sheen").style.setProperty("--m", `url(${P}plodorodie-cut.webp)`);
if (!reduced) {
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    hero.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    const a = heroArt.getBoundingClientRect();
    heroArt.style.setProperty("--sx", `${((e.clientX - a.left) / a.width) * 100}%`);
    heroArt.style.setProperty("--sy", `${((e.clientY - a.top) / a.height) * 100}%`);
  });
  addEventListener("scroll", () => {
    if (scrollY < innerHeight) heroArt.style.transform = `translateY(${scrollY * 0.12}px) rotate(${scrollY * 0.004}deg)`;
  }, { passive: true });
  // magnetic buttons
  $$(".magnetic").forEach(b => {
    b.addEventListener("pointermove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });
}

/* ---------- bento ---------- */
const PATTERN = [[7, 5], [4, 4, 4], [5, 7], [4, 4, 4]];
function widths(n) {
  const out = []; let r = 0;
  while (out.length < n) { out.push(...PATTERN[r % PATTERN.length]); r++; }
  return out.slice(0, n);
}
function card(w, span) {
  const pill = [sizeLabel(w), `<b>${priceLabel(w)}</b>`, w.cat === "pana" ? "закачалка" : (w.frame ? `рамка ${w.frame}` : "с рамка")];
  return `<button type="button" class="card w${span} rv" data-open="${w.id}" aria-label="${esc(w.name)}, ${priceLabel(w)}">
    <span class="stage">
      <span class="pill">${pill.join("<span aria-hidden='true'>·</span>")}</span>
      ${(w.photos || 1) > 1 ? `<span class="badge">${w.photos} варианта</span>` : ""}
      <img class="closeup" src="${P}${w.id}-close-sm.jpg" alt="" loading="lazy">
      <img class="cut" src="${P}${w.id}-cut.webp" alt="" loading="lazy">
    </span>
    <span class="meta"><h3>${esc(w.name)}</h3><span>${priceLabel(w)}</span></span>
  </button>`;
}
const bento = $("#bento");
function renderGrid(cat) {
  const list = cat === "all" ? WORKS : WORKS.filter(w => w.cat === cat);
  $("#soonNote").hidden = cat !== "soon";
  bento.hidden = cat === "soon";
  const ws = widths(list.length);
  bento.innerHTML = list.map((w, i) => card(w, ws[i])).join("");
  observe($$(".rv", bento));
  $$(".card", bento).forEach(c => c.addEventListener("pointermove", e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--cx", `${((e.clientX - r.left) / r.width) * 100}%`);
    c.style.setProperty("--cy", `${((e.clientY - r.top) / r.height) * 100}%`);
  }));
}
$$(".tabs button").forEach(t => t.addEventListener("click", () => {
  $$(".tabs button").forEach(x => x.setAttribute("aria-selected", x === t));
  renderGrid(t.dataset.cat);
}));

/* reveal on scroll; everything shows after 1.6s regardless */
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { rootMargin: "0px 0px -8% 0px" }) : null;
function observe(els) {
  els.forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 70}ms`; io ? io.observe(el) : el.classList.add("in"); });
}
setTimeout(() => $$(".rv").forEach(el => el.classList.add("in")), 1600);
renderGrid("all");

/* ---------- craft: vertical scroll drives the horizontal track ---------- */
const craft = $("#zanayat"), track = $("#craftTrack");
const wide = matchMedia("(min-width: 861px)");
function sizeCraft() {
  if (!wide.matches) { craft.style.removeProperty("--craft-h"); return; }
  const extra = Math.max(0, track.scrollWidth - innerWidth);
  craft.style.setProperty("--craft-h", `${innerHeight + extra}px`);
}
function moveCraft() {
  if (!wide.matches) return;
  const r = craft.getBoundingClientRect();
  const extra = Math.max(0, track.scrollWidth - innerWidth);
  const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
  track.style.transform = `translateX(${-p * extra}px)`;
}
addEventListener("scroll", moveCraft, { passive: true });
addEventListener("resize", () => { sizeCraft(); moveCraft(); });
addEventListener("load", sizeCraft);
sizeCraft();
const craftVid = $("[data-autoplay]");
if (io && craftVid) new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? craftVid.play().catch(() => {}) : craftVid.pause())).observe(craftVid);

/* ---------- product dialog ---------- */
const dlg = $("#product"), sim = $("#sim"), simImg = $("#simImg"), simArt = $("#simArt"), zoom = $("#zoom"), zoomImg = $("#zoomImg");
let cur = null, curVar = 1, mode = "wall";
const curFrame = () => $("input[name=pframe]:checked").value;
function photoSrc() {
  if (cur.frames) return `assets/img/framed-${curFrame()}.jpg`;
  return `${P}${vid(cur, curVar)}.jpg`;
}
function setMode(m) {
  mode = m;
  $$(".p-modes button").forEach(b => b.setAttribute("aria-selected", b.dataset.mode === m));
  sim.hidden = m !== "wall"; $("#simCtrl").hidden = m !== "wall"; zoom.hidden = m === "wall";
  zoom.classList.remove("on");
  if (m === "photo") zoomImg.src = photoSrc();
  if (m === "detail") zoomImg.src = `${P}${vid(cur, curVar)}-close.jpg`;
}
function showVariant(i) {
  curVar = i;
  const cut = `${P}${vid(cur, i)}-cut.webp`;
  simImg.onload = () => simArt.style.setProperty("--ar", (simImg.naturalWidth / simImg.naturalHeight).toFixed(3));
  simImg.src = cut; simImg.alt = cur.name;
  $("#simSheen").style.setProperty("--m", `url(${cut})`);
  $$("#pVariants button").forEach(b => b.setAttribute("aria-pressed", +b.dataset.v === i));
  setMode(mode);
}
function openWork(id) {
  cur = WORKS.find(w => w.id === id);
  $("#pCat").textContent = cur.cat === "pana" ? "Стъклено пано · без рамка" : "Стъклена картина · с рамка";
  $("#pName").textContent = cur.name;
  $("#pPrice").textContent = priceLabel(cur);
  $("#pText").textContent = cur.text || (cur.cat === "pana" ? PANEL_TEXT : "Дърво на живота, рисувано върху стъкло и сплавено с цветни стъкълца в пещ.");
  const n = cur.photos || 1;
  $("#pVariants").innerHTML = n > 1 ? Array.from({ length: n }, (_, k) =>
    `<button type="button" data-v="${k + 1}" aria-label="Вариант ${k + 1}"><img src="${P}${vid(cur, k + 1)}-sm.jpg" alt=""></button>`).join("") : "";
  $("#pSizes").innerHTML = cur.sizes ? `<p class="kicker">Размер</p><div class="chips">${cur.sizes.map((s, k) =>
    `<label class="chip plain"><input type="radio" name="psize" value="${k}" ${k ? "" : "checked"}>${s[0]} · ${s[1]} · ${money(s[2])}</label>`).join("")}</div>` : "";
  $("#pFrames").hidden = !cur.frames;
  const specs = [["Размер", sizeLabel(cur)], [cur.cat === "pana" ? "Окачване" : "Рамка", cur.cat === "pana" ? "метална закачалка-кобилица" : (cur.frame || "дървена")],
    ["Материал", "стъкло, цветни стъкълца, бои за стъкло"], ["Автор", "Лъки Михайлова"]];
  if (cur.note) specs.splice(2, 0, ["Бележка", cur.note]);
  $("#pSpecs").innerHTML = specs.map(([a, b]) => `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join("");
  mode = "wall";
  showVariant(1);
  dlg.showModal();
}
document.addEventListener("click", e => {
  const o = e.target.closest("[data-open]"); if (o) openWork(o.dataset.open);
  const v = e.target.closest("#pVariants button"); if (v) showVariant(+v.dataset.v);
});
$("#pSizes").addEventListener("change", () => {
  const k = +$("input[name=psize]:checked").value;
  $("#pPrice").textContent = money(cur.sizes[k][2]);
});
$("#pFrames").addEventListener("change", () => { if (mode !== "photo") setMode("photo"); else zoomImg.src = photoSrc(); });
$$(".p-modes button").forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
$("[data-close]", dlg).addEventListener("click", () => dlg.close());
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

/* light simulator */
function applyLight() {
  const dir = +$("#lightDir").value, amt = +$("#lightAmt").value / 100;
  sim.style.setProperty("--lx", `${50 + dir * 0.75}%`);
  sim.style.setProperty("--la", (0.15 + amt * 0.5).toFixed(2));
  sim.style.setProperty("--dark", ((1 - amt) * 0.55).toFixed(2));
  simArt.style.setProperty("--shx", `${(-dir * 0.5).toFixed(0)}px`);
  simArt.style.setProperty("--br", (0.6 + amt * 0.45).toFixed(2));
  simArt.style.setProperty("--sx", `${50 + dir * 0.9}%`);
  simArt.style.setProperty("--sy", "28%");
}
$$(".walls button").forEach(b => b.addEventListener("click", () => {
  $$(".walls button").forEach(x => x.setAttribute("aria-checked", x === b));
  sim.dataset.wall = b.dataset.wall;
}));
sim.dataset.wall = "plaster";
$("#lightDir").addEventListener("input", applyLight);
$("#lightAmt").addEventListener("input", applyLight);
applyLight();

/* ultra-zoom: click to magnify, the point under the pointer stays under it */
zoom.addEventListener("click", () => { zoom.classList.toggle("on"); $(".zoom-hint").hidden = true; });
zoom.addEventListener("pointermove", e => {
  const r = zoomImg.getBoundingClientRect();
  zoomImg.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
});

/* ---------- list (cart) ---------- */
let cart = store.get("cart", []);
const drawer = $("#drawer");
function saveCart() { store.set("cart", cart); renderCart(); }
function renderCart() {
  $("#cartCount").textContent = cart.length;
  $("#cartEmpty").hidden = cart.length > 0;
  $("#cartList").innerHTML = cart.map((c, i) => `<li><img src="${c.img}" alt=""><div><b>${esc(c.name)}</b><small>${esc(c.detail)}</small></div>
    <div><b>${c.price != null ? money(c.price) : "—"}</b><button type="button" data-rm="${i}">Махни</button></div></li>`).join("");
  const known = cart.filter(c => c.price != null);
  const sum = known.reduce((s, c) => s + c.price, 0);
  $("#cartTotal").textContent = known.length ? `${money(sum)}${known.length < cart.length ? " + запитване" : ""}` : "—";
}
$("#cartList").addEventListener("click", e => {
  const b = e.target.closest("[data-rm]"); if (!b) return;
  cart.splice(+b.dataset.rm, 1); saveCart();
});
function openDrawer() { drawer.hidden = false; document.body.style.overflow = "hidden"; }
function closeDrawer() { drawer.hidden = true; document.body.style.overflow = ""; }
$("#cartBtn").addEventListener("click", openDrawer);
$$("[data-close-drawer]").forEach(b => b.addEventListener("click", closeDrawer));
addEventListener("keydown", e => { if (e.key === "Escape" && !drawer.hidden) closeDrawer(); });

$("#pAdd").addEventListener("click", () => {
  const bits = [];
  let price = cur.price ?? null;
  if (cur.sizes) { const s = cur.sizes[+$("input[name=psize]:checked").value]; bits.push(`${s[0].toLowerCase()}, ${s[1]}`); price = s[2]; }
  else bits.push(sizeLabel(cur));
  if (cur.frames) bits.push(`рамка ${$("input[name=pframe]:checked").parentElement.textContent.trim()}`);
  if ((cur.photos || 1) > 1) bits.push(`вариант ${curVar}`);
  cart.push({ name: cur.name, detail: bits.join(" · "), price, img: `${P}${vid(cur, curVar)}-cut.webp` });
  saveCart(); dlg.close(); openDrawer();
});

$("#orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const note = $("#orderNote");
  if (!cart.length) { note.textContent = "Добавете поне една творба в списъка."; return; }
  if (!d.name.trim() || !d.phone.trim()) { note.textContent = "Моля, въведете име и телефон."; return; }
  const body = [
    "Запитване от сайта", "",
    ...cart.map((c, i) => `${i + 1}. ${c.name} — ${c.detail}${c.price != null ? ` — ${money(c.price)}` : " — цена по запитване"}`),
    "", `Получаване: ${d.delivery}`, `Име: ${d.name}`, `Телефон: ${d.phone}`, d.email ? `Имейл: ${d.email}` : null,
  ].filter(x => x !== null).join("\n");
  $("#orderText").value = body;
  $("#orderMail").textContent = ORDER_EMAIL;
  $("#orderOut").hidden = false;
  note.textContent = "Отваряме имейл с готовото запитване.";
  location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("Запитване за поръчка")}&body=${encodeURIComponent(body)}`;
});
$("#copyOrder").addEventListener("click", async () => {
  const t = $("#orderText");
  try { await navigator.clipboard.writeText(t.value); $("#copyOrder").textContent = "Копирано"; }
  catch { t.select(); }
});
renderCart();

/* ---------- commission configurator ---------- */
const cfg = $("#cfgForm"), steps = $$(".step", cfg), navItems = $$(".steps-nav li", cfg);
const SIZES = {
  svatba: ["18 × 22 см", "26 × 36 см", "30 × 40 см"],
  darvo: ["14 × 16 см", "18 × 22 см", "26 × 36 см", "30 × 40 см"],
  pano: ["12 × 12 см", "12 × 15 см"],
};
const KIND = { svatba: "Сватбено Дърво на живота", darvo: "Дърво на живота по поръчка", pano: "Пано по поръчка" };
let step = 0;
const val = n => (cfg.querySelector(`[name=${n}]:checked`) || {}).value;
function renderSizes() {
  const k = val("kind");
  $("#cfgSizes").innerHTML = SIZES[k].map((s, i) => `<label class="chip plain"><input type="radio" name="size" value="${s}" ${i === SIZES[k].length - 1 ? "checked" : ""}>${s}</label>`).join("");
}
function updatePreview() {
  const k = val("kind"), f = val("frame");
  const img = $("#cfgImg");
  img.src = k === "svatba" ? `assets/img/framed-wedding-${f}.jpg` : k === "darvo" ? `assets/img/framed-${f}.jpg` : `${P}pana-yabalka.jpg`;
  $("#cfgFrames").hidden = k === "pano"; $("#cfgHangerNote").hidden = k !== "pano";
  $("#cfgNamesField").hidden = k !== "svatba";
  const names = $("#cfgNamesIn").value.trim();
  $("#cfgNames").hidden = !(k === "svatba" && names);
  $("#cfgNames").textContent = names;
  const wishes = $$("input[name=wish]:checked", cfg).map(i => i.value.split(" — ")[0]);
  $("#cfgSum").textContent = [KIND[k], val("size"), k === "pano" ? "закачалка" : cfg.querySelector(`[name=frame]:checked`).parentElement.textContent.trim(), wishes.join(", ")].filter(Boolean).join(" · ");
}
function go(n) {
  step = Math.max(0, Math.min(steps.length - 1, n));
  steps.forEach((s, i) => s.classList.toggle("on", i === step));
  navItems.forEach((l, i) => { l.classList.toggle("on", i === step); l.classList.toggle("done", i < step); });
  $("#cfgBack").style.visibility = step ? "visible" : "hidden";
  $("#cfgNext").textContent = step === steps.length - 1 ? "Добави в списъка" : "Напред";
}
cfg.addEventListener("change", e => { if (e.target.name === "kind") renderSizes(); updatePreview(); });
cfg.addEventListener("input", updatePreview);
$("#cfgBack").addEventListener("click", () => go(step - 1));
$("#cfgNext").addEventListener("click", () => {
  if (step < steps.length - 1) return go(step + 1);
  const k = val("kind");
  const wishes = $$("input[name=wish]:checked", cfg).map(i => i.value);
  const bits = [val("size"), k === "pano" ? "закачалка" : `рамка ${cfg.querySelector("[name=frame]:checked").parentElement.textContent.trim()}`];
  if (wishes.length) bits.push(`цветове: ${wishes.join(", ")}`);
  if (k === "svatba" && $("#cfgNamesIn").value.trim()) bits.push(`имена: ${$("#cfgNamesIn").value.trim()}`);
  if ($("#cfgNote").value.trim()) bits.push($("#cfgNote").value.trim());
  cart.push({ name: KIND[k], detail: bits.join(" · "), price: null, img: $("#cfgImg").getAttribute("src") });
  saveCart(); openDrawer(); go(0);
});
renderSizes(); updatePreview(); go(0);

$("#yr").textContent = new Date().getFullYear();

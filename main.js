// TODO: replace with the real contact email before launch
const ORDER_EMAIL = "info@artgifts.bg";

/* Photos live in assets/products/: <id>.jpg, <id>-close.jpg, and <id>-2.jpg … for variants
   (each with a -sm.jpg copy for the grid). "photos" = how many variants a work has. */
const WORKS = [
  // ---- PANELS (no frame) ----
  { id: "pana-buhal", cat: "pana", name: "Бухал", size: "12 × 12 см", price: 20,
    text: "Символ на мъдрост и благополучие." },
  { id: "pana-taralezh", cat: "pana", name: "Таралеж", size: "12 × 12 см", price: 20, photos: 3, note: "Три варианта",
    text: "Предвестник на есента. Символизира упорития труд на този, който събира узрели плодове за зимнина. Събира слънчевите лъчи и ги пренася в дома ни." },
  { id: "pana-cherno-kote", cat: "pana", name: "Черно коте за късмет", size: "12 × 12 см", price: 20,
    text: "Подарява се за късмет и безстрашие. За да си кажем: „Ще пречупя карък и ще започна без страх отново!“" },
  { id: "pana-sharena-maca", cat: "pana", name: "Шарената маца", size: "12 × 12 см", price: 20,
    text: "Подарява се за нежност, вярност, приятелство, игри и усмивки." },
  { id: "pana-sartse", cat: "pana", name: "Сърце", size: "12 × 12 см", price: 20,
    text: "Подарява се за любов, вярност и надежда. И за да не забравяш себе си и да се обичаш!" },
  { id: "pana-mazhko-sartse", cat: "pana", name: "Мъжко сърце", size: "12 × 12 см", price: 20,
    text: "Освен червено има и добавен син цвят: връзка с небето и със силния мъжки пол." },
  { id: "pana-angel", cat: "pana", name: "Ангел Хранител", size: "12 × 14 см", price: 24, photos: 2, note: "Два цветови варианта",
    text: "Рамката на паното е изрисувана с висококачествени професионални бои за стъкло. Ангелът е от сребърна тел, огънат на ръка. Всеки има свой собствен чар и индивидуалност." },
  { id: "pana-yabalka", cat: "pana", name: "Дърво на живота — Ябълка", size: "12 × 15 см", price: 24, photos: 2, note: "Два варианта",
    text: "Освен нарисуваната символика има и 8 узрели ябълкови плода. Числото 8 е символ на успех и безкрайност." },
  { id: "pana-urozhay", cat: "pana", name: "Дърво на живота — Урожай", size: null, price: null },
  { id: "pana-rache", cat: "pana", name: "Раче", size: "12 × 12 см", price: 20,
    text: "Усещане за идването на лятото, топлината, морските почивки и плажовете." },

  // ---- PICTURES (framed) ----
  { id: "plodorodie", cat: "kartina", hidden: true, name: "Дърво на плодородието", size: "30 × 40 см", price: 80 },
  { id: "kartina-yabalka", cat: "kartina", name: "Дърво на живота — Ябълка", photos: 2,
    note: "Дървена рамка платина",
    sizes: [["Малко", "14 × 16 см", 28], ["Средно", "18 × 22 см", 38], ["Голямо", "26 × 36 см", 89], ["Най-голямо", "30 × 40 см", 98]] },
  { id: "kartina-prestizh", cat: "kartina", name: "Дърво на живота — Престиж", size: null, price: 68,
    note: "Масивна ретро рамка",
    text: "Дърво с широки клони и дебел ствол, стъпило здраво на земята и пуснало дълбоки корени. Усещане за зрялост, сила и непоклатимост." },
  { id: "kartina-prolet", cat: "kartina", name: "Дърво на живота — Пролет", size: "24 × 36 см", price: 76,
    note: "Златна рамка и закопчалка · само в този размер",
    text: "Носи радост, топлина и много цвят в дома и офиса. Усещане за изисканост, прецизност и блестяща чистота." },
  { id: "kartina-proletno-darvo", cat: "kartina", name: "Пролетно дърво", size: "голямо · 26 × 36 см", price: 89, photos: 2,
    note: "Платинена дървена рамка" },
  { id: "kartina-blagodat", cat: "kartina", name: "Дърво на живота — Благодат", size: "19,5 × 19,5 см с рамката", price: 35,
    note: "Върху керамична плочка" },
  { id: "kartina-semeino", cat: "kartina", name: "Семейно дърво", size: null, price: null },
  { id: "kartina-barok", cat: "kartina", name: "Дърво на живота — Барок", size: null, price: null, note: "Барокова рамка" },
  { id: "kartina-byalo", cat: "kartina", name: "Дърво на живота — Бяло", size: null, price: null, note: "Бяла рамка" },
  { id: "kartina-cheresha", cat: "kartina", name: "Дърво на живота — Череша", size: null, price: null },
  { id: "kartina-razvitie", cat: "kartina", name: "Дърво на живота — Развитие", size: null, price: null },
  { id: "kartina-zlatno-lyato", cat: "kartina", name: "Дърво на живота — Златно лято", size: null, price: null,
    note: "Златна рамка" },
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => `${n} €`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const prices = w => w.sizes ? w.sizes.map(s => s[2]) : w.price != null ? [w.price] : [];

/* ---------- catalogue ---------- */
const P = "assets/products/";
const shots = w => {
  const out = [];
  for (let i = 1; i <= (w.photos || 1); i++) {
    const base = P + w.id + (i > 1 ? `-${i}` : "");
    out.push(base, base + "-close");
  }
  return out;
};
function card(w) {
  const price = w.sizes ? `от ${money(Math.min(...prices(w)))}` : w.price != null ? money(w.price) : "по запитване";
  const size = w.size || (w.sizes ? `${w.sizes.length} размера` : "размер при запитване");
  const sizes = w.sizes
    ? `<ul class="sizes">${w.sizes.map(s => `<li><span>${s[0]} · ${s[1]}</span><b>${money(s[2])}</b></li>`).join("")}</ul>` : "";
  return `<article class="work">
    <button type="button" class="mat" data-view="${w.id}" aria-label="Снимки: ${esc(w.name)}">
      <img src="${P}${w.id}-sm.jpg" alt="${esc(w.name)}" loading="lazy" width="720" height="964">
      <img class="close" src="${P}${w.id}-close-sm.jpg" alt="" loading="lazy" width="720" height="964">
      ${(w.photos || 1) > 1 ? `<span class="label count">${w.photos} варианта</span>` : ""}
    </button>
    <h3>${esc(w.name)}</h3>
    ${w.note ? `<p class="label">${esc(w.note)}</p>` : ""}
    ${w.text ? `<p class="work-text">${esc(w.text)}</p>` : ""}${sizes}
    <div class="work-foot">
      <span class="label">${esc(size)}</span>
      <b class="price-s">${price}</b>
    </div>
    <button class="textlink" type="button" data-order="${w.id}">Поръчай →</button>
  </article>`;
}

/* ---------- photo viewer ---------- */
const viewer = $("#viewer"), vImg = $("#vImg"), vCap = $("#vCap");
let vList = [], vI = 0;
const vShow = () => {
  vImg.src = vList[vI] + ".jpg";
  vCap.textContent = `${vI + 1} / ${vList.length}`;
};
function openViewer(list, title) {
  vList = list; vI = 0;
  $("#vTitle").textContent = title;
  vShow();
  viewer.showModal();
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-view]");
  if (!b) return;
  const w = WORKS.find(x => x.id === b.dataset.view);
  openViewer(shots(w), w.name);
});
$("#vPrev").addEventListener("click", () => { vI = (vI - 1 + vList.length) % vList.length; vShow(); });
$("#vNext").addEventListener("click", () => { vI = (vI + 1) % vList.length; vShow(); });
$("#vClose").addEventListener("click", () => viewer.close());
viewer.addEventListener("click", e => { if (e.target === viewer) viewer.close(); });
viewer.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") $("#vPrev").click();
  if (e.key === "ArrowRight") $("#vNext").click();
});

$("#gridPana").innerHTML = WORKS.filter(w => w.cat === "pana").map(card).join("");
$("#gridKartini").innerHTML = WORKS.filter(w => w.cat === "kartina" && !w.hidden).map(card).join("");
$$("[data-count]").forEach(el => {
  const list = WORKS.filter(w => w.cat === el.dataset.count);
  el.textContent = `${list.length} работи · от ${money(Math.min(...list.flatMap(prices)))}`;
});

/* ---------- order form ---------- */
const item = $("#item"), wed = $(".wed"), frm = $(".frm"), frameSel = $("#frameSel");
const groups = [
  ["Стъклени картини (с рамка)", [
    ["plodorodie", "Дърво на плодородието — 30×40 см — 80 €"],
    ["svatba", "Сватбено Дърво на живота (по поръчка)"],
    ["drugo", "Друго Дърво на живота (по поръчка)"],
    ...WORKS.filter(w => w.cat === "kartina" && !w.hidden).flatMap(w => w.sizes
      ? w.sizes.map((s, i) => [i ? `${w.id}-${i}` : w.id, `${w.name} — ${s[0].toLowerCase()}, ${s[1]} — ${money(s[2])}`])
      : [[w.id, w.name + (w.price != null ? ` — ${money(w.price)}` : "")]]),
  ]],
  ["Стъклени пана", WORKS.filter(w => w.cat === "pana")
    .map(w => [w.id, `Пано „${w.name}“` + (w.price != null ? ` — ${money(w.price)}` : "")])],
];
item.innerHTML = groups.map(([g, os]) =>
  `<optgroup label="${g}">${os.map(([v, t]) => `<option value="${v}">${esc(t)}</option>`).join("")}</optgroup>`).join("");
const hasFrameChoice = v => ["plodorodie", "svatba", "drugo"].includes(v);
const syncForm = () => {
  wed.hidden = item.value !== "svatba";
  frm.hidden = !hasFrameChoice(item.value);
};
item.addEventListener("change", syncForm);
document.addEventListener("click", e => {
  const b = e.target.closest("[data-order]");
  if (!b) return;
  item.value = b.dataset.order;
  syncForm();
  $("#porachka").scrollIntoView({ behavior: "smooth" });
});
syncForm();

/* ---------- frame picker, shared by both trees ---------- */
const stage = $(".feature-main");
const thumbs = $$(".thumbs button");
const swatches = $$(".feature .frame-pick button");
const allSwatches = $$(".frame-pick button");
function pickFrame(key) {
  const f = swatches.find(s => s.dataset.frame === key);
  if (!f) return;
  allSwatches.forEach(s => {
    const on = s.dataset.frame === key;
    s.classList.toggle("on", on);
    s.setAttribute("aria-checked", on);
  });
  $("#wedImg").src = `assets/img/framed-wedding-${key}.jpg`;
  $("#frameName").textContent = f.dataset.name;
  frameSel.value = f.dataset.name;
  stage.innerHTML = `<img src="assets/img/framed-${key}.jpg" alt="Картината в рамка ${f.dataset.name}" width="1500" height="2009">`;
  thumbs.forEach(t => t.classList.remove("on"));
}
allSwatches.forEach(s => s.addEventListener("click", () => pickFrame(s.dataset.frame)));
frameSel.addEventListener("change", () => {
  const s = swatches.find(x => x.dataset.name === frameSel.value);
  if (s) pickFrame(s.dataset.frame);
});
thumbs.forEach(b => b.addEventListener("click", () => {
  thumbs.forEach(t => t.classList.toggle("on", t === b));
  stage.innerHTML = b.hasAttribute("data-video")
    ? '<video src="assets/video/making.mp4" poster="assets/img/making-poster.jpg" autoplay muted loop playsinline controls></video>'
    : `<img src="${b.dataset.src}" alt="${b.dataset.alt}">`;
}));

/* ---------- submit ---------- */
$("#orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const note = $("#formNote");
  if (!d.name.trim() || !d.phone.trim()) { note.textContent = "Моля, въведете име и телефон."; return; }
  const label = item.selectedOptions[0].textContent;
  const body = [
    `Избор: ${label}`,
    hasFrameChoice(item.value) ? `Рамка: ${d.frame}` : "",
    d.names ? `Имена: ${d.names}` : "",
    `Име: ${d.name}`, `Телефон: ${d.phone}`, d.msg ? `Съобщение: ${d.msg}` : "",
  ].filter(Boolean).join("\n");
  location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("Поръчка — " + label)}&body=${encodeURIComponent(body)}`;
  note.textContent = "Отваряме имейл с готовата поръчка.";
});

$("#yr").textContent = new Date().getFullYear();

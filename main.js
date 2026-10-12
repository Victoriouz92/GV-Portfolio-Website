// TODO: replace with the real contact email before launch
const ORDER_EMAIL = "info@artgifts.bg";

const $ = (s, r = document) => r.querySelector(s);

// product gallery + frame picker
const main = $(".gallery-main");
const thumbs = document.querySelectorAll(".thumbs button");
const swatches = document.querySelectorAll(".frame-pick button");
const frameSel = $("#frameSel");
let frame = swatches[0];
const showFramed = () => {
  main.innerHTML = `<img id="gMain" src="assets/img/framed-${frame.dataset.frame}.jpg" alt="Картината в рамка ${frame.dataset.name}" width="1000" height="1314">`;
  thumbs.forEach(t => t.classList.remove("on"));
};
function pickFrame(key) {
  frame = [...swatches].find(s => s.dataset.frame === key) || frame;
  swatches.forEach(s => { s.classList.toggle("on", s === frame); s.setAttribute("aria-checked", s === frame); });
  $("#frameName").textContent = frame.dataset.name;
  if (frameSel) frameSel.value = frame.dataset.name;
  showFramed();
}
swatches.forEach(s => s.addEventListener("click", () => pickFrame(s.dataset.frame)));
document.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => {
  pickFrame(b.dataset.pick);
  $("#kolekcia").scrollIntoView({ behavior: "smooth" });
}));
thumbs.forEach(b => b.addEventListener("click", () => {
  thumbs.forEach(t => t.classList.toggle("on", t === b));
  main.innerHTML = b.hasAttribute("data-video")
    ? '<video src="assets/video/making.mp4" poster="assets/img/making-poster.jpg" autoplay muted loop playsinline controls></video>'
    : `<img src="${b.dataset.src}" alt="${b.dataset.alt}">`;
}));
frameSel && frameSel.addEventListener("change", () => {
  const s = [...swatches].find(x => x.dataset.name === frameSel.value);
  if (s) pickFrame(s.dataset.frame);
});

// "Order" buttons preselect the item
const item = $("#item"), wed = $(".wed");
const syncWed = () => { wed.hidden = !/Сватбено/.test(item.value); };
item.addEventListener("change", syncWed);
document.querySelectorAll("[data-order]").forEach(a => a.addEventListener("click", () => {
  const opt = [...item.options].find(o => o.text.startsWith(a.dataset.order.split(" (")[0]));
  if (opt) item.value = opt.value;
  syncWed();
}));

// form -> opens email with the order text
$("#orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, d = Object.fromEntries(new FormData(f));
  const note = $("#formNote");
  if (!d.name.trim() || !d.phone.trim()) { note.textContent = "Моля, въведете име и телефон."; return; }
  const body = [
    `Избор: ${d.item}`, `Рамка: ${d.frame}`,
    d.names ? `Имена: ${d.names}` : "", `Име: ${d.name}`, `Телефон: ${d.phone}`, d.msg ? `Съобщение: ${d.msg}` : ""
  ].filter(Boolean).join("\n");
  location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("Поръчка — " + d.item)}&body=${encodeURIComponent(body)}`;
  note.textContent = "Отваряме имейл с готовата поръчка. Благодарим ви!";
});

$("#yr").textContent = new Date().getFullYear();

// Card payments for luckyglass.eu — a tiny Cloudflare Worker that keeps the Stripe secret key off the public site.
// The browser sends only what was chosen (work ids, sizes, delivery); prices are read again from the live site,
// so nobody can change the amount in their browser. Secret: STRIPE_SECRET (Cloudflare → Worker → Settings → Variables).
const SITE = "https://luckyglass.eu";
const ORIGINS = [SITE, "https://www.luckyglass.eu"];

const json = (body, status, origin) => new Response(JSON.stringify(body), { status, headers: {
  "Content-Type": "application/json", "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" } });
const num = v => v !== null && v !== undefined && v !== "" && isFinite(v) ? +v : null;
const clip = (v, n) => String(v || "").slice(0, n);

export default {
  async fetch(req, env) {
    const origin = ORIGINS.includes(req.headers.get("Origin")) ? req.headers.get("Origin") : SITE;
    if (req.method === "OPTIONS") return json({}, 204, origin);
    if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);
    let b; try { b = await req.json(); } catch { return json({ error: "Невалидна заявка." }, 400, origin); }

    const [works, site] = await Promise.all(["works", "site"].map(f =>
      fetch(`${SITE}/data/${f}.json`, { cf: { cacheTtl: 60 } }).then(r => r.json())));
    const byId = Object.fromEntries((works.works || []).map(w => [w.id, w]));
    const items = Array.isArray(b.items) ? b.items.slice(0, 20) : [];
    if (!items.length) return json({ error: "Количката е празна." }, 400, origin);

    let total = 0; const lines = [], count = {};
    for (const it of items) {
      const w = byId[it.id]; if (!w) return json({ error: "Творба от количката вече не е налична. Презаредете страницата." }, 409, origin);
      const stock = w.sold ? 0 : num(w.stock) ?? 1;
      count[w.id] = (count[w.id] || 0) + 1;
      if (count[w.id] > stock) return json({ error: `„${w.name}“ вече не е в наличност.` }, 409, origin);
      const z = Array.isArray(w.sizes) && w.sizes.length ? w.sizes[+it.size] : null;
      const price = z ? num(z.price) : num(w.price);
      if (price === null) return json({ error: `„${w.name}“ е с цена по запитване.` }, 409, origin);
      total += price; lines.push(`${w.series || ""} „${w.name}“${z ? " " + z.size : ""} — ${price} €`);
    }
    const d = (site.delivery || [])[+b.delivery], ship = d ? num(d.price) : null;
    if (!d || ship === null) return json({ error: "Изберете начин на доставка с посочена цена." }, 409, origin);
    total += ship;

    const amount = Math.round(total * 100), order = clip(b.order, 20);
    const form = new URLSearchParams({
      amount: String(amount), currency: "eur", "automatic_payment_methods[enabled]": "true",
      description: `Поръчка ${order} — luckyglass.eu`, receipt_email: clip(b.email, 120),
      "metadata[order]": order, "metadata[name]": clip(b.name, 120), "metadata[phone]": clip(b.phone, 40),
      "metadata[delivery]": clip(`${d.label} (${ship} €)`, 200), "metadata[address]": clip(b.where, 400),
      "metadata[invoice]": b.invoice ? "да" : "не", "metadata[items]": clip(lines.join("\n"), 480) });
    const r = await fetch("https://api.stripe.com/v1/payment_intents", { method: "POST", body: form,
      headers: { Authorization: `Bearer ${env.STRIPE_SECRET}`, "Content-Type": "application/x-www-form-urlencoded", "Idempotency-Key": `lg-${order}-${amount}` } });
    const pi = await r.json();
    if (!r.ok) return json({ error: "Плащането не може да започне. Опитайте отново след малко." }, 502, origin);
    return json({ clientSecret: pi.client_secret, amount, id: pi.id }, 200, origin);
  },
};

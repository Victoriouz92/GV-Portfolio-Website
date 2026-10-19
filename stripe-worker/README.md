# Плащане с карта (Stripe) за luckyglass.eu

Сайтът е статичен, затова тайният ключ на Stripe живее в малък безплатен „посредник“ — Cloudflare Worker.
Той проверява цените от самия сайт и казва на Stripe колко да вземе.

## Пускане (около 10 минути, веднъж)

1. **Stripe** (акаунтът на АРТГИФТС БГ ЕООД) → Developers → API keys:
   - копирайте **Publishable key** (`pk_live_…`)
   - копирайте **Secret key** (`sk_live_…`) — пази се само в Cloudflare, никога в сайта.
2. **Cloudflare** (безплатен акаунт) → Workers & Pages → Create → Worker → име `luckyglass-pay` → Deploy.
   - Edit code → поставете съдържанието на `worker.js` → Deploy.
   - Settings → Variables and Secrets → Add → тип **Secret**, име `STRIPE_SECRET`, стойност `sk_live_…`.
   - Адресът на worker-а изглежда така: `https://luckyglass-pay.<акаунт>.workers.dev`
3. **Админ панел** → Контакти:
   - „Stripe publishable key“ → `pk_live_…`
   - „Адрес на сървъра за плащане“ → адреса от стъпка 2.

След записване в сайта се появява „С карта онлайн“. Всяко плащане се вижда в Stripe → Payments,
с номер на поръчката, име, телефон, адрес, доставка и творби.

Тест преди пускане: използвайте `pk_test_…` и `sk_test_…` и карта `4242 4242 4242 4242`, всяка бъдеща дата, всеки CVC.
Само за дизайна на полето: `https://luckyglass.eu/?karta=demo` (не взима пари).

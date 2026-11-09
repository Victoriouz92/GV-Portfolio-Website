/* Offline integration checks. Requests are intercepted in JSDOM; no email is sent. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require(process.env.JSDOM_MODULE || 'jsdom');
const root = path.resolve(__dirname, '../..');
const works = JSON.parse(fs.readFileSync(path.join(root, 'data/works.json'), 'utf8')).works;
const site = JSON.parse(fs.readFileSync(path.join(root, 'data/site.json'), 'utf8'));
const code = fs.readFileSync(path.join(root, 'main.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
function setup(t, hash = '#plastiki', response = async () => ({ ok: true, json: async () => ({ success: true }) }), autoLoad = false) {
  const dom = new JSDOM(html, { url: 'https://local.invalid/' + hash, runScripts: 'outside-only' });
  const w = dom.window, calls = [];
  w.WORKS_DATA = works;
  w.SITE = site;
  w.matchMedia = () => ({ matches: false });
  w.scrollTo = () => {};
  const observers = [];
  if (autoLoad) w.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
  };
  w.fetch = async (url, options) => { calls.push({ url, body: JSON.parse(options.body) }); return response(); };
  w.eval(code);
  t.after(() => dom.window.close());
  const $ = selector => w.document.querySelector(selector);
  const change = (selector, value, event = 'change') => { $(selector).value = value; $(selector).dispatchEvent(new w.Event(event, { bubbles: true })); };
  const click = selector => $(selector).click();
  const submit = () => $('#orderForm').dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
  return { w, $, calls, change, click, submit, observers };
}
function readyToReview(app) {
  app.w.eval('renderWork("plastika-245792")');
  app.click('#wpAdd');
  app.click('#checkoutNext');
  app.change('#oName', 'Тестова проверка', 'input');
  app.change('#oPhone', '0888000000', 'input');
  app.change('#oEmail', 'test@example.com', 'input');
  app.click('#checkoutNext');
}
const settled = () => new Promise(resolve => setImmediate(resolve));

test('every category displays its own name below Collection', t => {
  const a = setup(t);
  for (const [cat, title] of [['kartina', 'Картини'], ['pana', 'Пана'], ['plastika', 'Пластики'], ['soon', 'Бижута']]) {
    a.click(`.tabs [data-cat="${cat}"]`);
    assert.equal(a.$('#collectionTitle').textContent, title);
  }
});
test('scroll intersection loads batches of 24, stops at the end and resets after filtering', t => {
  const a = setup(t, '#plastiki', undefined, true);
  const loader = a.$('#catalogLoader');
  const observer = a.observers.find(o => o.targets.has(loader));
  assert.ok(observer);
  assert.equal(a.$('#catalogMore').hidden, true);
  for (const expected of [48, 72, 90]) {
    observer.callback([{ target: loader, isIntersecting: true }]);
    const links = [...a.w.document.querySelectorAll('#grid .mat')].map(el => el.href);
    assert.equal(links.length, expected);
    assert.equal(new Set(links).size, expected);
  }
  assert.equal(loader.hidden, true);
  observer.callback([{ target: loader, isIntersecting: true }]);
  assert.equal(a.w.document.querySelectorAll('#grid article').length, 90);
  a.change('#catalogAuthor', 'Борислав Русинов');
  assert.equal(a.w.document.querySelectorAll('#grid article').length, 2);
  assert.equal(loader.hidden, true);
  a.click('#catalogReset');
  assert.equal(a.w.document.querySelectorAll('#grid article').length, 24);
  assert.equal(loader.hidden, false);
  a.w.history.pushState(null, '', '/#kontakti');
  observer.callback([{ target: loader, isIntersecting: true }]);
  assert.equal(a.w.document.querySelectorAll('#grid article').length, 24);
  a.w.history.pushState(null, '', '/tvorba/plastika-245792/');
  a.w.eval('route()');
  observer.callback([{ target: loader, isIntersecting: true }]);
  assert.equal(a.w.document.querySelectorAll('#grid article').length, 24);
});

test('filters search all works, combine author and query, reset and paginate without duplicates', t => {
  const a = setup(t);
  assert.equal(a.w.document.querySelectorAll('#grid article').length, 24);
  assert.match(a.$('#catalogResults').textContent, /90/);
  a.click('#catalogMore');
  const links = [...a.w.document.querySelectorAll('#grid .mat')].map(el => el.href);
  assert.equal(links.length, 48);
  assert.equal(new Set(links).size, 48);
  a.change('#catalogAuthor', 'Борислав Русинов');
  assert.equal(a.w.document.querySelectorAll('#grid article').length, 2);
  a.change('#catalogSearch', 'НИМФА', 'input');
  assert.equal(a.$('#grid h3').textContent.trim(), 'Нимфа');
  a.change('#catalogSearch', 'няма такава творба', 'input');
  assert.equal(a.$('#catalogEmpty').hidden, false);
  a.click('#catalogEmptyReset');
  assert.equal(a.$('#catalogSearch').value, '');
  assert.equal(a.w.document.querySelectorAll('#grid article').length, 24);
});
test('price range and sort work together; invalid ranges are explained', t => {
  const a = setup(t);
  a.change('#catalogMin', '50'); a.change('#catalogMax', '100'); a.change('#catalogSort', 'price-up');
  const prices = [...a.w.document.querySelectorAll('#grid .price')].map(el => Number(el.textContent.replace(' €', '').replace(',', '.')));
  assert.ok(prices.length > 1);
  assert.ok(prices.every((price, i) => price >= 50 && price <= 100 && (!i || price >= prices[i - 1])));
  a.change('#catalogMin', '200');
  assert.match(a.$('#catalogResults').textContent, /Началната цена/);
});
test('sold archive remains searchable and never exposes historic prices or withdrawn authors', t => {
  const a = setup(t, '#plastiki-prodadeni');
  assert.equal(a.w.document.querySelectorAll('#grid article').length, 22);
  assert.equal(a.$('#catalogPrice').hidden, true);
  assert.doesNotMatch(a.$('#grid').textContent, /Русинов/);
  assert.doesNotMatch(a.$('#grid').textContent, /€/);
  a.w.eval('renderWork("plastika-249620")');
  assert.equal(a.$('#wpAdd').hidden, true);
});
test('pickup advances to contact; incomplete contact cannot advance or send requests', t => {
  const a = setup(t); a.w.eval('renderWork("plastika-245792")'); a.click('#wpAdd');
  const methods = [...a.w.document.querySelectorAll('#delivList input')];
  assert.equal(methods.filter(el => !el.disabled).length, 1);
  assert.equal(methods.find(el => el.checked).value, '0');
  a.click('#checkoutNext');
  assert.equal(a.$('[data-checkout-step="1"]').hidden, false);
  a.click('#checkoutNext');
  assert.equal(a.$('[data-checkout-step="1"]').hidden, false);
  assert.equal(a.w.document.activeElement.id, 'oName');
  assert.match(a.$('#orderNote').textContent, /име и фамилия/);
  assert.equal(a.calls.length, 0);
});
test('review preserves contact, zero delivery fee, disabled payment methods and back navigation', t => {
  const a = setup(t); readyToReview(a);
  assert.equal(a.$('[data-checkout-step="2"]').hidden, false);
  assert.match(a.$('#checkoutReview').textContent, /Тестова проверка/);
  assert.equal(a.$('#sumShip').textContent, 'безплатно');
  assert.equal(a.w.document.querySelectorAll('#payList input:not(:disabled)').length, 1);
  assert.equal(a.$('input[name=pay]:checked').value, 'gallery');
  a.click('#checkoutBack'); assert.equal(a.$('#oEmail').value, 'test@example.com');
  a.click('#checkoutNext'); a.submit();
  assert.match(a.$('#orderNote').textContent, /Общите условия/);
  assert.equal(a.calls.length, 0);
});
test('confirmed response sends the correct pickup order and clears cart only after acknowledgement', async t => {
  const a = setup(t); readyToReview(a); a.$('input[name=consent]').checked = true; a.submit(); await settled();
  assert.equal(a.calls.length, 1);
  assert.match(a.calls[0].body['Доставка'], /От галерията \(безплатно\)/);
  assert.equal(a.calls[0].body['Плащане'], 'При вземане от галерията');
  assert.match(a.calls[0].body['Творби'], /Нимфа/);
  assert.equal(a.$('#orderDone').hidden, false);
  assert.deepEqual(JSON.parse(a.w.localStorage.getItem('cart2')), []);
});
for (const [label, response] of [
  ['unconfirmed HTTP 200', async () => ({ ok: true, json: async () => ({}) })],
  ['service rejection', async () => ({ ok: true, json: async () => ({ success: false }) })],
  ['network failure', async () => { throw Error('Offline'); }],
]) test(label + ' retains cart and offers explicit email fallback without false success', async t => {
  const a = setup(t, '#plastiki', response); readyToReview(a); a.$('input[name=consent]').checked = true; a.submit(); await settled();
  assert.equal(a.$('#orderDone').hidden, true);
  assert.equal(a.$('#orderOut').hidden, false);
  assert.equal(JSON.parse(a.w.localStorage.getItem('cart2')).length, 1);
  assert.match(a.$('#orderMailLink').href, /^mailto:/);
  assert.equal(a.$('#payBtn').disabled, false);
});
test('double submission creates only one request while acknowledgement is pending', async t => {
  let finish;
  const a = setup(t, '#plastiki', () => new Promise(resolve => { finish = resolve; }));
  readyToReview(a); a.$('input[name=consent]').checked = true; a.submit(); a.submit();
  assert.equal(a.calls.length, 1);
  finish({ ok: true, json: async () => ({ success: 'true' }) }); await settled();
  assert.equal(a.$('#orderDone').hidden, false);
});

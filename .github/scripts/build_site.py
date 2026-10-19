"""Build the published site into _site/: the static files plus one real page per work
(/tvorba/<id>/) with its own title, description, preview image and structured data,
and a sitemap listing them all. Runs in GitHub Actions on every push, including the
artist's edits from the admin panel, so new works get their page automatically."""
import html, json, os, re, shutil, sys
from datetime import date

SITE = "https://luckyglass.eu/"
OUT = "_site"
SKIP = {".git", ".github", OUT, "node_modules", "stripe-worker"}

def esc(s): return html.escape(str(s or ""), quote=True)

def copy_tree():
    if os.path.exists(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)
    for name in os.listdir("."):
        if name in SKIP or name.startswith(".") and name not in (".nojekyll",): continue
        src, dst = name, os.path.join(OUT, name)
        shutil.copytree(src, dst) if os.path.isdir(src) else shutil.copy2(src, dst)

def set_meta(page, prop, value, attr="property"):
    pat = re.compile(rf'(<meta {attr}="{re.escape(prop)}" content=")[^"]*(")')
    return pat.sub(lambda m: m.group(1) + esc(value) + m.group(2), page, count=1)

def main():
    copy_tree()
    index = open("index.html", encoding="utf-8").read()
    works = json.load(open("data/works.json", encoding="utf-8"))["works"]
    site = json.load(open("data/site.json", encoding="utf-8"))
    rates = [d["price"] for d in site.get("delivery", []) if d.get("type") != "pickup" and d.get("price") not in (None, "")]
    shipping = {"@type": "OfferShippingDetails", "shippingDestination": {"@type": "DefinedRegion", "addressCountry": "BG"},
                "shippingRate": {"@type": "MonetaryAmount", "value": min(rates), "currency": "EUR"},
                "deliveryTime": {"@type": "ShippingDeliveryTime",
                                 "handlingTime": {"@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY"},
                                 "transitTime": {"@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY"}}} if rates else None
    returns = {"@type": "MerchantReturnPolicy", "applicableCountry": "BG", "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
               "merchantReturnDays": 14, "returnMethod": "https://schema.org/ReturnByMail", "returnFees": "https://schema.org/ReturnShippingFees"}
    notes = {"kartina": "Дърво на живота, рисувано върху стъкло и сплавено с цветни стъкълца, в дървена рамка.",
             "pana": "Стъклено пано без рамка, на метална закопчалка-кобилица."}
    urls = [SITE]
    for w in works:
        if not w.get("id") or not w.get("name"): continue
        wid = re.sub(r"[^\w-]", "", w["id"])
        name = f'{w.get("series", "")} „{w["name"]}“'.strip()
        url = f"{SITE}tvorba/{wid}/"
        img = SITE + (w["image"].lstrip("/") if w.get("image") else f"assets/products/{wid}-wall.webp")
        sizes = w.get("sizes") or []
        prices = [z["price"] for z in sizes if z.get("price") not in (None, "")] or ([w["price"]] if w.get("price") not in (None, "") else [])
        price_txt = (f"от {min(prices)} €" if len(prices) > 1 else f"{prices[0]} €") if prices else "цена по запитване"
        size_txt = " · ".join(z["size"] for z in sizes) if sizes else w.get("size", "")
        desc = (w.get("text") or notes.get(w.get("cat"), "")).strip()
        meta_desc = f"{name} — ръчно изработена творба от стъкло на Лъки Михайлова. {size_txt + '. ' if size_txt else ''}{price_txt}. {desc}"[:300]
        title = f"{name} — {price_txt} | Лъки Михайлова"
        product = {"@context": "https://schema.org", "@type": "Product", "name": name, "description": desc or meta_desc,
                   "image": img, "url": url, "brand": {"@type": "Brand", "name": "Лъки Михайлова"}, "material": "стъкло"}
        if prices:
            product["offers"] = ({"@type": "AggregateOffer", "lowPrice": min(prices), "highPrice": max(prices)} if len(prices) > 1
                                 else {"@type": "Offer", "price": prices[0]}) | {
                "priceCurrency": "EUR", "url": url,
                "availability": "https://schema.org/SoldOut" if w.get("sold") or w.get("stock") == 0 else "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition", "hasMerchantReturnPolicy": returns,
                "seller": {"@type": "Organization", "name": "АРТГИФТС БГ ЕООД"}} | ({"shippingDetails": shipping} if shipping else {})
        page = index
        page = re.sub(r"<title>.*?</title>", f"<title>{esc(title)}</title>", page, count=1, flags=re.S)
        page = set_meta(page, "description", meta_desc, "name")
        page = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">', page, count=1)
        for prop, val in (("og:type", "product"), ("og:url", url), ("og:title", name), ("og:description", meta_desc),
                          ("og:image", img), ("og:image:alt", name)):
            page = set_meta(page, prop, val)
        ld = json.dumps(product, ensure_ascii=False).replace("</", "<\\/")
        page = page.replace("</head>", f'<script type="application/ld+json">{ld}</script>\n</head>', 1)
        os.makedirs(f"{OUT}/tvorba/{wid}", exist_ok=True)
        open(f"{OUT}/tvorba/{wid}/index.html", "w", encoding="utf-8").write(page)
        urls.append(url)
    for extra in ("usloviya.html", "poveritelnost.html"):
        if os.path.exists(extra): urls.append(SITE + extra)
    today = date.today().isoformat()
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f"  <url><loc>{u}</loc><lastmod>{today}</lastmod></url>" for u in urls]
    sm.append("</urlset>")
    open(f"{OUT}/sitemap.xml", "w", encoding="utf-8").write("\n".join(sm) + "\n")
    print(f"built {len(urls) - 1} pages")

if __name__ == "__main__":
    sys.exit(main())

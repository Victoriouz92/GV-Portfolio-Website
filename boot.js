/* Load the editable content (data/*.json, edited in the admin panel), then the site. */
Promise.all(["data/works.json", "data/site.json"].map(u => fetch(u, { cache: "no-cache" }).then(r => r.json()).catch(() => ({}))))
  .then(([w, site]) => {
    window.WORKS_DATA = w.works || []; window.SITE = site || {};
    const s = document.createElement("script"); s.src = "main.js?v=4"; document.body.appendChild(s);
  });

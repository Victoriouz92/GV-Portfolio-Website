/* Render the original sculpture photography on the page wall. Source files stay intact. */
(() => {
  "use strict";
  const cache = new Map();
  const clamp = value => Math.max(0, Math.min(1, value));
  const median = values => values.sort((a, b) => a - b)[Math.floor(values.length / 2)];

  async function source(url, maxSize = 1200, mode = "mask") {
    // Reviewed transparent cutouts already contain an accurate silhouette,
    // including enclosed openings and pale metal. Never colour-key them again.
    if (url.includes("/cutouts/")) return url;
    const key = `${mode}:${maxSize}:${url}`;
    if (cache.has(key)) return cache.get(key);
    const result = new Promise(resolve => {
      const image = new Image();
      image.onload = () => {
        try {
          const scale = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
          const canvas = document.createElement("canvas");
          const width = canvas.width = Math.round(image.naturalWidth * scale);
          const height = canvas.height = Math.round(image.naturalHeight * scale);
          const g = canvas.getContext("2d", { willReadFrequently: true });
          g.drawImage(image, 0, 0, width, height);
          const photo = g.getImageData(0, 0, width, height), rgba = photo.data;
          // Estimate the photographed wall from corner samples, not the artwork.
          const samples = [[], [], []];
          const radius = Math.max(3, Math.round(width * .025));
          for (const [cx, cy] of [[0, 0], [width - radius, 0], [0, height - radius], [width - radius, height - radius]]) {
            for (let y = cy; y < cy + radius; y++) for (let x = cx; x < cx + radius; x++) {
              const i = (y * width + x) * 4;
              if (Math.min(rgba[i], rgba[i + 1], rgba[i + 2]) < 160) continue;
              for (let c = 0; c < 3; c++) samples[c].push(rgba[i + c]);
            }
          }
          if (!samples[0].length) { resolve(url); return; }
          const wall = samples.map(median);
          const butterfly = url.includes("plastika-246014-");
          const mask = new Uint8Array(width * height), queue = new Int32Array(width * height);
          let head = 0, tail = 0;
          function background(p) {
            const i = p * 4, r = rgba[i], green = rgba[i + 1], b = rgba[i + 2];
            // This golden relief has neutral wall shadows, distinct from its warm metal.
            return Math.min(r, green, b) > (butterfly ? 110 : 170) &&
              Math.max(r, green, b) - Math.min(r, green, b) < (butterfly ? 35 : 42) &&
              Math.max(Math.abs(r - wall[0]), Math.abs(green - wall[1]), Math.abs(b - wall[2])) < (butterfly ? 160 : 65);
          }
          function add(p) {
            if (!mask[p] && background(p)) { mask[p] = 1; queue[tail++] = p; }
          }
          for (let x = 0; x < width; x++) { add(x); add((height - 1) * width + x); }
          for (let y = 0; y < height; y++) { add(y * width); add(y * width + width - 1); }
          const centaur = url.includes("plastika-245788-");
          if (butterfly) {
            // Enclosed photographed wall under the raised arms.
            for (const [x, y] of [[.42, .35], [.56, .35]]) {
              add(Math.floor(y * height) * width + Math.floor(x * width));
            }
          }
          if (centaur) {
            // The two enclosed openings are wall, not pale bronze highlights.
            for (const [x, y] of [[.557, .364], [.548, .462]]) {
              add(Math.floor(y * height) * width + Math.floor(x * width));
            }
          }
          // Edge-connected masking keeps enclosed light marble and metal highlights.
          while (head < tail) {
            const p = queue[head++], x = p % width;
            if (x) add(p - 1);
            if (x < width - 1) add(p + 1);
            if (p >= width) add(p - width);
            if (p < width * (height - 1)) add(p + width);
          }
          // Remove only the photographed wall; preserve the original RGB everywhere else.
          for (let p = 0; p < mask.length; p++) {
            const x = p % width, y = Math.floor(p / width);
            if (mask[p]) {
              // White marble belongs to the work. Keep the lower support region,
              // with a feathered transition, while still clearing the wall above it.
              const protect = mode === "blend" ? clamp((y / height - .7) / .08) *
                clamp((x / width - .02) / .05) * clamp((.98 - x / width) / .05) : 0;
              rgba[p * 4 + 3] = Math.round(255 * protect);
            }
            if (x < 2 || x > width - 3 || y < 2 || y > height - 3) rgba[p * 4 + 3] = 0;
            // Gallery plinth corners outside this photograph's wooden base.
            if (centaur && ((x < width * .32 && y > height * .75) ||
                (x > width * .78 && y > height * .72))) rgba[p * 4 + 3] = 0;
          }
          g.putImageData(photo, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } catch {
          // Original photography remains usable when canvas processing is unavailable.
          resolve(url);
        }
      };
      image.onerror = () => resolve(url);
      image.src = url;
    });
    cache.set(key, result);
    if (cache.size > 48) cache.delete(cache.keys().next().value);
    return result;
  }

  function prepare(root) {
    root.querySelectorAll("img[data-sculpture]:not([data-sculpture-ready])").forEach(img => {
      img.dataset.sculptureReady = "pending";
      const url = img.getAttribute("src");
      const render = async () => {
        const processed = await source(url, +img.dataset.sculpture || 600, img.dataset.sculptureMode);
        if (!img.isConnected) return;
        img.src = processed;
        img.dataset.sculptureReady = "true";
      };
      if (img.complete && img.naturalWidth) render();
      else { img.addEventListener("load", render, { once: true }); img.addEventListener("error", () => { img.dataset.sculptureReady = "true"; }, { once: true }); }
    });
  }
  window.SculpturePhotos = { source, prepare };
})();

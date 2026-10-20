/* Light reveals the original glass. No particles or reconstructed artwork. */
(() => {
  "use strict";
  const entrance = document.getElementById("intro");
  if (!entrance) return;
  let seen = false;
  try { seen = sessionStorage.getItem("entered") === "1"; } catch { /* Storage may be disabled. */ }
  const deepLink = location.hash || /\/tvorba\//.test(location.pathname);
  const forcePreview = new URLSearchParams(location.search).has("entrance");
  if ((seen || deepLink) && !forcePreview) { entrance.hidden = true; return; }

  const canvas = document.getElementById("glassTree");
  const context = canvas.getContext("2d");
  const figure = entrance.querySelector(".atelier-art");
  const replay = document.getElementById("replayGlass");
  const status = document.getElementById("glassAnnouncement");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const siblings = [...document.body.children].filter(el => el !== entrance && !["SCRIPT", "NOSCRIPT"].includes(el.tagName));
  const originalInert = new Map(siblings.map(el => [el, el.inert]));
  siblings.forEach(el => { el.inert = true; });
  document.body.classList.add("locked");
  entrance.classList.add("is-playing");
  const focusTimer = setTimeout(() => entrance.focus({ preventScroll: true }), 60);

  const SIZE = 900, DURATION = 4.4;
  const clamp = value => Math.min(1, Math.max(0, value));
  let frame = 0, leaving = false, photograph = null, reflection = null;
  let started = 0, elapsed = 0, previousTime = 0;
  const pointer = { x: 450, y: 370, targetX: 450, targetY: 370, strength: 0, targetStrength: 0 };

  function leave(event) {
    if (leaving) return;
    leaving = true;
    clearTimeout(focusTimer);
    cancelAnimationFrame(frame);
    try { sessionStorage.setItem("entered", "1"); } catch { /* Navigation works without storage. */ }
    entrance.classList.add("is-leaving");
    siblings.forEach(el => { el.inert = originalInert.get(el); });
    document.body.classList.remove("locked");
    const href = event?.currentTarget?.getAttribute("href") || "#kolekcia";
    const finish = () => {
      entrance.hidden = true;
      // Keep keyboard focus in the page after the entrance disappears.
      const target = href.startsWith("#") ? document.querySelector(href) : document.querySelector("#wpName");
      if (target) { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
    };
    setTimeout(finish, motion.matches ? 0 : 720);
  }
  entrance.querySelectorAll("[data-enter]").forEach(link => link.addEventListener("click", leave));
  entrance.addEventListener("keydown", event => {
    if (event.key === "Escape") { entrance.querySelector(".atelier-cta").click(); return; }
    if (event.key !== "Tab") return;
    const controls = [...entrance.querySelectorAll("a[href],button:not([disabled])")].filter(el => el.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  function layer() {
    const result = document.createElement("canvas");
    result.width = SIZE; result.height = SIZE;
    return result;
  }

  const lighting = layer(), lightContext = lighting.getContext("2d");

  function prepare(image) {
    photograph = layer();
    const g = photograph.getContext("2d", { willReadFrequently: true });
    g.drawImage(image, image.width * .17, image.height * .175, image.width * .645, image.height * .645, 0, 0, SIZE, SIZE);
    const photo = g.getImageData(0, 0, SIZE, SIZE);
    const shine = g.createImageData(SIZE, SIZE);
    let reflectivePixels = 0;
    for (let p = 0; p < SIZE * SIZE; p++) {
      const i = p * 4, x = p % SIZE, y = Math.floor(p / SIZE);
      const r = photo.data[i], green = photo.data[i + 1], b = photo.data[i + 2];
      const high = Math.max(r, green, b), low = Math.min(r, green, b);
      const saturation = (high - low) / Math.max(1, high);
      const edge = clamp(Math.min(x - 5, SIZE - 6 - x, y - 5) / 3) * clamp((SIZE - y) / 24);
      const alpha = Math.max(clamp((178 - high) / 36), clamp((saturation - .13) / .15)) * edge;
      photo.data[i + 3] = Math.round(alpha * 255);
      // Reflection follows the photographed colour and highlights, never the wood,
      // page background or a procedural replacement stone. Dark glass reflects less.
      const glass = clamp((saturation - .29) / .22) * clamp((high - 82) / 95);
      const crown = clamp((760 - y) / 30);
      const highlight = .18 + .82 * clamp((high - 125) / 110) ** 2;
      const reflectivity = glass * highlight * crown * alpha;
      shine.data[i] = Math.min(255, 175 + r * .32);
      shine.data[i + 1] = Math.min(255, 170 + green * .32);
      shine.data[i + 2] = Math.min(255, 155 + b * .32);
      shine.data[i + 3] = Math.round(reflectivity * 255);
      if (reflectivity > .2) reflectivePixels++;
    }
    g.putImageData(photo, 0, 0);
    reflection = layer(); reflection.getContext("2d").putImageData(shine, 0, 0);
    canvas.dataset.concept = "atelier-light";
    canvas.dataset.reflectivePixels = reflectivePixels;
    canvas.dataset.motionSeconds = DURATION;
    figure.classList.add("is-ready");
    start();
  }

  function render(seconds) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, SIZE, SIZE);
    context.setTransform(.9, 0, 0, .9, 45, 15);
    // The entire photograph is present from the first frame. Only illumination moves.
    context.drawImage(photograph, 0, 0);
    const progress = clamp((seconds - .35) / 3.6);
    const travelling = progress > 0 && progress < 1;
    lightContext.clearRect(0, 0, SIZE, SIZE);
    lightContext.globalCompositeOperation = "source-over";
    if (travelling) {
      const centre = -320 + progress * 1750;
      const glow = lightContext.createLinearGradient(centre - 190, -55, centre + 190, 55);
      glow.addColorStop(0, "rgba(255,255,255,0)");
      glow.addColorStop(.3, "rgba(255,255,255,.12)");
      glow.addColorStop(.5, "rgba(255,255,255,.58)");
      glow.addColorStop(.7, "rgba(255,255,255,.12)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      lightContext.fillStyle = glow; lightContext.fillRect(0, 0, SIZE, SIZE);
    }
    if (pointer.strength > .001) {
      const glow = lightContext.createRadialGradient(pointer.x, pointer.y, 5, pointer.x, pointer.y, 240);
      glow.addColorStop(0, `rgba(255,255,255,${pointer.strength * .28})`);
      glow.addColorStop(1, "rgba(255,255,255,0)");
      lightContext.fillStyle = glow; lightContext.fillRect(0, 0, SIZE, SIZE);
    }
    // Mask the moving light down to actual reflective regions before compositing.
    lightContext.globalCompositeOperation = "destination-in";
    lightContext.drawImage(reflection, 0, 0);
    lightContext.globalCompositeOperation = "source-over";
    context.globalCompositeOperation = "screen";
    context.drawImage(lighting, 0, 0);
    context.globalCompositeOperation = "source-over";
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  function tick(now) {
    frame = 0;
    if (leaving || document.hidden || !photograph) return;
    const seconds = elapsed + (now - started) / 1000;
    const dt = Math.min(.05, Math.max(0, (now - previousTime) / 1000));
    previousTime = now;
    const ease = 1 - Math.exp(-dt * 9);
    pointer.x += (pointer.targetX - pointer.x) * ease;
    pointer.y += (pointer.targetY - pointer.y) * ease;
    pointer.strength += (pointer.targetStrength - pointer.strength) * ease;
    render(motion.matches ? DURATION : seconds);
    const unsettled = Math.abs(pointer.x - pointer.targetX) + Math.abs(pointer.y - pointer.targetY) > .3 || Math.abs(pointer.strength - pointer.targetStrength) > .002;
    if (!motion.matches && (seconds < DURATION || unsettled)) frame = requestAnimationFrame(tick);
    else {
      pointer.strength = pointer.targetStrength;
      render(motion.matches ? DURATION : seconds);
      if (!motion.matches) status.textContent = "Светлината разкрива стъклото.";
    }
  }

  function requestFrame() {
    if (!frame && !leaving && !document.hidden && photograph && !motion.matches) {
      previousTime = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }

  function start() {
    cancelAnimationFrame(frame); frame = 0;
    if (!photograph || leaving) return;
    elapsed = 0; started = performance.now();
    pointer.strength = pointer.targetStrength = 0;
    status.textContent = "";
    render(motion.matches ? DURATION : 0);
    requestFrame();
  }

  canvas.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse" || motion.matches || !photograph) return;
    const rect = canvas.getBoundingClientRect();
    pointer.targetX = ((event.clientX - rect.left) / rect.width * SIZE - 45) / .9;
    pointer.targetY = ((event.clientY - rect.top) / rect.height * SIZE - 15) / .9;
    pointer.targetStrength = 1;
    requestFrame();
  });
  canvas.addEventListener("pointerleave", () => { pointer.targetStrength = 0; requestFrame(); });
  replay.addEventListener("click", start);
  motion.addEventListener("change", start);
  document.addEventListener("visibilitychange", () => {
    if (!photograph || leaving) return;
    if (document.hidden) {
      elapsed = Math.min(DURATION, elapsed + (performance.now() - started) / 1000);
      cancelAnimationFrame(frame); frame = 0;
    } else { started = performance.now(); requestFrame(); }
  });

  if (!context || !lightContext) { replay.hidden = true; return; }
  const image = new Image();
  image.onload = () => {
    if (leaving) return;
    try { prepare(image); }
    catch (error) {
      figure.classList.remove("is-ready"); replay.hidden = true;
      console.warn("Glass lighting unavailable; original artwork displayed.", error);
    }
  };
  image.onerror = () => { replay.hidden = true; };
  image.src = "assets/products/kartina-blagodat-wall.webp";
})();

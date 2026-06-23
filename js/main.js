// Mobile menu toggle
const menuBtn = document.querySelector(".header__menu-btn");
const navLinks = document.querySelector(".header__links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });
}

// Best Sellers — infinite scroll with custom thumb
(function () {
  const container = document.getElementById("bestSellersScroll");
  const thumb = document.getElementById("bsThumb");
  if (!container || !thumb) return;

  const grid = container.querySelector(".bestsellers__grid");
  let setHeight = 0;

  // Clone all cards: [clone set][original set][clone set]
  function cloneCards() {
    const originals = Array.from(grid.children);
    const before = originals.map(function (c) { return c.cloneNode(true); });
    const after  = originals.map(function (c) { return c.cloneNode(true); });
    // prepend in correct order
    for (let i = before.length - 1; i >= 0; i--) grid.prepend(before[i]);
    after.forEach(function (c) { grid.append(c); });
  }

  function measure() {
    // items 4 and 8 are start of original set and start of clone-after set
    const items = grid.children;
    if (items.length < 9) return;
    const r1 = items[4].getBoundingClientRect();
    const r2 = items[8].getBoundingClientRect();
    setHeight = r2.top - r1.top;
    if (setHeight <= 0) return;
    container.style.height = setHeight + "px";
    container.scrollTop = setHeight; // show original set
    updateThumb();
  }

  function updateThumb() {
    if (!setHeight) return;
    const track = thumb.parentElement;
    const trackH = track.clientHeight;
    const thumbH = trackH * 0.35;
    thumb.style.height = thumbH + "px";
    // progress 0→1 as user scrolls through one full set
    const progress = (container.scrollTop % setHeight) / setHeight;
    thumb.style.top = (progress * (trackH - thumbH)) + "px";
  }

  container.addEventListener("scroll", function () {
    // jump by one set when entering the clone zones — same visual, seamless
    if (container.scrollTop > setHeight * 1.5) {
      container.scrollTop -= setHeight;
    } else if (container.scrollTop < setHeight * 0.5) {
      container.scrollTop += setHeight;
    }
    updateThumb();
  });

  window.addEventListener("resize", measure);

  cloneCards();
  window.addEventListener("load", measure);
}());

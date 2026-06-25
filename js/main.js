// Mobile menu toggle
const menuBtn = document.querySelector(".header__menu-btn");
const navLinks = document.querySelector(".header__links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });
}

// Best Sellers — show 4 items, scroll to reveal remaining 2
(function () {
  const container = document.getElementById("bestSellersScroll");
  const thumb = document.getElementById("bsThumb");
  if (!container || !thumb) return;

  const grid = container.querySelector(".bestsellers__grid");

  function setVisibleHeight() {
    const items = grid.children;
    if (items.length < 5) return;
    const gridRect = grid.getBoundingClientRect();
    const item4Rect = items[4].getBoundingClientRect();
    container.style.height = (item4Rect.top - gridRect.top) + "px";
  }

  function updateThumb() {
    const track = thumb.parentElement;
    const trackH = track.clientHeight;
    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll <= 0) {
      thumb.style.height = "100%";
      thumb.style.top = "0";
      return;
    }
    const thumbH = Math.max(trackH * 0.35, 20);
    thumb.style.height = thumbH + "px";
    const progress = container.scrollTop / maxScroll;
    thumb.style.top = (progress * (trackH - thumbH)) + "px";
  }

  container.addEventListener("scroll", updateThumb);
  window.addEventListener("resize", function () { setVisibleHeight(); updateThumb(); });
  window.addEventListener("load", function () { setVisibleHeight(); updateThumb(); });
}());

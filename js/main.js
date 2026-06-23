// Mobile menu toggle
const menuBtn = document.querySelector(".header__menu-btn");
const navLinks = document.querySelector(".header__links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });
}

// [NAV TOGGLE]
const navList = document.querySelector(".nav-list");
const navBtn = document.querySelector(".btn-nav");
let isOpen = false;
navBtn.addEventListener("click", () => {
  navList.toggleAttribute("open");
  navBtn.toggleAttribute("open");
  let navListHeight = navList.scrollHeight + 60;

  if (isOpen) {
    navListHeight = 0;
    navList.style.height = `0px`;
    isOpen = false;
  } else {
    navList.style.height = `${navListHeight}px`;
    isOpen = true;
  }
});
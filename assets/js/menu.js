export default function BindMenuToggle() {
  const navigationList = document.getElementsByClassName("navbar__menu")[0];
  const navigationToggle = document.getElementsByClassName("navbar__toggle")[0];

  navigationToggle.addEventListener("click", function() {
    navigationList.classList.toggle("navbar__menu--toggled");
    navigationToggle.classList.toggle("navbar__toggle--toggled");
  });
}

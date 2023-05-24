const btnMEnuMobile = document.querySelector('.btn-menu-mobile')
const menuMobile = document.querySelector('.menu-mobile')

btnMEnuMobile.addEventListener('click', () => {
    menuMobile.classList.toggle("menu-mobile-hidden")
})
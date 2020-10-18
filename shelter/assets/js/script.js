//HAMBURGER MENU
const hamburgerMenu = document.querySelector('.hamburger-menu')
const hamburgerMenuButton = document.querySelector('.header__content__menu__btn')
const hamburgerMenuBox = document.querySelector('.hamburger-menu__box')
const headerContent = document.querySelector('header .container-inner')

const closeMenu = () => {
    hamburgerMenuButton.classList.toggle('hamburger-menu__active')
    hamburgerMenuBox.classList.toggle('hamburger-menu__box-hidden')
    hamburgerMenu.classList.toggle('hamburger-menu-hidden')
    headerContent.classList.toggle('header-active-menu')
}

hamburgerMenuBox.addEventListener('click', (e) => e.stopPropagation())
hamburgerMenuButton.addEventListener('click', () => closeMenu())
hamburgerMenu.addEventListener('click', () => {
    hamburgerMenuBox.classList.add('hamburger-menu__box-hidden')
    headerContent.classList.remove('header-active-menu')
    hamburgerMenu.classList.add('hamburger-menu-hidden')
    hamburgerMenuButton.classList.remove('hamburger-menu__active')
})

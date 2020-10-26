const hamburgerMenu = document.querySelector('.hamburger-menu')
const hamburgerMenuButton = document.querySelector('.header__content__menu__btn')
const hamburgerMenuBox = document.querySelector('.hamburger-menu__box')
const header = document.querySelector('header')

const closeMenu = () => {
    hamburgerMenuButton.classList.toggle('hamburger-menu__active')
    hamburgerMenuBox.classList.toggle('hamburger-menu__box-hidden')
    hamburgerMenu.classList.toggle('hamburger-menu-hidden')
    header.classList.toggle('header-active-menu')
}

hamburgerMenuButton.addEventListener('click', () => {
    if (header.classList.contains('pets__header')) {
        header.classList.toggle('remove-bg-color')
        setTimeout(() => {
            header.classList.remove('remove-bg-color')
        }, 200)
    }
    initCloseArea()
    closeMenu()
})

function initCloseArea() {
    document.onclick = (e) => {
        if (e.target.className === 'hamburger-menu') closeMenu()
    }
}

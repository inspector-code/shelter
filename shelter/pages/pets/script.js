import { getPets } from '../../assets/js/getPets.js'
import { setPets } from '../../assets/js/setPets.js'

//HAMBURGER MENU
const hamburgerMenu = document.querySelector('.hamburger-menu')
const hamburgerMenuButton = document.querySelector('.header__content__menu__btn')
const hamburgerMenuBox = document.querySelector('.hamburger-menu__box')
const header = document.querySelector('header')
const logoTitle = document.querySelector('.header__content__logo-title')
const logoSubTitle = document.querySelector('.header__content__logo-subtitle')
const petsActiveMenu = document.querySelector('.header__content__menu__items-active')
const petsUlStyle = document.querySelector('.header__content__menu__items')

const closeMenu = () => {
    hamburgerMenuButton.classList.toggle('hamburger-menu__active')
    hamburgerMenuBox.classList.toggle('hamburger-menu__box-hidden')
    hamburgerMenu.classList.toggle('hamburger-menu-hidden')
    header.classList.toggle('header-active-menu')
    logoTitle.classList.toggle('pets__header-title')
    logoSubTitle.classList.toggle('pets__header-subtitle')
    header.classList.toggle('pets__header')
    petsActiveMenu.classList.toggle('pets__header__items-active')
    petsUlStyle.classList.toggle('pets__header__items')
}

hamburgerMenuButton.addEventListener('click', () => {
    initCloseArea()
    closeMenu()
})

function initCloseArea() {
    document.onclick = (e) => {
        if (e.target.className === 'hamburger-menu') closeMenu()
    }
}

//Paginator
const friendsList = document.querySelector('.friends__list__content')

const src = '../../assets/json/pets.json'

getPets(src).then(data => {
    loadFriends(data)
})

function breakArray(array, size) {
    let arrays = []

    while (array.length > 0) {
        arrays.push(array.splice(0, size));
    }
    return arrays
}

function loadFriends(data) {

    let inputArray = breakArray(data, 8)
        setPets(inputArray[2], friendsList)
}




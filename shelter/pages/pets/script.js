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
const nextBtn = document.getElementById('next-page')
const prevBtn = document.getElementById('prev-page')
const toFirstPage = document.getElementById('to-first')
const toLastPage = document.getElementById('to-last')
const displayPage = document.getElementById('current-page')

function breakArray(array, size) {
    let input = array.slice()
    let arrays = []

    while (input.length > 0) {
        arrays.push(input.splice(0, size));
    }
    return arrays
}

function loadFriends(data) {
    let currentPage = 1

    const desktopArray = breakArray(data, 8)
    const tabletArray = breakArray(data, 6)
    const mobileArray = breakArray(data, 3)

    function initButtons(array) {
        if (currentPage === array.length) {
            nextBtn.setAttribute("disabled", "disabled")
            toLastPage.setAttribute("disabled", "disabled")
        } else {
            nextBtn.removeAttribute("disabled")
            toLastPage.removeAttribute("disabled")
        }

        if (currentPage === 1) {
            prevBtn.setAttribute("disabled", "disabled")
            toFirstPage.setAttribute("disabled", "disabled")
        } else {
            prevBtn.removeAttribute("disabled")
            toFirstPage.removeAttribute("disabled")
        }
    }

    function initWindowWidth() {
        if (window.innerWidth >= 1280) {
            setPets(desktopArray[currentPage - 1], friendsList)
            initButtons(desktopArray)
        } else if (window.innerWidth >= 768) {
            setPets(tabletArray[currentPage - 1], friendsList)
            initButtons(tabletArray)
        } else if (window.innerWidth >= 320) {
            setPets(mobileArray[currentPage - 1], friendsList)
            initButtons(mobileArray)
        }
        displayPage.innerText = currentPage
    }

    function toLast() {
        if (window.innerWidth >= 1280) {
            currentPage = desktopArray.length
        } else if (window.innerWidth >= 768) {
            currentPage = tabletArray.length
        } else if (window.innerWidth >= 320) {
            currentPage = mobileArray.length
        }
    }

    nextBtn.addEventListener('click', () => {
        currentPage++
        initWindowWidth()
    })

    prevBtn.addEventListener('click', () => {
        currentPage--
        initWindowWidth()
    })

    toLastPage.addEventListener('click', () => {
        toLast()
        initWindowWidth()
    })

    toFirstPage.addEventListener('click', () => {
        currentPage = 1
        initWindowWidth()
    })

    window.addEventListener('resize', () => {
        initWindowWidth()
    })

    initWindowWidth()
}

const src = '../../assets/json/pets.json'
getPets(src).then(data => loadFriends(data))

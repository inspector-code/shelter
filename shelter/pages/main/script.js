import {getPets} from '../../assets/js/getPets.js'
import {setPets} from '../../assets/js/setPets.js'

//HAMBURGER MENU
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
    initCloseArea()
    closeMenu()
})

function initCloseArea() {
    document.onclick = (e) => {
        if (e.target.className === 'hamburger-menu') closeMenu()
    }
}

//SLIDER
const sliderTrack = document.querySelector('.slider__track')

function initSlider(res) {
    const sliderContainer = document.querySelector('.our-friends__content__slider__container')
    const prevBtn = document.getElementById('slider-prev')
    const nextBtn = document.getElementById('slider-next')
    const sliderItem = document.querySelector('.our-friends__content__slider__container-item')
    const itemsArray = res

    let slideWidth = 0
    let slidesCount = 0
    let slideItemMargin = 0
    let slideNumber = 1
    let position = 0

    function initValues() {
        slideWidth = sliderContainer.clientWidth
        slidesCount = Math.ceil(itemsArray.length / Math.floor(sliderContainer.clientWidth / sliderItem.clientWidth))
        slideItemMargin = parseFloat(getComputedStyle(sliderTrack.children[1]).marginLeft)
    }

    function trackIt(number) {
        initValues()
        position = (number * (slideWidth + slideItemMargin)) - slideWidth - slideItemMargin
        sliderTrack.style.transform = `translateX(-${position}px)`
    }

    function trackDirection(direction) {
        switch (direction) {
            case 'prev':
                slideNumber === 1 ? slideNumber = slidesCount : --slideNumber
                trackIt(slideNumber)
                break
            case 'next':
                slideNumber === slidesCount ? slideNumber = 1 : ++slideNumber
                trackIt(slideNumber)
                break
            default:
                break
        }
    }

    nextBtn.addEventListener('click', () => {
        trackDirection('next')
    })

    prevBtn.addEventListener('click', () => {
        trackDirection('prev')
    })

    window.addEventListener('resize', () => {
        initValues()
        trackIt(slideNumber)
    })
}

const src = '../../assets/json/pets.json'

getPets(src).then(data => {
    setPets(data, sliderTrack)
    initSlider(data)
})

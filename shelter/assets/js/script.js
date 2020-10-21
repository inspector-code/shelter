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

//Slider
// const sliderContainer = document.querySelector('.slider-container')
// const sliderTrack = document.querySelector('.slider-track')
// const prevBtn = document.querySelector('.slider-button-prev')
// const nextBtn = document.querySelector('.slider-button-next')
// const sliderWrapper = document.querySelector('.slider-wrapper')
// const sliderFooter = document.querySelector('.slider-footer')
//
// const slidesCount = sliderTrack.children.length
// const slideWidth = sliderContainer.clientWidth
//
// let slideNumber = 1
// let position = 0
//
// function trackIt(number) {
//     position = number * slideWidth - slideWidth
//     slideNumber = number
//     sliderTrack.style.transform = `translateX(-${position}px)`
//     sliderFooter.children[slideNumber - 1].classList.add('active-point')
// }
//
// function trackDirection(direction) {
//     switch (direction) {
//         case 'prev':
//             slideNumber === 1 ? slideNumber = slidesCount : --slideNumber
//             trackIt(slideNumber)
//             break
//         case 'next':
//             slideNumber === slidesCount ? slideNumber = 1 : ++slideNumber
//             trackIt(slideNumber)
//             break
//         default:
//             break
//     }
// }
//
// nextBtn.addEventListener('click', () => {
//     trackDirection('next')
// })
//
// prevBtn.addEventListener('click', () => {
//     trackDirection('prev')
// })

//SLIDER
const sliderContainer = document.querySelector('.our-friends__content__slider__container')
const src = '../../assets/json/pets.json'

async function getPets() {
    const res = await fetch(src)
    const pets = await res.json()
    setPets(pets)
}

function setPets(data) {
    const fragment = document.createDocumentFragment()

    data.forEach(i => {
        const containerItem = document.createElement('div')
        containerItem.classList.add('our-friends__content__slider__container-item')
        const itemImageContainer = document.createElement('div')
        itemImageContainer.classList.add('our-friends__content__slider__container-item-image')
        const itemImage = document.createElement('img')
        itemImage.src = i.img
        itemImageContainer.append(itemImage)
        containerItem.append(itemImageContainer)
        const itemName = document.createElement('div')
        itemName.classList.add('our-friends__content__slider__container-item-title')
        itemName.innerText = i.name
        containerItem.append(itemName)
        const itemButton = document.createElement('div')
        itemButton.classList.add('our-friends__content__slider__container-item-button')
        itemButton.innerText = 'Learn more'
        containerItem.append(itemButton)

        fragment.append(containerItem)
    })
    sliderContainer.append(fragment)
}

getPets()
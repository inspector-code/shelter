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

//SLIDER
const sliderTrack = document.querySelector('.slider__track')
const src = '../../assets/json/pets.json'

async function getPets() {
    const res = await fetch(src)
    const pets = await res.json()
    let fullPetsList = []

    fullPetsList = (() => {
        let tempArr =[]

        for (let i = 0; i < 6; i++) {
            const newPets = pets

            for (let j = pets.length; j > 0; j--) {
                let randInd = Math.floor(Math.random() * j)
                const randElem = newPets.splice(randInd, 1)[0]
                newPets.push(randElem)
            }

            tempArr = [...tempArr, ...newPets]
        }
        return tempArr
    })()

    function sort863(list) {
        let unique8List = []
        let length = list.length
        for (let i = 0; i < length / 8; i++) {
            const uniqueStepList = []
            for (let j = 0; j < list.length; j++) {
                if (uniqueStepList.length >= 8) {
                    break
                }
                const isUnique = !uniqueStepList.some((item) => {
                    return item.name === list[j].name
                })
                if (isUnique) {
                    uniqueStepList.push(list[j])
                    list.splice(j, 1)
                    j--
                }
            }
            unique8List = [...unique8List, ...uniqueStepList]
        }
        list = unique8List
        list = sort6recursively(list)
        return list
    }

    function sort6recursively(list) {
        const length = list.length

        for (let i = 0; i < (length / 6); i++) {
            const stepList = fullPetsList.slice(i * 6, (i * 6) + 6)

            for (let j = 0; j < 6; j++) {
                const duplicatedItem = stepList.find((item, ind) => {
                    return item.name === stepList[j].name && (ind !== j)
                })

                if (duplicatedItem !== undefined) {
                    const ind =  (i * 6) + j
                    const which8OfList = Math.trunc(ind / 8)

                    list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0])

                    sort6recursively(list)
                }
            }
        }
        return list
    }

    const randomArr = sort863(fullPetsList)
    return randomArr
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
        itemImage.alt = i.name
        itemImageContainer.append(itemImage)
        containerItem.append(itemImageContainer)

        const itemName = document.createElement('div')
        itemName.classList.add('our-friends__content__slider__container-item-title')
        itemName.innerText = i.name
        containerItem.append(itemName)

        const itemButton = document.createElement('a')
        itemButton.classList.add('our-friends__content__slider__container-item-button')
        itemButton.innerText = 'Learn more'
        containerItem.append(itemButton)

        containerItem.addEventListener('click', () => {
            const popup = document.createElement('div')
            popup.classList.add('popup')
            popup.id = 'popup'
            popup.addEventListener('click', () => {
                popup.remove()
            })

            const popupContent = document.createElement('div')
            popupContent.classList.add('popup__content')
            popupContent.addEventListener('click', (e) => {
                e.stopPropagation()
            })
            popup.append(popupContent)

            const closeButton = document.createElement('button')
            closeButton.classList.add('popup__content__button')
            closeButton.id = 'popup__close__button'
            closeButton.addEventListener('click', () => {
                popup.remove()
            })
            popupContent.append(closeButton)

            const popupImg = document.createElement('div')
            popupImg.classList.add('popup__content__img')

            const popupImgPet = document.createElement('img')
            popupImgPet.src = i.img
            popupImgPet.alt = i.name
            popupImg.append(popupImgPet)
            popupContent.append(popupImg)

            const popupContentInfo = document.createElement('div')
            popupContentInfo.classList.add('popup__content__info')
            popupContent.append(popupContentInfo)

            const popupTitle = document.createElement('div')
            popupTitle.classList.add('popup__content__info-title')
            popupTitle.innerText = i.name
            popupContentInfo.append(popupTitle)

            const popupSubtitle = document.createElement('div')
            popupSubtitle.classList.add('popup__content__info-subtitle')
            popupSubtitle.innerHTML = `${i.type} - ${i.breed}`
            popupContentInfo.append(popupSubtitle)

            const popupText = document.createElement('div')
            popupText.classList.add('popup__content__info-text')
            popupText.innerText = i.description
            popupContentInfo.append(popupText)

            const popupAbout = document.createElement('div')
            popupAbout.classList.add('popup__content__info-about')
            popupContentInfo.append(popupAbout)

            const popupList = document.createElement('ul')
            popupList.classList.add('popup__content__info-about-list')

            const popupListAge = document.createElement('li')
            popupListAge.innerHTML = `<span><b>Age:</b> ${i.age}</span>`
            popupList.append(popupListAge)

            const popupInoc = document.createElement('li')
            popupInoc.innerHTML = `<span><b>Inoculations:</b> ${i.inoculations.join(', ')}</span>`
            popupList.append(popupInoc)

            const popupDis = document.createElement('li')
            popupDis.innerHTML = `<span><b>Diseases:</b> ${i.diseases.join(', ')}</span>`
            popupList.append(popupDis)

            const popupParasit = document.createElement('li')
            popupParasit.innerHTML = `<span><b>Parasites:</b> ${i.parasites.join(', ')}</span>`
            popupList.append(popupParasit)

            popupAbout.append(popupList)

            document.body.append(popup)
        })

        fragment.prepend(containerItem)
    })
    sliderTrack.append(fragment)
}

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

getPets().then(data => {
    setPets(data)
    initSlider(data)
})

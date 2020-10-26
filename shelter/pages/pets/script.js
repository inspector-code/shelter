import { getPets } from '../../assets/js/getPets.js'
import { setPets } from '../../assets/js/setPets.js'

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
            if (currentPage > desktopArray.length) currentPage = desktopArray.length
            setPets(desktopArray[currentPage - 1], friendsList)
            initButtons(desktopArray)
        } else if (window.innerWidth >= 768) {
            if (currentPage > tabletArray.length) currentPage = tabletArray.length
            setPets(tabletArray[currentPage - 1], friendsList)
            initButtons(tabletArray)
        } else if (window.innerWidth >= 320) {
            if (currentPage > mobileArray.length) currentPage = mobileArray.length
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

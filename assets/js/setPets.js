export function setPets(data, element) {
    const fragment = []

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
            document.body.classList.add('scroll-lock')

            const popup = document.createElement('div')
            popup.classList.add('popup')
            popup.id = 'popup'

            const popupContent = document.createElement('div')
            popupContent.classList.add('popup__content')
            popup.append(popupContent)

            const closeButton = document.createElement('button')
            closeButton.classList.add('popup__content__button')
            closeButton.id = 'popup__close__button'

            const closeButtonImg = document.createElement('img')
            closeButtonImg.src = '../../assets/icons/icon-close.svg'
            closeButton.alt = 'Close'
            closeButton.append(closeButtonImg)
            closeButton.onclick = () => {
                document.body.classList.remove('scroll-lock')
                popup.remove()
            }
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

            document.onclick = (e) => {
                if (e.target.className === 'popup') {
                    document.body.classList.remove('scroll-lock')
                    popup.remove()
                }
            }

            popup.onmouseover = (e) => {
                if (e.target.className === 'popup') {
                    closeButton.classList.add('popup__content__button-hover')
                } else {
                    closeButton.classList.remove('popup__content__button-hover')
                } 
            }

            popup.classList.add('popup__hidden')
            document.body.prepend(popup)
            setTimeout(() => {
                popup.classList.remove('popup__hidden')
            }, 60)
        })
        containerItem.classList.add('our-friends__content__slider__container-item-hidden')
        fragment.push(containerItem)
        setTimeout(() => {
            containerItem.classList.remove('our-friends__content__slider__container-item-hidden')
        }, 60)
    })
    element.innerHTML = ''
    element.append(...fragment)
}
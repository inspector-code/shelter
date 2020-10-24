export async function getPets(src) {
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
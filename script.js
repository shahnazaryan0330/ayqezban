const addBtn = document.querySelector('.addBtn')

let priceArray = getData()

function render(array) {
    array.forEach(item => {
        createCard(item)
    })

    calc(array)
}
render(priceArray)

addBtn.addEventListener('click', () => {
    const itemName = document.querySelector('.itemName')
    const itemPrice = document.querySelector('.itemPrice')
    const itemData = {
        name: itemName.value,
        price: itemPrice.value
    }

    createCard(itemData)

    calc(priceArray)

    setData(priceArray)

    itemName.value = ''
    itemPrice.value = ''
})

function idGen() {
    return Math.random().toString(16).slice(2)
}

function createCard({ name, price, id}) {

    const obj = {
        name,
        price,
        id: id || idGen()
    }
    priceArray.find(item => item.id === obj.id) ? null : priceArray.push(obj)

    const li = document.createElement('li')
    li.classList.add('item')

    const liName = document.createElement('div')
    liName.innerText = name
    li.append(liName)

    const div = document.createElement('div')
    div.classList.add('actions')

    const priceDiv = document.createElement('div')
    priceDiv.classList.add('price')
    priceDiv.innerText = price
    div.append(priceDiv)

    const array = ['V', 'E', 'X']

    array.forEach(item => {
        const button = document.createElement('button')
        button.innerText = item

        if (item === 'V') {
            button.classList.add('accept')

            button.addEventListener('click', () => {
                li.classList.toggle('disabled')
            })
        }

        if (item === 'E') {
            button.classList.add('edit')

            button.addEventListener('click', () => {
                const itemName = document.querySelector('.itemName')
                const itemPrice = document.querySelector('.itemPrice')

                itemName.value = name
                itemPrice.value = price

                const editAccess = document.querySelector('.editAccess')

                addBtn.disabled = true
                editAccess.disabled = false

                addBtn.classList.add('disabled')
                editAccess.classList.remove('disabled')

                // 
                editAccess.addEventListener('click', () => {
                    const itemName = document.querySelector('.itemName')
                    const itemPrice = document.querySelector('.itemPrice')

                    liName.innerText = itemName.value
                    priceDiv.innerText = itemPrice.value

                    addBtn.disabled = false
                    editAccess.disabled = true

                    addBtn.classList.remove('disabled')
                    editAccess.classList.add('disabled')

                    priceArray = priceArray.map(item => {
                        if (item.id === obj.id) {
                            item.name = itemName.value
                            item.price = itemPrice.value
                        }

                        return item
                    })

                    calc(priceArray)

                    itemName.value = ''
                    itemPrice.value = ''

                    setData(priceArray)
                })
                // 
            })
        }

        if (item === 'X') {
            button.classList.add('delete')

            button.addEventListener('click', () => {
                priceArray = priceArray.filter(item => {
                    return item.id !== obj.id
                })

                calc(priceArray)

                li.remove()

                setData(priceArray)
            })
        }

        div.append(button)
    })

    li.append(div)

    const list = document.querySelector('.list')
    list.append(li)
}

function calc(array) {
    let budget = 40000
    let title = document.querySelector('.title')

    if (array.length !== 0) {
        array.forEach(item => {
            let x = Number(item.price.replaceAll('.', ''))

            budget -= x
        })
    }

    title.innerText = budget
}

function getData() {
    const response = JSON.parse(localStorage.getItem('data'))
    return response === null ? [] : response
}

function setData(array) {
    localStorage.setItem('data', JSON.stringify(array))

    console.log(JSON.parse(localStorage.getItem('data')));
}
const getProductsFromCart = () => {

    const idCart = JSON.parse(localStorage.getItem('idCart'))
    fetch('http://localhost:8080/api/carts/' + idCart, {
        method: 'GET'
    })
    .then((res) => res.json())
    .then(data => getTotal(data.payload))
}

const back = () => {
    console.log('hola')
    window.location.href = '/products'
}

const getTotal = (products) => {
    const total = document.getElementById('total')
    total.innerHTML = ''
    const sum = products.reduce((acc, currentValue) => {return acc + currentValue.price}, 0)
    total.innerHTML = `Total: $${sum}`
}

const init = () => {
    getProductsFromCart()
}

init()
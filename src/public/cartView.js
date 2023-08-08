const getProductsFromCart = () => {

    const idCart = JSON.parse(localStorage.getItem(idCart))
    fetch('http://localhost:8080/api/carts/' + idCart, {
        method: 'GET'
    })
    .then((res) => res.json())
    .then(console.log(res))
}

const back = () => {
    console.log('hola')
    window.location.href = '/products'
}

getProductsFromCart()
const getProducts = () => {

    const idCart = JSON.parse(localStorage.getItem(idCart))
    fetch('http://localhost:8080/api/carts/' + idCart, {
        method: 'GET'
    })
        .then()
}
const API_URL = 'http://localhost:8080/api'

const getCurrentUser = () => {
    // console.log("Get current user...");
    fetch("http://localhost:8080/auth/current", {
        method: "GET",
    })
    .then((res) => res.json())
    .then((user) => {
        console.log("user", user);
        localStorage.setItem('idCart', JSON.stringify(user.cart))
        const userData = document.getElementById('userData')
        const template = `
            <p class="h4 p-0 m-0">Bienvenido</p>
            <p class="p-0 m-0">${user.firstname} ${user.lastname}</p>
            <p class="p-0 m-0">${user.email}</p>
        `
        cartLength(user.cart)
        userData.innerHTML = template
    })
    .catch((err) => console.log(err));
};

const cartView = () => {
    const idCart = JSON.parse(localStorage.getItem('idCart'))
    window.location.href = '/carts/' + idCart
}

const addToCart = (idProd) => {
    console.log('addToCart')
    const idCart = JSON.parse(localStorage.getItem('idCart'))
    fetch(`http://localhost:8080/api/carts/${idCart}/products/${idProd}`, {
        method: "POST",
    })

    window.location.reload()
}

const cartLength = (idCart) => {
    fetch(`http://localhost:8080/api/carts/${idCart}`, { method: 'GET' })
    .then(resp => resp.json())
    .then(data => renderCartIconLength(data.payload.length))
}

const renderCartIconLength = (quantity) => {
    const cartQuantity = document.getElementById('cartQuantity')
    cartQuantity.innerHTML = ''
    cartQuantity.innerHTML = quantity
}

const renderProducts = (products) => {

    const productsList = document.getElementById('productsList')
    productsList.innerHTML = ''
    products.map(prod => {
        productsList.innerHTML += `
            <div class="card bg-secondary text-white" style="width: 18rem;">
                <img src="${prod.thumbnail}" class="card-img-top" alt="...">
                <div class="card-body h-50">
                    <h5 class="card-title h3">${prod.title}</h5>
                    <p class="card-text">${prod.description}</p>
                    <p class="card-text h4">$${prod.price}</p>
                    <p class="card-text">${prod._id}</p>
                    <button class="btn btn-primary" onclick="addToCart('${prod._id}')">Agregar al carrito</button>
                </div>
            </div>
        `
    })
}

const getProducts = () => {

    fetch('http://localhost:8080/api/products', { method: 'GET' })
    .then(resp => resp.json())
    .then(data => {
        const prods = data.payload.payload
        renderProducts(prods)
    })

}

const init = () => {
    getCurrentUser()
    getProducts()
    // getAllProducts(5, 1, null, null);
};

init();
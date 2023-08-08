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
        const cartQuantity = document.getElementById('cartQuantity')
        const template = `
            <p class="h4 p-0 m-0">Bienvenido</p>
            <p class="p-0 m-0">${user.firstname} ${user.lastname}</p>
            <p class="p-0 m-0">${user.email}</p>
        `
        cartQuantity.innerHTML = user.cart
        userData.innerHTML = template
    })
    .catch((err) => console.log(err));
};

const cartView = () => {
    const idCart = JSON.parse(localStorage.getItem('idCart'))
    window.location.href = '/carts/' + idCart
}

const addToCart = (idPRod) => {

}

const init = () => {
    getCurrentUser();
    // getAllProducts(5, 1, null, null);
};

init();
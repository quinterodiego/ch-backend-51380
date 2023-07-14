const API_URL = 'http://localhost:8080/api'

const getCurrentUser = () => {
    // console.log("Get current user...");
    fetch("http://localhost:8080/auth/current", {
        method: "GET",
    })
    .then((res) => res.json())
    .then((user) => {
        console.log("user", user);
        const userData = document.getElementById('userData')
        const template = `
            <p class="h4 p-0 m-0">Bienvenido</p>
            <p class="p-0 m-0">${user.firstname} ${user.lastname}</p>
            <p class="p-0 m-0">${user.email}</p>
        `
        userData.innerHTML = template
    })
    .catch((err) => console.log(err));
};

const init = () => {
    getCurrentUser();
    getAllProducts(5, 1, null, null);
};

init();
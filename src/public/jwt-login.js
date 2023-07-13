const API_URL = 'http://localhost:8080/api'

function handleLogin() {
    fetch(API_URL + '/jwt-login', {
        method: 'POST',
        body: JSON.stringify({ email: 'd86webs@gmail.com', password: '123456'}),
        headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => res.json())
    .then((json) => {
        console.log('LOGUEADO')
        // localStorage.setItem('token', json.payload)
    })
    .catch((error) => {
        console.log(error)
    })
}

function handleFetchProfile() {
    fetch(API_URL + '/jwt-profile')
    .then((res) => res.json())
    .then((json) => {
        console.log(json)
    })
    .catch((error) => {
        console.log(error)
    })
}
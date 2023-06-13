const socket = io()

let email = ''

window.addEventListener('load', () => {
    formMessage.style.display = 'none'
    chat.style.display = 'none'
})

const renderMessages = (data) => {
    const html = data.map((message) => {
        return (`
        <figure>
            <blockquote class="blockquote">
                <p><strong>${message.user}</strong></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                ${message.message}
            </figcaption>
        </figure>
        `)
    }).join('');
    document.getElementById('chat').innerHTML = html;
}

const formMessage = document.getElementById('formMessage')
formMessage.onsubmit = e => {
    e.preventDefault()
    const message = {
        user: email,
        message: document.getElementById('message').value
    }

    socket.emit('newMessage', message)
    formMessage.reset()
}

socket.on('messages', (data) => {
    renderMessages(data)
})

const chat = document.getElementById('chat')

const formEmail = document.getElementById('email')
formEmail.onsubmit = e => {
    e.preventDefault()
    email = document.getElementById('user').value
    formMessage.style.display = 'block'
    chat.style.display = 'block'
    formEmail.style.display = 'none'
}
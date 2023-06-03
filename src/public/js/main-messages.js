const socket = io()

const renderMessages = (data) => {
    const html = data.map((message) => {
        return (`
        <p>${message.user}</p>
        `)
    }).join('');
    document.getElementById('chat').innerHTML = html;
}

const formMessage = document.getElementById('formMessage')
formMessage.onsubmit = e => {
    e.preventDefault()
    const message = {
        user: document.getElementById('user').value,
        message: document.getElementById('message').value
    }

    socket.emit('newMessage', message)
    formMessage.reset()
}

socket.on('messages', (data) => {

    renderMessages(data)
})
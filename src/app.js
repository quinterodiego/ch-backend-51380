import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from "socket.io"
import __dirname from './utils.js'
import productsRouter from './routers/products.js'
import cartsRouter from './routers/carts.js'
import messagesRouter from './routers/messages.js'
import connectMongoDB from './db/mongoDB/config.js'
import { MessageModel } from './dao/models/mongoDB/messages.js'

const app = express()
const PORT = 8080

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set("views", __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/chat', messagesRouter)

app.get('/home', async (req, res) => {
    const data = await fetch('http://localhost:8080/api/products')
    const { payload } = await data.json()
    res.render('home', { payload })
})

app.get('/realTimeProducts', async (req, res) => {
    res.render('realTimeProducts', {})
})

app.get('/chat', async (req, res) => {
    res.render('chat', {})
})

connectMongoDB()

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

// SOCKET
const io = new Server(server)

io.on('connection', async (socket) => {
    console.log(`Nueva conexion Sockket: ${socket.id}`)

    const products = await fetch('http://localhost:8080/api/products')

    //socket.emit('products', products)

    socket.on('newProduct', async data => {
        // await productsManager.addProduct(data)
        const products = await fetch('http://localhost:8080/api/products')
        io.sockets.emit('products', products)
    })

    socket.on('delete', (id) => {
        productsManager.deleteProduct(id)
        io.sockets.emit('products', products)
    })

    const messages = await MessageModel.find()
    console.log(messages)
    socket.emit('messages', messages)

    socket.on('newMessage', async data => {
        await fetch('http://localhost:8080/api/messages', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
    })
})
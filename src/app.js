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

app.get('/chat', async (req, res) => {
    res.render('chat', {})
})

connectMongoDB()

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const io = new Server(server)

io.on('connection', async (socket) => {
    console.log(`Nueva conexion ${socket.id}`)

    const messages = await MessageModel.find()

    socket.emit('messages', messages)

    socket.on('newMessage', async data => {
        await MessageModel.create(data)
        const messages = await MessageModel.find()
        io.sockets.emit('messages', messages)
    })

})
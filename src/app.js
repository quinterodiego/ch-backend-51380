import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from "socket.io"
import __dirname from './utils.js'
import productsRouter from './routers/products.js'
import cartsRouter from './routers/carts.js'
import ProductsManager from './ProductManager.js'

const app = express()
const PORT = 8080
const productsManager = new ProductsManager('./src/db/products.json')

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

//ROUTES
app.get('/', async (req, res) => {
    const resp = await productsManager.getProducts()
    res.render('home', {resp})
})

app.get('/realTimeProducts', async (req, res) => {
    const resp = await productsManager.getProducts()
    res.render('realTimeProducts', {resp})
})

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

// SOCKET
const io = new Server(server)

io.on('connection', async (socket) => {
    console.log(`Nueva conexion ${socket.id}`)
    const products = await productsManager.getProducts()

    socket.emit('products', products)

    socket.on('newProduct', async data => {
        await productsManager.addProduct(data)
        const products = await productsManager.getProducts()
        io.sockets.emit('products', products)
    })

    socket.on('delete', (id) => {
        productsManager.deleteProduct(id)
        io.sockets.emit('products', products)
    })
})
import express from 'express'
import productsRouter from './routers/products.js'
import cartsRouter from './routers/carts.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
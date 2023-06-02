import fs from 'fs'

class CartsManager {
    constructor (path) {
        this.path = path
    }

    async nextID() {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const carts = await JSON.parse(data)
        const lastObject = carts[carts.length-1]
        const id = lastObject.id + 1
        return id
    }

    async createCart() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = await JSON.parse(data)
            if(carts.length > 0){
                const id = await this.nextID()
                const cart = {
                    "id": id,
                    "products": []
                }
                carts.push(cart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
            } else {
                const cart = {
                    "id": 1,
                    "products": []
                }
                carts.push(cart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
            }
            return 'Carrito creado'
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsById(id) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = await JSON.parse(data)
            const cartFinded = carts.find(cart =>  cart.id == id)
            if (cartFinded) {
                return cartFinded.products
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(idCart, idProduct) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = await JSON.parse(data)
            const oldCart = carts.filter(c => c.id == idCart)
            const productExist = oldCart[0].products.find(product =>  product.id == idProduct)
            if(productExist) {
                const index = oldCart[0].products.findIndex(product =>  product.id == idProduct)
                oldCart[0].products[index].quantity++
            } else {
                oldCart[0].products.push({
                    id: idProduct,
                    quantity: 1
                })
            }
            carts[idCart - 1] = oldCart[0]
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return 'Producto agregado'
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartsManager
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
}

export default CartsManager
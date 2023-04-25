const fs = require('fs')
const { json } = require('stream/consumers')

class ProductManager {
    constructor (path) {
        this.path = path
    }

    async nextID() {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        if(products.length > 0){
            const lastObject = products[products.length-1]
            const id = lastObject.id + 1
            return id
        }else{
            const id = 1
            return id
        }
    }

    async addProduct(product) {
        if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = await JSON.parse(data);
            if(products.length > 0){
                const code = products.find(p => p.code === product.code)
                if(code) {
                    console.log('Ya existe el codigo de producto')
                    return 'Ya existe el codigo de producto'
                }
                
                product.id = await this.nextID()
                products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
            } else {
                product.id = 1
                products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                console.log('Producto agregado satisfactoriamente')
            }
        } else {
            return 'Debe completar todos los campos'
        }
    }

    async getProducts() {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        console.log(products)
    }

    async getProductById(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        const product = products.find(p => p.id === id)
        if(product){
            console.log(product)
        } else {
            console.log('Not found')
        }
    }

    async updateProduct(id, product) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        const productsToUpdate = products.filter(p => p.id !== id)
        const productUpdate = {...product, id}
        const newProducts = [...productsToUpdate, productUpdate]
        newProducts.sort((a, b) => {
            return a.id - b.id;
        });
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
        console.log('Producto actualizado')
    }

    async deleteProduct(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        const newProducts = products.filter(p => p.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
        console.log('Producto eliminado')
    }
}

const productManager = new ProductManager('./products.txt')

// productManager.getProducts()

// productManager.addProduct({
//     "title": 'producto prueba',
//     "description": 'Este es un producto prueba',
//     "price": 200,
//     "thumbnail": 'Sin imagen',
//     "code": 'abc123',
//     "stock":25
// })

// productManager.getProducts()

// productManager.getProductById(1)

// productManager.updateProduct(1, {
//     "title": 'producto prueba',
//     "description": 'Este es un producto prueba',
//     "price": 10000,
//     "thumbnail": 'Sin imagen',
//     "code": 'abc123',
//     "stock":25
// })

// productManager.getProducts()

// productManager.deleteProduct(1)

// productManager.getProducts()
const fs = require('fs')

class ProductManager {
    constructor (path) {
        this.path = path
    }

    async nextID() {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data)
        const lastObject = products[products.length-1]
        const id = lastObject.id + 1
        return id
    }

    async addProduct(product) {
        try {
            if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const products = await JSON.parse(data);
    
                if(products.length > 0){
                    const code = products.find(p => p.code === product.code)
                    if(code) {
                        return 'Ya existe el codigo de producto'
                    }
    
                    product.id = await this.nextID()
                    products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(products))
                } else {
                    product.id = 1
                    products.push(product)
                }
            } else {
                return 'Debe completar todos los campos'
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = await JSON.parse(data)
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = await JSON.parse(data)
            const product = products.find(p => p.id === id)
            if(product){
                return product
            } else {
                return 'Not found'
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, updates) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')     // Leo el archivo
            const products = await JSON.parse(data)                         // Parso la data
            const oldProduct = products.filter(prod => prod.id === id)      // Busco el producto a eliminar
            const productsFilter = products.filter(prod => prod.id !== id)  // Elimino el producto del array
            const newProduct = { ...oldProduct, updates }                   // Actualizo las propiedades del producto
            const newProducts = [ ...productsFilter, newProduct]            // Agrego el producto actualizado nuevamente al array
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
            return 'Productos actualizado'
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {
        try {            
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = await JSON.parse(data)
            const newProducts = products.filter(p => p.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
            return 'Producto eliminado'
        } catch (error) {
            console.log(error)
        }
    }
}

const productManager = new ProductManager('./products.txt')

// productManager.getProducts()

const product1 = {
    title: 'producto1',
    description: 'xxxxxxxxxxxx',
    price: 1200,
    thumbnail: 'htpp://xxxxxxxxxxxxx',
    code: 'asfk2223kkk',
    stock: 100
}

const product2 = {
    title: 'producto2',
    description: 'yyyyyyyyyyyyyy',
    price: 5000,
    thumbnail: 'htpp://yyyyyyyyyyyyy',
    code: 'sdfskjdhf11111',
    stock: 80
}

const product3 = {
    title: 'producto3',
    description: 'zzzzzzzzzzzzzzz',
    price: 300,
    thumbnail: 'htpp://zzzzzzzzzzzzzzzzzzzz',
    code: 'sdkjhdgkjhs223r555',
    stock: 50
}

// productManager.addProduct(product1)
// productManager.addProduct(product2)
// productManager.addProduct(product3)

// productManager.getProducts()

const product4 = {
    title: 'producto4',
    description: 'zzzzzzzzzzzzzzz',
    price: 300,
    thumbnail: 'htpp://zzzzzzzzzzzzzzzzzzzz',
    code: 'sdkjhdgkjhs223r555',
    stock: 50
}

// productManager.addProduct(product4)

// productManager.getProductById(2)

const productToUpdate = {
    title: 'producto2 actualizado',
    description: 'ththththththth',
    price: 5000,
    thumbnail: 'htpp://yyyyyyyyyyyyy',
    code: 'sdfskjdhf11111',
    stock: 80,
    id: 2
}

// productManager.updateProduct(productToUpdate)

// productManager.getProducts()

// productManager.deleteProduct(2)

// productManager.getProducts()
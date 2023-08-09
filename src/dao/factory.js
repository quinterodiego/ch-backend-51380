import config from './../config/config.js'
import mongoose from 'mongoose'

export let Product
export let Cart
export let User

switch (config.persistence) {
    case 'MONGODB':
        console.log('Persistence connected to MongoDB')
        mongoose.connect(config.mongoUrl)
        const { default: ProductMongoDB } = await import('./mongodb/product.mongodb.js')
        Product = ProductMongoDB
        const { default: CartMongoDB } = await import('./mongodb/cart.mongodb.js')
        Cart = CartMongoDB
        const { default: UserMongoDB } = await import('./mongodb/user.mongodb.js')
        User = UserMongoDB
        const { default: TicketMongoDB } = await import('./mongodb/ticket.mongodb.js')
        Ticket = TicketMongoDB
        break;

    case 'MEMORY':
        console.log('Persistence with Memory');
        const { default: productMemory } = await import('./memory/product.memory.js')
        Product = productMemory
        const { default: userMemory } = await import('./memory/user.memory.js')
        User = userMemory
        break;

    case 'FILE':
        console.log('Persistence with Memory');
        const { default: productFile } = await import('./file/product.file.js')
        Product = productFile
        const { default: userFile } = await import('./file/user.file.js')
        User = userFile
        break;

    default:
        break;
}
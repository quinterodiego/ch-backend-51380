import config from './../config/config'
import mongoose from 'mongoose'

export let products

switch (config.persistence) {
    case 'MONGODB':
        console.log('Persistence connected to MongoDB')
        mongoose.connect(config.mongoUrl)

        const { default: productsMongoDB } = await import('./database/models/product')
        products = productsMongoDB
        break;

    default:
        break;
}
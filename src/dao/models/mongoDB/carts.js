import { Schema, model } from 'mongoose'

const schema = new Schema({
    products: { type: [Object] }
})

export const CartModel = model('carts', schema)
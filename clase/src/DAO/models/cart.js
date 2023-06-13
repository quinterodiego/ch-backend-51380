import { Schema, model } from 'mongoose'

const schema = new Schema({
    products: { 
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                index: true
            },
            quantity: {
                type: Schema.Types.Number
            }
        }],
        default: []
    }
})

export const CartModel = model('carts', schema)
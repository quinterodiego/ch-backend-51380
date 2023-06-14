import { Schema, model } from 'mongoose'

const schema = new Schema({
    products: { 
        type: [{
            idProd: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                index: true
            },
            quantity: {
                type: Number
            }
        }],
        default: []
    }
})

export const CartModel = model('carts', schema)
import { Schema, model } from 'mongoose'

const schema = new Schema({
    products: { 
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 0
            }
        }]
    }
})

schema.virtual('id').get(function () {
    return this._id.toHexString()
})

schema.set('toJSON', {
    virtuals: true
})

export const CartModel = model('carts', schema)
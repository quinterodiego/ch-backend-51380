import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, default: 1 }
}, { _id: false })

const schema = new Schema({
    products: [productSchema]
}, { versionKey: false })

schema.virtual('id').get(function () {
    return this._id.toHexString()
})

schema.set('toJSON', {
    virtuals: true
})

export const CartModel = model('carts', schema)
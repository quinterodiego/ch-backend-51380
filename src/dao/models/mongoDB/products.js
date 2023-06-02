import { Schema, model } from 'mongoose'

const schema = new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    thumbnail: { type: [String], required: false },
    price: { type: Number, required: true },
    code: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    status: { type: Boolean, required: true, },
})

export const ProductModel = model('products', schema)
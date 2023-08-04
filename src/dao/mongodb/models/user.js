import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'carts' }
}, { _id: false })

const schema = new Schema({
    firstname: { type: String, required: true, max: 100 },
    lastname: { type: String, required: true, max: 100 },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true, max: 100 },
    cart: [cartSchema],
    role: {
        type: String,
        default: "user",
    }
});

export const UserModel = model('users', schema);
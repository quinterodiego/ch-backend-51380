import { Schema, model } from 'mongoose';

const schema = new Schema({
    code: { type: String, required: true, max: 100, unique: true },
    purchase_datetime: { type: Date, default: Date.now(), required: true },
    amount: { type: Number, required: true},
    purchaser: { type: String, required: true, max: 100 }
});

export const TicketModel = model('tickets', schema);
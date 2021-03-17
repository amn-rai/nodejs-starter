import { Schema, model } from 'mongoose';

let book = new Schema(
    {
        name: String,
        price: Number,
        stock: Number,
        writer: String,
        cover: String //cover image
    }, 
    { timestamps: true }
);

export default model('book', book);

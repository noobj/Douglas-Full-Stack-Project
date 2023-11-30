import mongoose from 'mongoose';

//1. defining the schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please check the entry, no title is specified."]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    author: String,
    numberInStock: Number,
    like: Boolean
})
//2. compiling the schema into model
export const Book = mongoose.model("Book", bookSchema);
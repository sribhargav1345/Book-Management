const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
    bookId:{
        type: Number,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model("Books", BookSchema);
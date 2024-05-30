const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
    Book_Id:{
        type: String,
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
});

module.exports = mongoose.model("Books", BookSchema);
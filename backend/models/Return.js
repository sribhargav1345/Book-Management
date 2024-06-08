const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReturnSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    bookId:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: () => {
            const utcDate = new Date();
            const offsetInMinutes = 330;

            return new Date(utcDate.getTime() + offsetInMinutes * 60000);
        }
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: '30d' 
    }
});

module.exports = mongoose.model("Return", ReturnSchema);

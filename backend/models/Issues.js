const mongoose = require("mongoose");
const { Schema } = mongoose;

const IssueSchema = new Schema({
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
    }
});

module.exports = mongoose.model("Issue", IssueSchema);

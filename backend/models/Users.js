const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    googleId:{
        type: String
    },
    issues:{
        type: Array
    }
});

module.exports = mongoose.model("Users", UserSchema);
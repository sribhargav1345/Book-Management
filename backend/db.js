const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoDB = async() => {

    const USERNAME = process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD;

    const mongoURL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.xpwbtle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log("Problem connecting Database");
    }
}

export default mongoDB;
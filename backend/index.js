const express = require("express");
const cors = require("cors");
const app = express();

const mongoDB = require("./db");

const port = 7000;

app.use(express.json());
app.use(cors());
mongoDB();

app.use('/api',require("./controllers/books"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})
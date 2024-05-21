const express = require("express");
const cors = require("cors");
const app = express();

const mongoDB = require("./db");

const port = 7000;

app.use(cors());
mongoDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})
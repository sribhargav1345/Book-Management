const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const mongoDB = require("./db");

const app = express();
const port = 7000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
mongoDB();

app.use('/api', require("./controllers/books"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

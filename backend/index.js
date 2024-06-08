const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const mongoDB = require("./db");

const app = express();
const port = 7000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoDB();

app.use('/api', require("./controllers/books"));
app.use('/api', require("./controllers/auth"));
app.use('/api', require("./controllers/IssueReturn"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

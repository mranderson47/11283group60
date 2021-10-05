const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen("4000", (req, res) => {
    console.log("backend running");
})
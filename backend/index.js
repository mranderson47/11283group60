const express = require("express");
const request = require('request');
const app = express();
//const cors = require("cors");
const router = express.Router();

//app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.get("/test", (req, res) => {
    res.send('hello world');
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    console.log("listening on ${PORT}"));

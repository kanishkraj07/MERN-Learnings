const express = require("express");
const zod = require("zod");
const app = express();


app.use(express.json());

let count = 0;

function countMiddleware(req, res, next) {
    count++;
    next();
}

app.get("/count", countMiddleware, (req, res) => {
    res.send(`current requests count is ${count}`);
 });


app.listen(5000);
const express = require("express");
const app = express();

let startTime;
let endTime;

function startTimeMiddleware(req, res, next) {
    startTime = new Date().getTime();
    next();
}

function endTimeMiddleware(req, res, next) {
    endTime = new Date().getTime();
    res.send(`Time took by request to complete: ${(endTime - startTime)/1000} sec`);
}

app.get('/time', startTimeMiddleware, (req, res, next) => {
    setTimeout(next,2000);
}, endTimeMiddleware);


app.listen(3000);
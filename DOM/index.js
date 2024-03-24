const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.send((a+b).toString());
});

app.get('/simpleinterest', (req, res) => {
    const principle = parseInt(req.query.principle);
    const rate = parseInt(req.query.rate);
    const time = parseInt(req.query.time);

    const si = (principle * rate * time) /100;
    res.json({
        "interest": si,
        "totalAmount": si + principle
    });
});


app.listen(3000);
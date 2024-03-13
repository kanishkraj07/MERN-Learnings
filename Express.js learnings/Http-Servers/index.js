const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const parser = require("body-parser");

app.use(parser.json());



app.get('/', (req, res) => {
    res.send("<p>Welcome to ChatGPT</p><p>How may i help you?</p>");
});

app.get('/profile', function(req, res) {
    res.json({
        "Name": req.query.username,
        "Age": 23,
        "DOB": "10/05/2000"
    });
});

app.get('/home', (req, res) => {
    res.send("Home Page");
});

app.post('/googlesearch', (req, res) => {
    res.send(req.body);
})

app.listen(port);
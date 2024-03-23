const express = require("express");
const jwt = require("jsonwebtoken");
const app =  express();

const users = [
    {
        email: "john@gmail.com",
        password: "1234"
    }, 

    {
        email: "mike@gmail.com",
        password: "2312"
    }, 

    {
        email: "david@gmail.com",
        password: "76685"
    }, 

    {
        email: "jackson@gmail.com",
        password: "112988"
    }, 
];

function isUserPresent(email, password) {
   return users.findIndex(user => user.email === email && user.password === password) !== -1;
}

app.use(express.json());

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(isUserPresent(email, password)) {
      const token = jwt.sign({
            email
        }, 'PBKDF2WithHmacSHA256');

        res.status(200).json({
            token
        });
    } else {
        res.status(403).json({
            msg: "User not found"
        });
    }
});

app.get('/products', (req, res) => {
   const token = req.headers.authorization;
   try {
    const decodeData = jwt.verify(token, 'PBKDF2WithHmacSHA256');

     res.status(200).json({
        products: [{
            name: "Google pixel",
            cost: 20000
        }, {
            name: "Samsung galaxy",
            cost: 30000
        },{
            name: "Iphone 13",
            cost: 100000
        }]
    });

} catch(e) {
        res.status(403).json({
            msg: "Unauthorized user"
        });
   }
});

app.listen(3000);
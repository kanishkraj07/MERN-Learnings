const express = require("express");
const mongoose = require("mongoose");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const secretKey = "123456";

const app = express();
mongoose.connect("mongodb+srv://kanishkdath:Nz7HvGTLArMEpM2O@users.rhrnkz1.mongodb.net/usersdb");

const userModel = mongoose.model('users', {userName: String, password: String});

app.use(express.json());

function validatePassword(req, res, next) {
    const password = req.body.password;

    const passwordSchema = zod.string().min(5).max(15);
    if(passwordSchema.safeParse(password).success) {
        next();
    } else {
        res.status(411).json({
            msg: "invalid password"
        })
    }
}

async function validateUser(req, res, next) {
    const userName = req.body.username;
    const password = req.body.password;

  const isValidUser = await userModel.findOne({userName, password});
  if(isValidUser) {
    next();
  } else {
    res.status(411).json({
        msg: "incorrect username or password"
    });
  }
}

function validateToken(req, res, next) {
    const token = req.headers.authorization;
    try {
        jwt.verify(token, secretKey);
        next();
    } catch(e) {
        res.status(411).json({
            msg: "unauthorized user"
        });
    }
}

app.post('/signup', validatePassword, async(req, res) => {
    const userName = req.body.username;
    const password = req.body.password;

    const isUserExist = await userModel.findOne({userName, password});
    
    if(!isUserExist) {
        const user = new userModel({userName, password});
        user.save().then(() => {
            res.status(200).json({
                msg: "user created successfully"
            });
        });
    } else {
        res.status(411).json({
            msg: "User already exist"
        });
    }
});

app.post('/signin', validateUser, (req, res) => {
    const userName = req.body.username;

    const token = jwt.sign({userName}, secretKey);
    res.status(200).json({
        token
    });
});

app.get("/products", validateToken, (req, res) => {
});

app.listen(3000);

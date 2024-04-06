const express = require("express");
const {users, courses} = require("../db/coursedb");
const USER_MIDDLEWARE = require("../middlewares/user-middleware")
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../config");
const app = express();

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

   const isUserFound = await users.findOne({username, password});
   if(!isUserFound) {
    await users.create({username, password});
   const token = jwt.sign({username}, JWT_SECRET_KEY);
    res.status(200).json({
        message: "User created successfully",
        token
    });
   } else {
    res.status(411).json({
        msg: "User already exisits"
    });
   }
});

app.post("/login", async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

   const isUserPresent = await users.findOne({username, password});
   if(isUserPresent) {
   const token = jwt.sign({username}, JWT_SECRET_KEY);
    res.status(200).json({
        message: "User logged in succesfully",
        token
    });
   } else {
    res.status(411).json({
        msg: "incorrect username or password"
    });
   }
});

app.get("/courses", USER_MIDDLEWARE, async(req, res) => {
  const allCourses = await courses.find({published: true});
  res.status(200).json({
    courses: allCourses 
  }); 
});

app.post("/courses/:courseId", USER_MIDDLEWARE, async(req, res) => {
    const course = await courses.findOne({courseId: req.params.courseId});
    await users.updateOne({username: req.headers.username, password: req.headers.password}, {$push: {purchasedCourses: course}} );
    res.status(200).json({
        msg: "User purchased course successfully"
    });
});

app.get("/purchasedCourses", USER_MIDDLEWARE, async (req, res) => {
    const user = await users.findOne({username: req.headers.username, password: req.headers.password});   
    const purchasedCourses = await courses.find({_id: {$in: user.purchasedCourses}});
    res.status(200).json({
        purchasedCourses
    })
});

module.exports = app;
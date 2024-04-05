const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const SECRET_KEY = 'V9BmsENzLL/Js+Lf9ygRhXDOO6KIPNpZ38p2WS26ynG8SXtBr+Ajci+COTV3JT4Y';

const app = express();

mongoose.connect('mongodb+srv://kanishkdath:Nz7HvGTLArMEpM2O@users.rhrnkz1.mongodb.net/course-selling-db');

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const courseSchema = new mongoose.Schema({
    courseId: Number,
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

const admin = mongoose.model('admins', adminSchema);
const courses = mongoose.model('courses', courseSchema);

let courseCount = 0;

app.use(express.json());

app.post('/admin/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const isAdminFound = await admin.findOne({username});
    if(!isAdminFound ) {
       await admin.create({username, password});
       const token = jwt.sign({username}, SECRET_KEY, {expiresIn: "1h"});
        res.status(200).json({
            message: "Admin Created sucessfully",
            token
        });
    } else {
        res.status(411).json({
            message: "Admin is already registered"
        })
    }
});

app.post('/admin/login', async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const isAdminFound = await admin.findOne({username, password});
    if(isAdminFound) {
       const token = jwt.sign({username}, SECRET_KEY, {expiresIn: "1h"});
        res.status(200).json({
            message: "Admin logged in sucessfully",
            token
        });
    } else {
        res.status(411).json({
            msg: "login details incorrect"
        });
    }
});

app.post('/admin/courses', async (req, res) => {
    const bearerToken = req.headers.authorization;

    const token = bearerToken.slice(7);

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;


    try {
        jwt.verify(token, SECRET_KEY);
        const noOfCourses = await courses.countDocuments({});
        const newCourseId = noOfCourses + 1;
        courses.create({courseId: noOfCourses + 1, title, description, price, imageLink, published});
        res.status(200).json({
            msg: "Course created successfully",
            courseId: newCourseId
        });
    } catch(e) {
        res.status(403).json({
            msg: "Unauthorized admin"
        });
    }
});

app.put('/admin/courses/:courseId', async(req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.slice(7);
    const courseId = req.params.courseId;

   try {
    jwt.verify(token, SECRET_KEY);
    const existingCourse =  await courses.findOne({courseId});

    if(existingCourse) {
        existingCourse.title = req.body.title;
        existingCourse.description = req.body.description;
        existingCourse.price = req.body.price;
        existingCourse.imageLink = req.body.imageLink;
        existingCourse.published = req.body.published;

        await courses.updateOne({courseId: courseId}, {$set: {title: existingCourse.title, description: existingCourse.description, price: existingCourse.price, imageLink: existingCourse.imageLink, published: existingCourse.published }});
        res.status(200).json({
            msg: "Course updated succesfully"});
} else {
        res.status(411).json({
            msg: "Course not found"
        });
    }
} catch(e) {
    res.status(403).json({
        msg: "Unauthorized admin"
    })
}
});

app.get("/admin/courses", async(req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.slice(7);

    try {
        jwt.verify(token, SECRET_KEY);
        res.status(200).json({
        courses: await courses.find()});
   } catch(e) {
    res.status(403).json({
        msg: "Unauthorized admin"
    })
   }
});


let users = mongoose.model('users', {username: String, password: String, purchasedCourses: [{
    courseId: Number,
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
}]});

app.post('/users/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

   const isUserFound = await users.findOne({username, password});
   if(!isUserFound) {
    await users.create({username, password});
   const token = jwt.sign({username}, SECRET_KEY);
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

app.post("/users/login", async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

   const isUserPresent = await users.findOne({username, password});
   if(isUserPresent) {
   const token = jwt.sign({username}, SECRET_KEY);
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

async function isUserAuthenticated(req, res, next) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.slice(7);
    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch(e) {
    res.status(403).json({
        msg: "Unauthorized user"
    });
  }
 }

app.get("/users/courses", isUserAuthenticated, async(req, res) => {
  const allCourses = await courses.find({published: true});
  res.status(200).json({
    courses: allCourses 
  }); 
});

app.post("/users/courses/:courseId", isUserAuthenticated, async(req, res) => {
    const user = await users.findOne({username: req.headers.username, password: req.headers.password});
    console.log(user);
    const userPurchasedCoursesList = user.purchasedCourses;
    const course = await courses.findOne({courseId: req.params.courseId});
    if(!userPurchasedCoursesList) {
        userPurchasedCoursesList = [];
    }
    userPurchasedCoursesList.push(course);
    await users.updateOne({username: req.headers.username, password: req.headers.password}, {$set: {purchasedCourses: userPurchasedCoursesList}} );
    res.status(200).json({
        msg: "User purchased course successfully"
    });
});

app.get("/users/purchasedCourses", isUserAuthenticated, async (req, res) => {
    const user = await users.findOne({username: req.headers.username, password: req.headers.password});
    res.status(200).json({
        purchasedCourses: user.purchasedCourses
    })
});

app.listen(3000);
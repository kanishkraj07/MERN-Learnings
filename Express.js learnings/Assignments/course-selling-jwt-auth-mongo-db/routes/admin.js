const express = require("express");
const {admin, courses} = require("../db/coursedb");
const ADMIN_MIDDLEWARE = require("../middlewares/admin-middleware");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'V9BmsENzLL/Js+Lf9ygRhXDOO6KIPNpZ38p2WS26ynG8SXtBr+Ajci+COTV3JT4Y';

const app = express();


app.post('/signup', async (req, res) => {
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

app.post('/login', async (req, res) => {
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

app.post('/courses', ADMIN_MIDDLEWARE, async (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;
    
    const noOfCourses = await courses.countDocuments({});
    const newCourseId = noOfCourses + 1;
    courses.create({courseId: noOfCourses + 1, title, description, price, imageLink, published});
    res.status(200).json({
        msg: "Course created successfully",
        courseId: newCourseId
    });
});

app.put('/courses/:courseId', ADMIN_MIDDLEWARE, async(req, res) => {
    const courseId = req.params.courseId;

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
});

app.get("/courses", ADMIN_MIDDLEWARE, async(req, res) => {
    res.status(200).json({
    courses: await courses.find()});
});

module.exports = app;
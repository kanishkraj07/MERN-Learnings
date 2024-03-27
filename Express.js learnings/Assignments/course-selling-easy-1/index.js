const exp = require("constants");
const express = require("express");
const mongoose = require("mongoose");

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
})

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
        res.status(200).json({
            msg: "Admin Created sucessfully"
        })
    } else {
        res.status(411).json({
            msg: "Admin is already registered"
        })
    }
});

app.post('/admin/login', async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const isAdminFound = await admin.findOne({username, password});
    if(isAdminFound) {
        res.status(200).json({
            msg: "Admin logged in sucessfully"
        });
    } else {
        res.status(411).json({
            msg: "login details incorrect"
        });
    }
});

app.post('/admin/courses', async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;

    const isAdminFound = await admin.findOne({username, password});

    if(isAdminFound) {
        courseCount++;
        courses.create({courseId: courseCount, title, description, price, imageLink, published});
        res.status(200).json({
            msg: "Course created successfully",
            courseId: courseCount
        });
    } else {
        res.status(403).json({
            msg: "Unauthorized admin"
        });
    }
});

app.put('/admin/courses/:courseId', async(req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    const courseId = req.params.courseId;

   const isAdminFound = await admin.findOne({username, password});

   if(isAdminFound) {
    const existingCourse =  await courses.findOne({courseId});

    if(existingCourse) {
        existingCourse.title = req.body.title;
        existingCourse.description = req.body.description;
        existingCourse.price = req.body.price;
        existingCourse.imageLink = req.body.imageLink;
        existingCourse.published = req.body.published;

        await courses.updateOne({courseId: courseId}, {$set: {title: existingCourse.title, description: existingCourse.description, price: existingCourse.price, imageLink: existingCourse.imageLink, published: existingCourse.published }});
        res.status(200).json({
            msg: "Course updated succesfully"
    });
    } else {
        res.status(411).json({
            msg: "Course not found"
        });
    }
} else {
    res.status(403).json({
        msg: "Unauthorized admin"
    })
}
});

app.get("/admin/courses", async(req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

   const isAdminFound = await admin.findOne({username, password});

   if(isAdminFound) {
    res.status(200).json({
        courses: await courses.find()
    })
   } else {
    res.status(403).json({
        msg: "Unauthorized admin"
    })
   }
});

app.listen(3000);
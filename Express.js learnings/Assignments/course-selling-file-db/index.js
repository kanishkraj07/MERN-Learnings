const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = 'V9BmsENzLL/Js+Lf9ygRhXDOO6KIPNpZ38p2WS26ynG8SXtBr+Ajci+COTV3JT4Y';

const app = express();

let users = [];
let admins = [];
let courses = [];

let courseCount = 0;

const usersData = fs.readFileSync("users.json", "utf-8");
const adminsData = fs.readFileSync("admins.json", "utf-8");
const coursesData = fs.readFileSync("courses.json", "utf-8");

users = usersData ? JSON.parse(usersData) : [];
admins = adminsData ? JSON.parse(adminsData) : [];
courses = coursesData ? JSON.parse(coursesData) : [];

  
app.use(express.json());

app.post('/admin/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const isAdminFound =  admins.findIndex(admin => admin.username === username) !== -1;
    if(!isAdminFound ) {
       admins.push({username, password});
       fs.writeFileSync("admins.json", JSON.stringify(admins));
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

    const isAdminFound = admins.findIndex(admin => admin.username === username && admin.password === password) != -1;
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
        const noOfCourses = courses.length;
        const newCourseId = noOfCourses + 1;
        courses.push({courseId: newCourseId, title, description, price, imageLink, published});
        fs.writeFileSync("courses.json", JSON.stringify(courses));
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
    const existingCourse = courses.find(course => course.courseId === courseId)[0];

    if(existingCourse) {
        existingCourse.title = req.body.title;
        existingCourse.description = req.body.description;
        existingCourse.price = req.body.price;
        existingCourse.imageLink = req.body.imageLink;
        existingCourse.published = req.body.published;

        courses.forEach(course => course = course.courseId === courseId ? existingCourse : course);
        fs.writeFileSync("courses.json", JSON.stringify(courses));
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
        courses});
   } catch(e) {
    res.status(403).json({
        msg: "Unauthorized admin"
    })
   }
});

app.post('/users/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

   const isUserFound = users.findIndex((user) => user.username === username) != -1;
   if(!isUserFound) {
    users.push({username, password});
    fs.writeFileSync("users.json", JSON.stringify(users));
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

   const isUserPresent = users.findIndex(user => user.username === username) !== -1;
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
  const allCourses = courses.filter(course => course.published);
  res.status(200).json({
    courses: allCourses 
  }); 
});

app.post("/users/courses/:courseId", isUserAuthenticated, async(req, res) => {
    const user = users.find(user => user.username === req.headers.username);
    const userPurchasedCoursesList = user?.purchasedCourses ? user.purchasedCourses : [];

    const course = courses.find(course => course.courseId == req.params.courseId);
    userPurchasedCoursesList.push(course);
    users.forEach(user => user.purchasedCourses = user.username === req.headers.username ? userPurchasedCoursesList : user.purchasedCourses); 
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.status(200).json({
        msg: "User purchased course successfully"
    });
});

app.get("/users/purchasedCourses", isUserAuthenticated, async (req, res) => {
    const user = users.find(user => user.username === req.headers.username);
    res.status(200).json({
        purchasedCourses: user.purchasedCourses
    })
});

app.listen(3000);
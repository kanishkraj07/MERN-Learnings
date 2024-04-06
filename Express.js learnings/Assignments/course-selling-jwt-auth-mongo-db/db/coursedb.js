const mongoose = require("mongoose");

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
const users = mongoose.model('users', {username: String, password: String, purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'courses'}]});


module.exports = {
    admin,
    users,
    courses
}
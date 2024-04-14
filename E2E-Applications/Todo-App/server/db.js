const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://kanishkdath:Nz7HvGTLArMEpM2O@users.rhrnkz1.mongodb.net/todosdb");

const todoSchema = mongoose.Schema({
    id: String,
    title: String,
    description: String,
    isCompleted: Boolean
});

const todos = mongoose.model('todos', todoSchema);

module.exports = {
    todos
};
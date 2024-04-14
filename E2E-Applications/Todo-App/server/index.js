const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const app = express();

const {TODO_SCHEMA, TODO_ID_SCHEMA} = require("../Server/types");
const {todos} = require("../Server/db.js");


app.use(cors());
app.use(express.json());

app.get("/todos", async (req, res) => {
    const allTodos = await todos.find();
    res.status(200).json({
        todos: allTodos
    });
});

app.post("/todo", async (req, res) => {
    const newTodo = req.body;
    newTodo.id = uuid.v4();
    if(TODO_SCHEMA.safeParse(newTodo).success) {
        await todos.create(newTodo);
        res.status(200).json({
            todo: newTodo,
            msg: "Todo created Successfully"
        });
    } else {
        res.status(411).json({
            res: "wrong todo"
        });
    };
    
});

app.put("/completed", async (req, res) => {
    const id = req.query.id;
    if(TODO_ID_SCHEMA.safeParse(id).success) {
       await todos.updateOne({id}, {$set: {isCompleted: true}});
       res.status(200).json({
        res: "Todo marked as completed sucessfully"
       });
    } else {
        res.status(411).json({
            res: "Wrong todo ID"
        });
    }
});

app.delete("/todo", async (req, res) => {
    const id = req.query.id;
    await todos.deleteOne({id});
    res.status(200).json({
        res: "Todo Deleted Successfully"
    });
})

app.use((error, req, res, next) => {
    res.status(500).json({
        res: "Internal server error"
    })
});

app.listen(3000);
const express = require("express");
const app = express();

const {TODO_SCHEMA, TODO_ID_SCHEMA} = require("../server/types");
const {todos} = require("../server/db.js");


app.use(express.json());

app.get("/todos", async (req, res) => {
    const allTodos = await todos.find();
    res.status(200).json({
        todos: allTodos
    });
});

app.post("/todo", async (req, res) => {
    const newTodo = req.body;
    if(TODO_SCHEMA.safeParse(newTodo).success) {
        await todos.create(newTodo);
        res.status(200).json({
            res: "Todo created Successfully"
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
       await todos.updateOne({_id: id}, {$set: {isCompleted: true}});
       res.status(200).json({
        res: "Todo marked as completed sucessfully"
       });
    } else {
        res.status(411).json({
            res: "Wrong todo ID"
        });
    }
});

app.use((error, req, res, next) => {
    res.status(500).json({
        res: "Internal server error"
    })
});

app.listen(3000);
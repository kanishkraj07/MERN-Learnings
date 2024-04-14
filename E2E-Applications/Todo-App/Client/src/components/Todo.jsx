import { useEffect, useState } from "react";
import { AddTodo } from "./AddTodo";
import { DisplayTodos } from "./DisplayTodos";
import axios from "axios";

export function Todo() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/todos").then((response) => {
           setTodos(response.data.todos);
        });
    }, [])

    return <div>
        <h3 style={{textAlign: "center", color: "yellow", fontSize: 30, fontFamily: "ariel"}}>Welcome to XTodo</h3>
        <AddTodo todos = {todos} setTodos={setTodos}></AddTodo>
        <DisplayTodos todos={todos} setTodos={setTodos}></DisplayTodos>
    </div>
}
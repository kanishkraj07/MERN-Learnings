import axios from "axios";
import { useRef } from "react"
import "../components/AddTodo.css"

export function AddTodo({todos, setTodos}) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    function addTodo() {
       const newTodo = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
         isCompleted: false
       }
        axios.post("http://localhost:3000/todo", {title: newTodo.title, description: newTodo.description, isCompleted: newTodo.isCompleted}).then((response) => {
            setTodos([...todos, response.data.todo]);
        });
    }

    return <div className="add-todo-container">
            <input className="title" ref={titleRef} type="text" placeholder="Enter Title"></input> <br /> <br />
            <input className="description" ref={descriptionRef} type="text" placeholder="Enter Description"></input> <br /> <br />
            <button className="add-button" onClick={addTodo}>Add Todo</button>
        </div>
}
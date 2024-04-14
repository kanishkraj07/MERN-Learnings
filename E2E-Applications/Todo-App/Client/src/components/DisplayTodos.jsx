import axios from "axios"
import "./DisplayTodos.css"

export function DisplayTodos({todos, setTodos}) {

    return <table className="display-todos-container">
        <thead>
            <tr>
                <th className="title-header">Title</th>
                <th className="desc-header">Description</th>
            </tr>
        </thead>
        <tbody>
       { todos.map(todo => {
        return <TodoDetails key={todo.id} todo={todo} setTodos={setTodos} todos={todos}></TodoDetails>
       })}
       </tbody>
    </table>
}


function TodoDetails({todo, setTodos, todos}) {
    function setToDone(todoId) {
        axios.put(`http://localhost:3000/completed?id=${todoId}`);
        todos.forEach(todo => {
            if(todo.id === todoId) {
                todo.isCompleted = true;
            }
        });
        setTodos(([...todos]));
    }

    function deleteTodo(todoId) {
        axios.delete(`http://localhost:3000/todo?id=${todoId}`).then(() => {

            setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
        })
    }

return <tr className="todo-box">
    <td>{todo.title}</td>
    <td>{todo.description}</td>
    <td><button className="set-to-done" onClick={() => setToDone(todo.id)}>{todo.isCompleted ? 'Accomplished' : 'Set to done'}</button></td>
      <td><button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
</tr>
}
import { useState } from "react";


let count = 1;
let newTitle = "";
let newDescription = "";

function App() {

  const [todos, setTodos] = useState([]);

  function addTodo() {
    setTodos([
      ...todos,
      {
        id: count++,
        title: newTitle,
        description: newDescription
      }
    ]);
  }

  function setTitle(e) {
    newTitle = e.target.value;
  }

  function setDesc(e) {
    newDescription = e.target.value;
  }

  return (
    <>
    <input type="text" onChange={setTitle} placeholder="Enter Title"></input> <br /> <br />
    <input type="text" onChange={setDesc} placeholder="Enter Description"></input><br /> <br />
    <button onClick={addTodo}>Add Todo</button>
    {todos.map(todo => {
      return <Todo key={todo.id} title={todo.title} description={todo.description}></Todo>
    })}
   </>
  )
}

function Todo({title, description}) {
  return <>
  <br /> <br />
  <div>{title}</div> <br />
  <div>{description}</div>
  </>
}

export default App

import { useState } from "react";
import {Todo} from "./todo"
function App() {
  
  const [todos, setTodo] = useState([{
    title: "walking",
    description: "go for a walk"
  }, {
    title: "eating",
    description: "eat at 12"
  }, {
  }]);

  return (
    <>
    <Todo todos={todos} setTodo={setTodo}></Todo>
    </>
  )
}


export default App

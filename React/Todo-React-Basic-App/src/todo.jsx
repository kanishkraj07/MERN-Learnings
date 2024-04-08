export function Todo(props) {
    function addTodo() {
      props.setTodo([...props.todos, {title: 'Learn React', description: 'Learn React at 6:00PM'}])
    }
  
    return (
      <>
      <div>
        <h1>Welcome to Todo Website</h1>
        <input></input> <br></br><br></br>
        <input></input><br></br><br></br>
        <button onClick={addTodo}>Add Todo</button><br></br>
      </div>
      <div>
        {
          props.todos.map(todo => {
            return <>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            </>
          })
        }
      </div>
      </>
    );
  }
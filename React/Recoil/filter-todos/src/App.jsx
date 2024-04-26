import axios from "axios"
import { useEffect } from "react"
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { TodosAtom } from "./atoms/TodosAtom"
import { FilteredTodosResults } from "./selectors/FilteredTodosResult"
import { FilterValueAtom } from "./atoms/FilterValueAtom"

function App() {
  return (
    <>
    <RecoilRoot>
      <FilterInput></FilterInput>
      <FilteredTodos></FilteredTodos>
    </RecoilRoot>
    </>
  )
}

function FilterInput() {

  const setFilterVal = useSetRecoilState(FilterValueAtom);
  
  return <div>
  <input type="text" placeholder="Search Todos" onChange={(e) => setFilterVal(e.target.value)}></input> <br /> <br /><br /><br />
   </div> 
}

function FilteredTodos() {

  const setTodos = useSetRecoilState(TodosAtom);
  const filteredTodos = useRecoilValue(FilteredTodosResults);

  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((response) => {
      setTodos(response.data.todos);
    }) 
  }, []);


  return  <div>{ filteredTodos.map(todo => {
         return <div key={todo._id} style={{border: "1px solid black"}}>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
          </div>
           }
        )}
  </div>

}

export default App

import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TODOS } from './Todos'
import { useEffect } from 'react'
import axios from 'axios'
import { RecoilRoot, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { TodosAtomFamily } from './store/atoms/TodosAtom'

function App() {

  return (
    <>
    <RecoilRoot>
      <Suspense fallback="loading ....">
<TodoRenderer />
</Suspense>
</RecoilRoot>
    </>
  )
}

function TodoRenderer() {
  return <div>
    <Todo id={1} />
    <Todo id={2} />
    <Todo id={3} />
    
  </div>
}

function Todo({id}) {
  const todo = useRecoilValueLoadable(TodosAtomFamily(id));
if(todo.state === 'loading') {
  return <div>
    Loading ...
    </div>
} else if (todo.state === 'hasError') {
  return <div>Error Occured: {todo.contents.message}</div>;
} 
else {
return <div>
    <div>
    title : {todo.contents.title}
    </div>
    <div>
    description : {todo.contents.description}
    </div>
  </div>
}
}

export default App

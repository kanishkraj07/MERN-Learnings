import { useContext, useState } from 'react'
import { CounterContext } from './context'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div> 
      <CounterContext.Provider value={{count, setCount}}> 
          <CountRenderer></CountRenderer>
      </CounterContext.Provider>
    </div>
  )
}

function CountRenderer() {
  return <>
  <h1>Welcome to the counter</h1>
  <Count></Count> 
    <Buttons></Buttons>   </>
}

function Count() {
const {count} = useContext(CounterContext);
  return <div>
    Count is: {count}
  </div>
}

function Buttons() {
  const {setCount} = useContext(CounterContext);

  return <div>
    <button onClick={() => setCount(count => count + 1)}>Increment</button>
    <button onClick={() => setCount(count => count -  1)}>Decrement</button>
    </div>

}

export default App

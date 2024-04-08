import { useState } from "react";

function App() {

  const [count, setCount] = useState(1);

  return (
    <div>
          <CounterButton count={count} setCount = {setCount}></CounterButton>
    </div>
    
  );
}

function CounterButton(props) {
  function increaseCounter() {
    props.setCount(props.count + 1);
  }

  return  (
      <button onClick={increaseCounter}>Counter {props.count}</button>
  )
}

export default App

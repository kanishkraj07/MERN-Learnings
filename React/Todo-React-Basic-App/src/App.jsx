import { useCallback, useEffect, useMemo } from "react";
import { useState, memo } from "react"

function App() {
  const[count, setCount] = useState(0);
  console.log("1");

  useEffect(() => {
    console.log("useffect");
  }, [count])
  
  return <button onClick={() =>  {
    setCount(count + 1);
  }
  }>Counter {count}</button>

}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { CountAtom } from './store/atoms/CountAtom'
import { IsEvenSelector } from './store/selectors/IsEvenSelector'

function App() {

  return (
    <>
    <RecoilRoot>
    <Count></Count>
    </RecoilRoot>
    </>
  )
}


function Count() {
  return <>
  <CountRenderer></CountRenderer>
  <Buttons></Buttons>
  <NumberType></NumberType>
  </>

}

function CountRenderer() {
  const count = useRecoilValue(CountAtom);

  return <div>Count is {count}</div>

}

function Buttons() {
  const setCount = useSetRecoilState(CountAtom);
  return <>
  <button onClick={() => setCount(count => count + 1)}>Increment</button>
  <button onClick={() => setCount(count => count - 1)}>Decrement</button>
  </>
}


function NumberType() {
  const isEven = useRecoilValue(IsEvenSelector); // same as like useMemo - but in recoil world it is selector

  return <div>
    <br />
    <b>  It is {isEven ? "Even" : "Odd"} </b>
  </div>
}

export default App

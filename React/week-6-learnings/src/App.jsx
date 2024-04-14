import './App.css'
function App() {  

return <>
<WrapperComponent>
  <InnerComponent></InnerComponent> 
</WrapperComponent>

<WrapperComponent>
  <InnerComponent2></InnerComponent2>
   </WrapperComponent>

</>
}

function InnerComponent() {
  return <>
  <ul style={{color: 'white'}}>
    <li>Iphone</li>
    <li>Android</li>
    <li>Pixel</li>
    <li>Samsung</li>
    <li>Redmi</li>
    <li>Real Me</li>
  </ul>
  </>
}

function InnerComponent2() {
  return <>
  <ul style={{color: 'white'}}>
    <li>Iphone</li>
    <li>Android</li>
  </ul>
  </>
}

function WrapperComponent({children}) {
  return <div className="wrapper">
    {children}
  </div>
}

export default App

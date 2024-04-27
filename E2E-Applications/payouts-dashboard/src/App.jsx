import './App.css'
import { PayoutHeader } from './components/PayoutHeader'
import { PayoutContent } from './components/PayoutContent'

function App() {

  return (
    <>
    <PayoutHeader></PayoutHeader>
    <PayoutContent></PayoutContent>
    <div className='text-center text-gray-500 text-lg font-medium py-5'>Made By <span className='text-gray-500 underline font-medium'>Kanishk Mogalraj</span></div>
    </>
  )
}

export default App

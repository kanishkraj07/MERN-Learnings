
import './App.css'

function App() {

  return (
    // <div className='w-80 h-40 bg-white flex justify-center'>
    //   <div className='w-20 h-20 bg-red-500'></div>
    //   <div className='w-20 h-20 bg-blue-500'></div>
    //   <div className='w-20 h-20 bg-green-500'></div>
    // </div>
    // <div className='grid grid-cols-8 gap-5'>
    //   <div className='h-20 bg-red-500 col-span-8 sm:col-span-4 lg:col-span-2'></div>
    //   <div className='h-20 bg-green-500 col-span-8 sm:col-span-4 lg:col-span-2'></div>
    //   <div className='h-20 bg-blue-500 col-span-8 sm:col-span-4 lg:col-span-2'></div>
    //   <div className='h-20 bg-yellow-500 col-span-8 sm:col-span-4 lg:col-span-2'></div>
    // </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
      <div className='h-20 bg-red-500'></div>
      <div className='h-20 bg-green-500'></div>
      <div className='h-20 bg-blue-500'></div>
      <div className='h-20 bg-yellow-500'></div>
    </div>
  )
}

export default App

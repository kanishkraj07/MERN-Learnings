
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './components/Landing'
import { Header } from './components/Header';
import React, { Suspense, lazy } from 'react';

const Dashboard = React.lazy(() => import('./components/Dashboard'));


function App() {


  const routes = [{
    path: "/dashboard",
    element: <Suspense fallback={"loading....."}><Dashboard /></Suspense>
  }, {
    path: "/",
    element: <Landing />
  }];
  return (
    <>
    <BrowserRouter>
    <Header></Header>
  
    <Routes>
      {routes.map((route, index) => <Route key={index} path={route.path} element={route.element}></Route>)};
      {/* <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/landing' element={<Landing />}></Route> */}
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App

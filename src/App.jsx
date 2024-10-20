import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import {data} from './data/module-data';
import RootLayout from './layouts/RootLayout';
import { Routes, Route, Outlet} from 'react-router-dom';
import Lab1Page from './pages/Lab1Page';


function App() {
  const [count, setCount] = useState(0)

  return (
    <RootLayout>
      <Routes>
        <Route path = "/about" element={<h1> autor </h1>} />
        <Route path = "/lab1" element = { <Lab1Page names = {data}/>} /> 
        <Route path = "/lab2" element = {<Outlet/>}> 
          <Route path = "people" element = {<h1>People 2</h1>}/>
          <Route path ="*" element={<h1>Page not found</h1>}></Route>
          </Route>
      </Routes>

    </RootLayout>
  )
}

export default App

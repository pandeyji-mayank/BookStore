import React from 'react'
import Home from './Home/Home'
import { Route, Routes } from "react-router-dom"
import Courses from './courses/Courses'
import Signup from './components/Signup'

function App() {
  return (
    <>
      <div className='bg-white text-black dark:bg-slate-900 dark:text-white' >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/course' element={<Courses />} />
          <Route path='/signup' element={<Signup />} />
        </Routes >
      </div>
    </>
  )
}

export default App
import React from 'react'

import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './layout/Navbar';

import Home from './pages/Home'

const App = () => {
  return (
      <div>
          <Navbar/>
          <Routes style={{ minHeight: '60vh' }}>
              <Route path='/' element={<Home/>}/>
              
          </Routes>
    </div>
  )
}

export default App
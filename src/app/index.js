import React from 'react'

import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './layout/Navbar';

import Home from './pages/Home'
import Footer from './layout/Footer';
import Quizze from './pages/Quizze';
import Question from './Components/Question';
import Login from './pages/Login';
import Registration from './pages/Registration';

import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster/>
          <Navbar />
          <div className='mt-20 min-h-screen'>              
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/quizzes" element={<Quizze />} />          
          <Route path="/quizzes/:id" element={<Question/>}/>     
          <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element={<Registration/>}/>
              
          </Routes>
          </div>
          <Footer/>
    </div>
  )
}

export default App
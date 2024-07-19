import React, { useState, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {    
    const [isOpen, setIsOpen] = useState(false);    
    const location = useLocation();

     const isActive = (path) => location.pathname === path;

  const linkBaseClass = "font-semibold md:hover:bg-green-500 p-2 rounded-md transition-colors duration-300 my-7 md:my-0 md:ml-8";
  const activeClass = "text-green-500";
    
  return (
      <nav className='w-full fixed top-0 left-0 gap-4 z-50 max-h-24'>
          <div className=' lg:flex justify-between items-center bg-white md:px-10 py-4 px-7'>
            <div className='flex items-center gap-2 cursor-pointer text-2xl'>
            <h1> Learning <span className='text-green-500'>module</span></h1>
          </div>    
          <div onClick={() => setIsOpen(!isOpen)} className='absolute right-8 top-6 cursor-pointer w-7 h-7 lg:hidden '>
            {isOpen ? <XMarkIcon /> : <Bars3Icon />}
          </div>
         
          <ul className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static lg:z-auto z-[-1] left-0 w-full 
            lg:w-auto lg:pl-0 pl-9 transition-all bg-white duration-500 ease-in ${isOpen ? 'top-20' : 'top-[-445px]'}`}>
            <li><Link to='/' className={`${linkBaseClass} ${isActive('/') ? activeClass : ''} md:mx-4`}>Home</Link></li>                  
            <li><Link to='/quizzes'  className={`${linkBaseClass} ${isActive('/quizzes') ? activeClass : ''} md:mx-4`}>Quizze</Link> </li>
            <li><Link to='/flashcards' className={`${linkBaseClass} ${isActive('/flashcards') ? activeClass : ''} md:mx-4`}>FlaskCard</Link> </li>
            <li><Link to='/login' className={`${linkBaseClass} ${isActive('/login') ? activeClass : ''} md:mx-4`}>Login</Link> </li>
            <li><Link to='/signup' className={`${linkBaseClass} ${isActive('/signup') ? activeClass : ''} md:mx-4`}>Register</Link> </li>
          
                  
            
          </ul>
          </div>
    </nav>
  )
}

export default Navbar
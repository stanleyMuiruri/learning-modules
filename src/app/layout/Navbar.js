import React, { useState, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const linkBaseClass = "font-semibold md:hover:bg-green-500 p-2 rounded-md transition-colors duration-300 my-7 md:my-0 md:ml-8";
  const activeClass = "text-green-500";

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <li><Link to='/quizzes' className={`${linkBaseClass} ${isActive('/quizzes') ? activeClass : ''} md:mx-4`}>Quizze</Link></li>
          <li><Link to='/flashcards' className={`${linkBaseClass} ${isActive('/flashcards') ? activeClass : ''} md:mx-4`}>FlashCard</Link></li>
          {!user && (
            <>
              <li><Link to='/login' className={`${linkBaseClass} ${isActive('/login') ? activeClass : ''} md:mx-4`}>Login</Link></li>
              <li><Link to='/signup' className={`${linkBaseClass} ${isActive('/signup') ? activeClass : ''} md:mx-4`}>Register</Link></li>
            </>
          )}
         {user && user.role === 'teacher' && (
            <li><Link to='/post-quizze' className={`${linkBaseClass} ${isActive('/post-quizze') ? activeClass : ''} md:mx-4`}>Post Quizze</Link></li>
          )}
          {user && (
            <li className="relative md:mx-4">
              <FaUserCircle className="text-2xl cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)} />
              {dropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1">
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-700">Hello, {user.first_name} {user.last_name}</span>
                    <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={() => setDropdownOpen(false)} />
                  </div>
                  <div className="border-t my-1"></div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
       <button onClick={() => navigate(-1)} className="mt-2 bottom-0 left-0 ml-2">
        <FaArrowLeft className="w-6 h-6" />
      </button>
    </nav>
  );
};

export default Navbar;

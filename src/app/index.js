import React, { useEffect, useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Footer from './layout/Footer';
import Quizze from './pages/Quizze';
import Question from './Components/Question';
import Login from './pages/Login';
import Registration from './pages/Registration';
import PostQuizze from './pages/PostQuizze'; 
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import FlashcardPage from './pages/Flashcard';

const App = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('access_token');

  async function checkSession() {
    try {
      const response = await axios.get('/check_session', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    } else {
      checkSession();
    }
  }, []);

  return (
    <div>
      <Toaster />
      <Navbar user={user} setUser={setUser} />
      <div className='mt-20 min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/quizzes" element={<Quizze />} user={user}/>
          <Route path="/quizzes/:id" element={<Question user={user} />} />
          <Route path="/login" element={<Login checkSession={checkSession} />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/flashcards" element={<FlashcardPage user={user}/>} />
          {user && user.role === 'teacher' && (
            <Route path="/post-quizze" element={<PostQuizze  />} />
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

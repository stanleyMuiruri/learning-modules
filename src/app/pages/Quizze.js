import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader'; 
import { useNavigate} from 'react-router-dom';

const Quizze = () => {
  const [quizze, setQuizze] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchQuizze() {
      try {
        const response = await axios.get('/quizes');
        setQuizze(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setLoading(false); 
      }
    }

    fetchQuizze();
  }, []);

  return (
    <div className='p-5 mx-auto max-w-screen-lg'>
      <h5 className='text-green-500 font-bold mb-4'>Quizzes:</h5>
      {loading ? (
        <div className='flex justify-center items-center h-full'>
          <Loader />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {quizze.map((quiz) => (
            <div key={quiz.id} className='bg-white shadow-md rounded-lg p-4' onClick={()=>navigate(`/quizzes/${quiz.id}`)}>
              <h5 className='text-xl font-bold mb-2'>{quiz.title}</h5>
              <p className='text-gray-700'>Owner: {quiz.owner}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quizze;

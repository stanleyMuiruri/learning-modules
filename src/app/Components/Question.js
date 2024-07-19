import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const QuizDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    async function fetchQuestions() {
      try {
        const response = await axios.get(`/questions/${id}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchQuestions();
  }, [id, navigate, location, user]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmitAll = async () => {
    const token = localStorage.getItem('access_token');
    const allAnswered = questions.every(question => answers.hasOwnProperty(question.id));

    if (!allAnswered) {
      toast.error('Please answer all questions before submitting.');
      return;
    }

    try {
      const response = await axios.post('/question_check_answer', {
        answers: Object.entries(answers).map(([question_id, answer]) => ({
          question_id,
          answer
        })),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResults(response.data.results);
      setTotalMarks(response.data.total_marks);


      toast.success('All answers submitted successfully!');
    } catch (error) {
      console.error('Error submitting answers:', error);
      toast.error('Failed to submit answers.');
    }
  };

  const getResultMessage = (questionId) => {
    const result = results.find(res => parseInt(res.question_id) === parseInt(questionId));
    return result ? result.message : '';
  };

  const getResultClass = (questionId) => {
    const result = results.find(res => parseInt(res.question_id) === parseInt(questionId));
    return result ? (result.is_correct ? 'text-green-500' : 'text-red-500') : '';
  };

  return (
    <div className='p-5 mx-auto max-w-screen-lg'>
      <Toaster />
      {questions.map((question) => (
        <div key={question.id} className='bg-white shadow-md rounded-lg p-4 mb-4'>
          <h5 className='text-xl font-bold mb-2'>{question.question}</h5>
          <div className='mb-4'>
            {JSON.parse(question.answers).map((answer, index) => (
              <div key={index}>
                <input
                  type='radio'
                  id={`answer-${question.id}-${index}`}
                  name={`question-${question.id}`}
                  value={answer}
                  onChange={() => handleAnswerChange(question.id, answer)}
                  disabled={results.length > 0} // Disable input if results are available
                />
                <label htmlFor={`answer-${question.id}-${index}`} className='ml-2'>{answer}</label>
              </div>
            ))}
          </div>
          {results.length > 0 && (
            <div className={`mt-2 ${getResultClass(question.id)}`}>
              {getResultMessage(question.id)}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleSubmitAll}
        className='bg-blue-500 text-white px-4 py-2 rounded'
        disabled={results.length > 0}
      >
        Submit All Answers
      </button>
      {results.length > 0 && (
        <div className='mt-4 text-xl font-bold'>
          Total Marks: {totalMarks}
        </div>
      )}
    </div>
  );
}

export default QuizDetails;

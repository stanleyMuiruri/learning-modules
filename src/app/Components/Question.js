import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const QuizDetails = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const token = localStorage.getItem('access_token'); // Get the token from local storage
        const response = await axios.get(`/questions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchQuestions();
  }, [id]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmitAll = async () => {
    // Check if all questions have been answered
    const allAnswered = questions.every(question => answers.hasOwnProperty(question.id));

    if (!allAnswered) {
      toast.error('Please answer all questions before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('access_token'); // Get the token from local storage
      await axios.post('/question_check_answer', {
        quiz_id: id,
        answers,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Answers submitted successfully!');
    } catch (error) {
      console.error('Error submitting answers:', error);
      toast.error('Failed to submit answers.');
    }
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
                />
                <label htmlFor={`answer-${question.id}-${index}`} className='ml-2'>{answer}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmitAll}
        className='bg-blue-500 text-white px-4 py-2 rounded'>
        Submit All Answers
      </button>
    </div>
  );
}

export default QuizDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizDetails = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(`/questions/${id}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchQuestions();
  }, [id]);

  const handleSubmit = async (questionId) => {
    try {
      await axios.post('/answers', {
        question_id: questionId,
        answer: selectedAnswer
      });
      alert('Answer submitted successfully!');
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Failed to submit answer.');
    }
  };

  return (
    <div className='p-5 mx-auto max-w-screen-lg'>
      {questions.map((question) => (
        <div key={question.id} className='bg-white shadow-md rounded-lg p-4 mb-4'>
          <h5 className='text-xl font-bold mb-2'>{question.question}</h5>
          <div className='mb-4'>
            {JSON.parse(question.answers).map((answer, index) => (
              <div key={index}>
                <input
                  type='radio'
                  id={`answer-${index}`}
                  name={`question-${question.id}`}
                  value={answer}
                  onChange={() => setSelectedAnswer(answer)}
                />
                <label htmlFor={`answer-${index}`} className='ml-2'>{answer}</label>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleSubmit(question.id)}
            className='bg-blue-500 text-white px-4 py-2 rounded'>
            Submit Answer
          </button>
        </div>
      ))}
    </div>
  );
}

export default QuizDetails;

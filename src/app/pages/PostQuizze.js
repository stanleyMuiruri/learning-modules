import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const PostQuizze = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', '', '', ''], correctAnswer: '', mark: '' }]);
  };

  const handleQuestionChange = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('access_token');
    e.preventDefault();

    try {
      const response = await axios.post('/questions', { title, questions }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Quiz posted successfully');
      setTitle('');
      setQuestions([]);
    } catch (error) {
      toast.error('Error posting quiz');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Post a Quiz</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">Quiz Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor={`question-${qIndex}`}>Question {qIndex + 1}</label>
              <input
                type="text"
                id={`question-${qIndex}`}
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              {q.answers.map((answer, aIndex) => (
                <input
                  key={aIndex}
                  type="text"
                  value={answer}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  placeholder={`Answer ${aIndex + 1}`}
                  required
                />
              ))}
              <input
                type="text"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Correct Answer"
                required
              />
              <input
                type="number"
                value={q.mark}
                onChange={(e) => handleQuestionChange(qIndex, 'mark', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Mark"
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion} className="w-full bg-blue-500 text-white p-2 rounded mb-4">Add Question</button>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Post Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default PostQuizze;

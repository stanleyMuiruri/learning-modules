import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlashcardList from '../Components/FlashcardList';
import './FlipCard.css'; 
import toast, { Toaster } from 'react-hot-toast';

const FlashcardPage = ({ user }) => {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('/flip_cards'); 
        setCards(response.data);
      } catch (error) {
        toast.error('Error fetching flashcards');
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchCards();
  }, []);

  const handlePostFlipCard = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.post('/flip_cards', { question, answer }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Flip card added successfully');
      setCards([...cards, response.data]); 
      setShowForm(false);
      setQuestion('');
      setAnswer('');
    } catch (error) {
      toast.error('Error adding flip card');
      console.error('Error adding flip card:', error);
    }
  };

  return (
    <div className="flashcard-page">
      <Toaster />
      {user && (
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Post a Flip Card'}
        </button>
      )}
      {showForm && (
        <form onSubmit={handlePostFlipCard} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="question">Question</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="answer">Answer</label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Add Flip Card
          </button>
        </form>
      )}
      <FlashcardList cards={cards} />
    </div>
  );
};

export default FlashcardPage;

import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ({ cards }) => {
  return (
    <div className="flashcard-list">
      {cards.map(card => (
        <Flashcard key={card.id} question={card.question} answer={card.answer} />
      ))}
    </div>
  );
};

export default FlashcardList;

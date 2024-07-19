import React from 'react'
import Quizzer from './Quizze'
import Flashcard from './Flashcard'


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full bg-green-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to Quizzer and Flashcard App</h1>
      </header>
      <main className="mt-8 w-full">
        <div>
            Welcome to the Quizzer and Flashcard App! This application is designed to enhance your learning and retention through interactive quizzes and customizable flashcards. Whether you're a student, teacher, or lifelong learner, our app provides a versatile platform to test your knowledge and reinforce key concepts.
        </div>
        <div className="w-full  p-4">
          <Quizzer />
        </div>
        <div className="w-full p-4">
          <Flashcard />
        </div>
      </main>
    </div>
  )
}

export default Home
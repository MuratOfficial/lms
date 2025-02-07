"use client"

import { useState, useEffect } from 'react';
import QuestionCard from '@/components/questions-card';

interface Question {
  category: string;
  type: string;
  question: string;
  options?: string[];
  answer: string;
}

const Home: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setAnswers(Array(data.length).fill(false));
      });
  }, []);

  const handleAnswer = (index: number, isCorrect: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = isCorrect;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const score = answers.filter(Boolean).length;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Квиз</h1>
      <div className="grid grid-cols-1 gap-4">
        {questions.map((question, index) => (
          <QuestionCard
            key={index}
            index={index}
            question={question.question}
            options={question.options}
            answer={question.answer}
            type={question.type}
            handleAnswer={handleAnswer}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Отправить
      </button>
      {isSubmitted && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Ваш балл: {score} / {questions.length}</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
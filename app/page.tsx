"use client";

import QuestionCard from '@/components/questions-card';
import Tabs from '@/components/tabs';
import UsernameForm from '@/components/username-form';
import { useState, useEffect } from 'react';
interface Question {
  id: number;
  name: string;
  info: string;
  type: string;
  options?: string[];
  correctAnswer: string;
  points: number;
  color: string;
  category: string;
}

const Home: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>('JavaScript');

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
    const score = answers.filter(Boolean).length;
    // Запись никнейма и баллов в JSON файл
    fetch('/api/save-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, score }),
    });
  };

  const handleUsernameSubmit = (username: string) => {
    setUsername(username);
  };

  const score = answers.filter(Boolean).length;

  if (!username) {
    return <UsernameForm onSubmit={handleUsernameSubmit} />;
  }

  const categories = Array.from(new Set(questions.map(q => q.category)));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Квиз</h1>
      <div className="mb-4">
        <span className="text-lg font-semibold">Никнейм: {username}</span>
      </div>
      <Tabs categories={categories} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
      <div className="grid grid-cols-1 gap-4">
        {questions.filter(q => q.category === currentCategory).map((question, index) => (
          <QuestionCard
            key={index}
            index={index}
            question={question.info}
            options={question.options}
            answer={question.correctAnswer}
            type={question.type}
            handleAnswer={handleAnswer}
            username={username}
            points={question.points}
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
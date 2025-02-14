"use client";

import { useState } from 'react';

interface QuestionCardProps {
  question: string;
  options?: string[];
  answer: string;
  type: string;
  index: number;
  handleAnswer: (index: number, isCorrect: boolean) => void;
  username: string;
  points: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, answer, type, index, handleAnswer, username, points }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === answer;
    handleAnswer(index, isCorrect);
    updateScore(isCorrect);
    setIsSubmitted(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const isCorrect = userAnswer.trim().toLowerCase() === answer.trim().toLowerCase();
    handleAnswer(index, isCorrect);
    updateScore(isCorrect);
    setIsSubmitted(true);
  };

  const updateScore = (isCorrect: boolean) => {
    if (isCorrect) {
      fetch('/api/update-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, points }),
      });
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold">{question}</h2>
      {type === 'multiple-choice' && options && (
        <div className="mt-2">
          {options.map((option, idx) => (
            <label key={idx} className="block">
              <input
                type="radio"
                name={`option-${index}`}
                value={option}
                onChange={() => handleOptionChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
      {type === 'input' && (
        <div className="mt-2">
          <input
            type="text"
            value={userAnswer}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Ответить
          </button>
        </div>
      )}
      {isSubmitted && (
        <div className="mt-4">
          {type === 'multiple-choice' && selectedOption === answer ? (
            <span className="text-green-500">Правильно!</span>
          ) : type === 'multiple-choice' && selectedOption !== answer ? (
            <span className="text-red-500">Неправильно!</span>
          ) : userAnswer.trim().toLowerCase() === answer.trim().toLowerCase() ? (
            <span className="text-green-500">Правильно!</span>
          ) : (
            <span className="text-red-500">Неправильно!</span>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
"use client"

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
}

const QuestionManager: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: 0,
    name: '',
    info: '',
    type: 'multiple-choice',
    options: [],
    correctAnswer: '',
    points: 0,
    color: 'white',
  });

  useEffect(() => {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAddQuestion = () => {
    fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    }).then(() => {
      setQuestions([...questions, newQuestion]);
      setNewQuestion({
        id: 0,
        name: '',
        info: '',
        type: 'multiple-choice',
        options: [],
        correctAnswer: '',
        points: 0,
        color: 'white',
      });
    });
  };

  const handleUpdateQuestion = (updatedQuestion: Question) => {
    fetch('/api/questions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedQuestion),
    }).then(() => {
      setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    });
  };

  const handleDeleteQuestion = (id: number) => {
    fetch('/api/questions', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      setQuestions(questions.filter(q => q.id !== id));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Управление вопросами</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Название"
          value={newQuestion.name}
          onChange={(e) => setNewQuestion({ ...newQuestion, name: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Информация"
          value={newQuestion.info}
          onChange={(e) => setNewQuestion({ ...newQuestion, info: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <select
          value={newQuestion.type}
          onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded"
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="input">Input</option>
        </select>
        {newQuestion.type === 'multiple-choice' && (
          <>
            <input
              type="text"
              placeholder="Опции (через запятую)"
              value={newQuestion.options?.join(', ') || ''}
              onChange={(e) => setNewQuestion({ ...newQuestion, options: e.target.value.split(', ') })}
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Правильный ответ"
              value={newQuestion.correctAnswer}
              onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
              className="mb-2 p-2 border border-gray-300 rounded"
            />
          </>
        )}
        {newQuestion.type === 'input' && (
          <input
            type="text"
            placeholder="Правильный ответ"
            value={newQuestion.correctAnswer}
            onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
        )}
        <input
          type="number"
          placeholder="Баллы"
          value={newQuestion.points}
          onChange={(e) => setNewQuestion({ ...newQuestion, points: Number(e.target.value) })}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Цвет"
          value={newQuestion.color}
          onChange={(e) => setNewQuestion({ ...newQuestion, color: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <button onClick={handleAddQuestion} className="px-4 py-2 bg-blue-500 text-white rounded">Добавить вопрос</button>
      </div>
      <div>
        {questions.map((question) => (
          <div key={question.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-lg font-bold">{question.name}</h2>
            <p>{question.info}</p>
            <p>Тип: {question.type}</p>
            {question.type === 'multiple-choice' && <p>Опции: {question.options?.join(', ')}</p>}
            <p>Правильный ответ: {question.correctAnswer}</p>
            <p>Баллы: {question.points}</p>
            <p>Цвет: {question.color}</p>
            <button onClick={() => handleUpdateQuestion({ ...question, points: question.points + 1 })} className="px-4 py-2 bg-green-500 text-white rounded">Изменить</button>
            <button onClick={() => handleDeleteQuestion(question.id)} className="px-4 py-2 bg-red-500 text-white rounded">Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionManager;
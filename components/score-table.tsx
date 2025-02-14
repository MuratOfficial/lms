"use client";

import { useState, useEffect } from 'react';

interface Score {
  username: string;
  score: number;
}

const ScoreTable: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    fetch('/api/scores')
      .then((res) => res.json())
      .then((data) => setScores(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Таблица баллов</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Никнейм</th>
            <th className="py-2">Баллы</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{score.username}</td>
              <td className="border px-4 py-2">{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
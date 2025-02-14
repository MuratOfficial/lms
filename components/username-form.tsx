"use client";

import { useState } from 'react';

interface UsernameFormProps {
  onSubmit: (username: string) => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <label htmlFor="username" className="mb-2 text-lg font-bold">Введите ваш никнейм:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Отправить</button>
    </form>
  );
};

export default UsernameForm;
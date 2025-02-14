"use client";

import { useState, useEffect } from 'react';

interface User {
  username: string;
  score: number;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ username: '', score: 0 });

  useEffect(() => {
    fetch('/api/scores')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = () => {
    fetch('/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then(() => {
      setUsers([...users, newUser]);
      setNewUser({ username: '', score: 0 });
    });
  };

  const handleUpdateUser = (updatedUser: User) => {
    fetch('/api/scores', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    }).then(() => {
      setUsers(users.map(u => u.username === updatedUser.username ? updatedUser : u));
    });
  };

  const handleDeleteUser = (username: string) => {
    fetch('/api/scores', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    }).then(() => {
      setUsers(users.filter(u => u.username !== username));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Управление пользователями</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Никнейм"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Баллы"
          value={newUser.score}
          onChange={(e) => setNewUser({ ...newUser, score: Number(e.target.value) })}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <button onClick={handleAddUser} className="px-4 py-2 bg-blue-500 text-white rounded">Добавить пользователя</button>
      </div>
      <div>
        {users.map((user) => (
          <div key={user.username} className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-lg font-bold">{user.username}</h2>
            <p>Баллы: {user.score}</p>
            <button onClick={() => handleUpdateUser({ ...user, score: user.score + 1 })} className="px-4 py-2 bg-green-500 text-white rounded">Изменить</button>
            <button onClick={() => handleDeleteUser(user.username)} className="px-4 py-2 bg-red-500 text-white rounded">Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
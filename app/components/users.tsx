"use client"

import { useEffect, useState } from "react";
import { socket } from "../socket";

interface User {
  id: string;
  name: string;
  points: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    socket.on("updateUsers", (users: User[]) => {
      setUsers(users);
      const currentUser = users.find((user) => user.id === socket.id);
      if (currentUser && currentUser.name === "admin") {
        setAdmin(true);
      }
    });

    return () => {
      socket.off("updateUsers");
    };
  }, []);

  const handleChangeName = () => {
    if (newName.trim()) {
      socket.emit("changeName", newName);
      setNewName("");
    }
  };

  const handleUpdatePoints = (userId: string, points: number) => {
    socket.emit("updatePoints", { userId, points });
  };

  return (
    <div className="p-4 border-l">
      <h2 className="text-xl mb-4">Подключенные</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Имя</th>
            <th className="py-2">Очки</th>
            {admin && <th className="py-2">Действия</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.points}</td>
              {admin && (
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdatePoints(user.id, user.points + 1)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => handleUpdatePoints(user.id, user.points - 1)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    -1
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Запиши свое имя"
          className="border p-2 rounded"
        />
        <button
          onClick={handleChangeName}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Изм. имя
        </button>
      </div>
    </div>
  );
};

export default Users;
"use client"

import { useEffect, useState } from "react";
import { socket } from "../socket";

interface User {
  id: string;
  name: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    socket.on("updateUsers", (users: User[]) => {
      setUsers(users);
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

  return (
    <div className="p-4 border-l">
      <h2 className="text-xl mb-4">Connected Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name"
          className="border p-2 rounded"
        />
        <button
          onClick={handleChangeName}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Change Name
        </button>
      </div>
    </div>
  );
};

export default Users;
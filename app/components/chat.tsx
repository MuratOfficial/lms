"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Chat = () => {
  const [messages, setMessages] = useState<{ senderId: string; content: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('user1'); // Example user ID

  useEffect(() => {
    const eventSource = new EventSource('/api/events');

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const sendMessage = async () => {
    await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: userId,
        receiverId: 'admin', // Example receiver ID
        content: newMessage,
      }),
    });
    setNewMessage('');
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Чат с Админом/Ментором</h2>
      <div className="h-64 bg-gray-100 p-4 rounded-lg overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.senderId}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Напишите свое сообщение"
          className="flex-grow"
        />
        <Button onClick={sendMessage}>Отправить</Button>
      </div>
    </div>
  );
};

export default Chat;


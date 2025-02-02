"use client"

import { useEffect, useState } from 'react';

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
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
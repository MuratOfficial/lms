"use client"

import { useEffect, useState } from 'react';

const RealTimeUpdates = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data).message;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>Real-Time Updates</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeUpdates;

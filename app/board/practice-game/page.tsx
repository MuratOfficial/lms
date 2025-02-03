"use client";

import Users from "@/app/components/users";
import { useEffect, useState } from "react";

interface Card {
  id: number;
  name: string;
  info: string;
  type: string;
  options?: string[];
  correctAnswer: string;
  points: number;
  color?: string;
  answeredBy?: string[];
}

export default function SSEClient() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<Card | null>(null);
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const loadCards = async () => {
      const res = await fetch("/data/cards.json");
      const data = await res.json();
      setCards(data);
    };

    loadCards();

    const eventSource = new EventSource("/api/sse");

    eventSource.onmessage = (event) => {
      const { event: eventType, data } = JSON.parse(event.data);
      if (eventType === "updateCards") {
        setSelectedCards((prev) => [...prev, data]);
      } else if (eventType === "updateCardDetails") {
        setCards((prevCards) =>
          prevCards.map((card) => (card.id === data.id ? data : card))
        );
      } else if (eventType === "resetCardColor") {
        setSelectedCards((prev) => prev.filter((id) => id !== data));
      } else if (eventType === "updateUsers") {
        const currentUser = data.find((user: any) => user.id === "user-id"); // Replace with actual user ID logic
        if (currentUser && currentUser.name === "admin") {
          setAdmin(true);
        }
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (!selectedCards.includes(index)) {
      fetch("/api/sse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: "selectCard", data: index }),
      });
    }
    setModalContent(cards[index]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAnswer = (answer: string) => {
    if (modalContent) {
      const userId = "user-id"; // Replace with actual user ID logic
      if (modalContent.answeredBy?.includes(userId)) {
        alert("You have already answered this card.");
        return;
      }

      const updatedCard = {
        ...modalContent,
        answeredBy: [...(modalContent.answeredBy || []), userId],
        color: answer === modalContent.correctAnswer ? "green" : "red",
      };

      fetch("/api/sse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: answer === modalContent.correctAnswer ? "correctAnswer" : "wrongAnswer",
          data: { cardId: modalContent.id, points: modalContent.points },
        }),
      });

      setCards((prevCards) =>
        prevCards.map((card) => (card.id === modalContent.id ? updatedCard : card))
      );
      setModalOpen(false);
    }
  };

  const handleStatusChange = (cardId: number, color: string) => {
    const updatedCard = cards.find((card) => card.id === cardId);
    if (updatedCard) {
      updatedCard.color = color;
      fetch("/api/sse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: "updateCardDetails", data: updatedCard }),
      });
    }
  };

  return (
    <div className="flex flex-row justify-evenly items-center">
      <div className="grid grid-cols-5 gap-4 p-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`p-4 border rounded cursor-pointer text-center ${
              selectedCards.includes(card.id)
                ? card.color === "green"
                  ? "bg-green-500 text-white"
                  : card.color === "red"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-500 text-white"
                : "bg-white"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.name}
            {admin && (
              <div className="mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(card.id, "green");
                  }}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Green
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(card.id, "red");
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  Red
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(card.id, "white");
                  }}
                  className="bg-white text-black px-2 py-1 rounded"
                >
                  White
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {modalOpen && modalContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">{modalContent.info}</h2>
            {modalContent.type === "multiple" ? (
              <div className="flex flex-col">
                {modalContent.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Ваш ответ"
                  className="border p-2 rounded mb-2 w-full"
                  onBlur={(e) => handleAnswer(e.target.value)}
                />
              </div>
            )}
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 w-fit">
        <Users />
      </div>
    </div>
  );
}
"use client"

import { useEffect, useState } from "react";
import { socket } from "../socket";

interface Card {
  id: number;
  name: string;
  info: string;
}

interface User {
  id: string;
  name: string;
  points: number;
}

const initialCards: Card[] = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  name: `Карточка ${index + 1}`,
  info: `Опиши ${index + 1}`,
}));

const Board = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [editCard, setEditCard] = useState<Card | null>(null);

  useEffect(() => {
    socket.on("updateCards", (cardIndex: number) => {
      setSelectedCards((prev) => [...prev, cardIndex]);
    });

    socket.on("updateCardDetails", (updatedCard: Card) => {
      setCards((prevCards) =>
        prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
      );
    });

    socket.on("resetCardColor", (cardIndex: number) => {
      setSelectedCards((prev) => prev.filter((id) => id !== cardIndex));
    });

    return () => {
      socket.off("updateCards");
      socket.off("updateCardDetails");
      socket.off("resetCardColor");
    };
  }, []);

  useEffect(() => {
    socket.on("updateUsers", (users: User[]) => {
      const currentUser = users.find((user) => user.id === socket.id);
      if (currentUser && currentUser.name === "admin") {
        setAdmin(true);
      }
    });

    return () => {
      socket.off("updateUsers");
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (!admin && !selectedCards.includes(index)) {
      socket.emit("selectCard", index);
    }
    setModalContent(cards[index].info);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEditCard = (card: Card) => {
    setEditCard(card);
    setModalOpen(true);
  };

  const handleSaveCard = () => {
    if (editCard) {
      socket.emit("updateCardDetails", editCard);
      setModalOpen(false);
      setEditCard(null);
    }
  };

  const handleResetCardColor = (cardIndex: number) => {
    socket.emit("resetCardColor", cardIndex);
  };

  return (
    <div className="flex">
      <div className="grid grid-cols-5 gap-4 p-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`p-4 border rounded cursor-pointer text-center ${
              selectedCards.includes(card.id) ? "bg-green-500 text-white" : "bg-white"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.name}
            {admin && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCard(card);
                  }}
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Ред.
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResetCardColor(card.id);
                  }}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Восс.
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            {editCard ? (
              <>
                <h2 className="text-xl mb-4">Ред. Карточку</h2>
                <input
                  type="text"
                  value={editCard.name}
                  onChange={(e) => setEditCard({ ...editCard, name: e.target.value })}
                  placeholder="Card Name"
                  className="border p-2 rounded mb-2 w-full"
                />
                <textarea
                  value={editCard.info}
                  onChange={(e) => setEditCard({ ...editCard, info: e.target.value })}
                  placeholder="Card Information"
                  className="border p-2 rounded mb-2 w-full"
                />
                <button
                  onClick={handleSaveCard}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Сохранить
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Отменить
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl mb-4">{modalContent}</h2>
                <button
                  onClick={closeModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Закрыть
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
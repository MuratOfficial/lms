"use client"
import { useEffect, useState } from "react";
import { socket } from "../socket";

const Board = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  useEffect(() => {
    socket.on("updateCards", (cardIndex: number) => {
      setSelectedCards((prev) => [...prev, cardIndex]);
    });

    return () => {
      socket.off("updateCards");
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (!selectedCards.includes(index)) {
      socket.emit("selectCard", index);
    }
    setModalContent(`Information about Card ${index + 1}`);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="grid grid-cols-5 gap-4 p-4">
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            className={`p-4 border rounded cursor-pointer text-center ${
              selectedCards.includes(index) ? "bg-green-500 text-white" : "bg-white"
            }`}
            onClick={() => handleCardClick(index)}
          >
            Card {index + 1}
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">{modalContent}</h2>
            <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
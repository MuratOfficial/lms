import Board from "../components/board";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Card Selection Board</h1>
      <Board />
    </div>
  );
}
import BackButton from "@/app/components/back-button";
import Board from "@/app/components/board";
import Users from "@/app/components/users";

export default function FindGame() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Игра Угадай фразу (по буткемповский)</h1>
      <div className="flex">
        <Board />
        <Users />
      </div>
      <BackButton title="Назад к играм"/>
    </div>
  );
}
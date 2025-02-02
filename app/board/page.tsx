import GameList from "./components/game-list";

export default function Board() {

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Игры</h1>
      <GameList/>
    </div>
  );
}
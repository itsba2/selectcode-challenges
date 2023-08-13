import "./App.css";
import Board from "./components/Board/Board";
import { initialBoard } from "./data/initialBoard";

function App() {
  return <Board board={initialBoard} />;
}

export default App;

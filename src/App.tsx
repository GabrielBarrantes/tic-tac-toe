import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Button from "./components/Button";

function App() {
  const [reset, setReset] = useState<boolean>(false);

  return (
    <>
      <h1 className="game-tittle">Tic-Tac-Toe ReactJS</h1>

      <Board reset={reset} setReset={setReset}></Board>

      <div style={{ marginTop: "20px" }}>
        <Button
          onClick={() => {
            setReset(true);
          }}
        ></Button>
      </div>
      <div className="confetti-container"></div>
    </>
  );
}

export default App;

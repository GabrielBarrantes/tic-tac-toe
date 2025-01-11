import { useEffect, useState } from "react";
import "./styles/Board.css";
import BoardSquare from "./BoardSquare";
import { BoardRow, checkVictory } from "../utils/utils";

interface Props {
  reset: boolean;
  setReset: (v: boolean) => void;
}

export default function Board({ reset, setReset }: Props) {
  const resetRows = Array.from({ length: 3 }, (_, rowIndex) => ({
    rowNumber: rowIndex,
    row: Array.from({ length: 3 }, (_, colIndex) => ({
      state: null,
      col: colIndex,
    })),
  }));

  const [turn, setTurn] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState(false);
  const [playsDone, setPlaysDone] = useState<number>(0);
  const [victoryId, setVictoryId] = useState<number>(-1);
  const [rows, setRows] = useState<BoardRow[]>(resetRows);

  useEffect(() => {
    if (reset) {
      setRows(resetRows);
      setReset(!reset);
      setTurn(true);
      setGameOver(false);
      setVictoryId(-1);
      setPlaysDone(0);
    }
  }, [reset, resetRows, setReset]);

  const handleClickOnSquare = (x: number, y: number) => {
    if (gameOver) {
      return;
    }
    setPlaysDone(playsDone + 1);
    const [victory, id] = checkVictory(rows, x, y, turn);
    if (victory) {
      setGameOver(true);
      setVictoryId(id);
    }
    setRows((prevRows) => {
      const newRows = prevRows.map((row) => {
        if (row.rowNumber === x) {
          return {
            ...row,
            row: row.row.map((cell) => {
              if (cell.col === y) {
                return { ...cell, state: turn };
              }
              return cell;
            }),
          };
        }
        return row;
      });
      return newRows;
    });

    setTurn(!turn);
  };

  return (
    <>
      {playsDone == 9 && !gameOver && <p>Draw!</p>}
      {gameOver && (
        <p>
          Player <strong>{!turn ? "1" : "2"}</strong> wins!!
        </p>
      )}
      {!gameOver && playsDone < 9 && (
        <p>
          Player <strong>{turn ? "1" : "2"}</strong>'s turn
        </p>
      )}
      <div className="justified-container">
        <div className="board-container">
          <table className="board">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.row.map((cell, colIndex) => (
                    <td key={colIndex} className="cell">
                      <BoardSquare
                        row={row.rowNumber}
                        col={cell.col}
                        turn={turn}
                        state={cell.state}
                        gameOver={gameOver}
                        onClick={handleClickOnSquare}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {victoryId == 4 && <div className="line4"></div>}
          {victoryId == 3 && <div className="line5"></div>}
          {victoryId == 5 && <div className="line6"></div>}
          {victoryId == 1 && <div className="line"></div>}
          {victoryId == 0 && <div className="line2"></div>}
          {victoryId == 2 && <div className="line3"></div>}
          {victoryId == 7 && <div className="line7"></div>}
          {victoryId == 6 && <div className="line8"></div>}
        </div>
      </div>
    </>
  );
}

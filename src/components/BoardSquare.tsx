import "./styles/BoardSquare.css";

interface Props {
  row: number;
  col: number;
  turn: boolean;
  gameOver: boolean;
  state: null | boolean;
  onClick: (x: number, y: number) => void;
}

function BoardSquare({ row, col, turn, gameOver, state, onClick }: Props) {
  const handleClick = () => {
    if (gameOver) {
      return;
    }
    if (state === null) {
      onClick(row, col);
    }
  };

  return (
    <>
      <div onClick={handleClick} className="square-container">
        {state === true && <div className="circle"></div>}
        {state === false && <div className="cross"></div>}
        {state === null && turn && !gameOver && (
          <div className="circle blank-square"></div>
        )}
        {state === null && !turn && !gameOver && (
          <div className="cross blank-square"></div>
        )}
        {state === null && gameOver && <div className="blank"></div>}
      </div>
    </>
  );
}

export default BoardSquare;

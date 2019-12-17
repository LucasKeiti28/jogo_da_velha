import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);

  const onHandleClick = index => {
    if (winner) {
      console.log("Jogo Finalizado");
      return null;
    }
    if (board[index] !== "") return null;
    setBoard(
      board.map((item, itemIndex) =>
        itemIndex === index ? currentPlayer : item
      )
    );
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    const possibleWins = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[9]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]]
    ];

    possibleWins.forEach(cells => {
      if (cells.every(cell => cell === "O")) {
        return setWinner("O");
      }
      if (cells.every(cell => cell === "X")) {
        return setWinner("X");
      }
    });

    checkDraw();
  };

  const checkDraw = () => {
    if (board.every(item => item !== "")) {
      setWinner("E");
    }
  };

  useEffect(checkWinner);

  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(Array(9).fill(""));
    setWinner(null);
  };

  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (
          <div
            key={index}
            className={`cell ${item}`}
            onClick={() => onHandleClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {winner && (
        <footer>
          {winner === "E" ? (
            <h2 className="winner-message">EMPATOU!</h2>
          ) : (
            <h2 className="winner-message">
              {" "}
              <span className={winner}>{winner} </span>
              VENCEU!{" "}
            </h2>
          )}

          <button onClick={resetGame}>Recomeçar Jogo</button>
        </footer>
      )}
    </main>
  );
}

export default App;

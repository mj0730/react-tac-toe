import React, { useEffect, useState } from 'react';
import Square from './Square';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const boardStyle = {
  backgroundColor: '#eee',
  width: '208px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid',
};

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
};

const rowStyle = {
  display: 'flex',
};

const instructionsStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const Board = () => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [turnCount, setTurnCount] = useState(0);
  const [boardStatus, setBoardStatus] = useState(new Array(9).fill(null));
  const [winner, setWinner] = useState('');

  useEffect(() => {
    if (turnCount >= 5) {
      console.log('checking for solutions');
      turnCount % 2 === 0 ? checkSolutions(boardStatus, 'O') : checkSolutions(boardStatus, 'X');
    }
  }, [turnCount]);

  const reset = () => {
    let clearBoard = new Array(9).fill(null);
    setBoardStatus(clearBoard);
    setTurnCount(0);
    setCurrentPlayer(1);
    setWinner('');
    console.log('Board reset');
  };

  const nextTurn = (currentPlayer) => {
    currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
    setTurnCount(turnCount + 1);
  };

  function addMark(value, board, set) {
    if (winner) {
      alert('Game is complete. Reset the board to play again');
      return;
    }
    if (board[value] !== null) {
      alert('Select an empty space.');
    } else {
      let newValues = boardStatus.slice();
      newValues[value] = currentPlayer === 1 ? 'X' : 'O';
      set(newValues);
      nextTurn(currentPlayer);
    }
  }

  const checkSolutions = (board, player) => {
    let winner = '';
    const solves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < solves.length; i++) {
      let [first, second, third] = solves[i];
      if (board[first] && board[first] === board[second] && board[second] === board[third]) {
        setWinner(player);
        return;
      }
    }
    if (turnCount === 9 && winner === '') winner = 'Draw';
    setWinner(winner);
  };

  return (
    <div style={containerStyle} className='gameBoard'>
      <div className='status' style={instructionsStyle}>
        Next player: {currentPlayer}
      </div>
      <div className='winner' style={instructionsStyle}>
        {winner !== '' && `Winner: ${winner}`}
      </div>
      <button style={buttonStyle} onClick={reset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className='board-row' style={rowStyle}>
          <Square
            value={0}
            board={boardStatus}
            set={setBoardStatus}
            mark={() => addMark(0, boardStatus, setBoardStatus)}
          />
          <Square value={1} board={boardStatus} mark={() => addMark(1, boardStatus, setBoardStatus)} />
          <Square value={2} board={boardStatus} mark={() => addMark(2, boardStatus, setBoardStatus)} />
        </div>
        <div className='board-row' style={rowStyle}>
          <Square value={3} board={boardStatus} mark={() => addMark(3, boardStatus, setBoardStatus)} />
          <Square value={4} board={boardStatus} mark={() => addMark(4, boardStatus, setBoardStatus)} />
          <Square value={5} board={boardStatus} mark={() => addMark(5, boardStatus, setBoardStatus)} />
        </div>
        <div className='board-row' style={rowStyle}>
          <Square value={6} board={boardStatus} mark={() => addMark(6, boardStatus, setBoardStatus)} />
          <Square value={7} board={boardStatus} mark={() => addMark(7, boardStatus, setBoardStatus)} />
          <Square value={8} board={boardStatus} mark={() => addMark(8, boardStatus, setBoardStatus)} />
        </div>
      </div>
    </div>
  );
};

export default Board;

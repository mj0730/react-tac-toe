import React, { useState } from 'react';

const squareStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'white',
};

const Square = ({ value, board, mark }) => {
  return (
    <div className='square' style={squareStyle} onClick={mark}>
      {board[value]}
    </div>
  );
};

export default Square;

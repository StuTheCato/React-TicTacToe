import React, { useState } from 'react';

function Cell({ value, onClick }) {
    return (
        <button className={`cell ${value === 'X' ? 'x-cell' : 'o-cell'}`} onClick={onClick}>
            {value}
        </button>
    );
}

function Board() {
    const [cells, setCells] = useState(Array(9).fill(''));
    const [turn, setTurn] = useState('X');
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        if (cells[index] !== '' || winner) {
            return;
        }
        const newCells = [...cells];
        newCells[index] = turn;
        setCells(newCells);
        setTurn(turn === 'X' ? 'O' : 'X');
        checkWinner(newCells);
    };

    const checkWinner = (newCells) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (newCells[a] && newCells[a] === newCells[b] && newCells[a] === newCells[c]) {
                setWinner(newCells[a]);
                return;
            }
        }
        const isDraw = newCells.every((cell) => cell !== '');
        if (isDraw) {
            setWinner('Draw');
        }
    };

    const renderCell = (index) => (
        <Cell value={cells[index]} key={index} onClick={() => handleClick(index)} />
    );

    return (
        <div className="board" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {winner ? (
                <h1>{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</h1>
            ) : (
                <p>
                    Turn: {turn}
                </p>
            )}
            <div className="grid">
                {Array(3)
                    .fill(null)
                    .map((_, row) => (
                        <div key={row} className="row">
                            {Array(3)
                                .fill(null)
                                .map((_, col) => renderCell(row * 3 + col))}
                        </div>
                    ))}
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="game" style={{ backgroundColor: '#f2f2f2', height: '100vh' }}>
            <Board />
        </div>
    );
}

export default App;
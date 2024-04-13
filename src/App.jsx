import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  // NULL = NO HAY GANADOR, FALSE = EMPATE
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // IMPIDE QUE SE PUEDA ELEGIR LA MISMA CASILLA
    if (board[index]) return
    // ACTUALIZAR EL TABLERO
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // CAMBIAR EL TURNO
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // REVISAR SI HAY GANADOR
    const newWinner = checkWinner[newBoard]
    if (newWinner) {
      setWinner[newWinner]
    }
  }

  const [turn, setTurn] = useState(TURNS.X)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      } else if (boardToCheck === null) {
        alert("EMPATE")
      }
    }
  }

  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <section className="game">
        {
          board.map((...index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

    </main>
  )
}

export default App

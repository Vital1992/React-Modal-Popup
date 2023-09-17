import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom'

const BOARD_STYLE = {
  width: '500px',
  height: '500px',
  border: '5px solid',
  display: 'flex',
  'flex-direction': 'column',
  'flex-wrap': 'wrap',
  resize: 'both',
  overflow: 'auto',
  'flex-direction': 'row',
}

const CELL_STYLE = {
  width: 'calc(100% / 3)',
  height: 'calc(100% / 3)',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  'font-size': '90px',
}

const CELL_BORDER = {
  width: 'calc(100% / 3.04)',
  height: 'calc(100% / 3.04)',
  border: '1px solid',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
}

const WINNER_STYLE = {
  display: 'flex',
  'flex-direction': 'row',
  'font-size': '20px',
  margin: '20px',
}

export default function TicTac() {
  const board = Array.apply(null, Array(9)).map(Number.prototype.valueOf,0);

  const [playerOne, setPlayerOne] = useState(true);
  const [fullField, setFullField] = useState(false);
  const [boardRes, setBoardRes] = useState(board);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    const firstRow = boardRes.slice(0, 3)
    const secondRow = boardRes.slice(3, 6)
    const thirdRow = boardRes.slice(6, 9)
    const main = []
    main.push(firstRow)
    main.push(secondRow)
    main.push(thirdRow)

    function findWinner () {
        let diagonalLeft = []
        let diagonalRight = []
        for (let i = 0; i < main.length; i++) {

            let horizontal = []
            let vertical = []

            if (main[0][0] === main[i][i] && typeof main[i][i] !== 'number') {
                diagonalLeft.push(main[i][i])
            }

            if (main[0][2] === main[i][main.length - (i + 1)] && typeof main[i][main.length - (i + 1)] !== 'number') {
                diagonalRight.push(main[i][main.length - (i + 1)])
            }

            if (diagonalRight.length === 3) {
                return diagonalRight
            } 

            if (diagonalLeft.length === 3) {
                return diagonalLeft
            } 

            for (let j = 0; j < main[i].length; j++) {
                if (main[i][0] === main[i][j] && typeof main[i][j] !== 'number') {
                    horizontal.push(main[i][j])
                }

                if (main[0][i] === main[j][i] && typeof main[j][i] !== 'number') {
                    vertical.push(main[j][i])
                }

                if (vertical.length === 3) {
                    return vertical
                } 

                if (horizontal.length === 3) {
                    return horizontal
                } 
            }
        }
    }

    if (findWinner() && typeof findWinner()[0] !== 'number') {
      setWinner(findWinner()[0] === 'X' ? 'Player One' : 'Player Two')
    }

    const table = document.querySelectorAll("div a");
    if (table.length >= 9) {
      setFullField(true)
    }

    console.log(boardRes)
  })

  function getAvailableCells () {
    const cells = [] 
    boardRes.forEach((cur, idx) => {
      if (typeof cur === 'number'){
        cells.push(idx)
      }
    })
    console.log('setAvailableCells')
    return cells
  }

  useEffect(()=> {
    if (!playerOne){
      console.log(getAvailableCells())
      const random = Math.floor(Math.random() * getAvailableCells().length);
      let newBoard = boardRes
      console.log('random')
      console.log(getAvailableCells()[random])
      newBoard[getAvailableCells()[random]] = 'O'
      setBoardRes(newBoard)
      setPlayerOne(!playerOne)
    }
  },[playerOne])

  return (
    <>
      {winner ? <a style={WINNER_STYLE}>Winner: {winner}</a> : ''}
      <div style={BOARD_STYLE} onClick={() => {
        if (winner || fullField) {
          console.log('set')
          console.log(board)
          setWinner('')
          setBoardRes(board)
          setFullField(false)
        }
      }}>
        {boardRes.map((val, idx) => {
          return (
            <div style={CELL_BORDER} onClick={() => {
              if (typeof val === 'number'){
                let newBoard = boardRes

                if (playerOne) {
                  newBoard[idx] = 'X'
                  setBoardRes(newBoard)
                }
                setPlayerOne(!playerOne)
              }
              }}>
              {typeof val !== 'number' ? <a value={val} style={CELL_STYLE}>{val}</a> : ''}
            </div>
          )
        })}
      </div>
    </>
  )
}

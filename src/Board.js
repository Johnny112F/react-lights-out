import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=6, ncols=6, chanceLightStartsOn=.50 }) {
  const [board, setBoard] = useState(createBoard());


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let y = 0; y < nrows; y++) {
      let row = [];
      for(let x = 0; x < ncols; x++) {
        //push true or false boolean to array.
        row.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(row);
    }
    //TODO: return board filled with booleans determining on or off lights.
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(bool => !bool));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      // if this coord is actually on board, flip it.
      const flipCell = (y, x, boardCopy) => {
        

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row])

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy)
      flipCell(y, x+1, boardCopy)
      flipCell(y, x-1, boardCopy)
      flipCell(y+1, x, boardCopy)
      flipCell(y-1, x, boardCopy)

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  function showWinner() {
    return (
      <div>You Won!!!</div>
    )
  }

  // make table board
  function mapLightsToBoard() {
      return board.map((row, y) => {
        return row.map((cell, x) => {
          return <Cell
              isLit={board[y][x]}
              flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}

      />
        })
    });
  }
  //if winner return hasWon or else continue.
  return (!hasWon() ?
      <div style={{
      display: `grid`,
      gridTemplateColumns: `repeat(${ncols}, 100px)`,
      gridTemplateRows: `repeat(${nrows}, 100px)`
      
      }}>
      {mapLightsToBoard()}</div>
    :
    showWinner()
  )
}



export default Board;

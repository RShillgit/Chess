import { useContext, useEffect, useState } from "react";
import { type Piece, type Player } from "./types/chessTypes";
import ChessBoard from "./components/ChessBoard";
import { useChessContext } from "./context/chessContext";

const App = () => {

  // Each chess board will start with 32 pieces (16 for each player)

  // Each player will have 8 pawns, 2 rooks, 2 knights, 2 bishops, 1 queen, 1 king

  // Pawns can move straight 1 box, but attack at an angle

  // Rooks can move 1+ boxes in linear directions,

  // Knights can move in an L shape either 2-1 or 1-2

  // Biships can move 1+ boxes in a diagonal direction

  // Queen can move 1+ boxes in a linear or diagonal direction

  // King can move 1 box in any direction

  // Promotions: When a pawn crosses the board it can be exchanged for any dead piece 

  /*
    Implimentation: 
      - User & ai objects 
          ex: {
            pices: array of 16 pices[];
            turn: true/false 
          }
      - Each piece
        - ex: {
            type: "pawn"
            color: "light"
            alive: true,
            position: "b4"
          }
      - Movement: 
          Onhover highlight green the areas that the piece is allowed to move based on if it is occipied and the piece's movement capabilities, and red the areas it cannot
          Onclick if the piece can move there, move it there.  If an enemy is at that location, kill it.
          After each move check if the king is in check/checkmate
            - If he is checked, set his checked property to true which will higlight him and only allow for him to move to places that wont put him in check
          
          
  */

  const { user, ai, selectedChessPiece, selectPiece } = useChessContext();

  const graveyardStyles = [
    ""
  ];

  useEffect(() => {
    console.log(user)
    console.log(ai)
  }, [user, ai])

  // Displays dead pieces
  const pieceGraveyard = (player: 'user' | 'ai') => {

    if (player === 'user') {

      return (
        <div className="grid grid-cols-2 gap-1">
          {user.pieces.map(piece => {
            if (!piece.alive) {
              return (
                <div key={piece.id} className="flex justify-center items-center bg-white w-10 h-10 border-4 border-white 
                  rounded-full text-black text-xs"
                >
                  {piece.type}
                </div>
              )
            } 
          })}
        </div>
      )

    }
    else if (player === 'ai') {

      return (
        <div className="grid grid-cols-2 gap-1">
          {ai.pieces.map(piece => {
            if (!piece.alive) {
              return (
                <div key={piece.id} className="flex justify-center items-center bg-black w-10 h-10 border-4 border-black 
                  rounded-full text-white text-xs"
                >
                  {piece.type}
                </div>
              )
            } 
          })}
        </div>
      )

    }
    else return <></>;

  }

  return (
    <div>
      <h1 className="flex justify-center text-3xl translate-y-">Chess</h1>

      <div className="flex justify-center p-4">

        <div className="py-4 pb-4">
          <h1 className="text-2xl">You</h1>
          {pieceGraveyard('user')}
        </div>

        <div className="flex justify-center">
          <ChessBoard />
        </div>

        <div className="py-4 pb-4">
          <h1 className="text-2xl">Enemy</h1>
          {pieceGraveyard('ai')}
        </div>

      </div>

    </div>
  )

}

export default App;
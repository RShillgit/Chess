import { useContext, useEffect, useState } from "react";
import { type Piece, type Player } from "./types/chessTypes";
import ChessBoard from "./components/ChessBoard";
import { useChessContext } from "./context/chessContext";

import queenImg from './assets/queen.png';
import rookImg from './assets/rook.png';
import knightImg from './assets/knight.png';
import bishopImg from './assets/bishop.png';

const App = () => {

  const { user, ai, selectedChessPiece, pawnForPromotion, selectPiece, declareWinner, winner, restartGame, promotePawn } = useChessContext();

  const graveyardStyles = [
    ""
  ];

  useEffect(() => {
    console.log(user)
    console.log(ai)
    console.log(pawnForPromotion)
  }, [])

  // Modals
  useEffect(() => {

    // Winner modal
    if (winner) {
      const dialog = document.getElementById('winner-modal') as HTMLDialogElement;

      if (dialog) dialog.showModal();
    }

    // Promotion modal
    else if (pawnForPromotion) {
      const pawnModal = document.getElementById('promotion-modal') as HTMLDialogElement;

      if (pawnModal) pawnModal.showModal();
    }

  }, [winner, pawnForPromotion])

  const restart = () => {
    const dialog = document.getElementById('winner-modal') as HTMLDialogElement;

    if (dialog) {
      dialog.close();
    }

    restartGame();
  }

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

  // Promotes pawn
  const promotion = (type: 'queen' | 'rook' | 'bishop' | 'knight') => {

    const pawnModal = document.getElementById('promotion-modal') as HTMLDialogElement;

    if (pawnModal) pawnModal.close();

    if (pawnForPromotion) promotePawn(pawnForPromotion, type);

  }

  return (
    <div className="bg-neutral-800 min-h-screen">
      <h1 className="flex pt-4 font-bold text-white justify-center text-3xl translate-y-">Chess</h1>

      <div className="flex justify-center p-4">

        <div className="py-4 pb-4">
          <h1 className="text-2xl pb-4 text-center text-white">You</h1>
          {pieceGraveyard('user')}
        </div>

        <div className="flex justify-center">
          <ChessBoard />
        </div>

        <div className="py-4 pb-4">
          <h1 className="text-2xl pb-4 text-center text-white">Enemy</h1>
          {pieceGraveyard('ai')}
        </div>

      </div>

      {winner
        ?
        <>
          <dialog id="winner-modal" className="flex justify-center items-center flex-col w-6/12 rounded-lg bg-black bg-opacity-90" >

            <h1 className="text-3xl text-white font-bold text-center">{winner.name === 'ai' ? 'You Lose!' : 'You Win!'}</h1>

            <button onClick={restart} className="border text-white border-white p-1 rounded-md text-lg
              hover:shadow-restart-button"
            >
              Restart
            </button>
          </dialog>
        </>
        :<></>
      }

      {pawnForPromotion
        ?
        <>
          <dialog id="promotion-modal" className="flex flex-col justify-center items-center w-6/12 rounded-lg bg-black bg-opacity-90">
            <h1 className="text-3xl text-white font-bold text-center">Pawn Promoted!</h1>
            <h2 className="text-2xl text-white font-bold text-center">Choose a piece to replace your pawn.</h2>
            <div className="flex justify-center">
              <img className="white-piece cursor-pointer w-16 hover:piece-hover" src={queenImg} alt="Queen" onClick={() => promotion('queen')}></img>
              <img className="white-piece cursor-pointer w-16 hover:piece-hover" src={rookImg} alt="Rook" onClick={() => promotion('rook')}></img>
              <img className="white-piece cursor-pointer w-16 hover:piece-hover" src={bishopImg} alt="Bishop" onClick={() => promotion('bishop')}></img>
              <img className="white-piece cursor-pointer w-16 hover:piece-hover" src={knightImg} alt="Knight" onClick={() => promotion('knight')}></img>
            </div>
          </dialog>
        </>
        :<></>
      }

    </div>
  )

}

export default App;
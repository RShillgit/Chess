import React, { FC, ReactNode, useEffect, useState } from "react"
import { useChessContext } from "../context/chessContext";
import { Piece } from "../types/chessTypes";

import pawnImg from '../assets/pawn.png';
import rookImg from '../assets/rook.png';
import knightImg from '../assets/knight.png';
import bishopImg from '../assets/bishop.png';
import queenImg from '../assets/queen.png';
import kingImg from '../assets/king.png';

type boardBox = {
    position: string,
    color: string,
    occupied: boolean
}

const ChessBoard = () => {

    const { user, ai, selectPiece, selectedChessPiece, aiKingChecked, userKingChecked, moveChessPiece, moveAiPiece } = useChessContext();

    const [board, setBoard] = useState<boardBox[]>([]);

    const vertical = [1, 2, 3, 4, 5, 6, 7, 8];
    const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // On mount create the board
    useEffect(() => {

        const boardArray:boardBox[] = [];

        for(let i = 7; i >= 0; i--) {

            for(let j = 0; j < 8; j++) {

                const boardItemObject: boardBox = {
                    position: `${horizontal[j]}${vertical[i]}`,
                    color: '',
                    occupied: false
                }

                // Double even === dark
                if (i % 2 === 0 && j % 2  === 0) boardItemObject.color = 'dark'

                // i Odd j Even === light
                else if (i % 2 !== 0 && j % 2 === 0) boardItemObject.color = 'light'

                // i Even j Odd === light
                else if (i % 2 === 0 && j % 2 !== 0) boardItemObject.color = 'light'

                // Double odd === dark
                else if (i % 2 !== 0 && j % 2  !== 0) boardItemObject.color = 'dark'

                boardArray.push(boardItemObject);

            }

        }

        setBoard(boardArray)

    }, [])

    // On AI turn change impliment movement
    useEffect(() => {

        if (ai.turn) {

            // See if any of the AI pieces can eleminate a user piece
            for (let i = 0; i < ai.pieces.length; i++) {
                for (let j = 0; j < user.pieces.length; j++) {

                    if (ai.pieces[i].alive && user.pieces[j].alive) {
                        if (ai.pieces[i].canMove(user.pieces[j].position, user.pieces, ai.pieces)) {
                            moveAiPiece(ai.pieces[i], user.pieces[j].position);
                            return;
                        }

                    }
                }
            }
            // If not, select a random piece and move it to a random location
            randomlyMovePiece();

        }

    }, [ai])

    // Checks if piece exists on location
    const checkPieceLocation = (position: string) => {

        const userPieceExists = user.pieces.find(piece => piece.alive && piece.position === position);
        const aiPieceExists = ai.pieces.find(piece => piece.alive && piece.position === position);

        if (userPieceExists) {

            if (userPieceExists.alive) {

                return (
                    <>
                        
                        <div 
                            id={`piece-${userPieceExists.position}`}
                            onClick={
                                user.turn 
                                ? 
                                    () => {
                                        if(userKingChecked && userPieceExists.type !== 'king') return;
                                        else selectPiece(userPieceExists);
                                    } 
                                : undefined
                            }
                        >
                            <img className={user.turn && !userKingChecked ? 'white-piece cursor-pointer hover:piece-hover'
                                : `${userPieceExists.checked ? "checked-piece cursor-pointer" : "white-piece"}`
                            }
                                src={determineCorrectImg(userPieceExists)} alt="" 
                            />
                        </div>
                    </>
                )
            }
        }
        
        if (aiPieceExists) {

            if(aiPieceExists.alive) {
                return (
                    <div>
                        <img className={aiPieceExists.type === 'king' && aiKingChecked 
                                ? 'checked-piece' 
                                : ''
                            } 
                            src={determineCorrectImg(aiPieceExists)} alt="" 
                        />
                    </div>
                )
            }
        }

    }

    // Board box hover to show if peice can move there or not
    const checkViableMove = (e: React.MouseEvent) => {

        // If a piece is selected
        if (selectedChessPiece) {

            // Box contains one of user's pieces
            const userPieceExists = user.pieces.find(piece => piece.alive && piece.position === e.currentTarget.id);
            if (userPieceExists) return false;

            const moveViable = selectedChessPiece.canMove(e.currentTarget.id, ai.pieces, user.pieces);
            
            // Green if piece can go there
            if (moveViable) {
                e.currentTarget.classList.add("hover:shadow-valid-hover", "cursor-pointer", "hover:relative", "hover:z-10");
                return true;
            }
            // Red if the piece cannot go there
            else {
                e.currentTarget.classList.add("hover:shadow-invalid-hover", "cursor-pointer", "hover:relative", "hover:z-10");
                return false;
            }
        }
        // Else Remove hover classes from target and return false
        e.currentTarget.classList.remove("hover:shadow-valid-hover", "hover:shadow-invalid-hover",
            "hover:relative", "hover:z-10", "cursor-pointer")
        return false;
    }

    // Moves chess piece to desired location
    const movePiece = (e: React.MouseEvent) => {

        if (selectedChessPiece) {
            if(checkViableMove(e)) {
                moveChessPiece(e.currentTarget.id, ai);
            }
        }
    }

    // Randomly moves AI pieces
    function randomlyMovePiece(): void {

        let randomPiece;

        // If the king is checked, attempt to move the king

        /**
            TODO: can make this better because it currently will look to move 
            the king to any of the 64 squares on the board, when the king can 
            only possibly move to 8 boxes, maybe determing the 8 positions it 
            can go to then loop through those

        */


        if (aiKingChecked) {
            const king = ai.pieces.find(piece => piece.type === 'king');

            randomPiece = king;
        }
        
        // Random piece
        randomPiece = ai.pieces[Math.floor(Math.random() * ai.pieces.length)];

        if (randomPiece.alive) {

            // Random box
            const randomBox = board[Math.floor(Math.random() * board.length)].position;

            if(randomPiece.canMove(randomBox, user.pieces, ai.pieces)) {
                return moveAiPiece(randomPiece, randomBox);
            }
            else return randomlyMovePiece();
        } else return randomlyMovePiece();
        
    }

    const determineCorrectImg = (piece: Piece) => {
        if (piece.type === 'pawn') return pawnImg;
        else if (piece.type === 'rook') return rookImg;
        else if (piece.type === 'knight') return knightImg;
        else if (piece.type === 'bishop') return bishopImg;
        else if (piece.type === 'queen') return queenImg;
        else if (piece.type === 'king') return kingImg;
    }

    return (
        <div className="p-4 grid justify-items-center items-center grid-cols-8 grid-rows-boardRows w-screen-1/2 h-boardHeight ">

            {board.map((box, i) => {
                return (   
                    <div key={i} id={box.position} className={`flex justify-center items-center w-full h-full border border-slate-950
                        ${box.color === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-400 text-black'}`}
                        onMouseOver={(e) => checkViableMove(e)}
                        onMouseOut={(e) => {
                                if (selectedChessPiece) {
                                    e.currentTarget.classList.remove("hover:shadow-valid-hover", "hover:shadow-invalid-hover",
                                    "hover:relative", "hover:z-10", "cursor-pointer")
                                }
                            }
                        }
                        onClick={(e) => movePiece(e)}
                    >{box.position}

                        {checkPieceLocation(box.position)}
                    
                    </div>
                )
            })}

        </div>
    )

}

export default ChessBoard;
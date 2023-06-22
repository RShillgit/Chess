import React, { FC, ReactNode, useEffect, useState } from "react"
import { useChessContext } from "../context/chessContext";
import { Piece, Player } from "../types/chessTypes";

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

            // Checked king
            if (aiKingChecked) {
                moveCheckedKing();
                return;
            }

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
            return;

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
                            onClick={() => user.turn ? selectPiece(userPieceExists) : undefined }
                        >
                            <img className={user.turn && !userKingChecked ? 'white-piece cursor-pointer hover:piece-hover'
                                : `${userPieceExists.checked ? "checked-piece cursor-pointer" : "white-piece cursor-pointer hover:piece-hover"}`
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
            if (moveViable && !kingWillBeChecked(selectedChessPiece, e.currentTarget.id, user, ai)) {
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

        const randomPiece = ai.pieces[Math.floor(Math.random() * ai.pieces.length)];

        if (randomPiece && randomPiece.alive) {

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

    const moveCheckedKing = () => {

        const king = ai.pieces.find(piece => piece.alive && piece.type === 'king');

        if (king) {

            // Determine all of the kings possible moves
            const allPossibleMoves = [
                `${String.fromCharCode(king.position[0].charCodeAt(0) - 1)}${Number(king.position[1]) + 1}`, // Left 1, Up 1
                `${king.position[0]}${Number(king.position[1]) + 1}`, // Up 1
                `${String.fromCharCode(king.position[0].charCodeAt(0) + 1)}${Number(king.position[1]) + 1}`, // Right 1, Up 1
                `${String.fromCharCode(king.position[0].charCodeAt(0) - 1)}${king.position[1]}`, // Left 1
                `${String.fromCharCode(king.position[0].charCodeAt(0) + 1)}${king.position[1]}`, // Right 1
                `${String.fromCharCode(king.position[0].charCodeAt(0) - 1)}${Number(king.position[1]) - 1}`, // Left 1, down 1
                `${king.position[0]}${Number(king.position[1]) - 1}`, // Down 1
                `${String.fromCharCode(king.position[0].charCodeAt(0) + 1)}${Number(king.position[1]) - 1}`, // Right 1, down 1
            ]

            for (let i = 0; i < allPossibleMoves.length; i++) {

                if (king.canMove(allPossibleMoves[i], user.pieces, ai.pieces)) {
                    return moveAiPiece(king, allPossibleMoves[i]);
                }
            }

        }
        return;
    }

    // Checks if the move you're about to make will put your king in check
    const kingWillBeChecked = (piece : Piece, location: string, user: Player, enemy: Player) => {

        const king = user.pieces.find(p => p.type === 'king');

        if (king) {

            // A copy used to determine the future after this move
            let enemyPiecesIncludingThisMove: Piece[] = [];

            const aliveEnemyPieces = enemy.pieces.filter(piece => piece.alive);

            // Pieces array if the piece was moved to the location, that way we can assess if it will be checked there
            const usersPiecesInludingThisMove = user.pieces.map(p => {

                if (p.id === piece.id) {
                    const futurePiece = {
                        ...p,
                        position: location
                    }

                    // If there is an enemy here, eliminate them in the "future" array
                    const enemyAtThisLocation = enemy.pieces.find(p => p.alive && p.position === location);
                    if (enemyAtThisLocation) {
                        
                        enemyPiecesIncludingThisMove = enemy.pieces.map(p => {
                            if (p.id === enemyAtThisLocation.id) {
                                const futurePiece = {
                                    ...p,
                                    alive: false
                                }
                                return futurePiece;
                            } else {
                                enemyPiecesIncludingThisMove = [...enemy.pieces];
                                return p;
                            }
                        })
                        
                    } 
                    
                    else {
                        enemyPiecesIncludingThisMove = [...enemy.pieces];
                    }

                    return futurePiece;
                    
                } 
                return p;
            })

            const newKing = usersPiecesInludingThisMove.find(p => p.type === 'king');
    
            // If it will be checked at the location return false 
            if (newKing && aliveEnemyPieces.find(p => p.canMove(newKing.position, usersPiecesInludingThisMove, enemyPiecesIncludingThisMove))) return true;
            else return false;
        } else return false;
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
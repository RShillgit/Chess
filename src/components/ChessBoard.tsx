import React, { ReactNode, useEffect, useState } from "react"
import { useChessContext } from "../context/chessContext";
import { Piece } from "../types/chessTypes";

type boardBox = {
    position: string,
    color: string,
    occupied: boolean
}

const ChessBoard = () => {

    const { user, ai, selectPiece, selectedChessPiece, moveChessPiece } = useChessContext();

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

    // Checks if piece exists on location
    const checkPieceLocation = (position: string) => {

        const userPieceExists = user.pieces.find(piece => piece.position === position);
        const aiPieceExists = ai.pieces.find(piece => piece.position === position);

        if (userPieceExists ) {
            return (
                <div className="bg-white w-1/2 h-1/2 border-4 border-white rounded-full cursor-pointer hover:border-yellow-500 focus:bg-red-700"
                    id={`piece-${userPieceExists.position}`}
                    onClick={() => selectPiece(userPieceExists)}
                >
                    <p className="text-xs text-black">{userPieceExists.type}</p>
                </div>
            )
        }
        else if (aiPieceExists) {
            return (
                <div className="bg-black w-1/2 h-1/2 border-4 border-black rounded-full"></div>
            )
        }
    }

    // Board box hover to show if peice can move there or not
    const checkViableMove = (e: React.MouseEvent) => {

        // If a piece is selected
        if (selectedChessPiece) {

            // Box contains one of user's pieces
            const userPieceExists = user.pieces.find(piece => piece.position === e.currentTarget.id);
            if (userPieceExists) return false;

            const moveViable = selectedChessPiece.canMove(e.currentTarget.id)
            
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
                moveChessPiece(e.currentTarget.id);
            }
        }
    }

    return (
        <div className="p-4 grid justify-items-center items-center grid-cols-8 w-screen-1/2 h-boardHeight ">

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
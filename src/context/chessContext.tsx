import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Piece, Player } from "../types/chessTypes";
import { generateInitialPieces, createUser } from "../utils/helperFunctions";

type ChessContextProviderProps = {
    children: ReactNode
}

type ChessContext = {
    user: Player,
    ai: Player,
    selectedChessPiece: (Piece | null),
    selectPiece: (piece: Piece | null) => void,
}

const chessContext = createContext({} as ChessContext)

export function useChessContext() {
    return useContext(chessContext)
}

export function ChessContextProvider( { children }: ChessContextProviderProps ) {

    // User & Ai
    const [user, setUser] = useState<Player>(() => createUser('user'));
    const [ai, setAi] = useState<Player>(() => createUser('ai'));
    const [selectedChessPiece, setSelectedChessPiece] = useState<Piece | null>(null);

    useEffect(() => {
        console.log(selectedChessPiece)
    }, [selectedChessPiece])

    const selectPiece = (piece: Piece | null) => {

        const selectedPieceStyles = [
            "bg-yellow-500", "border-yellow-500", "scale-125", "drop-shadow-selected-piece", 
            "translate-x-1", "-translate-y-1"
        ];

        if (piece) {
            setSelectedChessPiece((prevPiece) => {
                if(prevPiece) {
                    const prevSelectedPiece = document.getElementById(`piece-${prevPiece.position}`);
                    prevSelectedPiece?.classList.remove(...selectedPieceStyles);
                }
                const chessPiece = document.getElementById(`piece-${piece.position}`);
                chessPiece?.classList.add(...selectedPieceStyles);
                return piece;
            })
        } else {
            setSelectedChessPiece((prevPiece) => {
                if(prevPiece) {
                    const prevSelectedPiece = document.getElementById(`piece-${prevPiece.position}`);
                    prevSelectedPiece?.classList.remove(...selectedPieceStyles);

                }
                return null;
            })
        }
    }

    /*
    const moveChessPiece = () => {

    }
    */

    return (
        <chessContext.Provider value={{user, ai, selectedChessPiece, selectPiece}} >
            {children}
        </chessContext.Provider>
    )


}
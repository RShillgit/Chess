import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Piece, Player } from "../types/chessTypes";
import { generateInitialPieces, createUser } from "../utils/helperFunctions";

type ChessContextProviderProps = {
    children: ReactNode
}

type ChessContext = {
    user: Player,
    ai: Player,
}

const chessContext = createContext({} as ChessContext)

export function useChessContext() {
    return useContext(chessContext)
}

export function ChessContextProvider( { children }: ChessContextProviderProps ) {

    // User & Ai
    const [user, setUser] = useState<Player>(() => createUser('user'));
    const [ai, setAi] = useState<Player>(() => createUser('ai'));

    /*
    const moveChessPiece = () => {

    }
    */

    return (
        <chessContext.Provider value={{user, ai}} >
            {children}
        </chessContext.Provider>
    )


}
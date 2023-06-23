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
    aiKingChecked: boolean,
    userKingChecked: boolean,
    winner: (Player | null),
    selectPiece: (piece: Piece | null) => void,
    moveChessPiece: (newPosition: string, enemy: Player) => void,
    moveAiPiece: (piece: Piece, destination: string) => void,
    declareWinner: (player: Player) => void,
    restartGame: () => void,
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

    // Checked Kings
    const [userKingChecked, setUserKingChecked] = useState(false);
    const [aiKingChecked, setAiKingChecked] = useState(false);

    const [winner, setWinner] = useState<Player | null>(null);

    // On mount check for checked kings
    useEffect(() => {
        opponentKingIsChecked();
    }, [])

    const selectPiece = (piece: Piece | null) => {

        const selectedPieceStyles = [
            "selected-piece", "scale-125", "drop-shadow-selected-piece", 
            "translate-x-1", "-translate-y-1"
        ];

        if (piece) {
            if (piece.owner === 'user') {
                setSelectedChessPiece((prevPiece) => {
                    if(prevPiece) {
                        const prevSelectedPiece = document.getElementById(`piece-${prevPiece.position}`);
                        prevSelectedPiece?.classList.remove(...selectedPieceStyles);
                    }
                    const chessPiece = document.getElementById(`piece-${piece.position}`);
                    chessPiece?.classList.add(...selectedPieceStyles);
                    return piece;
                })
            }
            else setSelectedChessPiece(piece);

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

    const moveChessPiece = (newPosition: string, enemy: Player) => {

        // Move selected piece
        const updatedEnemyPieces = selectedChessPiece?.move(newPosition, enemy.pieces);

        // Update enemies pieces array and local storage
        if (updatedEnemyPieces && enemy.name === 'ai') {
            setAi(prevAi => {

                const newAi = {
                    ...prevAi,
                    pieces: updatedEnemyPieces,
                    turn: true
                }
                localStorage.setItem('ai', JSON.stringify(newAi));
                return newAi;

            });
        }
        
        // Update user
        setUser(prevUser => {

            // Find and update selected piece
            const changedPiece = prevUser.pieces.find(piece => piece === selectedChessPiece)

            if (changedPiece) {
                changedPiece.position = newPosition
            }

            prevUser.turn = false;

            // Update local storage
            localStorage.setItem('user', JSON.stringify(prevUser));
            return prevUser;

        })

        setSelectedChessPiece(null);

        opponentKingIsChecked();
    }

    // Moves AI chess piece
    const moveAiPiece = (piece: Piece, destination: string) => {

        // Move the piece
        const updatedEnemyPieces = piece.move(destination, user.pieces);

        // Update the user
        setUser(prevUser => {

            const newUser = {
                ...prevUser,
                pieces: updatedEnemyPieces,
                turn: true
            }
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;

        });

        // Update the AI
        setAi(prevAi => {

            // Find and update selected piece
            const changedPiece = prevAi.pieces.find(p => p === piece);

            if (changedPiece) {
                changedPiece.position = destination
            }

            prevAi.turn = false;

            // Update local storage
            localStorage.setItem('ai', JSON.stringify(prevAi));
            return prevAi;

        })

        opponentKingIsChecked();
    }

    // Checks if the opponents king is checked
    const opponentKingIsChecked = () => {

        // AI's king
        const aiKing = ai.pieces.find(piece => piece.alive && piece.type === 'king');

        // User's king
        const userKing = user.pieces.find(piece => piece.alive && piece.type === 'king');

        if (aiKing) {

            // AI's king is checked
            if (user.pieces.filter(piece => piece.alive).some(piece => piece.alive && piece.canMove(aiKing.position, ai.pieces, user.pieces))) {
                
                setAiKingChecked(true);
    
                setAi(prevAi => {
    
                    aiKing.checked = true;
    
                    localStorage.setItem('ai', JSON.stringify(prevAi));
                    return prevAi;
    
                })
            } 
            // AI's king is not checked
            else {
                setAi(prevAi => {
    
                    aiKing.checked = false;
    
                    localStorage.setItem('ai', JSON.stringify(prevAi));
                    return prevAi;
    
                })

                setAiKingChecked(false);
            }
        } 

        if (userKing) {

            // User's king is checked
            if (ai.pieces.filter(piece => piece.alive).some(piece => piece.alive && piece.canMove(userKing.position, user.pieces, ai.pieces))) {
                
                setUserKingChecked(true);
    
                setUser(prevUser => {
    
                    userKing.checked = true;
    
                    localStorage.setItem('user', JSON.stringify(prevUser));
                    return prevUser;
    
                })
            }

            // User's king is not checked
            else {
                setUser(prevUser => {

                    userKing.checked = false;
    
                    localStorage.setItem('user', JSON.stringify(prevUser));
                    return prevUser;
    
                })

                setUserKingChecked(false);
            }
        }

        setWinner(null);

    }

    const declareWinner = (player: Player) => {
        setWinner(player)
    }

    // Restart game by resetting state values
    const restartGame = () => {

        setWinner(null);
        setAiKingChecked(false)
        setUserKingChecked(false);
        setSelectedChessPiece(null);

        localStorage.clear();
        setUser(createUser('user'));
        setAi(createUser('ai'));

    }

    return (
        <chessContext.Provider value={{user, ai, selectedChessPiece, aiKingChecked, userKingChecked, winner, selectPiece, moveChessPiece, moveAiPiece, declareWinner, restartGame}} >
            {children}
        </chessContext.Provider>
    )


}
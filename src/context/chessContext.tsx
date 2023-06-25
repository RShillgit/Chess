import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Piece, Player } from "../types/chessTypes";
import { generateInitialPieces, createUser } from "../utils/helperFunctions";
import { Bishop, Knight, Queen, Rook } from "../utils/pieces";

type ChessContextProviderProps = {
    children: ReactNode
}

type ChessContext = {
    user: Player,
    ai: Player,
    selectedChessPiece: (Piece | null),
    aiKingChecked: boolean,
    userKingChecked: boolean,
    pawnForPromotion: (Piece | null),
    winner: (Player | null),
    staleMate: boolean,
    selectPiece: (piece: Piece | null) => void,
    moveChessPiece: (newPosition: string, enemy: Player) => void,
    moveAiPiece: (piece: Piece, destination: string) => void,
    declareWinner: (player: Player) => void,
    restartGame: () => void,
    promotePawn : (pawn: Piece, nextType: string) => void,
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

    // Pawn Promotion
    const [pawnForPromotion, setPawnForPromotion] = useState<Piece | null>(null);

    const [winner, setWinner] = useState<Player | null>(null);
    const [staleMate, setStaleMate] = useState(false);

    // On mount check for checked kings
    useEffect(() => {
        opponentKingIsChecked();

        const storedWinner = localStorage.getItem('winner');
        if (storedWinner && storedWinner === 'user') setWinner(user);
        else if (storedWinner && storedWinner === 'ai') setWinner(ai);

    }, [])

    // Check for a stale mate/winner
    useEffect(() => {

        if (ai.pieces.filter(p => p.alive).length === 1 && user.pieces.filter(p => p.alive).length === 1) {
            setStaleMate(true);
        }

        else if (ai.pieces.filter(p => p.alive).length === 1) declareWinner(user);
        else if (user.pieces.filter(p => p.alive).length === 1) declareWinner(ai);

    }, [ai, user])

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

                // Pawn Promotion
                if (changedPiece.type === 'pawn' && Number(newPosition[1]) === 8) {
                    setPawnForPromotion(changedPiece);
                }
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

            // Pawn Promotion
            if (piece.type === 'pawn' && Number(destination[1]) === 1) {
                const typeOptions = ['queen', 'rook', 'bishop', 'knight'];
                const randomType = typeOptions[Math.floor(Math.random() * typeOptions.length)];
                promotePawn(piece, randomType);
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
        localStorage.setItem('winner', player.name);
        setWinner(player);
    }

    // Restart game by resetting state values
    const restartGame = () => {

        setWinner(null);
        setStaleMate(false);
        setAiKingChecked(false)
        setUserKingChecked(false);
        setSelectedChessPiece(null);

        localStorage.clear();
        setUser(createUser('user'));
        setAi(createUser('ai'));

    }

    // Promotes pawn to new piece
    const promotePawn = (pawn: Piece, nextType: string) => {

        let indexOfPawn: number;
        if (pawn.owner === 'user') indexOfPawn = user.pieces.findIndex(p => p.id === pawn.id);
        else indexOfPawn = ai.pieces.findIndex(p => p.id === pawn.id);

        // Promote to Queen
        if (nextType === 'queen') {

            // User
            if (pawn.owner === 'user') {
                setUser((prevUser) => {
                    prevUser.pieces[indexOfPawn] = Queen('user', pawn.position);
                    return prevUser;
                })
            }
            // Ai
            else {
                setAi((prevAi) => {
                    prevAi.pieces[indexOfPawn] = Queen('ai', pawn.position);
                    return prevAi;
                })
            }

        }
        // Promote to Rook
        else if (nextType === 'rook') {

            // User
            if (pawn.owner === 'user') {
                setUser((prevUser) => {
                    prevUser.pieces[indexOfPawn] = Rook('user', pawn.position);
                    return prevUser;
                })
            }
            // Ai
            else {
                setAi((prevAi) => {
                    prevAi.pieces[indexOfPawn] = Rook('ai', pawn.position);
                    return prevAi;
                })
            }
    
        }
        // Promote to Bishop
        else if (nextType === 'bishop') {

            // User
            if (pawn.owner === 'user') {
                setUser((prevUser) => {
                    prevUser.pieces[indexOfPawn] = Bishop('user', pawn.position);
                    return prevUser;
                })
            }
            // Ai
            else {
                setAi((prevAi) => {
                    prevAi.pieces[indexOfPawn] = Bishop('ai', pawn.position);
                    return prevAi;
                })
            }
    
        }
        // Promote to Knight
        else if (nextType === 'knight') {

            // User
            if (pawn.owner === 'user') {
                setUser((prevUser) => {
                    prevUser.pieces[indexOfPawn] = Knight('user', pawn.position);
                    return prevUser;
                })
            }
            // Ai
            else {
                setAi((prevAi) => {
                    prevAi.pieces[indexOfPawn] = Knight('ai', pawn.position);
                    return prevAi;
                })
            }
        }

        setPawnForPromotion(null);

    }

    return (
        <chessContext.Provider value={{user, ai, selectedChessPiece, aiKingChecked, userKingChecked, pawnForPromotion ,winner, staleMate, selectPiece, moveChessPiece, moveAiPiece, declareWinner, restartGame, promotePawn}} >
            {children}
        </chessContext.Provider>
    )


}
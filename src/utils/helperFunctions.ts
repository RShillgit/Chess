import { type Piece, type Player } from "../types/chessTypes";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./pieces";

export function createUser(player: 'user' | 'ai'): Player {

    // Check local storage for player
    const savedPlayer = localStorage.getItem(player);

    if (savedPlayer) {

        const parsedPlayer = JSON.parse(savedPlayer) as Player;

        const newPieces: Piece[] = parsedPlayer.pieces.map(piece => {
            if (piece.type === 'pawn') return Pawn(piece.owner, piece.position, piece.alive);
            else if (piece.type === 'rook') return Rook(piece.owner, piece.position, piece.alive);
            else if (piece.type === 'knight') return Knight(piece.owner, piece.position, piece.alive);
            else if (piece.type === 'bishop') return Bishop(piece.owner, piece.position, piece.alive);
            else if (piece.type === 'queen') return Queen(piece.owner, piece.position, piece.alive);
            else if (piece.type === 'king') {
                if (piece.checked) {
                    return King(piece.owner, piece.position, piece.checked, piece.alive);
                } else return King(piece.owner, piece.position, false, piece.alive);
            }
            else return piece;
        })

        parsedPlayer.pieces = newPieces;
        
        return parsedPlayer;
    }

    else {
        const initialPieces = generateInitialPieces(player);

        const newPlayer = {
            name: player,
            pieces: initialPieces,
            turn: (player === 'user' ? true : false)
        }

        localStorage.setItem(player, JSON.stringify(newPlayer));

        return newPlayer;
    }


}

// Array of initial pieces and their positions at the start of the game
export function generateInitialPieces(player: 'user' | 'ai'): Piece[] {

    const initialPieces: Piece[] = [

        // 8 Pawns
        Pawn(player, (player === 'user' ? "a2": "a7")),
        Pawn(player, (player === 'user' ? "b2": "b7")),
        Pawn(player, (player === 'user' ? "c2": "c7")),
        Pawn(player, (player === 'user' ? "d2": "d7")),
        Pawn(player, (player === 'user' ? "e2": "e7")),
        Pawn(player, (player === 'user' ? "f2": "f7")),
        Pawn(player, (player === 'user' ? "g2": "g7")),
        Pawn(player, (player === 'user' ? "h2": "h7")),
        
        // 2 Rooks
        Rook(player, (player === 'user' ? "a1": "a8")),
        Rook(player, (player === 'user' ? "h1": "h8")),

        // 2 Knights
        Knight(player, (player === 'user' ? "b1": "b8")),
        Knight(player, (player === 'user' ? "g1": "g8")),

        // 2 Bishops
        Bishop(player, (player === 'user' ? "c1": "c8")),
        Bishop(player, (player === 'user' ? "f1": "f8")),

        // Queen
        Queen(player, (player === 'user' ? "d1": "d8")),

        // King
        King(player, (player === 'user' ? "e1": "e8"), false),
    ];

    return initialPieces;
}
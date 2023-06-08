import { type Piece, type Player } from "../types/chessTypes";


export function createUser(player: string): Player {

    // Check local storage for player
    const savedPlayer = localStorage.getItem(player);

    if (savedPlayer) {
        console.log(savedPlayer)

        // TODO: Change this to the local storage item
        return {
            pieces: [],
            turn: true
        }
    }

    else {
        const initialPieces = generateInitialPieces(player);

        return {
            pieces: initialPieces,
            turn: (player === 'user' ? true : false)
        }
    }


}

// Array of initial pieces and their positions at the start of the game
export function generateInitialPieces(player: string): Piece[] {

    const initialPieces: Piece[] = [

        // 8 Pawns
        {
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "a2": "a7")
        },
        {
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "b2": "b7")
        },
        {
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "c2": "c7")
        },
        {
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "d2": "d7")
        },
        {
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "e2": "e7")
        },
        {
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "f2": "f7")
        },
        {
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "g2": "g7")
        },
        {
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "h2": "h7")
        },

        // 2 Rooks
        {
            type: 'rook',
            owner: player,
            alive: true,
            position: (player === 'user' ? "a1": "a8")
        },
        {
            type: 'rook',
            owner: player,
            alive: true,
            position: (player === 'user' ? "h1": "h8")
        },

        // 2 Knights
        {
            type: 'knight',
            owner: player,
            alive: true,
            position: (player === 'user' ? "b1": "b8")
        },
        {
            type: 'knight',
            owner: player,
            alive: true,
            position: (player === 'user' ? "g1": "g8")
        },

        // 2 Bishops
        {
            type: 'bishop',
            owner: player,
            alive: true,
            position: (player === 'user' ? "c1": "c8")
        },
        {
            type: 'bishop',
            owner: player,
            alive: true,
            position: (player === 'user' ? "f1": "f8")
        },

        // Queen
        {
            type: 'queen',
            owner: player,
            alive: true,
            position: (player === 'user' ? "d1": "d8")
        },

        // King
        {
            type: 'king',
            owner: player,
            alive: true,
            position: (player === 'user' ? "e1": "e8")
        },
    ];

    return initialPieces;
}
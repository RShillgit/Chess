import { type Piece, type Player } from "../types/chessTypes";
import { v4 as uuidv4 } from 'uuid';


export function createUser(player: string): Player {

    // Check local storage for player
    const savedPlayer = localStorage.getItem(player);

    if (savedPlayer) {

        const parsedPlayer = JSON.parse(savedPlayer) as Player;
        
        return parsedPlayer;
    }

    else {
        const initialPieces = generateInitialPieces(player);

        const newPlayer = {
            pieces: initialPieces,
            turn: (player === 'user' ? true : false)
        }

        localStorage.setItem(player, JSON.stringify(newPlayer));

        return newPlayer;
    }


}

// Array of initial pieces and their positions at the start of the game
export function generateInitialPieces(player: string): Piece[] {

    const initialPieces: Piece[] = [

        // 8 Pawns
        {
            id: uuidv4(),
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "a2": "a7")
        },
        {
            id: uuidv4(),
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "b2": "b7")
        },
        {
            id: uuidv4(),
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "c2": "c7")
        },
        {
            id: uuidv4(),
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "d2": "d7")
        },
        {
            id: uuidv4(),
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "e2": "e7")
        },
        {
            id: uuidv4(),
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "f2": "f7")
        },
        {
            id: uuidv4(),
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "g2": "g7")
        },
        {
            id: uuidv4(),
            type: 'pawn',
            owner: player,
            alive: true,
            position: (player === 'user' ? "h2": "h7")
        },

        // 2 Rooks
        {
            id: uuidv4(),
            type: 'rook',
            owner: player,
            alive: true,
            position: (player === 'user' ? "a1": "a8")
        },
        {
            id: uuidv4(),
            type: 'rook',
            owner: player,
            alive: true,
            position: (player === 'user' ? "h1": "h8")
        },

        // 2 Knights
        {
            id: uuidv4(),
            type: 'knight',
            owner: player,
            alive: true,
            position: (player === 'user' ? "b1": "b8")
        },
        {
            id: uuidv4(),
            type: 'knight',
            owner: player,
            alive: true,
            position: (player === 'user' ? "g1": "g8")
        },

        // 2 Bishops
        {
            id: uuidv4(),
            type: 'bishop',
            owner: player,
            alive: true,
            position: (player === 'user' ? "c1": "c8")
        },
        {
            id: uuidv4(),
            type: 'bishop',
            owner: player,
            alive: true,
            position: (player === 'user' ? "f1": "f8")
        },

        // Queen
        {
            id: uuidv4(),
            type: 'queen',
            owner: player,
            alive: true,
            position: (player === 'user' ? "d1": "d8")
        },

        // King
        {
            id: uuidv4(),
            type: 'king',
            owner: player,
            alive: true,
            position: (player === 'user' ? "e1": "e8")
        },
    ];

    return initialPieces;
}
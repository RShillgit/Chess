import { v4 as uuidv4 } from 'uuid';
import { Piece } from '../types/chessTypes';



// Pawn
export function Pawn(player: string, position: string): Piece {

    return {
        id: uuidv4(),
        type: 'pawn',
        owner: player,
        alive: true,
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string) => {
            console.log(`move to location: ${location}`);
        }

    }
}

// Rook
export function Rook(player: string, position: string): Piece {
    return {
        id: uuidv4(),
        type: 'rook',
        owner: player,
        alive: true,
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string) => {
            console.log(`move to location: ${location}`);
        }

    }
}

// Knight
export  function Knight(player: string, position: string): Piece {
    return {
        id: uuidv4(),
        type: 'knight',
        owner: player,
        alive: true,
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string) => {
            console.log(`move to location: ${location}`);
        }

    }
}

// Bishop
export function Bishop(player: string, position: string): Piece {
    return {
        id: uuidv4(),
        type: 'bishop',
        owner: player,
        alive: true,
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string) => {
            console.log(`move to location: ${location}`);
        }

    }
}

// Queen
export function Queen(player: string, position: string): Piece {
    return {
        id: uuidv4(),
        type: 'queen',
        owner: player,
        alive: true,
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string) => {
            console.log(`move to location: ${location}`);
        }

    }
}

// King
export function King(player: string, position: string): Piece {
    return {
        id: uuidv4(),
        type: 'king',
        owner: player,
        alive: true,
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string) => {
            console.log(`move to location: ${location}`);
        }

    }
}
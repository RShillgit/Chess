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

            // Unmoved pawn can move 1 or 2 spaces
            if (Number(position[1]) === 2) {

                // Hovering in the same column
                if (location[0] === position[0]) {

                    // Hovering in row 3 or 4
                    if (Number(location[1]) === 3 || Number(location[1]) === 4) return true;
                    return false;

                } else return false;
            }

            // can only move 1 space
            else {

                // Hovering in the same column
                if (location[0] === position[0]) {

                    // Hovering 1 row higher
                    if (Number(position[1]) + 1 === Number(location[1])) return true
                    return false;

                } else return false;

            }
        },

        // Moves piece to the location
        move: (location: string) => {
            position = location;
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
import { v4 as uuidv4 } from 'uuid';
import { Piece } from '../types/chessTypes';

// Pawn
export function Pawn(player: string, position: string, alive?: boolean): Piece {

    return {
        id: uuidv4(),
        type: 'pawn',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // TODO: En Passant
        // TODO: Promotions

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[]) => {

            // User Pawn
            if (player === 'user') {

                // Enemy diagonal and 1 row in front 
                // Hovering over adjacent column
                if (location[0].charCodeAt(0) === (position[0].charCodeAt(0) + 1) || location[0].charCodeAt(0) === (position[0].charCodeAt(0) - 1)) {
                    
                    // Hovering over row in front
                    if (Number(location[1]) === (Number(position[1]) + 1)) {
                        
                        // Diagonal enemy exists
                        if (enemyPieces.find(piece => piece.position === location)) return true;
                        else return false;

                    } else return false;

                }

                // Unmoved pawn can move 1 or 2 spaces
                else if (Number(position[1]) === 2) {

                    // Hovering in the same column
                    if (location[0] === position[0]) {

                        // Hovering in row 3 or 4 
                        if (Number(location[1]) === 3 || Number(location[1]) === 4) return true;
                        return false;

                    } else return false;
                }

                // can only move 1 space
                else {

                    // If there is an enemy in front return false
                    const enemyInFront = enemyPieces.find(piece => {
                        return piece.position === `${position[0]}${Number(position[1]) + 1}`
                    })
                    if (enemyInFront) return false;

                    // Hovering in the same column
                    if (location[0] === position[0]) {

                        // Hovering 1 row higher
                        if (Number(position[1]) + 1 === Number(location[1])) return true
                        return false;

                    } else return false;

                }
            }

            // AI
            else {
                return false;
            }

        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {

            // If there is an enemy at this location, eliminate them
            const enemy = enemyPieces.find(piece => piece.position === location)
            if (enemy) enemy.alive = false;

            position = location;

            return enemyPieces;
        }

    }
}

// Rook
export function Rook(player: string, position: string, alive?: boolean): Piece {
    return {
        id: uuidv4(),
        type: 'rook',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[]) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {
            console.log(`move to location: ${location}`);

            return enemyPieces;
        }

    }
}

// Knight
export  function Knight(player: string, position: string, alive?: boolean): Piece {
    return {
        id: uuidv4(),
        type: 'knight',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[]) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {
            console.log(`move to location: ${location}`);

            return enemyPieces;
        }

    }
}

// Bishop
export function Bishop(player: string, position: string, alive?: boolean): Piece {
    return {
        id: uuidv4(),
        type: 'bishop',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[]) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {
            console.log(`move to location: ${location}`);

            return enemyPieces;
        }

    }
}

// Queen
export function Queen(player: string, position: string, alive?: boolean): Piece {
    return {
        id: uuidv4(),
        type: 'queen',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[]) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {
            console.log(`move to location: ${location}`);

            return enemyPieces;
        }

    }
}

// King
export function King(player: string, position: string, alive?: boolean): Piece {
    return {
        id: uuidv4(),
        type: 'king',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[]) => {
            console.log(`can I move to ${location}?`);

            return false;
        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {
            console.log(`move to location: ${location}`);

            return enemyPieces;
        }

    }
}
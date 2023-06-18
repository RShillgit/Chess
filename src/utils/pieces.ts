import { v4 as uuidv4 } from 'uuid';
import { Piece } from '../types/chessTypes';

// TODO: Extract move function so its only written in 1 place

// Pawn
export function Pawn(player: 'user' | 'ai', position: string, alive?: boolean): Piece {

    return {
        id: uuidv4(),
        type: 'pawn',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // TODO: En Passant
        // TODO: Promotions

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[], usersPieces: Piece[]) => {

            // User's Pawn
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

            // AI's pawn
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
export function Rook(player: 'user' | 'ai', position: string, alive?: boolean): Piece {

    // TODO: Castle

    return {
        id: uuidv4(),
        type: 'rook',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[], usersPieces: Piece[]) => {

            // User's rook
            if (player === 'user') {

                // Hovering in the same column
                if (position[0] === location[0]) {

                    // Piece inbetween in column
                    if (pieceInPath('column', position, location, enemyPieces, usersPieces)) return false;
                    return true;
                }
                
                // Hovering in the same row
                else if (Number(position[1]) === Number(location[1])) {

                    // Piece inbetween in row
                    if (pieceInPath('row', position, location, enemyPieces, usersPieces)) return false;
                    return true;
                }

                return false;
            }

            // AI's rook
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

// Knight
export  function Knight(player: 'user' | 'ai', position: string, alive?: boolean): Piece {
    return {
        id: uuidv4(),
        type: 'knight',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[], usersPieces: Piece[]) => {
            

            if (player === 'user') {

                // 1x 2y
                if (location[0].charCodeAt(0) === (position[0].charCodeAt(0) + 1) || location[0].charCodeAt(0) === (position[0].charCodeAt(0) - 1)) {
                    if ((Number(location[1]) - 2) === Number(position[1]) || (Number(location[1]) + 2) === Number(position[1])) return true;
                }

                // 2x 1y
                else if (location[0].charCodeAt(0) === (position[0].charCodeAt(0) + 2) || location[0].charCodeAt(0) === (position[0].charCodeAt(0) - 2)) {
                    if ((Number(location[1]) - 1) === Number(position[1]) || (Number(location[1]) + 1) === Number(position[1])) return true;
                }

                return false;
            }
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

// Bishop
export function Bishop(player: 'user' | 'ai', position: string, alive?: boolean): Piece {
    return {
        id: uuidv4(),
        type: 'bishop',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[], usersPieces: Piece[]) => {

            // User's bishop
            if (player === 'user') {
                // Diagonal/equal in x and y directions
                if(pieceInPath('diagonal', position, location, enemyPieces, usersPieces)) return false;
                if (Math.abs(location[0].charCodeAt(0) - position[0].charCodeAt(0)) === Math.abs(Number(location[1]) - Number(position[1]))) return true;

                return false;
            }

            // AI's bishop
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

// Queen
export function Queen(player: 'user' | 'ai', position: string, alive?: boolean): Piece {
    return {
        id: uuidv4(),
        type: 'queen',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[], usersPieces: Piece[]) => {

            // User's queen
            if (player === 'user') {

                // Column
                if (position[0] === location[0]) {
                    // Piece inbetween
                    if (pieceInPath('column', position, location, enemyPieces, usersPieces)) return false;
                    return true;
                }
                
                // Row
                else if (Number(position[1]) === Number(location[1])) {
                    // Piece inbetween
                    if (pieceInPath('row', position, location, enemyPieces, usersPieces)) return false;
                    return true;
                }

                // Diagonal
                else if (Math.abs(location[0].charCodeAt(0) - position[0].charCodeAt(0)) === Math.abs(Number(location[1]) - Number(position[1]))) {
                    // Piece inbetween
                    if (pieceInPath('diagonal', position, location, enemyPieces, usersPieces)) return false;
                    return true;
                }
            
                return false;
            }
            // AI's queen
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

// King
export function King(player: 'user' | 'ai', position: string, alive?: boolean): Piece {
    return {
        id: uuidv4(),
        type: 'king',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[], usersPieces: Piece[]) => {
            console.log(`can I move to ${location}?`);

            return false;
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

// Checks if there is a piece blocking the path
function pieceInPath (path: 'column' | 'row' | 'diagonal', position: string, location: string, enemyPieces: Piece[], friendlyPieces: Piece[]): boolean {

    const allPieces: Piece[] = enemyPieces.concat(friendlyPieces);

    let pieceInbetween: Piece | undefined;

    // Column
    if (path === 'column') {
        pieceInbetween = allPieces.find(piece => {
            // Same column
            if (piece.position[0] === position[0]) {
                if (piece.alive && Number(position[1]) < Number(piece.position[1]) && Number(piece.position[1]) < Number(location[1])) return piece;
                else if (piece.alive && Number(position[1]) > Number(piece.position[1]) && Number(piece.position[1]) > Number(location[1])) return piece;
            }
        })
    }

    // Row
    else if (path === 'row') {
        pieceInbetween = allPieces.find(piece => {
            // Same row
            if (Number(piece.position[1]) === Number(position[1])) {
                if (piece.alive && position[0].charCodeAt(0) < piece.position[0].charCodeAt(0) && piece.position[0].charCodeAt(0) < location[0].charCodeAt(0)) return piece;
                else if (piece.alive && position[0].charCodeAt(0) > piece.position[0].charCodeAt(0) && piece.position[0].charCodeAt(0) > location[0].charCodeAt(0)) return piece;
            }
        })
    }

    // Diagonal
    else if (path === 'diagonal') {
        pieceInbetween = allPieces.find(piece => {
            // Equal in x and y directions
            if (Math.abs(piece.position[0].charCodeAt(0) - position[0].charCodeAt(0)) === Math.abs(Number(piece.position[1]) - Number(position[1]))) {

                if (piece.alive && position[0].charCodeAt(0) < piece.position[0].charCodeAt(0) && piece.position[0].charCodeAt(0) < location[0].charCodeAt(0)
                    && Number(position[1]) < Number(piece.position[1]) && Number(piece.position[1]) < Number(location[1]) 
                ) return true;
                else if (piece.alive && position[0].charCodeAt(0) < piece.position[0].charCodeAt(0) && piece.position[0].charCodeAt(0) < location[0].charCodeAt(0)
                    && Number(position[1]) > Number(piece.position[1]) && Number(piece.position[1]) > Number(location[1]) 
                ) return true;
                else if (piece.alive && position[0].charCodeAt(0) > piece.position[0].charCodeAt(0) && piece.position[0].charCodeAt(0) > location[0].charCodeAt(0)
                    && Number(position[1]) > Number(piece.position[1]) && Number(piece.position[1]) > Number(location[1]) 
                ) return true;
                else if (piece.alive && position[0].charCodeAt(0) > piece.position[0].charCodeAt(0) && piece.position[0].charCodeAt(0) > location[0].charCodeAt(0)
                    && Number(position[1]) < Number(piece.position[1]) && Number(piece.position[1]) < Number(location[1]) 
                ) return true;

            }
        })
    }

    if (pieceInbetween) return true;
    return false;
}


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

                if (position === location) return false;

                // Enemy diagonal and 1 row in front 
                // Hovering over adjacent column
                else if (location[0].charCodeAt(0) === (position[0].charCodeAt(0) + 1) || location[0].charCodeAt(0) === (position[0].charCodeAt(0) - 1)) {
                    
                    // Hovering over row in front
                    if (Number(location[1]) === (Number(position[1]) + 1)) {
                        
                        // Diagonal alive enemy exists
                        if (enemyPieces.find(piece => piece.alive && piece.position === location)) return true;
                        else return false;

                    } else return false;

                }

                // Unmoved pawn can move 1 or 2 spaces
                else if (Number(position[1]) === 2) {

                    // If there is an alive enemy in front return false
                    const enemyInFront = enemyPieces.find(piece => {
                        return piece.alive && piece.position === `${position[0]}${Number(position[1]) + 1}`
                    })
                    if (enemyInFront) return false;

                    // Hovering in the same column
                    if (location[0] === position[0]) {

                        // Hovering in row 3 or 4 
                        if (Number(location[1]) === 3 || Number(location[1]) === 4) return true;
                        return false;

                    } else return false;
                }

                // can only move 1 space
                else {

                    // If there is an alive enemy in front return false
                    const enemyInFront = enemyPieces.find(piece => {
                        return piece.alive && piece.position === `${position[0]}${Number(position[1]) + 1}`
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

                if (position === location) return false;

                // Enemy diagonal and 1 row in front 
                // Hovering over adjacent column
                if (location[0].charCodeAt(0) === (position[0].charCodeAt(0) + 1) || location[0].charCodeAt(0) === (position[0].charCodeAt(0) - 1)) {
                    
                    // Hovering over row below
                    if (Number(location[1]) === (Number(position[1]) - 1)) {
                        
                        // Diagonal alive enemy exists
                        if (enemyPieces.find(piece => piece.alive && piece.position === location)) return true;
                        else return false;

                    } else return false;

                }

                // Unmoved pawn can move 1 or 2 spaces
                else if (Number(position[1]) === 7) {

                    // If there is an alive enemy in front return false
                    const enemyInFront = enemyPieces.find(piece => {
                        return piece.alive && piece.position === `${position[0]}${Number(position[1]) - 1}`
                    })
                    if (enemyInFront) return false;

                    // If there is an alive enemy at the hover location return false
                    const enemyAtHover = enemyPieces.find(piece => {
                        return piece.alive && piece.position === `${location[0]}${Number(location[1])}`
                    })
                    if(enemyAtHover) return false;

                    // If there is an alive friendly at the hover location return false
                    const friendlyAtHover = usersPieces.find(piece => {
                        return piece.alive && piece.position === `${location[0]}${Number(location[1])}`
                    })
                    if(friendlyAtHover) return false;

                    // Hovering in the same column
                    else if (location[0] === position[0]) {

                        // Hovering in row 5 or 6 
                        if (Number(location[1]) === 6 || Number(location[1]) === 5) return true;
                        return false;

                    } else return false;
                }

                // can only move 1 space
                else {

                    // If there is an alive enemy in front return false
                    const enemyInFront = enemyPieces.find(piece => {
                        return piece.alive && piece.position === `${position[0]}${Number(position[1]) - 1}`
                    })
                    if (enemyInFront) return false;

                    // If there is an alive friendly in front return false
                    const friendlyInFront = usersPieces.find(piece => {
                        return piece.alive && piece.position === `${position[0]}${Number(position[1]) - 1}`
                    })
                    if(friendlyInFront) return false;

                    // Hovering in the same column
                    if (location[0] === position[0]) {

                        // Hovering 1 row lower
                        if (Number(position[1]) - 1 === Number(location[1])) return true
                        return false;

                    } else return false;

                }
            }

        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {

            // If there is an enemy at this location, eliminate them
            const enemy = enemyPieces.find(piece => piece.alive && piece.position === location)

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

            if (position === location) return false;

            // If there is a friendly piece at that location return false;
            const friendlyAtPosition = usersPieces.find(piece => piece.alive && piece.position === location);
            if (friendlyAtPosition) return false;

            // Hovering in the same column
            else if (position[0] === location[0]) {

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

        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {

            // If there is an alive enemy at this location, eliminate them
            const enemy = enemyPieces.find(piece => piece.alive && piece.position === location);

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

            if (position === location) return false;

            // If there is a friendly piece at that location return false
            const friendlyAtPosition = usersPieces.find(piece => piece.alive && piece.position === location);
            if (friendlyAtPosition) return false;

            // 1x 2y
            else if (location[0].charCodeAt(0) === (position[0].charCodeAt(0) + 1) || location[0].charCodeAt(0) === (position[0].charCodeAt(0) - 1)) {
                if ((Number(location[1]) - 2) === Number(position[1]) || (Number(location[1]) + 2) === Number(position[1])) {
                    if (!usersPieces.find(piece => piece.alive && piece.position === location)) return true;
                    return false;
                }
            }

            // 2x 1y
            else if (location[0].charCodeAt(0) === (position[0].charCodeAt(0) + 2) || location[0].charCodeAt(0) === (position[0].charCodeAt(0) - 2)) {
                if ((Number(location[1]) - 1) === Number(position[1]) || (Number(location[1]) + 1) === Number(position[1])) {
                    if (!usersPieces.find(piece => piece.alive && piece.position === location)) return true;
                    return false;
                }
            }

            return false;
        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {

            // If there is an alive enemy at this location, eliminate them
            const enemy = enemyPieces.find(piece => piece.alive && piece.position === location)

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
            
            if (position === location) return false;

            // If there is a friendly piece at that location return false
            const friendlyAtPosition = usersPieces.find(piece => piece.alive && piece.position === location);
            if (friendlyAtPosition) return false;

            // Diagonal/equal in x and y directions
            else if(pieceInPath('diagonal', position, location, enemyPieces, usersPieces)) return false;
            else if (Math.abs(location[0].charCodeAt(0) - position[0].charCodeAt(0)) === Math.abs(Number(location[1]) - Number(position[1]))) return true;

            return false;

        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {

            // If there is an alive enemy at this location, eliminate them
            const enemy = enemyPieces.find(piece => piece.alive && piece.position === location)

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

            if (position === location) return false;

            // If there is a friendly piece at that location return false;
            const friendlyAtPosition = usersPieces.find(piece => piece.alive && piece.position === location);
            if (friendlyAtPosition) return false;

            // Column
            else if (position[0] === location[0]) {
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

        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {

            // If there is an alive enemy at this location, eliminate them
            const enemy = enemyPieces.find(piece => piece.alive && piece.position === location)

            if (enemy) enemy.alive = false;

            position = location;

            return enemyPieces;
        }

    }
}

// King
export function King(player: 'user' | 'ai', position: string, checked: boolean, alive?: boolean): Piece {
    return {
        id: uuidv4(),
        type: 'king',
        owner: player,
        alive: (alive !== undefined ? alive : true),
        checked: (checked !== undefined ? checked : false),
        position: position,

        // Checks if piece can move to the location
        canMove: (location: string, enemyPieces: Piece[], usersPieces: Piece[]) => {

            if (position === location) return false;

            // Off the board
            if (location[0].charCodeAt(0) < 97 || location[0].charCodeAt(0) > 104 || Number(location[1]) < 1 || Number(location[1]) > 8) return false;

            // If there is a friendly piece at that location return false;
            const friendlyAtPosition = usersPieces.find(piece => piece.alive && piece.position === location);
            if (friendlyAtPosition) return false;

            // TODO: EXCLUDES ENEMY KING BECAUSE IT RESULTS IN ENDLESS "canMove" LOOP
            const aliveEnemyPieces = enemyPieces.filter(piece => piece.alive && piece.type !== 'king');

            // Pieces array if the piece was moved to the location, that way we can assess if it will be checked there
            const usersPiecesInludingThisMove = usersPieces.map(piece => {
                if (piece.alive && piece.type === 'king') {
                    const futurePiece = {
                        ...piece,
                        position: location
                    }
                    return futurePiece;
                }
                return piece;
            })

            // If it will be checked at the location return false 
            if (aliveEnemyPieces.some(piece => piece.canMove(location, usersPiecesInludingThisMove, enemyPieces))) return false;
            
            // Column
            else if (location[0] === position[0]) {

                // 1 row higher/lower
                if (Number(position[1]) + 1 === Number(location[1]) || Number(position[1]) - 1 === Number(location[1])) return true
                return false;

            } 
            // Row
            else if (Number(position[1]) === Number(location[1])) {

                // 1 row left/right
                if ((location[0].charCodeAt(0) - 1) === position[0].charCodeAt(0) || (location[0].charCodeAt(0) + 1) === position[0].charCodeAt(0)) return true;
        
                return false;
            }

            // Diagonal
            else if (Math.abs(location[0].charCodeAt(0) - position[0].charCodeAt(0)) === Math.abs(Number(location[1]) - Number(position[1]))) {

                // 1 Position in any diagonal direction
                if ((location[0].charCodeAt(0) - 1) === position[0].charCodeAt(0) && (Number(location[1]) - 1) === Number(position[1])
                    || (location[0].charCodeAt(0) - 1) === position[0].charCodeAt(0) && (Number(location[1]) + 1) === Number(position[1]) 
                    || (location[0].charCodeAt(0) + 1) === position[0].charCodeAt(0) && (Number(location[1]) - 1) === Number(position[1]) 
                    || (location[0].charCodeAt(0) + 1) === position[0].charCodeAt(0) && (Number(location[1]) + 1) === Number(position[1]) 
                ) return true;
                return false;

            }

            return false;
        },

        // Moves piece to the location
        move: (location: string, enemyPieces: Piece[]) => {

            // If there is an alive enemy at this location, eliminate them
            const enemy = enemyPieces.find(piece => piece.alive && piece.position === location)

            if (enemy) enemy.alive = false;

            position = location;
            return enemyPieces;
        }

    }
}

// Checks if there is a piece blocking the path
function pieceInPath (path: 'column' | 'row' | 'diagonal', position: string, location: string, enemyPieces: Piece[], friendlyPieces: Piece[]): boolean {

    // If there is a friendly piece at that location return false;
    const friendlyAtPosition = friendlyPieces.find(piece => piece.alive && piece.position === location);
    if (friendlyAtPosition) return false;

    const allPieces: Piece[] = enemyPieces.concat(friendlyPieces);

    let pieceInbetween: Piece | undefined;

    // Column
    if (path === 'column') {
        pieceInbetween = allPieces.find(piece => {

            if (piece.alive) {
                // Same column
                if (piece.position[0] === position[0]) {
                    if (piece.alive && Number(position[1]) < Number(piece.position[1]) && Number(piece.position[1]) < Number(location[1])) return piece;
                    else if (piece.alive && Number(position[1]) > Number(piece.position[1]) && Number(piece.position[1]) > Number(location[1])) return piece;
                }
            }

        })
    }

    // Row
    else if (path === 'row') {
        pieceInbetween = allPieces.find(piece => {

            if (piece.alive) {
                // Same row
                if (Number(piece.position[1]) === Number(position[1])) {
                    if (piece.alive && position[0].charCodeAt(0) < piece.position[0].charCodeAt(0) && piece.position[0].charCodeAt(0) < location[0].charCodeAt(0)) return piece;
                    else if (piece.alive && position[0].charCodeAt(0) > piece.position[0].charCodeAt(0) && piece.position[0].charCodeAt(0) > location[0].charCodeAt(0)) return piece;
                }
            }

        })
    }

    // Diagonal
    else if (path === 'diagonal') {
        pieceInbetween = allPieces.find(piece => {

            if (piece.alive) {
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
            }

        })
    }

    if (pieceInbetween) return true;
    return false;
}

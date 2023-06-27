export type Piece = {
  id: string,
  type: string,
  owner: 'user' | 'ai',
  alive: boolean,
  position: string,
  checked?: boolean,
  hasMoved? : boolean,
  canMove: (location: string, enemyPieces: Piece[], usersPieces: Piece[], iteration?: number) => boolean,
  move: (location: string, enemyPieces: Piece[], usersPieces: Piece[]) => Piece[],
}

export type Player = {
  name: string,
  pieces: Piece[],
  turn: boolean

}
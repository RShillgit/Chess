export type Piece = {
  id: string,
  type: string,
  owner: 'user' | 'ai',
  alive: boolean,
  position: string,
  canMove: (location: string, enemyPieces: Piece[], usersPieces: Piece[]) => boolean,
  move: (location: string, enemyPieces: Piece[]) => Piece[],
}

export type Player = {
  name: string,
  pieces: Piece[],
  turn: boolean

}
export type Piece = {
  id: string,
  type: string,
  owner: string,
  alive: boolean,
  position: string,
  canMove: (location: string, enemyPieces: Piece[]) => boolean,
  move: (location: string, enemyPieces: Piece[]) => Piece[],
}

export type Player = {
  name: string,
  pieces: Piece[],
  turn: boolean

}
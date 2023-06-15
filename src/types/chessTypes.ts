export type Piece = {
  id: string,
  type: string,
  owner: string,
  alive: boolean,
  position: string,
  canMove: (location: string) => boolean,
  move: (location: string) => void,
}

export type Player = {
  pieces: Piece[],
  turn: boolean

}
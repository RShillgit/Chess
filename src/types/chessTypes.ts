export type Piece = {
  id: string,
  type: string,
  owner: string,
  alive: boolean,
  position: string
}

export type Player = {
  pieces: Piece[],
  turn: boolean

}
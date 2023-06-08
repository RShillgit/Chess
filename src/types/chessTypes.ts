export type Piece = {
    type: string,
    owner: string,
    alive: boolean,
    position: string
}

export type Player = {
  pieces: Piece[],
  turn: boolean

}
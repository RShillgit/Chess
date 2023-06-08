import { useEffect, useState } from "react"

const ChessBoard = () => {

    const [board, setBoard] = useState<string[]>([]);

    const vertical = [1, 2, 3, 4, 5, 6, 7, 8];
    const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    useEffect(() => {

        const boardArray:string[] = [];

        for(let i = 0; i < 8; i++) {

            for(let j = 0; j < 8; j++) {
                boardArray.push(`${horizontal[j]}${vertical[i]}`)
            }

        }

        setBoard(boardArray)

    }, [])

    return (
        <div className="p-4 grid justify-items-center items-center grid-cols-8 w-8/12">

            {board.map(space => {
                return (
                    <div key={space} id={space} className="flex w-full h-24 bg-slate-600 border border-slate-950"></div>
                )
            })}

        </div>
    )

}

export default ChessBoard
import { useEffect, useState } from "react"

type boardBox = {
    position: string,
    color: string,
}

const ChessBoard = () => {

    const [board, setBoard] = useState<boardBox[]>([]);

    const vertical = [1, 2, 3, 4, 5, 6, 7, 8];
    const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    useEffect(() => {

        const boardArray:boardBox[] = [];

        for(let i = 7; i >= 0; i--) {

            for(let j = 0; j < 8; j++) {

                const boardItemObject: boardBox = {
                    position: `${horizontal[j]}${vertical[i]}`,
                    color: ''
                }

                // Double even === dark
                if (i % 2 === 0 && j % 2  === 0) boardItemObject.color = 'dark'

                // i Odd j Even === light
                else if (i % 2 !== 0 && j % 2 === 0) boardItemObject.color = 'light'

                // i Even j Odd === light
                else if (i % 2 === 0 && j % 2 !== 0) boardItemObject.color = 'light'

                // Double odd === dark
                else if (i % 2 !== 0 && j % 2  !== 0) boardItemObject.color = 'dark'

                boardArray.push(boardItemObject);

            }

        }

        setBoard(boardArray)

    }, [])

    return (
        <div className="p-4 grid justify-items-center items-center grid-cols-8 w-screen-1/2 h-boardHeight ">

            {board.map((box, i) => {
                return (
                    <div key={i} id={box.position} className={`flex justify-center items-center w-full h-full border border-slate-950
                        ${box.color === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}
                    ></div>
                )
            })}

        </div>
    )

}

export default ChessBoard;
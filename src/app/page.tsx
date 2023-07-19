import Image from 'next/image'
"use client"
import { useEffect, useState } from 'react'

export default function Home() {

  const [xTurn, setXTurn] = useState(true)
  const [winner, setwinner] = useState("")
  const [winnerCombos, setwinnerCombos] = useState<any>([])
  const [isDraw, setisDraw] = useState(false)

  const [boardData, setBoardData] = useState([
    "", "", "", "", "", "", "", "", "", ""
  ])

  const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const updateBoard = (id:number) => {
    if(boardData[id] != "") {
      return
    }
    if(!isDraw && winner == "") {
      let value = xTurn ? 'X' : 'O';
      let t = boardData
      t[id] = value
      setBoardData(t);
      setXTurn(!xTurn);
      checkWinner();
      drawCheck();
    }
  };

  const drawCheck = () => {
    let x = true
    for (let i = 0; i < 9; i++) {
      if (boardData[i] === "") {
        x = false
      }
    }
    setisDraw(x);
  }

  const checkWinner = () => {
    let t = boardData;
    for (let i = 0; i < winningCombos.length; i++) {
      if (t[winningCombos[i][0]] === t[winningCombos[i][1]] && t[winningCombos[i][1]] === t[winningCombos[i][2]] && t[winningCombos[i][0]]!== "") {
        setwinner(t[winningCombos[i][0]]);
        setwinnerCombos(winningCombos[i]);
        return;
      }
    }
    setwinner("");
  }

  const resetGame = () =>  {
    setBoardData([
      "", "", "", "", "", "", "", "", "", ""
    ])
    setXTurn(true)
    setwinner("")
    setisDraw(false)
    setwinnerCombos([] as any[])
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h3 className=' font-bold text-xl '>Tic Tac Toae</h3>
      <div>
        <div className='text-center my-5'>
          <p>{ `${xTurn ? 'X Turn' : 'O Turn'}` }</p>
          <p>{ `${winner != "" ? winner + " won the game" : ""}` }</p>
          <p>{ `${isDraw ? "Draw" : ""}` }</p>
        </div>
        <div className=' grid grid-cols-3 bg-gray-600 gap-2 p-2 rounded my-5 '>          
          {
            [...Array(9)].map(
              (item, index) => (
                <div key={index} 
                onClick={() => {
                  updateBoard(index)
                }}
                className={` w-20 h-20 p-2 flex items-center justify-center font-bold text-xl  rounded
                ${winnerCombos.includes(index) ? 'bg-gray-500' :'bg-gray-800'}`}>
                  {boardData[index]}
                </div>
              )
            )
          }
        </div>
        {
          (isDraw || winner != "") && <div className='p-3 flex items-center justify-center'>
          <button onClick={resetGame} className=' bg-gray-600 rounded px-3 hover:bg-gray-500 '>Reset</button>
        </div>
        }        
      </div>
    </main>
  )
}

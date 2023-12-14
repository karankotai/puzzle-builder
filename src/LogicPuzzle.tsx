import { useState } from 'react'
import Puzzle from './Puzzle'
import problem from "./assets/problem.json"

const LogicPuzzle = () => {
  const [showHints, setShowHints] = useState(false)
  return (
    <div className="p-[2em] items-center text-center bg-cyan-50 border-[10px] h-[100vh] border-slate-400 flex">
      <div className='w-[45%] h-full pt-[6%] mr-5 pr-8 border-r-2 border-black'>
        <h2 className="text-cyan-300 m-4 text-3xl font-bold">{problem.title}</h2>
        <p className='px-[4%]'>{problem.desc}</p>
        <hr className="border-1 my-5 border-black" />
        <p onClick={() => setShowHints(!showHints)} className="text-center text-white p-1 font-bold text-lg cursor-pointer bg-slate-400">--Hints--</p>
        <ul className="list-disc text-left m-auto mt-2 w-fit" style={{ display: showHints ? 'block' : 'none' }}>
          {problem.hints.map(ele => <li>{ele}</li>)}
        </ul>
        <hr className="border-1 my-5 border-black" />
      </div>
      <div className='m-auto'>
        <Puzzle options={problem.options} setShowHints={setShowHints} ans={problem.ans} />
      </div>
    </div>
  )
}

export default LogicPuzzle

import { useState } from 'react'
import Puzzle from './Puzzle'

const problem = {
  title: "Whose Shoes",
  desc: "Aditya, Basil, Cecilia, and Dimitri each teach one class at 8:00, 9:00, 10:00, or 11:00. At those times, they each teach algebra, calculus, geometry, or probability. Everybody teaches at a different time, and everybody teaches a different class. For each teacher, we’d like to know *when* they teach and *which course*they teach. Given a set of clues, how can we figure it out?",
  hints: [
    "One of Basil's class and the 9:00 class is calculus and the other is geometry.",
    "The four classes are Cecilia’s, the 10:00 class, geometry, and probability.",
    "Aditya’s class is one hour before calculus.",
    "Calculus is two hours after geometry"
  ],
  options: {
    teacher: ["Aditya", "Basil", "Cecilia", "Dimitri"],
    course: ["Probablity", "Geometry", "Calculus", "Algebra"],
    class_time: ["8:00", "9:00", "10:00", "11:00"],
  },
  ans: [
    { teacher: "Aditya", class_time: "8:00", course: "Probablity" },
    { teacher: "Basil", class_time: "11:00", course: "Geometry" },
    { teacher: "Cecilia", class_time: "9:00", course: "Calculus" },
    { teacher: "Dimitri", class_time: "10:00", course: "Algebra" },
  ]
}

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

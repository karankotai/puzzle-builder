// import {useState} from 'react'
import { IoMdCheckmark } from "react-icons/io";

interface PuzzleProps {
  options: Record<string, Array<string>>,
  ans: Array<object>
}

const Puzzle = ({ options, ans }: PuzzleProps) => {
  // const [teacher,setTeacher] = useState("")
  const options_cols = Object.keys(options)
  const correctCase = (str: string) => {
    str = str.toLowerCase().split("_").map(prev => {
      return prev[0].toLocaleUpperCase() + prev.substring(1)
    }).join(" ")
    return str
  }
  console.log(ans)

  return (
    <div className="w-[35vw] gap-1 grid grid-cols-[1fr,1fr,1fr]">
      <div></div>
      {/* top heading for 1st box */}
      <div className="justify-center items-center text-lg font-semibold bg-slate-400 border-black flex flex-col">
        <div className="w-full flex justify-between items-stretch h-full">
          {options[options_cols[0]].map(ele => {
            return <div style={{ writingMode: 'vertical-rl' }} className="rotate-180 py-2 text-base w-full border border-slate-500 text-slate-500 p-1 flex items-center justify-center bg-cyan-100">{ele}</div>
          })}
        </div>
        <p className="items-center flex text-white p-1.5">{correctCase(options_cols[0])}</p>
      </div>
      {/* top heading for 2nd box */}
      <div className="justify-center items-center text-lg font-semibold bg-cyan-100 border border-black flex flex-col">
        <div className="w-full flex justify-between items-stretch h-full">
          {options[options_cols[1]].map(ele => {
            return <div style={{ writingMode: 'vertical-rl' }} className="rotate-180 min-h-[6.5em] text-base w-full border-r border-black text-white bg-slate-400 p-1 flex items-center justify-center">{ele}</div>
          })}
        </div>
        <p className="items-center flex text-slate-500 p-1.5">{correctCase(options_cols[1])}</p>
      </div>
      {/* left heading for 1st box */}
      <div className="justify-center items-center text-lg font-semibold bg-slate-400 border-black flex">
        <div className="w-[74%] flex flex-col justify-between items-stretch h-full">
          {options[options_cols[2]].map(ele => {
            return <div className="border text-sm border-black text-slate-500 p-1 flex items-center justify-center h-full bg-cyan-100">{ele}</div>
          })}
        </div>
        <p style={{ writingMode: 'vertical-rl' }} className="w-[26%] items-center flex text-white rotate-180">{correctCase(options_cols[2])}</p>
      </div>
      {/* 1st box */}
      <div className='border grid grid-cols-4 border-black'>
        {options[options_cols[2]].map((ele,i) => {
          console.log(ele)
          return <>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
          </>
        })}
      </div>
      {/* 2nd box */}
      <div className='border grid grid-cols-4 border-black'>
        {options[options_cols[2]].map(ele => {
          console.log(ele)
          return <>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
          </>
        })}
      </div>
      {/* left heading for 3rd box */}
      <div className="justify-center border border-black items-center text-lg font-semibold bg-cyan-100 flex border-r border-r-black">
        <div className="w-[74%] flex flex-col justify-between items-stretch h-full">
          {options[options_cols[1]].map(ele => {
            return <div className="border border-black text-base text-white p-1 flex items-center justify-center h-full bg-slate-400">{ele}</div>
          })}
        </div>
        <p style={{ writingMode: 'vertical-rl' }} className="w-[26%] items-center flex font-semibold text-slate-500 rotate-180">{correctCase(options_cols[1])}</p>
      </div>
      {/* 3rd box */}
      <div className='border grid grid-cols-4 border-black'>
        {options[options_cols[2]].map(ele => {
          console.log(ele)
          return <>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
            <button className="bg-white border-slate-300 rounded-none px-2 py-0 min-h-[2.5em]"></button>
          </>
        })}
      </div>
    </div >
  )
}

export default Puzzle

import { useEffect, useRef, useState } from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import AlertComp from './AlertComp';
import ResetComp from './ResetComp';
import EndProblemConfirm from './EndProblemConfirm';

interface PuzzleProps {
  options: Record<string, Array<string>>,
  ans: Array<object>,
  correctArray: number[][][],
  setShowHints: React.Dispatch<React.SetStateAction<boolean>>;
}
//empty boxes template
const createInitialState = () => {
  return [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
};
//for print proper case in headings
const correctCase = (str: string) => {
  str = str.toLowerCase().split("_").map(prev => {
    return prev[0].toLocaleUpperCase() + prev.substring(1)
  }).join(" ")
  return str
}

const Puzzle = ({ options, ans, correctArray, setShowHints }: PuzzleProps) => {
  const options_cols = Object.keys(options)
  const tries = useRef(0);
  // these states array contains each box top and left value at 0 and 1 index
  const [box_1, setBox1] = useState(createInitialState())
  const [box_2, setBox2] = useState(createInitialState())
  const [box_3, setBox3] = useState(createInitialState())
  // for alert component storing status code 0 is not show , 1 is puzzle wrong sol, 2 is puzzle correct sol, 3 is warning
  const [alert, setAlert] = useState(0)
  // prev state stack to store object of undo box  number and box prev state 
  const prevState = useRef<{ lastUpdatedBox: number; box: number[][] }[]>([]);

  // gets an array with top and left values and the box number for updating at 0, 1, 2 index
  const handleBoxClick = (pos: number[]) => {
    removeError()
    tries.current++
    const tempBox = pos[2] === 1 ? [...box_1] : pos[2] === 2 ? [...box_2] : [...box_3];
    prevState.current.push({
      lastUpdatedBox: pos[2],
      box: JSON.parse(JSON.stringify(tempBox)),
    });
    if (tempBox[pos[0]][pos[1]] === 0) {
      tempBox[pos[0]][pos[1]] = 1
    }
    else if (tempBox[pos[0]][pos[1]] === 1) {
      if (checkRC(tempBox, pos[0], pos[1])) {
        setAlert(3)
        return
      } else {
        tempBox[pos[0]].fill(1)
        for (let i = 0; i < 4; i++) {
          tempBox[i][pos[1]] = 1
        }
        tempBox[pos[0]][pos[1]] = 2
      }
    }
    else {
      for (let i = 0; i < 4; i++) {
        tempBox[i][pos[1]] = 0
      }
      tempBox[pos[0]].fill(0)
    }
    pos[2] === 1 ? setBox1([...tempBox]) : pos[2] === 2 ? setBox2([...tempBox]) : setBox3([...tempBox])
  }
  //fn to check r and c if already one is ticked right in the r or c
  const checkRC = (arr: number[][], i: number, j: number) => {
    return arr[i].includes(2) || arr.map(el => el[j]).includes(2)
  }
  const undo = () => {
    if (prevState.current.length > 0) {
      const { lastUpdatedBox, box } = prevState.current.pop()!;
      lastUpdatedBox === 1
        ? setBox1([...box])
        : lastUpdatedBox === 2
          ? setBox2([...box])
          : lastUpdatedBox === 3
            ? setBox3([...box])
            : '';
    }
  }
  const reset = () => {
    setConfirmReset(false)
    setRight(0)
    tries.current = 0
    setBox1(createInitialState())
    setBox2(createInitialState())
    setBox3(createInitialState())
  }
  const [confirmReset, setConfirmReset] = useState(false)
  const [confirmEnd, setConfirmEnd] = useState(false)
  //comapre ans by iterating over each box and matching with respective properties in ansArray
  const [right, setRight] = useState(0)
  const checkAns = (end: boolean = false) => {
    let count = 0;
    [box_1, box_2, box_3].forEach((box: number[][], k: number) => {
      for (let i = 0; i < 4; i++) {
        if (box[i].indexOf(2) != -1 && box[i].indexOf(2) == correctArray[k][i].indexOf(2)) count++
      }
    })
    setRight(count)
    count == 12 ? setAlert(2) : end ? setAlert(4) : count >= 0 ? setAlert(1) : console.log('ok')
  }

  // feedback functionality
  const feedback = () => {
    tries.current += 10;
    [box_1, box_2, box_3].forEach((box, k) => {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (box[i][j] != correctArray[k][i][j] && box[i][j] != 0) {
            box[i][j] = 4
            k == 0 ? setBox1([...box]) : k == 1 ? setBox2([...box]) : setBox3([...box])
          }
        }
      }
    })
  }
  //check if all the boxes are marked either wrong or tick if yes checkAns on each box update
  useEffect(() => {
    let flag = true
    box_1.forEach(ele => {
      if (!ele.includes(2)) flag = false
    })
    box_2.forEach(ele => {
      if (!ele.includes(2)) flag = false
    })
    box_3.forEach(ele => {
      if (!ele.includes(2)) flag = false
    })
    if (flag)
      checkAns()
  }, [box_1, box_2, box_3])

  // reset the feedback thing
  const removeError = () => {
    let flag = false;
    [box_1, box_2, box_3].forEach((box, k) => {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (box[i][j] == 4) {
            box[i][j] = 0
            flag = true
          }
        }
      }
      if(flag) k == 0 ? setBox1([...box]) : k == 1 ? setBox2([...box_2]) : setBox3([...box])
    })
  }
  const calculateScore = (tr: number) => {
    const penalty = 2
    const x = tr / 2
    return right * 10 - (Math.abs(x - 12)) * penalty
  }
  return (
    <>
      <div className="w-[35vw] gap-1 grid grid-cols-[1fr,1fr,1fr]">
        <div></div>
        {/* top heading for 1st box */}
        <div className="justify-center items-center text-lg font-semibold bg-slate-400 border-black flex flex-col">
          <div className="w-full flex justify-between items-stretch h-full">
            {options[options_cols[0]].map(ele => {
              return <div style={{ writingMode: 'vertical-rl' }} className="rotate-180 py-2 text-base w-full border border-slate-500 text-slate-500 p-1 flex items-center justify-center bg-cyan-100">{correctCase(ele)}</div>
            })}
          </div>
          <p className="items-center flex text-white p-1.5">{correctCase(options_cols[0])}</p>
        </div>
        {/* top heading for 2nd box */}
        <div className="justify-center items-center text-lg font-semibold bg-cyan-100 border border-black flex flex-col">
          <div className="w-full flex justify-between items-stretch h-full">
            {options[options_cols[1]].map(ele => {
              return <div style={{ writingMode: 'vertical-rl' }} className="rotate-180 min-h-[6.5em] text-base w-full border-r border-black text-white bg-slate-400 p-1 flex items-center justify-center">{correctCase(ele)}</div>
            })}
          </div>
          <p className="items-center flex text-slate-500 p-1.5">{correctCase(options_cols[1])}</p>
        </div>
        {/* left heading for 1st box */}
        <div className="justify-center items-center text-lg font-semibold bg-slate-400 border-black flex">
          <div className="w-[74%] flex flex-col justify-between items-stretch h-full">
            {options[options_cols[2]].map(ele => {
              return <div className="border text-sm border-black text-slate-500 p-1 flex items-center justify-center h-full bg-cyan-100">{correctCase(ele)}</div>
            })}
          </div>
          <p style={{ writingMode: 'vertical-rl' }} className="w-[26%] items-center flex text-white rotate-180">{correctCase(options_cols[2])}</p>
        </div>
        {/* 1st box */}
        <div className='border grid grid-cols-4 border-black'>
          {box_1.map((ele, i) => {
            return <>
              {ele.map((el, j) => {
                return <button className={`${el == 4 ? 'border-red-500 bg-red-200' : 'bg-white border-slate-300'} rounded-none px-2 py-0 min-h-[2.5em]`} onClick={() => handleBoxClick([i, j, 1])}>
                  {(el === 2)
                    ? <IoMdCheckmark size='1.5em' className='bg-green-400' color='white' />
                    : (el === 1)
                      ? <IoClose className='bg-red-400' color='white' size='1.5em' /> : ''}
                </button>
              })}
            </>
          })}
        </div>
        {/* 2nd box */}
        <div className='border grid grid-cols-4 border-black'>
          {box_2.map((ele, i) => {
            return <>
              {ele.map((el, j) => {
                return <button className={`${el == 4 ? 'border-red-500 bg-red-200' : 'bg-white border-slate-300'} rounded-none px-2 py-0 min-h-[2.5em]`} onClick={() => handleBoxClick([i, j, 2])}>
                  {(el === 2)
                    ? <IoMdCheckmark className='bg-green-400' color='white' size='1.5em' />
                    : (el === 1)
                      ? <IoClose className='bg-red-400' color='white' size='1.5em' /> : ''}
                </button>
              })}
            </>
          })}
        </div>
        {/* left heading for 3rd box */}
        <div className="justify-center border border-black items-center text-lg font-semibold bg-cyan-100 flex border-r border-r-black">
          <div className="w-[74%] flex flex-col justify-between items-stretch h-full">
            {options[options_cols[1]].map(ele => {
              return <div className="border border-black text-base text-white p-1 flex items-center justify-center h-full bg-slate-400">{correctCase(ele)}</div>
            })}
          </div>
          <p style={{ writingMode: 'vertical-rl' }} className="w-[26%] items-center flex font-semibold text-slate-500 rotate-180">{correctCase(options_cols[1])}</p>
        </div>
        {/* 3rd box */}
        <div className='border grid grid-cols-4 border-black'>
          {box_3.map((ele, i) => {
            return <>
              {ele.map((el, j) => {
                return <button className={`${el == 4 ? 'border-red-500 bg-red-200' : 'bg-white border-slate-300'} rounded-none px-2 py-0 min-h-[2.5em]`} onClick={() => handleBoxClick([i, j, 3])}>
                  {(el === 2)
                    ? <IoMdCheckmark size='1.5em' className='bg-green-400' color='white' />
                    : (el === 1)
                      ? <IoClose size='1.5em' className='bg-red-400' color='white' /> : ''}
                </button>
              })}
            </>
          })}
        </div>
      </div>
      <div className='mt-10 flex justify-around w-full items-center m-auto'>
        <button className='bg-white border-2 py-1.5 hover:bg-cyan-200 hover:text-slate-500 uppercase border-cyan-500' onClick={() => setConfirmEnd(true)}>End</button>
        <button className='bg-white border-2 py-1.5 hover:bg-cyan-200 hover:text-slate-500 uppercase border-cyan-500' onClick={() => setShowHints(prev => !prev)}>Hint</button>
        <button disabled={prevState.current.length === 0} onClick={undo} className={`${prevState.current.length === 0 ? 'hover:cursor-not-allowed' : ''} bg-white border-2 py-1.5 hover:bg-cyan-200 hover:text-slate-500 uppercase border-cyan-500`}>Undo</button>
        <button disabled={prevState.current.length === 0} onClick={feedback} className={`${prevState.current.length === 0 ? 'hover:cursor-not-allowed' : ''} bg-white border-2 py-1.5 hover:bg-cyan-200 hover:text-slate-500 uppercase border-cyan-500`}>Feedback</button>
        <button onClick={() => setConfirmReset(true)} className='bg-white border-2 py-1.5 hover:bg-cyan-200 hover:text-slate-500 uppercase border-cyan-500'>Start Over</button>
      </div>
      <AlertComp score={calculateScore(tries.current)} ans={ans} showAlert={alert == 1 || alert == 2 || alert == 3 || alert == 4} status={alert} setShowAlert={setAlert} />
      <ResetComp reset={reset} confirmReset={confirmReset} setConfirmReset={setConfirmReset} />
      <EndProblemConfirm checkAns={checkAns} confirmEnd={confirmEnd} setConfirmEnd={setConfirmEnd} />
    </>
  )
}

export default Puzzle
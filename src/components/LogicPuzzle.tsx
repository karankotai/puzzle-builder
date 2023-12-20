import { useEffect, useState } from 'react'
import Puzzle from './Puzzle'
import { IoMdHome } from 'react-icons/io'
import { ImSpinner2 } from "react-icons/im";
import axios from 'axios'
import { Link } from 'react-router-dom'
import ErrorAlert from './ErrorAlert';

interface Problem {
  title: string;
  desc: string;
  hints: string[];
  options: {
    [key: string]: string[];
  };
  ans: {
    [key: string]: unknown;
  }[];
}

const LogicPuzzle = ({ latest }: { latest: boolean }) => {
  const [loading, setLoading] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [errorFetching, setErrorFetching] = useState(false)
  const [problem, setProblem] = useState<Problem>({ title: "", desc: "", hints: [], options: {}, ans: [] })
  const calculateCorrect = () => {
    const options_cols = problem?.options ? Object.keys(problem?.options) : []
    if (options_cols.length > 0) {
      const correctBox1: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
      const correctBox2: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
      const correctBox3: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
      // @ts-expect-error group by not included in ts
      const checker1 = Object.groupBy(problem.ans, (ele) => ele[options_cols[0]])
      // @ts-expect-error group by not included in ts
      const checker2 = Object.groupBy(problem.ans, (ele) => ele[options_cols[1]])
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const upperColVal1 = problem?.options[options_cols[0]][j]
          const upperColVal2 = problem?.options[options_cols[1]][j]
          const upperColVal3 = problem?.options[options_cols[0]][j]
          correctBox1[i][j] = checker1[upperColVal1][0][options_cols[2]] == problem?.options[options_cols[2]][i] ? 2 : 1
          correctBox2[i][j] = checker2[upperColVal2][0][options_cols[2]] == problem?.options[options_cols[2]][i] ? 2 : 1
          correctBox3[i][j] = checker1[upperColVal3][0][options_cols[1]] == problem?.options[options_cols[1]][i] ? 2 : 1
        }
      }
      setAnsBoxes([correctBox1, correctBox2, correctBox3])
    }
  }
  const [ansBoxes, setAnsBoxes] = useState<number[][][]>([])
  useEffect(() => {
    setErrorFetching(false)
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`https://nice-tan-butterfly-sari.cyclic.app/puzzle/allPuzzle`)
        const puzzles = await response?.data?.Puzzles;
        if (!puzzles || puzzles.length == 0) {
          setLoading(false)
          setErrorFetching(true)
        } else {
          if (!latest) {
            const randomNum = Math.round(Math.random() * puzzles.length)
            setProblem(puzzles[randomNum])
          }else{
            setProblem(puzzles[puzzles.length-1])
          }
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching JSON data:', error);
        setLoading(false)
        setErrorFetching(true)
      }
    };
    fetchData();
    calculateCorrect()
  }, [])
  useEffect(() => {
    calculateCorrect()
  }, [problem])

  if (loading) return <div className='flex items-center justify-center h-screen'><ImSpinner2 className="animate-spin" color='#91ccd1' size='3em' /></div>
  return (
    <div className='flex flex-col'>
      <Link to='/'><IoMdHome className="fixed shadow-lg left-[2%] border border-black top-[3%] z-20 bg-white rounded-md" size='2.8em' color='#91ccd1' /></Link>
      <div className="p-[2em] items-center text-center bg-cyan-50 border-[10px] h-[100vh] border-slate-400 flex">
        <div className='w-[45%] h-full pt-[6%] mr-5 pr-8 border-r-2 border-black'>
          <h2 className="text-cyan-300 m-4 text-3xl font-bold">{problem?.title}</h2>
          <p className='px-[4%]'>{problem?.desc}</p>
          <hr className="border-1 my-5 border-black" />
          <p onClick={() => setShowHints(!showHints)} className="text-center text-white p-1 font-bold text-lg cursor-pointer bg-slate-400">--Hints--</p>
          <ul className="list-disc text-left m-auto mt-2 w-fit px-10" style={{ display: showHints ? 'block' : 'none' }}>
            {problem?.hints.map(ele => <li key={ele}>{ele}</li>)}
          </ul>
          <hr className="border-1 my-5 border-black" />
        </div>
        {problem?.ans.length > 0 && <div className='m-auto'>
          <Puzzle options={problem?.options} correctArray={ansBoxes} setShowHints={setShowHints} ans={problem?.ans} />
        </div>}
      </div>
      {errorFetching && <ErrorAlert showError={errorFetching} setShowError={setErrorFetching} />}
    </div>
  )
}

export default LogicPuzzle
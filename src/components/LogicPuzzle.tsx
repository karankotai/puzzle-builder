import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Puzzle from './Puzzle'
import problem1 from '../assets/problem1.json'
import problem2 from '../assets/problem2.json'
import problem3 from '../assets/problem3.json'
import problem4 from '../assets/problem4.json'
import problem5 from '../assets/problem5.json'
import { IoMdHome } from 'react-icons/io'
import { Link } from 'react-router-dom'

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

const LogicPuzzle = () => {
  const { id } = useParams()
  const [showHints, setShowHints] = useState(false)
  const [problem, setProblem] = useState<Problem>({ title: "", desc: "", hints: [], options: {}, ans: [] })
  useEffect(() => {
    const fetchData = () => {
      try {
        switch (id) {
          case '1':
            setProblem(problem1);
            break;
          case '2':
            setProblem(problem2);
            break;
          case '3':
            setProblem(problem3);
            break;
          case '4':
            setProblem(problem4);
            break;
          case '5':
            setProblem(problem5);
            break;
          default:
            console.error(`Unknown problem ID: ${id}`);
        }
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, [])
  return (
    <div className='flex flex-col'>
      <Link to='/'><IoMdHome className="fixed shadow-lg left-[2%] border border-black top-[3%] z-20 bg-white rounded-md" size='2.8em' color='#91ccd1'/></Link>
      <div className="p-[2em] items-center text-center bg-cyan-50 border-[10px] h-[100vh] border-slate-400 flex">
        <div className='w-[45%] h-full pt-[6%] mr-5 pr-8 border-r-2 border-black'>
          <h2 className="text-cyan-300 m-4 text-3xl font-bold">{problem.title}</h2>
          <p className='px-[4%]'>{problem.desc}</p>
          <hr className="border-1 my-5 border-black" />
          <p onClick={() => setShowHints(!showHints)} className="text-center text-white p-1 font-bold text-lg cursor-pointer bg-slate-400">--Hints--</p>
          <ul className="list-disc text-left m-auto mt-2 w-fit px-10" style={{ display: showHints ? 'block' : 'none' }}>
            {problem.hints.map(ele => <li>{ele}</li>)}
          </ul>
          <hr className="border-1 my-5 border-black" />
        </div>
        {problem.ans.length > 0 && <div className='m-auto'>
          <Puzzle options={problem.options} setShowHints={setShowHints} ans={problem.ans} />
        </div>}
      </div>
    </div>
  )
}

export default LogicPuzzle
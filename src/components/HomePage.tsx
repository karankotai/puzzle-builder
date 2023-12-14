import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="bg-cyan-200 h-screen w-screen border-8 border-slate-400 p-5">
        <h2 className="text-center p-5 text-slate-600 border-2 border-black text-4xl font-bold">A Puzzle a day keeps boredom away</h2>
        <div className="grid grid-cols-2 p-2 m-2 mt-[4%] justify-center items-center">
            <img className="m-auto w-[40em] rounded-xl" src="https://cdn.dribbble.com/users/902842/screenshots/10935537/media/a69411a3ab9793571421a15ec19ecafb.gif" alt="puzzle making gif" />
            <div className="m-auto w-[80%] bg-[rgba(0,0,0,0.1)] items-center rounded-xl flex flex-col gap-3 p-[10%] border border-white">
                <Link className="w-[80%]" to={'/problem/1'}><button className="bg-white px-5 w-full hover:bg-cyan-300 hover:text-white hover:border-2 hover:border-white text-black">Problem 1</button></Link>
                <Link className="w-[80%]" to={'/problem/2'}><button className="bg-white px-5 w-full hover:bg-cyan-300 hover:text-white hover:border-2 hover:border-white text-black">Problem 2</button></Link>
                <Link className="w-[80%]" to={'/problem/3'}><button className="bg-white px-5 w-full hover:bg-cyan-300 hover:text-white hover:border-2 hover:border-white text-black">Problem 3</button></Link>
                <Link className="w-[80%]" to={'/problem/4'}><button className="bg-white px-5 w-full hover:bg-cyan-300 hover:text-white hover:border-2 hover:border-white text-black">Problem 4</button></Link>
                <Link className="w-[80%]" to={'/problem/5'}><button className="bg-white px-5 w-full hover:bg-cyan-300 hover:text-white hover:border-2 hover:border-white text-black">Problem 5</button></Link>
            </div>
        </div>
    </div>
  )
}

export default HomePage

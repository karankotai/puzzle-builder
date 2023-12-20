import { Route, Routes } from "react-router-dom"
import LogicPuzzle from "./components/LogicPuzzle"
import HomePage from "./components/HomePage"
import AddPuzzle from "./components/AddPuzzle"
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />}/> 
      <Route path="/problem" element={<LogicPuzzle latest={false} />}/>
      <Route path="/problem/latest" element={<LogicPuzzle latest={true} />}/>
      <Route path="/addPuzzle" element={<AddPuzzle />}/>
    </Routes>
    </>
  )
}

export default App
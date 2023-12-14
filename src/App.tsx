import { Route, Routes } from "react-router-dom"
import LogicPuzzle from "./components/LogicPuzzle"
import HomePage from "./components/HomePage"
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />}/> 
      <Route path="/problem/:num" element={<LogicPuzzle />}/>
    </Routes>
    </>
  )
}

export default App
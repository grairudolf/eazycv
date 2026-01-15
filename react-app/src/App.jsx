
import  {BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from '../Components/Navbar'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'
import Home from '../Components/Home'
// import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
     <Navbar />

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>

    </Routes>

    </BrowserRouter>

    </>
  )
}

export default App

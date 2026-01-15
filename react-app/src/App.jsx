
import  {BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from '../Components/Navbar'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'
import Home from '../Components/Home'
import CVForm from '../Components/CVForm'
import CV from '../Components/CV'
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
      <Route path="/cvform" element={<CVForm />} />
      <Route path="/cv" element={<CV />} />


    </Routes>

    </BrowserRouter>

    </>
  )
}

export default App

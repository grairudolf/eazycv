
import  {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'
import Home from '../Components/Home'
import CVForm from '../Components/CVForm'
import CV from '../Components/CV'
import { isAuthenticated } from './utils/auth'
// import './App.css'

function RequireAuth({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {

  return (
    <>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/form" element={<RequireAuth><CVForm /></RequireAuth>} />
            <Route path="/cv" element={<RequireAuth><CV /></RequireAuth>} />
            <Route path="/cv/:id" element={<RequireAuth><CV /></RequireAuth>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
    </>
  )
}

export default App

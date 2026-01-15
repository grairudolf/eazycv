import '../Components/Navbar.css';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (

    <div className="Navbar">
        <header className="site-header">
            <nav className="nav">
            <a href="index.html" className="nav__brand nav__logo" aria-label="EazyCV home">
                <img src="/src/assets/logow.png" alt="EazyCV logo"></img>
            </a>
            <button className="nav__toggle" aria-label="Toggle navigation" aria-expanded="false">
                <span></span>
                <span></span>
            </button>
            <div className="nav__menu">
                <ul className="nav__links">
                    <li> <Link to="/"><a href="#" className="nav__link">Home</a></Link>
                        </li>

                    <li><a href="#" className="nav__link">About</a></li>
                    <li><a href="#" className="nav__link">Templates</a></li>
                    <li><a href="#" className="nav__link">Contact</a></li>
                </ul>
                <div className="nav__actions">
                        <Link to="/login"><a href="#" className="nav__auth nav__auth--ghost" id="open-login">Log In</a></Link>

                        <Link to="/signup"><a href="#" className="nav__auth nav__auth--primary" id="open-signup">Sign Up</a></Link>
                    
                    
                </div>
            </div>
        </nav>
        </header>
      
    </div>

  );
}
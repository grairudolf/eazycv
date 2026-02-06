import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, DocumentTextIcon, PencilSquareIcon, ArrowRightOnRectangleIcon } from '../src/utils/icons';
import { getSession, clearSession } from '../src/utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      setIsAuthenticated(!!getSession());
    };
    updateAuth();
    window.addEventListener('eazycv-auth-change', updateAuth);
    return () => window.removeEventListener('eazycv-auth-change', updateAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('eazycv_current_cv_id');
    localStorage.removeItem('cvData');
    clearSession();
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            onClick={() => setIsMenuOpen(false)}
          >
          <img src="logo.png" className="w-20 h-15" alt="EazyCV logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleAnchorClick(e, '#how-it-works')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors duration-200 font-medium cursor-pointer"
            >
              How it works
            </a>
            <a 
              href="#templates" 
              onClick={(e) => handleAnchorClick(e, '#templates')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors duration-200 font-medium cursor-pointer"
            >
              Features
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors duration-200 font-medium cursor-pointer"
            >
              Contact
            </a>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200 text-blue-600 font-medium"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>My Account</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      to="/cv"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <span className="inline-flex items-center gap-2">
                        <DocumentTextIcon className="w-5 h-5 text-gray-700" />
                        <span>View CV</span>
                      </span>
                    </Link>
                    <Link
                      to="/form"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <span className="inline-flex items-center gap-2">
                        <PencilSquareIcon className="w-5 h-5 text-gray-700" />
                        <span>Create New CV</span>
                      </span>
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-150 font-medium"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        <span>Logout</span>
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="px-6 py-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Create account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200/50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-1 pt-4">
              <Link 
                to="/" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-150 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="#how-it-works"
                onClick={(e) => handleAnchorClick(e, '#how-it-works')}
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-150 font-medium cursor-pointer"
              >
                How it works
              </a>
              <a 
                href="#templates"
                onClick={(e) => handleAnchorClick(e, '#templates')}
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-150 font-medium cursor-pointer"
              >
                Features
              </a>
              <a 
                href="#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-150 font-medium cursor-pointer"
              >
                Contact
              </a>

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 my-4 pt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/cv"
                      className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-150 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="inline-flex items-center gap-2">
                        <DocumentTextIcon className="w-5 h-5 text-gray-700" />
                        <span>View CV</span>
                      </span>
                    </Link>
                    <Link
                      to="/form"
                      className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-150 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="inline-flex items-center gap-2">
                        <PencilSquareIcon className="w-5 h-5 text-gray-700" />
                        <span>Create New CV</span>
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors duration-150 font-medium"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        <span>Logout</span>
                      </span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      to="/login"
                      className="block w-full text-center px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link 
                      to="/signup"
                      className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-slide-up"
          title="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-20 border-t border-gray-700">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="logow.png" className="w-20 h-15"/>
              </div>
              <p className="text-sm leading-relaxed">
                Create professional CVs in minutes. Let AI help you shine in the job market.
              </p>
              <div className="flex gap-3 pt-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.49v8.5h2.5v-4.1c0-.85.63-1.26 1.55-1.26.91 0 1.54.4 1.54 1.35v4.02h2.5M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.5H5.5v8.5h2.77z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors duration-300"
                  title="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 7-7 7-7s1.1 5.2-5.2 7.2" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                  title="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.545 2.914 1.209.092-.937.349-1.546.635-1.901-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.545 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Section */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm hover:text-white transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/form" className="text-sm hover:text-white transition-colors duration-300">
                    Create CV
                  </Link>
                </li>
                <li>
                  <a href="#templates" className="text-sm hover:text-white transition-colors duration-300">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-sm hover:text-white transition-colors duration-300">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm hover:text-white transition-colors duration-300">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-sm hover:text-white transition-colors duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-sm hover:text-white transition-colors duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-sm hover:text-white transition-colors duration-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#press" className="text-sm hover:text-white transition-colors duration-300">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#privacy" className="text-sm hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-sm hover:text-white transition-colors duration-300">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm hover:text-white transition-colors duration-300">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#support" className="text-sm hover:text-white transition-colors duration-300">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 py-8">
            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm text-gray-400">
                © {currentYear} EazyCV. All rights reserved.
              </p>

              {/* Newsletter Signup */}
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 bg-black/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-gray-500">
            <p>
              Made with <span className="text-red-500">❤</span> by the EazyCV team. Helping professionals worldwide shine.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

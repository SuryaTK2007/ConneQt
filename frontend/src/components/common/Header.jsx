import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = ({ isDarkMode, handleThemeToggle }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a
            href="#"
            className="text-2xl font-bold text-gray-900 dark:text-white hover:scale-105 transition-transform duration-300 ease-out"
          >
            Conne<span className="text-cyan-500">Q</span>t
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Features
            </a>
            <a
              href="#mentorship"
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Mentorship
            </a>
            <a
              href="#events"
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Events
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleThemeToggle}
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:scale-110"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="hidden sm:inline-block px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 ease-out transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
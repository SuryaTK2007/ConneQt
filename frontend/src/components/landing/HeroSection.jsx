import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-white via-white/50 to-transparent dark:from-gray-900 dark:via-gray-900/50 dark:to-transparent"></div>
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 pb-2">
          Your Campus Professional Network
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-4 mb-10 max-w-2xl mx-auto">
          Connect with alumni, find mentors, discover events, and build lasting professional relationships within your campus community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/auth')}
            className="group px-8 py-4 font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full shadow-xl shadow-cyan-500/30 hover:from-cyan-700 hover:to-cyan-800 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 ease-out transform hover:scale-105"
          >
            Get Started <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button className="px-8 py-4 font-bold text-gray-800 dark:text-white bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-out transform hover:scale-105 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-lg hover:shadow-xl">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
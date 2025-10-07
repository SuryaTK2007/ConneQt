import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent dark:from-cyan-900/30 dark:to-transparent"></div>
      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Start Building Your Professional Network Today
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Join thousands of students, alumni, and faculty who are already leveraging ConneQt to advance their careers and foster lifelong connections.
        </p>
        <button 
          onClick={() => navigate('/auth')}
          className="group px-12 py-5 text-lg font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full shadow-2xl shadow-cyan-500/40 hover:from-cyan-700 hover:to-cyan-800 hover:shadow-3xl hover:shadow-cyan-500/50 transition-all duration-500 ease-out transform hover:scale-110"
        >
          Sign Up for Free <FiArrowRight className="inline ml-3 group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default CTASection;
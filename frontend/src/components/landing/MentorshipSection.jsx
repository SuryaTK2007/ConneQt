import React from "react";
import { FiUsers, FiArrowRight } from "react-icons/fi";

const MentorshipSection = () => {
  return (
    <section id="mentorship" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              AI-Powered Mentorship Matching
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Get matched with the perfect mentor based on your career goals, interests, and skills. Our intelligent system connects you with alumni and faculty who can provide valuable guidance and industry insights.
            </p>
            <button className="group px-8 py-4 font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full shadow-xl shadow-cyan-500/30 hover:from-cyan-700 hover:to-cyan-800 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 ease-out transform hover:scale-105">
              Find a Mentor <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          <div className="relative h-96">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-20 dark:opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FiUsers className="text-9xl text-cyan-400 opacity-20" />
            </div>
            <div className="relative flex flex-col space-y-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl flex items-center space-x-4 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 ease-out transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
                <img
                  src="https://i.pravatar.cc/40?u=a"
                  alt="Mentor 1"
                  className="w-12 h-12 rounded-full ring-2 ring-cyan-500/20 hover:ring-cyan-500/40 transition-all duration-300"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-base">
                    Sarah Chen
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lead Engineer @ Google
                  </p>
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl flex items-center space-x-4 ml-12 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 ease-out transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
                <img
                  src="https://i.pravatar.cc/40?u=b"
                  alt="Mentor 2"
                  className="w-12 h-12 rounded-full ring-2 ring-cyan-500/20 hover:ring-cyan-500/40 transition-all duration-300"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-base">
                    David Lee
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Product Manager @ OpenAI
                  </p>
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl flex items-center space-x-4 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 ease-out transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
                <img
                  src="https://i.pravatar.cc/40?u=c"
                  alt="Mentor 3"
                  className="w-12 h-12 rounded-full ring-2 ring-cyan-500/20 hover:ring-cyan-500/40 transition-all duration-300"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-base">
                    Maria Rodriguez
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    UX Designer @ Figma
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;
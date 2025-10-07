import React from "react";

const FeatureCard = ({ icon, title, children }) => (
  <div className="group border border-gray-200/50 bg-white/80 dark:border-gray-700/50 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 text-center transform hover:-translate-y-3 transition-all duration-500 ease-out shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400/30">
    <div className="text-cyan-500 text-5xl mb-6 inline-block transform group-hover:scale-110 transition-transform duration-300 ease-out">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>
  </div>
);

export default FeatureCard;
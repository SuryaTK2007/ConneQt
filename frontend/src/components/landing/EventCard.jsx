import React from "react";

const EventCard = ({ date, title, category }) => (
  <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 flex items-center space-x-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 ease-out shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transform hover:-translate-y-1 cursor-pointer">
    <div className="text-center border-r border-gray-300 dark:border-gray-600 pr-6 group-hover:border-cyan-400/50 transition-colors duration-300">
      <p className="text-3xl font-bold text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300">{date.day}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">{date.month}</p>
    </div>
    <div className="flex-1">
      <p className="text-xs text-cyan-500 font-semibold tracking-widest uppercase mb-2 group-hover:text-cyan-400 transition-colors duration-300">
        {category}
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
        {title}
      </h3>
    </div>
  </div>
);

export default EventCard;
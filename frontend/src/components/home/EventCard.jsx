import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
      <div className={`w-full h-48 ${event.bgColor} flex items-center justify-center`}>
        <div className="text-center text-white">
          <div className="text-4xl mb-2">{event.icon}</div>
          <div className="text-lg font-bold">{event.title}</div>
        </div>
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-400 rounded-full mb-3">
          {event.type}
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {event.date}
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-xs">
          {event.location}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
import React from 'react';
import { FiCalendar, FiBookOpen, FiMessageCircle, FiStar } from 'react-icons/fi';

const HomePage = () => {
  const eventPosts = [
    {
      id: 1,
      title: "Tech Career Fair 2024",
      date: "March 15, 2024",
      image: "https://via.placeholder.com/400x250/0891b2/ffffff?text=Tech+Career+Fair",
      type: "Career Event"
    },
    {
      id: 2,
      title: "Alumni Networking Night",
      date: "March 20, 2024",
      image: "https://via.placeholder.com/400x250/06b6d4/ffffff?text=Alumni+Night",
      type: "Networking"
    },
    {
      id: 3,
      title: "Workshop: Resume Building",
      date: "March 25, 2024",
      image: "https://via.placeholder.com/400x250/0e7490/ffffff?text=Resume+Workshop",
      type: "Workshop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Conne<span className="text-cyan-500">Q</span>t
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Latest Events & Updates
          </h2>
          
          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventPosts.map((event) => (
              <div
                key={event.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-400 rounded-full mb-3">
                    {event.type}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {event.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder for Ads */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-200/50 dark:border-purple-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Opportunity
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sponsored content placeholder - Internship opportunities, job postings, etc.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 dark:from-green-900/30 dark:to-blue-900/30 backdrop-blur-xl rounded-2xl p-8 border border-green-200/50 dark:border-green-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Campus News
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Latest campus announcements and news updates placeholder.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* macOS-style Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-2xl rounded-2xl px-6 py-3 border border-white/30 dark:border-gray-700/30 shadow-2xl">
          <div className="flex items-center space-x-8">
            <button className="group flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300">
              <FiCalendar className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-cyan-500 transition-colors duration-300" />
              <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-cyan-500 transition-colors duration-300">
                Calendar
              </span>
            </button>
            
            <button className="group flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300">
              <FiBookOpen className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-cyan-500 transition-colors duration-300" />
              <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-cyan-500 transition-colors duration-300">
                Works
              </span>
            </button>
            
            <button className="group flex flex-col items-center space-y-1 p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30">
              <FiStar className="w-6 h-6 text-cyan-500" />
              <span className="text-xs text-cyan-500">
                Home
              </span>
            </button>
            
            <button className="group flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300">
              <FiMessageCircle className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-cyan-500 transition-colors duration-300" />
              <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-cyan-500 transition-colors duration-300">
                Alumni Chat
              </span>
            </button>
            
            <button className="group flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300">
              <FiCalendar className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-cyan-500 transition-colors duration-300" />
              <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-cyan-500 transition-colors duration-300">
                Events
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
import React from 'react';
import EventCard from '../components/home/EventCard';
import BottomNavigation from '../components/home/BottomNavigation';

const HomePage = () => {
  const eventPosts = [
    { id: 1, title: 'Tech Career Fair 2024', date: 'March 15, 2024', location: 'Main Auditorium', type: 'Career Event', icon: '💼', bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-600' },
    { id: 2, title: 'Alumni Networking Night', date: 'March 20, 2024', location: 'Student Center', type: 'Networking', icon: '🤝', bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600' },
    { id: 3, title: 'Workshop: Resume Building', date: 'March 25, 2024', location: 'Room 201', type: 'Workshop', icon: '📝', bgColor: 'bg-gradient-to-br from-green-500 to-teal-600' },
    { id: 4, title: 'Startup Pitch Competition', date: 'March 28, 2024', location: 'Innovation Hub', type: 'Competition', icon: '🚀', bgColor: 'bg-gradient-to-br from-orange-500 to-red-600' },
    { id: 5, title: 'Industry Panel Discussion', date: 'April 2, 2024', location: 'Conference Hall', type: 'Panel', icon: '🎯', bgColor: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
    { id: 6, title: 'Coding Bootcamp', date: 'April 5, 2024', location: 'Computer Lab', type: 'Workshop', icon: '💻', bgColor: 'bg-gradient-to-br from-cyan-500 to-blue-600' }
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
              <EventCard key={event.id} event={event} />
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

      <BottomNavigation activeTab="home" />
    </div>
  );
};

export default HomePage;
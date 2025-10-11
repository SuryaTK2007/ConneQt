import React from 'react';
import EventCard from '../components/home/EventCard';
import ConnectionsWidget from '../components/home/ConnectionsWidget';
import PageContainer from '../components/common/PageContainer';

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
    <PageContainer maxWidth="max-w-6xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening in your network
        </p>
      </div>

      {/* Smart Connections Widget */}
      <div className="mb-8">
        <ConnectionsWidget />
      </div>

      {/* Events Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Latest Events & Updates
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventPosts.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Opportunities Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <span className="text-3xl">💼</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Opportunity
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Discover internship opportunities and job postings tailored for you.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <span className="text-3xl">📰</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Campus News
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Stay updated with the latest campus announcements and news.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
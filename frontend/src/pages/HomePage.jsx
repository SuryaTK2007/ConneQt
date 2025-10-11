import React, { useState, useEffect, useRef } from 'react';
import { FiLogOut, FiUser, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/home/EventCard';
import BottomNavigation from '../components/home/BottomNavigation';

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const eventPosts = [
    { id: 1, title: 'Tech Career Fair 2024', date: 'March 15, 2024', location: 'Main Auditorium', type: 'Career Event', icon: '💼', bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-600' },
    { id: 2, title: 'Alumni Networking Night', date: 'March 20, 2024', location: 'Student Center', type: 'Networking', icon: '🤝', bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600' },
    { id: 3, title: 'Workshop: Resume Building', date: 'March 25, 2024', location: 'Room 201', type: 'Workshop', icon: '📝', bgColor: 'bg-gradient-to-br from-green-500 to-teal-600' },
    { id: 4, title: 'Startup Pitch Competition', date: 'March 28, 2024', location: 'Innovation Hub', type: 'Competition', icon: '🚀', bgColor: 'bg-gradient-to-br from-orange-500 to-red-600' },
    { id: 5, title: 'Industry Panel Discussion', date: 'April 2, 2024', location: 'Conference Hall', type: 'Panel', icon: '🎯', bgColor: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
    { id: 6, title: 'Coding Bootcamp', date: 'April 5, 2024', location: 'Computer Lab', type: 'Workshop', icon: '💻', bgColor: 'bg-gradient-to-br from-cyan-500 to-blue-600' }
  ];

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Conne<span className="text-cyan-500">Q</span>t
          </h1>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:block">
                {user?.name || 'User'}
              </span>
              <FiChevronDown className={`text-gray-600 dark:text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 group"
                  >
                    <FiLogOut className="text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
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
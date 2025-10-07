import React from 'react';
import { FiCalendar, FiBookOpen, FiMessageCircle, FiStar, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const BottomNavigation = ({ activeTab = 'home' }) => {
  const navigate = useNavigate();

  const navItems = [
    { id: 'calendar', icon: FiCalendar, label: 'Calendar', path: '/calendar' },
    { id: 'works', icon: FiBookOpen, label: 'Works', path: '/works' },
    { id: 'home', icon: FiStar, label: 'Home', path: '/home' },
    { id: 'alumni', icon: FiMessageCircle, label: 'Alumni Chat', path: '/alumni-chat' },
    { id: 'events', icon: FiUsers, label: 'Events', path: '/events' }
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-2xl rounded-2xl px-6 py-3 border border-white/30 dark:border-gray-700/30 shadow-2xl">
        <div className="flex items-center space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`group flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-cyan-500/20 border border-cyan-400/30' 
                    : 'hover:bg-white/20 dark:hover:bg-gray-700/20'
                }`}
              >
                <Icon className={`w-6 h-6 transition-colors duration-300 ${
                  isActive 
                    ? 'text-cyan-500' 
                    : 'text-gray-700 dark:text-gray-300 group-hover:text-cyan-500'
                }`} />
                <span className={`text-xs transition-colors duration-300 ${
                  isActive 
                    ? 'text-cyan-500' 
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-cyan-500'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
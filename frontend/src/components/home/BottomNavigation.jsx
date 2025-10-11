import React from 'react';
import { FiCalendar, FiBookOpen, FiMessageCircle, FiHome, FiUsers } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', icon: FiHome, label: 'Home', path: '/home' },
    { id: 'connections', icon: FiUsers, label: 'Friends', path: '/connections' },
    { id: 'events', icon: FiBookOpen, label: 'Events', path: '/events' },
    { id: 'calendar', icon: FiCalendar, label: 'Calendar', path: '/calendar' },
    { id: 'alumni', icon: FiMessageCircle, label: 'Chat', path: '/alumni-chat' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center py-3 px-2 transition-all duration-300 ${isActive
                    ? 'text-cyan-600 dark:text-cyan-400'
                    : 'text-gray-600 dark:text-gray-400'
                  }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-full"></div>
                )}

                {/* Icon with scaling effect */}
                <Icon
                  className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100 hover:scale-105'
                    }`}
                />

                {/* Label */}
                <span
                  className={`text-[10px] font-medium transition-all duration-300 ${isActive ? 'font-semibold' : 'font-normal'
                    }`}
                >
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
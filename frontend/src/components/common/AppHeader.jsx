import React, { useState, useEffect, useRef } from 'react';
import { FiLogOut, FiUser, FiChevronDown, FiSettings, FiBell } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AppHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const dropdownRef = useRef(null);
    const notificationsRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navigate('/auth');
        }
    };

    // Get page title based on current route
    const getPageTitle = () => {
        const path = location.pathname;
        switch (path) {
            case '/home':
                return 'Home';
            case '/connections':
                return 'Connections';
            case '/calendar':
                return 'Calendar';
            case '/events':
                return 'Events';
            case '/alumni-chat':
                return 'Alumni Chat';
            case '/works':
                return 'Works';
            case '/settings':
                return 'Settings';
            case '/profile':
                return 'Profile';
            default:
                return 'ConneQt';
        }
    };

    return (
        <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Page Title */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/home')}
                            className="text-2xl font-bold text-gray-900 dark:text-white hover:scale-105 transition-transform duration-300"
                        >
                            Conne<span className="text-cyan-500">Q</span>t
                        </button>
                        <span className="hidden sm:block text-gray-400 dark:text-gray-600">|</span>
                        <span className="hidden sm:block text-lg font-medium text-gray-700 dark:text-gray-300">
                            {getPageTitle()}
                        </span>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-3">
                        {/* Notifications */}
                        <div className="relative" ref={notificationsRef}>
                            <button
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowDropdown(false);
                                }}
                                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                                title="Notifications"
                            >
                                <FiBell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                {/* Notification Badge */}
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in slide-in-from-top-2">
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                            <FiBell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No new notifications</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => {
                                    setShowDropdown(!showDropdown);
                                    setShowNotifications(false);
                                }}
                                className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white hidden md:block max-w-[120px] truncate">
                                    {user?.name || 'User'}
                                </span>
                                <FiChevronDown
                                    className={`text-gray-600 dark:text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in slide-in-from-top-2">
                                    {/* User Info */}
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 dark:text-white truncate">
                                                    {user?.name || 'User'}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                    {user?.email || 'user@email.com'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="p-2">
                                        <button
                                            onClick={() => {
                                                navigate('/profile');
                                                setShowDropdown(false);
                                            }}
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 group"
                                        >
                                            <FiUser className="text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                                            <span className="font-medium">View Profile</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                navigate('/settings');
                                                setShowDropdown(false);
                                            }}
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 group"
                                        >
                                            <FiSettings className="text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                            <span className="font-medium">Settings</span>
                                        </button>

                                        <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 group"
                                        >
                                            <FiLogOut className="group-hover:scale-110 transition-transform duration-300" />
                                            <span className="font-medium">Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;

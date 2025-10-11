import React from 'react';
import AppHeader from './AppHeader';
import BottomNavigation from '../home/BottomNavigation';

const PageContainer = ({ children, maxWidth = 'max-w-7xl' }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* App Header */}
            <AppHeader />

            {/* Main Content */}
            <main className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8`}>
                {children}
            </main>

            {/* Bottom Navigation */}
            <BottomNavigation />
        </div>
    );
};

export default PageContainer;

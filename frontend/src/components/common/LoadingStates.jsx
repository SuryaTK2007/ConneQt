import React from 'react';

// Generic Loading Skeleton
export const Skeleton = ({ className = '', variant = 'rectangular' }) => {
    const variants = {
        rectangular: 'rounded-lg',
        circular: 'rounded-full',
        text: 'rounded h-4'
    };

    return (
        <div
            className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${variants[variant]} ${className}`}
        ></div>
    );
};

// Card Loading Skeleton
export const CardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="animate-pulse space-y-4">
                <div className="flex items-center space-x-4">
                    <Skeleton variant="circular" className="w-12 h-12" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
                <Skeleton className="h-20 w-full" />
                <div className="flex space-x-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                </div>
            </div>
        </div>
    );
};

// List Item Skeleton
export const ListItemSkeleton = () => {
    return (
        <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl">
            <Skeleton variant="circular" className="w-10 h-10" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
            </div>
        </div>
    );
};

// Page Loading State
export const PageLoader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-200 dark:border-cyan-900"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-600 border-t-transparent animate-spin"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
            </div>
        </div>
    );
};

// Empty State Component
export const EmptyState = ({ icon: Icon, title, description, action }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                {Icon && <Icon className="w-10 h-10 text-gray-400 dark:text-gray-600" />}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                {description}
            </p>
            {action}
        </div>
    );
};

// Error State Component
export const ErrorState = ({ title, description, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                <svg
                    className="w-10 h-10 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title || 'Something went wrong'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                {description || 'An error occurred while loading this content.'}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-medium hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default {
    Skeleton,
    CardSkeleton,
    ListItemSkeleton,
    PageLoader,
    EmptyState,
    ErrorState
};

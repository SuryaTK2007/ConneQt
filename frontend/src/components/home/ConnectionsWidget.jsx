import React, { useState, useEffect } from 'react';
import { FiUsers, FiStar, FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import connectionService from '../../services/connectionService';

const ConnectionsWidget = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [topRecommendations, setTopRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            loadConnectionData();
        }
    }, [user]);

    const loadConnectionData = async () => {
        setLoading(true);
        try {
            const [statsData, recommendations] = await Promise.all([
                connectionService.getConnectionStats(user.$id),
                connectionService.getStoredRecommendations(user.$id, 3) // Get top 3
            ]);

            setStats(statsData);
            setTopRecommendations(recommendations);
        } catch (error) {
            console.error('Failed to load connection data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSyncData = async () => {
        setLoading(true);
        try {
            await connectionService.syncGoogleData(user.$id);
            await loadConnectionData();
        } catch (error) {
            console.error('Failed to sync data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !stats) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-cyan-200/50 dark:border-cyan-700/50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white">
                        <FiUsers className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Smart Connections
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            AI-powered network recommendations
                        </p>
                    </div>
                </div>

                {stats && stats.totalRecommendations > 0 && (
                    <button
                        onClick={handleSyncData}
                        disabled={loading}
                        className="p-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
                        title="Refresh recommendations"
                    >
                        <FiRefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                )}
            </div>

            {stats && stats.totalRecommendations > 0 ? (
                <div className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                                {stats.totalRecommendations}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Connections
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                {stats.potentialMentors}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Mentors
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {stats.skillMatches}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Skill Matches
                            </div>
                        </div>
                    </div>

                    {/* Top Recommendations */}
                    {topRecommendations.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Top Recommendations
                            </h4>
                            {topRecommendations.map((connection, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                        {connection.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {connection.name}
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                            {Math.round(connection.similarityScore * 100)}% match
                                            {connection.recommendationReasons.length > 0 && (
                                                <span className="ml-1">
                                                    • {connection.recommendationReasons[0]}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {connection.recommendationReasons.includes('Potential mentor') && (
                                        <FiStar className="w-4 h-4 text-yellow-500" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* View All Button */}
                    <button
                        onClick={() => navigate('/connections')}
                        className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
                    >
                        <span>View All Connections</span>
                        <FiArrowRight className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="text-center py-6">
                    <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Discover Your Network
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Sync your Google data to get AI-powered connection recommendations and find potential mentors.
                    </p>
                    <button
                        onClick={handleSyncData}
                        disabled={loading}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                    >
                        <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span>{loading ? 'Syncing...' : 'Sync Google Data'}</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConnectionsWidget;
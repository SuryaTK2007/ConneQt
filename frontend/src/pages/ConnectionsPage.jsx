import React, { useState, useEffect } from 'react';
import {
    FiUsers,
    FiRefreshCw,
    FiUser,
    FiMapPin,
    FiBriefcase,
    FiStar,
    FiMail,
    FiExternalLink,
    FiLoader,
    FiAlertCircle,
    FiCheckCircle
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import connectionService from '../services/connectionService';

const ConnectionsPage = () => {
    const { user } = useAuth();
    const [recommendations, setRecommendations] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('recommendations');
    const [searchCriteria, setSearchCriteria] = useState({
        skills: '',
        location: '',
        industry: ''
    });

    useEffect(() => {
        if (user) {
            loadInitialData();
        }
    }, [user]);

    const loadInitialData = async () => {
        setLoading(true);
        try {
            const [recommendationsData, statsData] = await Promise.all([
                connectionService.getStoredRecommendations(user.$id),
                connectionService.getConnectionStats(user.$id)
            ]);

            setRecommendations(recommendationsData);
            setStats(statsData);

            // Load mentors
            const mentorsData = await connectionService.findMentors(user.$id);
            setMentors(mentorsData);
        } catch (err) {
            console.error('Failed to load initial data:', err);
            setError('Failed to load connection data');
        } finally {
            setLoading(false);
        }
    };

    const handleSyncGoogle = async () => {
        setSyncing(true);
        setError('');

        try {
            const result = await connectionService.syncGoogleData(user.$id);

            setRecommendations(result.recommendations || []);

            // Refresh stats and mentors
            const [statsData, mentorsData] = await Promise.all([
                connectionService.getConnectionStats(user.$id),
                connectionService.findMentors(user.$id)
            ]);

            setStats(statsData);
            setMentors(mentorsData);

            // Show success message
            setError('');
        } catch (err) {
            console.error('Sync failed:', err);
            setError(err.message || 'Failed to sync Google data. Please try again.');
        } finally {
            setSyncing(false);
        }
    };

    const handleSearchMentors = async () => {
        setLoading(true);
        try {
            const criteria = {
                skills: searchCriteria.skills ? searchCriteria.skills.split(',').map(s => s.trim()) : [],
                location: searchCriteria.location,
                industry: searchCriteria.industry
            };

            const mentorsData = await connectionService.findMentors(user.$id, criteria);
            setMentors(mentorsData);
        } catch (err) {
            console.error('Failed to search mentors:', err);
            setError('Failed to search mentors');
        } finally {
            setLoading(false);
        }
    };

    const ConnectionCard = ({ connection, isMentor = false }) => {
        const profileData = connection.profileData || {};

        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                        {profileData.photo ? (
                            <img
                                src={profileData.photo}
                                alt={connection.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                            />
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <FiUser className="w-6 h-6 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {connection.name}
                                {connection.isConneQtUser && (
                                    <span className="ml-2 inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                                        <FiCheckCircle className="w-3 h-3 mr-1" />
                                        ConneQt User
                                    </span>
                                )}
                            </h3>
                            {isMentor && (
                                <span className="flex items-center px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs rounded-full">
                                    <FiStar className="w-3 h-3 mr-1" />
                                    Mentor
                                </span>
                            )}
                        </div>

                        {/* Occupation */}
                        {profileData.occupation && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {profileData.occupation}
                            </p>
                        )}

                        {/* Current Organization */}
                        {profileData.organizations && profileData.organizations.length > 0 && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <FiBriefcase className="w-4 h-4 mr-1" />
                                {profileData.organizations[0].name}
                                {profileData.organizations[0].title && (
                                    <span className="ml-1">• {profileData.organizations[0].title}</span>
                                )}
                            </div>
                        )}

                        {/* Location */}
                        {profileData.location && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                                <FiMapPin className="w-4 h-4 mr-1" />
                                {profileData.location}
                            </div>
                        )}

                        {/* Recommendation Reasons */}
                        {connection.recommendationReasons && connection.recommendationReasons.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                                {connection.recommendationReasons.map((reason, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 text-xs rounded-full"
                                    >
                                        {reason}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Connection Status & Actions */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                                {connection.isConneQtUser ? (
                                    <span className="text-green-600 dark:text-green-400 font-medium">
                                        ✨ Available to connect on ConneQt
                                    </span>
                                ) : (
                                    <span className="text-gray-500">
                                        Contact via email
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                                {connection.email && (
                                    <button
                                        onClick={() => window.open(`mailto:${connection.email}`, '_blank')}
                                        className="p-2 text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
                                        title="Send email"
                                    >
                                        <FiMail className="w-4 h-4" />
                                    </button>
                                )}
                                {connection.isConneQtUser ? (
                                    <button
                                        className="px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all"
                                        title="Connect on ConneQt"
                                    >
                                        Connect
                                    </button>
                                ) : (
                                    <button
                                        className="p-2 text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
                                        title="View Google profile"
                                    >
                                        <FiExternalLink className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const StatsCard = ({ icon: Icon, title, value, subtitle }) => (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center">
                <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                    <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">{subtitle}</p>
                    )}
                </div>
            </div>
        </div>
    );

    if (loading && !stats) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading connections...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Connections & Mentors
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Discover relevant connections from your Google network
                            </p>
                        </div>
                        <button
                            onClick={handleSyncGoogle}
                            disabled={syncing}
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                        >
                            <FiRefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                            {syncing ? 'Syncing...' : 'Sync Google Data'}
                        </button>
                    </div>
                </div>
            </header>

            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-start space-x-3">
                            <FiAlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={18} />
                            <div>
                                <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                                {error.includes('Google') && (
                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                        Make sure you've granted permissions to access your Google contacts.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <StatsCard
                                icon={FiUsers}
                                title="ConneQt Friends"
                                value={stats.conneQtUsers}
                                subtitle="Your Google contacts who use ConneQt"
                            />
                            <StatsCard
                                icon={FiCheckCircle}
                                title="Google Contacts"
                                value={stats.googleContacts}
                                subtitle="Contacts from your Google account"
                            />
                            <StatsCard
                                icon={FiStar}
                                title="Mutual Connections"
                                value={stats.mutualConnections}
                                subtitle={stats.lastSyncDate ? `Last sync: ${new Date(stats.lastSyncDate).toLocaleDateString()}` : 'Never synced'}
                            />
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                        <button
                            onClick={() => setActiveTab('recommendations')}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'recommendations'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            All Recommendations ({recommendations.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('mentors')}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'mentors'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            Potential Mentors ({mentors.length})
                        </button>
                    </div>

                    {/* Mentor Search */}
                    {activeTab === 'mentors' && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Find Mentors
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input
                                    type="text"
                                    placeholder="Skills (comma-separated)"
                                    value={searchCriteria.skills}
                                    onChange={(e) => setSearchCriteria({ ...searchCriteria, skills: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={searchCriteria.location}
                                    onChange={(e) => setSearchCriteria({ ...searchCriteria, location: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Industry/Company"
                                    value={searchCriteria.industry}
                                    onChange={(e) => setSearchCriteria({ ...searchCriteria, industry: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                                <button
                                    onClick={handleSearchMentors}
                                    disabled={loading}
                                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                                >
                                    {loading ? <FiLoader className="w-4 h-4 animate-spin" /> : 'Search'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    {activeTab === 'recommendations' && (
                        <div>
                            {recommendations.length === 0 ? (
                                <div className="text-center py-12">
                                    <FiUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        No Recommendations Yet
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Sync your Google data to get personalized connection recommendations
                                    </p>
                                    <button
                                        onClick={handleSyncGoogle}
                                        disabled={syncing}
                                        className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                                    >
                                        {syncing ? 'Syncing...' : 'Sync Google Data'}
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {recommendations.map((connection, index) => (
                                        <ConnectionCard key={index} connection={connection} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'mentors' && (
                        <div>
                            {mentors.length === 0 ? (
                                <div className="text-center py-12">
                                    <FiStar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        No Mentors Found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Try adjusting your search criteria or sync your Google data first
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {mentors.map((mentor, index) => (
                                        <ConnectionCard key={index} connection={mentor} isMentor={true} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConnectionsPage;
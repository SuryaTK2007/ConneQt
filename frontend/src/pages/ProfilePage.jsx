import React from 'react';
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiPhone, FiCalendar, FiEdit } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';

const ProfilePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Mock data - replace with actual user profile data
    const profileData = {
        name: user?.name || 'User Name',
        email: user?.email || 'user@sece.ac.in',
        bio: 'Passionate about technology and innovation. Final year Computer Science student at SECE.',
        phone: '+91 98765 43210',
        location: 'Coimbatore, Tamil Nadu',
        linkedin: 'linkedin.com/in/username',
        github: 'github.com/username',
        joinedDate: 'January 2024',
        stats: {
            connections: 45,
            events: 12,
            posts: 8
        }
    };

    return (
        <PageContainer maxWidth="max-w-5xl">
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden mb-6">
                {/* Cover Image */}
                <div className="h-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>

                {/* Profile Info */}
                <div className="px-6 pb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 mb-4">
                        <div className="flex items-end space-x-4">
                            {/* Avatar */}
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-800 shadow-xl">
                                {profileData.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="pb-2">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    {profileData.name}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Student at SECE
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/settings')}
                            className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <FiEdit className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </button>
                    </div>

                    {/* Bio */}
                    {profileData.bio && (
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            {profileData.bio}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {profileData.stats.connections}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Connections
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {profileData.stats.events}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Events Attended
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {profileData.stats.posts}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Posts
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Contact Information
                </h2>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                        <FiMail className="w-5 h-5 text-cyan-500" />
                        <span>{profileData.email}</span>
                    </div>

                    {profileData.phone && (
                        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                            <FiPhone className="w-5 h-5 text-cyan-500" />
                            <span>{profileData.phone}</span>
                        </div>
                    )}

                    {profileData.location && (
                        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                            <FiMapPin className="w-5 h-5 text-cyan-500" />
                            <span>{profileData.location}</span>
                        </div>
                    )}

                    <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                        <FiCalendar className="w-5 h-5 text-cyan-500" />
                        <span>Joined {profileData.joinedDate}</span>
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Social Links
                </h2>

                <div className="space-y-3">
                    {profileData.linkedin && (
                        <a
                            href={`https://${profileData.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                            <FiLinkedin className="w-5 h-5 text-blue-600" />
                            <span className="text-gray-700 dark:text-gray-300">{profileData.linkedin}</span>
                        </a>
                    )}

                    {profileData.github && (
                        <a
                            href={`https://${profileData.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                            <FiGithub className="w-5 h-5 text-gray-900 dark:text-white" />
                            <span className="text-gray-700 dark:text-gray-300">{profileData.github}</span>
                        </a>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};

export default ProfilePage;

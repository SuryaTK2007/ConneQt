import React, { useState } from 'react';
import {
    FiUser,
    FiMail,
    FiBell,
    FiLock,
    FiEye,
    FiEyeOff,
    FiShield,
    FiGlobe,
    FiMoon,
    FiSun,
    FiSave,
    FiCheck,
    FiAlertCircle,
    FiTrash2,
    FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';

const SettingsPage = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Profile settings
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: '',
        phone: '',
        location: '',
        linkedin: '',
        github: ''
    });

    // Notification settings
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: true,
        eventReminders: true,
        connectionRequests: true,
        messageNotifications: true,
        weeklyDigest: false
    });

    // Privacy settings
    const [privacy, setPrivacy] = useState({
        profileVisibility: 'everyone',
        showEmail: false,
        showPhone: false,
        allowMessages: true,
        allowConnectionRequests: true
    });

    // Security settings
    const [security, setSecurity] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleProfileChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSaveSuccess(false);
    };

    const handleNotificationToggle = (key) => {
        setNotifications({
            ...notifications,
            [key]: !notifications[key]
        });
    };

    const handlePrivacyChange = (key, value) => {
        setPrivacy({
            ...privacy,
            [key]: value
        });
    };

    const handleSecurityChange = (e) => {
        setSecurity({
            ...security,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        setError('');
        setSaveSuccess(false);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            setError('Failed to save settings. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (security.newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        if (security.newPassword !== security.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setSaving(true);
        setError('');
        setSaveSuccess(false);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSaveSuccess(true);
            setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            setError('Failed to change password. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navigate('/auth');
        }
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Implement account deletion
            console.log('Delete account');
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: FiUser },
        { id: 'notifications', label: 'Notifications', icon: FiBell },
        { id: 'privacy', label: 'Privacy', icon: FiShield },
        { id: 'security', label: 'Security', icon: FiLock },
        { id: 'appearance', label: 'Appearance', icon: FiGlobe }
    ];

    return (
        <PageContainer maxWidth="max-w-6xl">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your account settings and preferences
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                        <nav className="p-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                        {/* Success Message */}
                        {saveSuccess && (
                            <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center space-x-3">
                                <FiCheck className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />
                                <p className="text-sm text-green-800 dark:text-green-300">Settings saved successfully!</p>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center space-x-3">
                                <FiAlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />
                                <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                            </div>
                        )}

                        {/* Profile Settings */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Profile Information
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        Update your personal information and contact details
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleProfileChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            disabled
                                            className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleProfileChange}
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={profileData.location}
                                            onChange={handleProfileChange}
                                            placeholder="City, Country"
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            LinkedIn Profile
                                        </label>
                                        <input
                                            type="url"
                                            name="linkedin"
                                            value={profileData.linkedin}
                                            onChange={handleProfileChange}
                                            placeholder="linkedin.com/in/username"
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            GitHub Profile
                                        </label>
                                        <input
                                            type="url"
                                            name="github"
                                            value={profileData.github}
                                            onChange={handleProfileChange}
                                            placeholder="github.com/username"
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={profileData.bio}
                                        onChange={handleProfileChange}
                                        rows="4"
                                        placeholder="Tell us about yourself..."
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                </div>

                                <button
                                    onClick={handleSaveProfile}
                                    disabled={saving}
                                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
                                >
                                    <FiSave className="w-5 h-5" />
                                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                                </button>
                            </div>
                        )}

                        {/* Notification Settings */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Notification Preferences
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        Manage how you receive notifications
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {Object.entries(notifications).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                            <div>
                                                <h3 className="font-medium text-gray-900 dark:text-white">
                                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {key === 'emailNotifications' && 'Receive notifications via email'}
                                                    {key === 'pushNotifications' && 'Receive push notifications'}
                                                    {key === 'eventReminders' && 'Get reminders about upcoming events'}
                                                    {key === 'connectionRequests' && 'Notifications for new connection requests'}
                                                    {key === 'messageNotifications' && 'Notifications for new messages'}
                                                    {key === 'weeklyDigest' && 'Receive weekly summary of activities'}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleNotificationToggle(key)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-cyan-600' : 'bg-gray-300 dark:bg-gray-600'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleSaveProfile}
                                    disabled={saving}
                                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
                                >
                                    <FiSave className="w-5 h-5" />
                                    <span>{saving ? 'Saving...' : 'Save Preferences'}</span>
                                </button>
                            </div>
                        )}

                        {/* Privacy Settings */}
                        {activeTab === 'privacy' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Privacy Settings
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        Control who can see your information
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Profile Visibility
                                        </label>
                                        <select
                                            value={privacy.profileVisibility}
                                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        >
                                            <option value="everyone">Everyone</option>
                                            <option value="connections">Connections Only</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Show Email</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Display email on your profile</p>
                                        </div>
                                        <button
                                            onClick={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${privacy.showEmail ? 'bg-cyan-600' : 'bg-gray-300 dark:bg-gray-600'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Show Phone</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Display phone number on your profile</p>
                                        </div>
                                        <button
                                            onClick={() => handlePrivacyChange('showPhone', !privacy.showPhone)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${privacy.showPhone ? 'bg-cyan-600' : 'bg-gray-300 dark:bg-gray-600'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacy.showPhone ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Allow Messages</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Let others send you messages</p>
                                        </div>
                                        <button
                                            onClick={() => handlePrivacyChange('allowMessages', !privacy.allowMessages)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${privacy.allowMessages ? 'bg-cyan-600' : 'bg-gray-300 dark:bg-gray-600'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacy.allowMessages ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Allow Connection Requests</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Let others send you connection requests</p>
                                        </div>
                                        <button
                                            onClick={() => handlePrivacyChange('allowConnectionRequests', !privacy.allowConnectionRequests)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${privacy.allowConnectionRequests ? 'bg-cyan-600' : 'bg-gray-300 dark:bg-gray-600'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${privacy.allowConnectionRequests ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSaveProfile}
                                    disabled={saving}
                                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
                                >
                                    <FiSave className="w-5 h-5" />
                                    <span>{saving ? 'Saving...' : 'Save Privacy Settings'}</span>
                                </button>
                            </div>
                        )}

                        {/* Security Settings */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Security Settings
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        Manage your password and account security
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showCurrentPassword ? "text" : "password"}
                                                name="currentPassword"
                                                value={security.currentPassword}
                                                onChange={handleSecurityChange}
                                                className="w-full px-4 py-2.5 pr-12 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                name="newPassword"
                                                value={security.newPassword}
                                                onChange={handleSecurityChange}
                                                className="w-full px-4 py-2.5 pr-12 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                {showNewPassword ? <FiEyeOff /> : <FiEye />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={security.confirmPassword}
                                            onChange={handleSecurityChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleChangePassword}
                                    disabled={saving || !security.currentPassword || !security.newPassword || !security.confirmPassword}
                                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
                                >
                                    <FiLock className="w-5 h-5" />
                                    <span>{saving ? 'Changing...' : 'Change Password'}</span>
                                </button>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Danger Zone
                                    </h3>
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                                        <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">
                                            Delete Account
                                        </h4>
                                        <p className="text-sm text-red-700 dark:text-red-400 mb-4">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                            <span>Delete Account</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Appearance Settings */}
                        {activeTab === 'appearance' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        Appearance Settings
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        Customize how ConneQt looks to you
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={!isDarkMode ? null : toggleTheme}
                                                className={`p-4 rounded-xl border-2 transition-all duration-300 ${!isDarkMode
                                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="flex flex-col items-center space-y-2">
                                                    <FiSun className="w-8 h-8 text-gray-900" />
                                                    <span className="font-medium text-gray-900">Light</span>
                                                </div>
                                            </button>
                                            <button
                                                onClick={isDarkMode ? null : toggleTheme}
                                                className={`p-4 rounded-xl border-2 transition-all duration-300 ${isDarkMode
                                                        ? 'border-cyan-500 bg-cyan-900/20'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="flex flex-col items-center space-y-2">
                                                    <FiMoon className="w-8 h-8 text-white" />
                                                    <span className="font-medium text-white">Dark</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                        >
                            <FiLogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default SettingsPage;

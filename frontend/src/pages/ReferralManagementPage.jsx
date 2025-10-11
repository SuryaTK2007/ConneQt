import React, { useState, useEffect } from 'react';
import {
    FiUsers,
    FiMessageSquare,
    FiSend,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiEye,
    FiFilter,
    FiSearch,
    FiArrowUp,
    FiArrowDown,
    FiCalendar,
    FiTrendingUp,
    FiLinkedin,
    FiBriefcase,
    FiMail,
    FiPhone,
    FiMapPin,
    FiStar,
    FiBookOpen
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageContainer from '../components/common/PageContainer';
import LoadingStates from '../components/common/LoadingStates';

const ReferralManagementPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('my-requests');
    const [referrals, setReferrals] = useState([]);
    const [incomingReferrals, setIncomingReferrals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showComposeModal, setShowComposeModal] = useState(false);
    const [selectedAlumni, setSelectedAlumni] = useState(null);

    // Mock referral data
    const mockReferrals = [
        {
            id: 1,
            jobId: 1,
            jobTitle: 'Software Engineer Intern',
            company: 'Google',
            companyLogo: '🔍',
            alumniName: 'Rahul Sharma',
            alumniPosition: 'Senior Software Engineer',
            alumniGradYear: '2020',
            alumniDepartment: 'Computer Science',
            requestDate: '2024-01-18',
            status: 'pending',
            lastUpdated: '2024-01-18',
            message: 'Hi Rahul! I\'m very interested in the Software Engineer Intern position at Google. I have strong experience in React and Python, and I\'d appreciate any insights you can share about the role and company culture.',
            response: null,
            alumniContact: {
                linkedin: 'linkedin.com/in/rahulsharma',
                email: 'rahul.sharma@google.com'
            },
            referralScore: 85,
            commonConnections: 3
        },
        {
            id: 2,
            jobId: 2,
            jobTitle: 'Frontend Developer',
            company: 'Microsoft',
            companyLogo: '🪟',
            alumniName: 'Sneha Reddy',
            alumniPosition: 'Cloud Solution Architect',
            alumniGradYear: '2018',
            alumniDepartment: 'Computer Science',
            requestDate: '2024-01-15',
            status: 'accepted',
            lastUpdated: '2024-01-20',
            message: 'Hello Sneha! I\'m applying for the Frontend Developer role at Microsoft. Your journey from SECE to Microsoft is inspiring, and I\'d love to learn more about the application process.',
            response: 'Hi! I\'d be happy to help. Let me forward your profile to the hiring manager. The team is looking for strong React skills and system design knowledge. I\'ll also put in a good word for you!',
            alumniContact: {
                linkedin: 'linkedin.com/in/snehareddy',
                email: 'sneha.reddy@microsoft.com'
            },
            referralScore: 92,
            commonConnections: 5
        },
        {
            id: 3,
            jobId: 3,
            jobTitle: 'Data Analyst',
            company: 'Flipkart',
            companyLogo: '🛒',
            alumniName: 'Arjun Patel',
            alumniPosition: 'Senior Data Scientist',
            alumniGradYear: '2019',
            alumniDepartment: 'Electronics',
            requestDate: '2024-01-12',
            status: 'declined',
            lastUpdated: '2024-01-16',
            message: 'Hi Arjun! I\'m interested in the Data Analyst position at Flipkart. Could you share insights about the data team and growth opportunities?',
            response: 'Thanks for reaching out! Unfortunately, I\'m not directly involved with the data analyst hiring process as I\'m in a different vertical. I\'d suggest applying directly through the careers page. Best of luck!',
            alumniContact: {
                linkedin: 'linkedin.com/in/arjunpatel',
                email: 'arjun.patel@flipkart.com'
            },
            referralScore: 78,
            commonConnections: 2
        }
    ];

    // Mock incoming referral requests (if user is an alumni)
    const mockIncomingReferrals = [
        {
            id: 4,
            studentName: 'Aditi Singh',
            studentYear: '2024',
            studentDepartment: 'Computer Science',
            jobTitle: 'Software Engineer Intern',
            company: 'Google',
            requestDate: '2024-01-22',
            status: 'pending',
            message: 'Hi! I\'m a final year student at SECE. I\'m very interested in the SDE intern role at Google. Your profile shows amazing growth, and I\'d appreciate any guidance you can provide.',
            studentProfile: {
                cgpa: '8.7',
                skills: ['React', 'Node.js', 'Python', 'SQL'],
                projects: 5,
                internships: 2
            }
        }
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setReferrals(mockReferrals);
            setIncomingReferrals(mockIncomingReferrals);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <FiClock className="w-4 h-4" />;
            case 'accepted':
                return <FiCheckCircle className="w-4 h-4" />;
            case 'declined':
                return <FiXCircle className="w-4 h-4" />;
            case 'viewed':
                return <FiEye className="w-4 h-4" />;
            default:
                return <FiClock className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
            case 'accepted':
                return 'text-green-600 bg-green-50 dark:bg-green-900/20';
            case 'declined':
                return 'text-red-600 bg-red-50 dark:bg-red-900/20';
            case 'viewed':
                return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
            default:
                return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'accepted':
                return 'Accepted';
            case 'declined':
                return 'Declined';
            case 'viewed':
                return 'Viewed';
            default:
                return status;
        }
    };

    const filteredReferrals = referrals.filter(referral => {
        const matchesSearch = referral.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            referral.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            referral.alumniName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || referral.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: referrals.length,
        pending: referrals.filter(r => r.status === 'pending').length,
        accepted: referrals.filter(r => r.status === 'accepted').length,
        successRate: referrals.length > 0 ? Math.round((referrals.filter(r => r.status === 'accepted').length / referrals.length) * 100) : 0
    };

    const ComposeReferralModal = () => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Request Referral
                    </h3>
                    <button
                        onClick={() => setShowComposeModal(false)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                    >
                        <FiXCircle className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {selectedAlumni && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                {selectedAlumni.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {selectedAlumni.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {selectedAlumni.position} at {selectedAlumni.company}
                                </p>
                                <p className="text-xs text-gray-500">
                                    SECE {selectedAlumni.graduationYear} • {selectedAlumni.department}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Job Position
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Software Engineer Intern"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Your Message
                        </label>
                        <textarea
                            rows={6}
                            placeholder="Introduce yourself, mention your background, and explain why you're interested in the role..."
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                        />
                    </div>

                    <div className="flex items-center space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowComposeModal(false)}
                            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-all flex items-center justify-center space-x-2"
                        >
                            <FiSend className="w-4 h-4" />
                            <span>Send Request</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    if (loading) {
        return (
            <PageContainer maxWidth="max-w-6xl">
                <LoadingStates.PageLoader message="Loading referral data..." />
            </PageContainer>
        );
    }

    return (
        <PageContainer maxWidth="max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Referral Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Connect with alumni and manage referral requests
                    </p>
                </div>
                <button
                    onClick={() => setShowComposeModal(true)}
                    className="mt-4 sm:mt-0 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-medium transition-all flex items-center space-x-2"
                >
                    <FiMessageSquare className="w-4 h-4" />
                    <span>Request Referral</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stats.total}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Total Requests
                            </p>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <FiMessageSquare className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">
                                {stats.pending}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Pending
                            </p>
                        </div>
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <FiClock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-green-600">
                                {stats.accepted}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Accepted
                            </p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <FiCheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-purple-600">
                                {stats.successRate}%
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Success Rate
                            </p>
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                            <FiTrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-8 px-6">
                        <button
                            onClick={() => setActiveTab('my-requests')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'my-requests'
                                    ? 'border-cyan-500 text-cyan-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                } transition-all`}
                        >
                            My Requests ({referrals.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('incoming')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'incoming'
                                    ? 'border-cyan-500 text-cyan-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                } transition-all`}
                        >
                            Incoming Requests ({incomingReferrals.length})
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'my-requests' && (
                        <div>
                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1 relative">
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search referrals..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <FiFilter className="text-gray-400 w-5 h-5" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="declined">Declined</option>
                                    </select>
                                </div>
                            </div>

                            {/* Referral Requests */}
                            <div className="space-y-4">
                                {filteredReferrals.length === 0 ? (
                                    <LoadingStates.EmptyState
                                        title="No referral requests found"
                                        description="Start connecting with alumni to get referrals for your dream jobs!"
                                        action={() => setShowComposeModal(true)}
                                        actionLabel="Request Referral"
                                    />
                                ) : (
                                    filteredReferrals.map((referral) => (
                                        <div
                                            key={referral.id}
                                            className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-start space-x-4">
                                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                                                        {referral.companyLogo}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {referral.jobTitle}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            {referral.company}
                                                        </p>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                            <div className="flex items-center">
                                                                <FiUsers className="w-4 h-4 mr-1" />
                                                                {referral.alumniName}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <FiCalendar className="w-4 h-4 mr-1" />
                                                                {new Date(referral.requestDate).toLocaleDateString()}
                                                            </div>
                                                            <div className="flex items-center text-green-600">
                                                                <FiStar className="w-4 h-4 mr-1" />
                                                                {referral.referralScore}% match
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(referral.status)}`}>
                                                    {getStatusIcon(referral.status)}
                                                    <span>{getStatusText(referral.status)}</span>
                                                </div>
                                            </div>

                                            {/* Alumni Info */}
                                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                            {referral.alumniName.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                                                                {referral.alumniName}
                                                            </p>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                {referral.alumniPosition} • SECE {referral.alumniGradYear}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <a
                                                            href={`https://${referral.alumniContact.linkedin}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                                                        >
                                                            <FiLinkedin className="w-4 h-4" />
                                                        </a>
                                                        <a
                                                            href={`mailto:${referral.alumniContact.email}`}
                                                            className="p-1 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                                                        >
                                                            <FiMail className="w-4 h-4" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Message */}
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                                                    "{referral.message}"
                                                </p>
                                            </div>

                                            {/* Response */}
                                            {referral.response && (
                                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-4">
                                                    <div className="flex items-start space-x-2">
                                                        <FiMessageSquare className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                                                                Response from {referral.alumniName}:
                                                            </p>
                                                            <p className="text-sm text-green-700 dark:text-green-300">
                                                                "{referral.response}"
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => navigate(`/jobs/${referral.jobId}`)}
                                                    className="flex items-center space-x-2 px-4 py-2 text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all"
                                                >
                                                    <FiBriefcase className="w-4 h-4" />
                                                    <span>View Job</span>
                                                </button>
                                                {referral.status === 'accepted' && (
                                                    <button className="flex items-center space-x-2 px-4 py-2 text-green-600 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-all">
                                                        <FiCheckCircle className="w-4 h-4" />
                                                        <span>Apply Now</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'incoming' && (
                        <div>
                            {incomingReferrals.length === 0 ? (
                                <LoadingStates.EmptyState
                                    title="No incoming referral requests"
                                    description="When students request referrals from you, they'll appear here."
                                    action={() => navigate('/profile')}
                                    actionLabel="Update Profile"
                                />
                            ) : (
                                <div className="space-y-4">
                                    {incomingReferrals.map((request) => (
                                        <div
                                            key={request.id}
                                            className="border border-gray-200 dark:border-gray-700 rounded-xl p-6"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-start space-x-4">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                                                        {request.studentName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {request.studentName}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            {request.studentDepartment} • Class of {request.studentYear}
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Requesting referral for: <strong>{request.jobTitle}</strong>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all">
                                                        Accept
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                                                        Decline
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Student Profile */}
                                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-500">CGPA:</span>
                                                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                                            {request.studentProfile.cgpa}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Projects:</span>
                                                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                                            {request.studentProfile.projects}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Internships:</span>
                                                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                                            {request.studentProfile.internships}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Skills:</span>
                                                        <span className="ml-2 text-xs">
                                                            {request.studentProfile.skills.slice(0, 2).join(', ')}
                                                            {request.studentProfile.skills.length > 2 && ' +more'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Message */}
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                                                    "{request.message}"
                                                </p>
                                            </div>

                                            <div className="text-xs text-gray-500">
                                                Received {new Date(request.requestDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Compose Modal */}
            {showComposeModal && <ComposeReferralModal />}
        </PageContainer>
    );
};

export default ReferralManagementPage;
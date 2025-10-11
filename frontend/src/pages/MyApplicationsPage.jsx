import React, { useState, useEffect } from 'react';
import {
    FiBriefcase,
    FiClock,
    FiMapPin,
    FiEye,
    FiFilter,
    FiSearch,
    FiCalendar,
    FiTrendingUp,
    FiCheckCircle,
    FiXCircle,
    FiAlertCircle,
    FiMoreHorizontal,
    FiExternalLink,
    FiMessageSquare,
    FiBookmark,
    FiTrash2
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageContainer from '../components/common/PageContainer';
import LoadingStates from '../components/common/LoadingStates';

const MyApplicationsPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('recent');

    // Mock applications data
    const mockApplications = [
        {
            id: 1,
            jobId: 1,
            jobTitle: 'Software Engineer Intern',
            company: 'Google',
            companyLogo: '🔍',
            location: 'Bangalore, India',
            type: 'Internship',
            appliedDate: '2024-01-15',
            status: 'in-review',
            statusUpdated: '2024-01-18',
            salary: '₹50,000/month',
            applicationMethod: 'Direct Application',
            referredBy: null,
            notes: 'Completed technical assessment. Waiting for manager review.',
            nextStep: 'Technical Interview',
            timeline: [
                { date: '2024-01-15', status: 'applied', title: 'Application Submitted' },
                { date: '2024-01-16', status: 'reviewed', title: 'Application Reviewed' },
                { date: '2024-01-18', status: 'in-review', title: 'Technical Assessment Completed' }
            ]
        },
        {
            id: 2,
            jobId: 2,
            jobTitle: 'Frontend Developer',
            company: 'Microsoft',
            companyLogo: '🪟',
            location: 'Hyderabad, India',
            type: 'Full-time',
            appliedDate: '2024-01-10',
            status: 'interview',
            statusUpdated: '2024-01-20',
            salary: '₹8-12 LPA',
            applicationMethod: 'Alumni Referral',
            referredBy: 'Sneha Reddy',
            notes: 'First round interview scheduled for Jan 25th.',
            nextStep: 'HR Interview',
            timeline: [
                { date: '2024-01-10', status: 'applied', title: 'Application Submitted' },
                { date: '2024-01-12', status: 'reviewed', title: 'Application Reviewed' },
                { date: '2024-01-15', status: 'interview', title: 'Technical Interview Scheduled' },
                { date: '2024-01-20', status: 'interview', title: 'Technical Interview Completed' }
            ]
        },
        {
            id: 3,
            jobId: 3,
            jobTitle: 'Data Analyst',
            company: 'Flipkart',
            companyLogo: '🛒',
            location: 'Bangalore, India',
            type: 'Full-time',
            appliedDate: '2024-01-05',
            status: 'rejected',
            statusUpdated: '2024-01-22',
            salary: '₹6-9 LPA',
            applicationMethod: 'Direct Application',
            referredBy: null,
            notes: 'Position filled by internal candidate.',
            nextStep: null,
            timeline: [
                { date: '2024-01-05', status: 'applied', title: 'Application Submitted' },
                { date: '2024-01-08', status: 'reviewed', title: 'Application Reviewed' },
                { date: '2024-01-22', status: 'rejected', title: 'Application Rejected' }
            ]
        },
        {
            id: 4,
            jobId: 4,
            jobTitle: 'Product Manager Intern',
            company: 'Zomato',
            companyLogo: '🍕',
            location: 'Gurugram, India',
            type: 'Internship',
            appliedDate: '2024-01-12',
            status: 'offered',
            statusUpdated: '2024-01-23',
            salary: '₹35,000/month',
            applicationMethod: 'Direct Application',
            referredBy: null,
            notes: 'Offer received! Need to respond by Jan 30th.',
            nextStep: 'Accept/Decline Offer',
            timeline: [
                { date: '2024-01-12', status: 'applied', title: 'Application Submitted' },
                { date: '2024-01-14', status: 'reviewed', title: 'Application Reviewed' },
                { date: '2024-01-18', status: 'interview', title: 'Interview Completed' },
                { date: '2024-01-23', status: 'offered', title: 'Offer Extended' }
            ]
        }
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setApplications(mockApplications);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'applied':
                return <FiClock className="w-4 h-4" />;
            case 'reviewed':
                return <FiEye className="w-4 h-4" />;
            case 'in-review':
                return <FiAlertCircle className="w-4 h-4" />;
            case 'interview':
                return <FiMessageSquare className="w-4 h-4" />;
            case 'offered':
                return <FiCheckCircle className="w-4 h-4" />;
            case 'rejected':
                return <FiXCircle className="w-4 h-4" />;
            default:
                return <FiClock className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'applied':
                return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
            case 'reviewed':
                return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
            case 'in-review':
                return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
            case 'interview':
                return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
            case 'offered':
                return 'text-green-600 bg-green-50 dark:bg-green-900/20';
            case 'rejected':
                return 'text-red-600 bg-red-50 dark:bg-red-900/20';
            default:
                return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'applied':
                return 'Applied';
            case 'reviewed':
                return 'Under Review';
            case 'in-review':
                return 'In Review';
            case 'interview':
                return 'Interview';
            case 'offered':
                return 'Offer Received';
            case 'rejected':
                return 'Rejected';
            default:
                return status;
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const sortedApplications = [...filteredApplications].sort((a, b) => {
        switch (sortBy) {
            case 'recent':
                return new Date(b.appliedDate) - new Date(a.appliedDate);
            case 'status':
                return a.status.localeCompare(b.status);
            case 'company':
                return a.company.localeCompare(b.company);
            default:
                return 0;
        }
    });

    const stats = {
        total: applications.length,
        pending: applications.filter(app => ['applied', 'reviewed', 'in-review', 'interview'].includes(app.status)).length,
        offers: applications.filter(app => app.status === 'offered').length,
        rejected: applications.filter(app => app.status === 'rejected').length
    };

    if (loading) {
        return (
            <PageContainer maxWidth="max-w-6xl">
                <LoadingStates.PageLoader message="Loading your applications..." />
            </PageContainer>
        );
    }

    return (
        <PageContainer maxWidth="max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Applications
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Track and manage your job applications
                    </p>
                </div>
                <button
                    onClick={() => navigate('/jobs')}
                    className="mt-4 sm:mt-0 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-medium transition-all"
                >
                    Browse Jobs
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
                                Total Applications
                            </p>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <FiBriefcase className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-orange-600">
                                {stats.pending}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                In Progress
                            </p>
                        </div>
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                            <FiClock className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-green-600">
                                {stats.offers}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Offers Received
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
                            <p className="text-2xl font-bold text-red-600">
                                {stats.rejected}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Rejected
                            </p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                            <FiXCircle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center space-x-2">
                        <FiFilter className="text-gray-400 w-5 h-5" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="applied">Applied</option>
                            <option value="reviewed">Under Review</option>
                            <option value="in-review">In Review</option>
                            <option value="interview">Interview</option>
                            <option value="offered">Offer Received</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="status">By Status</option>
                        <option value="company">By Company</option>
                    </select>
                </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {sortedApplications.length === 0 ? (
                    <LoadingStates.EmptyState
                        title="No applications found"
                        description="You haven't applied to any jobs yet. Start browsing and applying to opportunities!"
                        action={() => navigate('/jobs')}
                        actionLabel="Browse Jobs"
                    />
                ) : (
                    sortedApplications.map((application) => (
                        <div
                            key={application.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                                        {application.companyLogo}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {application.jobTitle}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {application.company} • {application.location}
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                            <div className="flex items-center">
                                                <FiBriefcase className="w-4 h-4 mr-1" />
                                                {application.type}
                                            </div>
                                            <div className="flex items-center">
                                                <FiCalendar className="w-4 h-4 mr-1" />
                                                Applied {new Date(application.appliedDate).toLocaleDateString()}
                                            </div>
                                            {application.referredBy && (
                                                <div className="flex items-center text-green-600">
                                                    <FiTrendingUp className="w-4 h-4 mr-1" />
                                                    Referred by {application.referredBy}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                                        {getStatusIcon(application.status)}
                                        <span>{getStatusText(application.status)}</span>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                                        <FiMoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Application Progress */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    <span>Application Progress</span>
                                    <span>
                                        Updated {new Date(application.statusUpdated).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {application.timeline.map((step, index) => (
                                        <React.Fragment key={index}>
                                            <div className={`w-3 h-3 rounded-full ${step.status === application.status
                                                    ? 'bg-cyan-500'
                                                    : application.timeline.findIndex(s => s.status === application.status) > index
                                                        ? 'bg-green-500'
                                                        : 'bg-gray-300 dark:bg-gray-600'
                                                }`} />
                                            {index < application.timeline.length - 1 && (
                                                <div className={`flex-1 h-0.5 ${application.timeline.findIndex(s => s.status === application.status) > index
                                                        ? 'bg-green-500'
                                                        : 'bg-gray-300 dark:bg-gray-600'
                                                    }`} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Notes and Next Steps */}
                            {(application.notes || application.nextStep) && (
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                                    {application.notes && (
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                            <strong>Notes:</strong> {application.notes}
                                        </p>
                                    )}
                                    {application.nextStep && (
                                        <p className="text-sm text-cyan-600 dark:text-cyan-400">
                                            <strong>Next Step:</strong> {application.nextStep}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => navigate(`/jobs/${application.jobId}`)}
                                    className="flex items-center space-x-2 px-4 py-2 text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all"
                                >
                                    <FiExternalLink className="w-4 h-4" />
                                    <span>View Job</span>
                                </button>
                                <button
                                    onClick={() => navigate(`/companies/${application.company.toLowerCase()}`)}
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                >
                                    <FiBriefcase className="w-4 h-4" />
                                    <span>Company Profile</span>
                                </button>
                                {application.status === 'offered' && (
                                    <button className="flex items-center space-x-2 px-4 py-2 text-green-600 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-all">
                                        <FiCheckCircle className="w-4 h-4" />
                                        <span>Accept Offer</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </PageContainer>
    );
};

export default MyApplicationsPage;
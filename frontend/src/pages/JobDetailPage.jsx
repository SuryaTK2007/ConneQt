import React, { useState, useEffect } from 'react';
import {
    FiMapPin,
    FiBriefcase,
    FiClock,
    FiDollarSign,
    FiUsers,
    FiBookmark,
    FiShare2,
    FiArrowLeft,
    FiSend,
    FiCheckCircle,
    FiHome,
    FiTrendingUp,
    FiMail,
    FiLinkedin,
    FiUser
} from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageContainer from '../components/common/PageContainer';
import LoadingStates from '../components/common/LoadingStates';
import { databases } from '../lib/appwrite';

const JobDetailPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const [showAlumniModal, setShowAlumniModal] = useState(false);
    const [selectedAlumni, setSelectedAlumni] = useState(null);
    const [referralMessage, setReferralMessage] = useState('');

    // Fetch job data from database
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            // Check if jobId exists
            if (!jobId) {
                console.error('No job ID provided');
                setLoading(false);
                return;
            }

            try {
                const response = await databases.getDocument({
                    databaseId: 'jobs_database',
                    collectionId: 'jobs_collection',
                    documentId: jobId
                });
                setJob(response);
                // Check if user has already applied (mock check)
                setHasApplied(Math.random() > 0.7);
            } catch (error) {
                console.error('Error fetching job details:', error);
                // Set job to null if there's an error
                setJob(null);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    const handleApply = async () => {
        setApplying(true);
        // Simulate application submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        setHasApplied(true);
        setApplying(false);
    };

    const handleRequestReferral = async () => {
        if (!selectedAlumni || !referralMessage.trim()) return;

        // Simulate referral request
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowAlumniModal(false);
        setReferralMessage('');
        alert('Referral request sent successfully!');
    };

    const AlumniModal = () => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Request Alumni Referral
                    </h3>
                    <button
                        onClick={() => setShowAlumniModal(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        ×
                    </button>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Alumni
                    </label>
                    <div className="space-y-2">
                        {(job.alumni || []).map((alumni) => (
                            <button
                                key={alumni.id}
                                onClick={() => setSelectedAlumni(alumni)}
                                className={`w-full p-3 rounded-xl border text-left transition-all ${selectedAlumni?.id === alumni.id
                                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <div className="font-medium text-gray-900 dark:text-white">{alumni.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{alumni.position}</div>
                                <div className="text-xs text-gray-500">{alumni.graduationYear} • {alumni.department}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message
                    </label>
                    <textarea
                        value={referralMessage}
                        onChange={(e) => setReferralMessage(e.target.value)}
                        placeholder="Introduce yourself and explain why you're interested in this role..."
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowAlumniModal(false)}
                        className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleRequestReferral}
                        disabled={!selectedAlumni || !referralMessage.trim()}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50"
                    >
                        Send Request
                    </button>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <PageContainer maxWidth="max-w-6xl">
                <LoadingStates.PageLoader message="Loading job details..." />
            </PageContainer>
        );
    }

    if (!job) {
        return (
            <PageContainer maxWidth="max-w-6xl">
                <LoadingStates.ErrorState
                    title="Job not found"
                    description="The job posting you're looking for doesn't exist or has been removed."
                    action={() => navigate('/jobs')}
                    actionLabel="Back to Jobs"
                />
            </PageContainer>
        );
    }

    return (
        <PageContainer maxWidth="max-w-6xl">
            {/* Back Button */}
            <button
                onClick={() => navigate('/jobs')}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
            >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to Jobs</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Job Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl">
                                    {job.companyLogo}
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {job.title}
                                    </h1>
                                    <p className="text-xl text-gray-600 dark:text-gray-400 font-medium mb-1">
                                        {job.company}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center">
                                            <FiMapPin className="w-4 h-4 mr-1" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center">
                                            <FiBriefcase className="w-4 h-4 mr-1" />
                                            {job.type}
                                        </div>
                                        <div className="flex items-center">
                                            <FiDollarSign className="w-4 h-4 mr-1" />
                                            {job.salary}
                                        </div>
                                        <div className="flex items-center">
                                            <FiClock className="w-4 h-4 mr-1" />
                                            {job.posted}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                    <FiBookmark className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                    <FiShare2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <FiUsers className="w-4 h-4 mr-1" />
                                {job.applicants} applicants
                            </div>
                            {job.alumni && job.alumni.length > 0 && (
                                <div className="flex items-center text-green-600 dark:text-green-400">
                                    <FiTrendingUp className="w-4 h-4 mr-1" />
                                    {job.alumni.length} SECE alumni work here
                                </div>
                            )}
                            {job.deadline && (
                                <div className="flex items-center text-red-600 dark:text-red-400">
                                    <FiClock className="w-4 h-4 mr-1" />
                                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Job Description
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                                {job.description}
                            </div>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Requirements
                        </h2>
                        <ul className="space-y-2">
                            {(job.requirements || []).map((req, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                    <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Skills */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Required Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills && job.skills.split(',').map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 rounded-full text-sm font-medium"
                                >
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Apply Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Apply for this Job
                        </h3>

                        {hasApplied ? (
                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                                <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                                <p className="text-green-800 dark:text-green-300 font-medium">
                                    Application Submitted
                                </p>
                                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                    You've already applied for this position
                                </p>
                            </div>
                        ) : (
                            <button
                                onClick={handleApply}
                                disabled={applying}
                                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 font-semibold disabled:opacity-50 flex items-center justify-center space-x-2"
                            >
                                {applying ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Applying...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="w-5 h-5" />
                                        <span>Apply Now</span>
                                    </>
                                )}
                            </button>
                        )}

                        {job.alumni && job.alumni.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setShowAlumniModal(true)}
                                    className="w-full py-2 text-cyan-600 dark:text-cyan-400 border border-cyan-600 dark:border-cyan-400 rounded-xl hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-300 font-medium"
                                >
                                    Request Alumni Referral
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Company Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                About {job.company}
                            </h3>
                            <button
                                onClick={() => navigate(`/companies/${job.company.toLowerCase()}`)}
                                className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm"
                            >
                                View Profile
                            </button>
                        </div>

                        {job.companyInfo && (
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <FiHome className="w-4 h-4 mr-2" />
                                    {job.companyInfo.size}
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <FiBriefcase className="w-4 h-4 mr-2" />
                                    {job.companyInfo.industry}
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <FiClock className="w-4 h-4 mr-2" />
                                    Founded {job.companyInfo.founded}
                                </div>
                            </div>
                        )}

                        {job.companyInfo && (
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-4">
                                {job.companyInfo.description}
                            </p>
                        )}
                    </div>

                    {/* Alumni at Company */}
                    {job.alumni && job.alumni.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                SECE Alumni at {job.company}
                            </h3>

                            <div className="space-y-3">
                                {(job.alumni || []).slice(0, 3).map((alumni) => (
                                    <div key={alumni.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {alumni.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                                                {alumni.name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                                {alumni.position}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {alumni.graduationYear} • {alumni.yearsAtCompany}y exp
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <a
                                                href={`https://${alumni.linkedin}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                                            >
                                                <FiLinkedin className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowAlumniModal(true)}
                                className="w-full mt-4 py-2 text-sm text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-xl transition-all"
                            >
                                Connect with Alumni
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Alumni Modal */}
            {showAlumniModal && <AlumniModal />}
        </PageContainer>
    );
};

export default JobDetailPage;
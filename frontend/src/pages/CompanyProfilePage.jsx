import React, { useState, useEffect } from 'react';
import {
    FiHome,
    FiMapPin,
    FiUsers,
    FiCalendar,
    FiExternalLink,
    FiArrowLeft,
    FiBriefcase,
    FiDollarSign,
    FiClock,
    FiTrendingUp,
    FiLinkedin,
    FiGlobe
} from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';
import LoadingStates from '../components/common/LoadingStates';

const CompanyProfilePage = () => {
    const { companyName } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState(null);

    // Mock company data
    const mockCompanies = {
        google: {
            id: 1,
            name: 'Google',
            logo: '🔍',
            tagline: 'Organize the world\'s information and make it universally accessible',
            description: `Google is a multinational technology company that specializes in Internet-related services and products. Founded in 1998 by Larry Page and Sergey Brin, Google has grown to become one of the world's most valuable companies.

Our mission is to organize the world's information and make it universally accessible and useful. We build products that help create opportunities for everyone, whether down the street or across the globe.

At Google, we believe in the power of technology to improve lives and solve important problems. Our teams work on cutting-edge projects across search, advertising, cloud computing, artificial intelligence, and more.`,
            industry: 'Technology',
            size: '156,000+ employees',
            founded: '1998',
            headquarters: 'Mountain View, California',
            website: 'https://google.com',
            locations: ['Bangalore', 'Hyderabad', 'Mumbai', 'Gurugram'],
            benefits: [
                'Competitive salary and equity',
                'Comprehensive health insurance',
                'Flexible working hours',
                'Learning and development budget',
                'Free meals and snacks',
                'Wellness programs',
                'Transportation allowance',
                'Parental leave'
            ],
            culture: [
                'Innovation and creativity',
                'Collaboration and teamwork',
                'Diversity and inclusion',
                'Work-life balance',
                'Continuous learning',
                'Impact-driven work'
            ],
            openPositions: [
                {
                    id: 1,
                    title: 'Software Engineer Intern',
                    type: 'Internship',
                    location: 'Bangalore, India',
                    salary: '₹50,000/month',
                    posted: '2 days ago',
                    applicants: 156
                },
                {
                    id: 7,
                    title: 'Product Manager',
                    type: 'Full-time',
                    location: 'Hyderabad, India',
                    salary: '₹25-35 LPA',
                    posted: '1 week ago',
                    applicants: 89
                },
                {
                    id: 8,
                    title: 'UX Designer',
                    type: 'Full-time',
                    location: 'Bangalore, India',
                    salary: '₹12-18 LPA',
                    posted: '3 days ago',
                    applicants: 67
                }
            ],
            alumni: [
                {
                    id: 1,
                    name: 'Rahul Sharma',
                    position: 'Senior Software Engineer',
                    graduationYear: '2020',
                    department: 'Computer Science',
                    yearsAtCompany: 2,
                    linkedin: 'linkedin.com/in/rahulsharma'
                },
                {
                    id: 2,
                    name: 'Priya Patel',
                    position: 'Product Manager',
                    graduationYear: '2019',
                    department: 'Information Technology',
                    yearsAtCompany: 3,
                    linkedin: 'linkedin.com/in/priyapatel'
                },
                {
                    id: 3,
                    name: 'Amit Kumar',
                    position: 'Data Engineer',
                    graduationYear: '2021',
                    department: 'Computer Science',
                    yearsAtCompany: 1,
                    linkedin: 'linkedin.com/in/amitkumar'
                }
            ],
            stats: {
                totalJobs: 15,
                activeJobs: 8,
                totalAlumni: 12,
                averageSalary: '₹18 LPA'
            }
        },
        microsoft: {
            id: 2,
            name: 'Microsoft',
            logo: '🪟',
            tagline: 'Empower every person and organization on the planet to achieve more',
            description: `Microsoft is a leading global technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.

Founded in 1975, Microsoft is best known for its software products including the Microsoft Windows line of operating systems, Microsoft Office suite, and Internet Explorer web browser.

Today, Microsoft is a leader in cloud computing with Azure, productivity software with Office 365, gaming with Xbox, and emerging technologies like AI and mixed reality. We're committed to empowering every person and organization on the planet to achieve more.`,
            industry: 'Technology',
            size: '220,000+ employees',
            founded: '1975',
            headquarters: 'Redmond, Washington',
            website: 'https://microsoft.com',
            locations: ['Hyderabad', 'Bangalore', 'Noida', 'Mumbai'],
            benefits: [
                'Competitive compensation',
                'Stock purchase plan',
                'Health and wellness programs',
                'Flexible work arrangements',
                'Professional development',
                'Parental leave benefits',
                'Retirement savings plan',
                'Employee assistance program'
            ],
            culture: [
                'Growth mindset',
                'Inclusive culture',
                'Innovation focus',
                'Customer obsession',
                'Partner for success',
                'Respect for diversity'
            ],
            openPositions: [
                {
                    id: 2,
                    title: 'Frontend Developer',
                    type: 'Full-time',
                    location: 'Hyderabad, India',
                    salary: '₹8-12 LPA',
                    posted: '1 week ago',
                    applicants: 89
                }
            ],
            alumni: [
                {
                    id: 4,
                    name: 'Sneha Reddy',
                    position: 'Cloud Solution Architect',
                    graduationYear: '2018',
                    department: 'Computer Science',
                    yearsAtCompany: 4,
                    linkedin: 'linkedin.com/in/snehareddy'
                }
            ],
            stats: {
                totalJobs: 12,
                activeJobs: 5,
                totalAlumni: 8,
                averageSalary: '₹15 LPA'
            }
        }
    };

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const companyData = mockCompanies[companyName?.toLowerCase()];
            if (companyData) {
                setCompany(companyData);
            }
            setLoading(false);
        }, 1000);
    }, [companyName]);

    if (loading) {
        return (
            <PageContainer maxWidth="max-w-6xl">
                <LoadingStates.PageLoader message="Loading company profile..." />
            </PageContainer>
        );
    }

    if (!company) {
        return (
            <PageContainer maxWidth="max-w-6xl">
                <LoadingStates.ErrorState
                    title="Company not found"
                    description="The company profile you're looking for doesn't exist."
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

            {/* Company Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden mb-8">
                {/* Cover */}
                <div className="h-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>

                {/* Company Info */}
                <div className="px-8 pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-6">
                        <div className="flex items-end space-x-6">
                            <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-6xl border-4 border-white dark:border-gray-800 shadow-xl">
                                {company.logo}
                            </div>
                            <div className="pb-2">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    {company.name}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                                    {company.tagline}
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center">
                                        <FiHome className="w-4 h-4 mr-1" />
                                        {company.industry}
                                    </div>
                                    <div className="flex items-center">
                                        <FiUsers className="w-4 h-4 mr-1" />
                                        {company.size}
                                    </div>
                                    <div className="flex items-center">
                                        <FiCalendar className="w-4 h-4 mr-1" />
                                        Founded {company.founded}
                                    </div>
                                    <div className="flex items-center">
                                        <FiMapPin className="w-4 h-4 mr-1" />
                                        {company.headquarters}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                            >
                                <FiGlobe className="w-4 h-4" />
                                <span>Website</span>
                            </a>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {company.stats.activeJobs}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Open Positions
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {company.stats.totalAlumni}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                SECE Alumni
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {company.stats.averageSalary}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Avg. Salary
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {company.locations.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                India Offices
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            About {company.name}
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                                {company.description}
                            </div>
                        </div>
                    </div>

                    {/* Open Positions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Open Positions ({company.openPositions.length})
                            </h2>
                            <button
                                onClick={() => navigate('/jobs', { state: { company: company.name } })}
                                className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm"
                            >
                                View All Jobs
                            </button>
                        </div>

                        <div className="space-y-4">
                            {company.openPositions.map((job) => (
                                <div
                                    key={job.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all cursor-pointer"
                                    onClick={() => navigate(`/jobs/${job.id}`)}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {job.title}
                                            </h3>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                <div className="flex items-center">
                                                    <FiBriefcase className="w-4 h-4 mr-1" />
                                                    {job.type}
                                                </div>
                                                <div className="flex items-center">
                                                    <FiMapPin className="w-4 h-4 mr-1" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center">
                                                    <FiDollarSign className="w-4 h-4 mr-1" />
                                                    {job.salary}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center">
                                                <FiClock className="w-4 h-4 mr-1" />
                                                {job.posted}
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <FiUsers className="w-4 h-4 mr-1" />
                                                {job.applicants} applicants
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Culture & Values */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Culture & Values
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {company.culture.map((value, index) => (
                                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                    <span className="text-gray-700 dark:text-gray-300">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Office Locations */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            India Offices
                        </h3>
                        <div className="space-y-2">
                            {company.locations.map((location, index) => (
                                <div key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <FiMapPin className="w-4 h-4 text-cyan-500" />
                                    <span>{location}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Benefits & Perks
                        </h3>
                        <div className="space-y-2">
                            {company.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECE Alumni */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            SECE Alumni at {company.name}
                        </h3>

                        <div className="space-y-3">
                            {company.alumni.map((alumni) => (
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
                                    <a
                                        href={`https://${alumni.linkedin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                                    >
                                        <FiLinkedin className="w-4 h-4" />
                                    </a>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate('/connections', { state: { company: company.name } })}
                            className="w-full mt-4 py-2 text-sm text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-xl transition-all"
                        >
                            Connect with Alumni
                        </button>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default CompanyProfilePage;
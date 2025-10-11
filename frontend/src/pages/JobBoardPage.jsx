import React, { useState, useEffect } from 'react';
import {
    FiSearch,
    FiMapPin,
    FiBriefcase,
    FiClock,
    FiDollarSign,
    FiFilter,
    FiBookmark,
    FiExternalLink,
    FiUsers,
    FiTrendingUp,
    FiHome
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';
import LoadingStates from '../components/common/LoadingStates';
import { databases } from '../lib/appwrite';

const JobBoardPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        type: 'all',
        location: 'all',
        experience: 'all',
        company: 'all'
    });
    const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                console.log('Fetching jobs from database...');
                const response = await databases.listDocuments({
                    databaseId: 'jobs_database',
                    collectionId: 'jobs_collection'
                });
                console.log('Jobs fetched:', response.documents);
                setJobs(response.documents);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleBookmark = (jobId) => {
        const newBookmarked = new Set(bookmarkedJobs);
        if (newBookmarked.has(jobId)) {
            newBookmarked.delete(jobId);
        } else {
            newBookmarked.add(jobId);
        }
        setBookmarkedJobs(newBookmarked);
    };

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters({
            ...selectedFilters,
            [filterType]: value
        });
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.skills.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = selectedFilters.type === 'all' || job.type === selectedFilters.type;
        const matchesLocation = selectedFilters.location === 'all' || job.location.includes(selectedFilters.location);
        const matchesExperience = selectedFilters.experience === 'all' || job.experience === selectedFilters.experience;

        return matchesSearch && matchesType && matchesLocation && matchesExperience;
    });

    console.log('Jobs from database:', jobs);
    console.log('Filtered jobs:', filteredJobs);
    console.log('Search query:', searchQuery);
    console.log('Selected filters:', selectedFilters);

    // Function to get company logo
    const getCompanyLogo = (companyName) => {
        const logos = {
            'Google': '🔍',
            'Microsoft': '🪟',
            'Flipkart': '🛒',
            'Zomato': '🍕',
            'Adobe': '🎨'
        };
        return logos[companyName] || '🏢';
    };

    const JobCard = ({ job }) => (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl">
                        {getCompanyLogo(job.company)}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">{job.company}</p>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleBookmark(job.$id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${bookmarkedJobs.has(job.$id)
                        ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'
                        }`}
                >
                    <FiBookmark className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    {job.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FiBriefcase className="w-4 h-4 mr-2" />
                    {job.type} • {job.experience}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FiDollarSign className="w-4 h-4 mr-2" />
                    {job.salary}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FiClock className="w-4 h-4 mr-2" />
                    {job.posted}
                </div>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                {job.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
                {job.skills.split(',').map(skill => skill.trim()).slice(0, 4).map((skill, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg"
                    >
                        {skill}
                    </span>
                ))}
                {job.skills.split(',').length > 4 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">
                        +{job.skills.split(',').length - 4} more
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                        <FiUsers className="w-4 h-4 mr-1" />
                        {job.applicants} applicants
                    </div>
                    <div className="flex items-center">
                        <FiClock className="w-4 h-4 mr-1" />
                        {job.posted}
                    </div>
                </div>
                <button
                    onClick={() => navigate(`/jobs/${job.$id}`)}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 text-sm font-medium"
                >
                    View Details
                </button>
            </div>
        </div>
    );

    if (loading) {
        return (
            <PageContainer maxWidth="max-w-7xl">
                <LoadingStates.PageLoader message="Loading job opportunities..." />
            </PageContainer>
        );
    }

    return (
        <PageContainer maxWidth="max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Job & Internship Board
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Discover career opportunities with alumni referrals
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => navigate('/jobs/applications')}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                        >
                            My Applications
                        </button>
                        <button
                            onClick={() => navigate('/jobs/bookmarks')}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
                        >
                            Bookmarked ({bookmarkedJobs.size})
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{jobs.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Jobs</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-2xl font-bold text-green-600">{jobs.filter(j => j.type === 'Internship').length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Internships</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-2xl font-bold text-blue-600">{jobs.filter(j => j.hasAlumni).length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">With Alumni</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-2xl font-bold text-purple-600">{bookmarkedJobs.size}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bookmarked</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2 relative">
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search jobs, companies, or skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    {/* Filters */}
                    <select
                        value={selectedFilters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="all">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Internship">Internship</option>
                    </select>

                    <select
                        value={selectedFilters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="all">All Locations</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Gurugram">Gurugram</option>
                        <option value="Noida">Noida</option>
                    </select>

                    <select
                        value={selectedFilters.experience}
                        onChange={(e) => handleFilterChange('experience', e.target.value)}
                        className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="all">All Experience</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="2-5 years">2-5 years</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                    Showing {filteredJobs.length} of {jobs.length} opportunities
                </p>
                <div className="flex items-center space-x-2">
                    <FiFilter className="w-4 h-4 text-gray-400" />
                    <select className="bg-transparent text-sm text-gray-600 dark:text-gray-400 focus:outline-none">
                        <option>Most Recent</option>
                        <option>Most Relevant</option>
                        <option>Salary: High to Low</option>
                        <option>Salary: Low to High</option>
                    </select>
                </div>
            </div>

            {/* Job Listings */}
            {filteredJobs.length === 0 ? (
                <LoadingStates.EmptyState
                    icon={FiBriefcase}
                    title="No jobs found"
                    description="Try adjusting your search criteria or filters"
                />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredJobs.map((job) => (
                        <JobCard key={job.$id} job={job} />
                    ))}
                </div>
            )}
        </PageContainer>
    );
};

export default JobBoardPage;
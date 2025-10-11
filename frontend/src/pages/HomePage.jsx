import React, { useState, useEffect } from 'react';
import {
  FiBriefcase,
  FiTrendingUp,
  FiUsers,
  FiArrowRight,
  FiMapPin,
  FiClock,
  FiStar
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/home/EventCard';
import ConnectionsWidget from '../components/home/ConnectionsWidget';
import PageContainer from '../components/common/PageContainer';
import { databases } from '../lib/appwrite';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);

  const eventPosts = [
    { id: 1, title: 'Tech Career Fair 2024', date: 'March 15, 2024', location: 'Main Auditorium', type: 'Career Event', icon: '💼', bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-600' },
    { id: 2, title: 'Alumni Networking Night', date: 'March 20, 2024', location: 'Student Center', type: 'Networking', icon: '🤝', bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600' },
    { id: 3, title: 'Workshop: Resume Building', date: 'March 25, 2024', location: 'Room 201', type: 'Workshop', icon: '📝', bgColor: 'bg-gradient-to-br from-green-500 to-teal-600' },
    { id: 4, title: 'Startup Pitch Competition', date: 'March 28, 2024', location: 'Innovation Hub', type: 'Competition', icon: '🚀', bgColor: 'bg-gradient-to-br from-orange-500 to-red-600' },
    { id: 5, title: 'Industry Panel Discussion', date: 'April 2, 2024', location: 'Conference Hall', type: 'Panel', icon: '🎯', bgColor: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
    { id: 6, title: 'Coding Bootcamp', date: 'April 5, 2024', location: 'Computer Lab', type: 'Workshop', icon: '💻', bgColor: 'bg-gradient-to-br from-cyan-500 to-blue-600' }
  ];

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

  // Fetch featured jobs from database
  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const response = await databases.listDocuments({
          databaseId: 'jobs_database',
          collectionId: 'jobs_collection'
        });

        // Get first 3 jobs for featured section
        const jobs = response.documents.slice(0, 3).map(job => ({
          id: job.$id,
          title: job.title,
          company: job.company,
          logo: getCompanyLogo(job.company),
          location: job.location,
          type: job.type,
          salary: job.salary,
          postedTime: job.posted,
          hasAlumni: Math.random() > 0.5 // Random for now
        }));

        setFeaturedJobs(jobs);
        setTotalJobs(response.total);
      } catch (error) {
        console.error('Error fetching featured jobs:', error);
      } finally {
        setJobsLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  return (
    <PageContainer maxWidth="max-w-6xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening in your network
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <FiBriefcase className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {jobsLoading ? '...' : totalJobs}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Jobs</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <FiUsers className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Connections</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Applications</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <FiStar className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Saved Jobs</p>
        </div>
      </div>

      {/* Featured Job Opportunities */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Job Opportunities
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Latest openings from top companies
            </p>
          </div>
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center space-x-2 px-4 py-2 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-xl transition-all"
          >
            <span>View All</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {jobsLoading ? (
            // Loading skeleton for featured jobs
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-2/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : featuredJobs.length === 0 ? (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No featured jobs available</p>
            </div>
          ) : (
            featuredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                    {job.logo}
                  </div>
                  {job.hasAlumni && (
                    <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
                      Alumni
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{job.company}</p>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <FiBriefcase className="w-4 h-4 mr-2" />
                    {job.type} • {job.salary}
                  </div>
                  <div className="flex items-center">
                    <FiClock className="w-4 h-4 mr-2" />
                    {job.postedTime}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/my-applications')}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FiBriefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">My Applications</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Track your progress</p>
              </div>
            </div>
            <FiArrowRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => navigate('/referrals')}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50 hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <FiUsers className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Referrals</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Connect with alumni</p>
              </div>
            </div>
            <FiArrowRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <FiTrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Browse Jobs</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Explore opportunities</p>
              </div>
            </div>
            <FiArrowRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Smart Connections Widget */}
      <div className="mb-8">
        <ConnectionsWidget />
      </div>

      {/* Events Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Latest Events & Updates
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventPosts.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate('/companies/google')}
          className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50 transition-all duration-300 hover:shadow-lg cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <span className="text-3xl">🏢</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Company Profiles
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Explore top companies and connect with SECE alumni working there.
                </p>
              </div>
            </div>
            <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
          </div>
        </div>

        <div
          onClick={() => navigate('/events')}
          className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50 transition-all duration-300 hover:shadow-lg cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <span className="text-3xl">📰</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  Campus Events
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Stay updated with career fairs, workshops, and networking events.
                </p>
              </div>
            </div>
            <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
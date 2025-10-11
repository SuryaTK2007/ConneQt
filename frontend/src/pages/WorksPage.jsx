import React, { useState } from 'react';
import { FiClock, FiCheckCircle, FiAlertCircle, FiBook } from 'react-icons/fi';
import PageContainer from '../components/common/PageContainer';

const WorksPage = () => {
  const [filter, setFilter] = useState('all');

  const assignments = [
    { title: 'Data Structures Project', course: 'CS 201', due: 'Mar 20', status: 'pending', priority: 'high' },
    { title: 'Marketing Research Paper', course: 'MKT 301', due: 'Mar 22', status: 'in-progress', priority: 'medium' },
    { title: 'Physics Lab Report', course: 'PHY 101', due: 'Mar 18', status: 'completed', priority: 'low' },
    { title: 'Database Design Assignment', course: 'CS 301', due: 'Mar 25', status: 'pending', priority: 'medium' },
    { title: 'Financial Analysis Case Study', course: 'FIN 201', due: 'Mar 28', status: 'pending', priority: 'high' },
    { title: 'Literature Review Essay', course: 'ENG 202', due: 'Mar 30', status: 'in-progress', priority: 'low' }
  ];

  const stats = {
    total: assignments.length,
    inProgress: assignments.filter(a => a.status === 'in-progress').length,
    pending: assignments.filter(a => a.status === 'pending').length,
    completed: assignments.filter(a => a.status === 'completed').length
  };

  const filteredAssignments = filter === 'all'
    ? assignments
    : assignments.filter(a => a.status === filter);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          icon: FiCheckCircle,
          label: 'Completed'
        };
      case 'in-progress':
        return {
          color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
          icon: FiClock,
          label: 'In Progress'
        };
      default:
        return {
          color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
          icon: FiAlertCircle,
          label: 'Pending'
        };
    }
  };

  return (
    <PageContainer maxWidth="max-w-5xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Assignments & Works
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your academic assignments and deadlines
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-center">
          <div className="text-2xl md:text-3xl font-bold text-cyan-500 mb-1">{stats.total}</div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-center">
          <div className="text-2xl md:text-3xl font-bold text-yellow-500 mb-1">{stats.inProgress}</div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">In Progress</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-center">
          <div className="text-2xl md:text-3xl font-bold text-red-500 mb-1">{stats.pending}</div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-center">
          <div className="text-2xl md:text-3xl font-bold text-green-500 mb-1">{stats.completed}</div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {['all', 'pending', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${filter === status
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            {status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {filteredAssignments.map((assignment, index) => {
          const statusConfig = getStatusConfig(assignment.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                    <FiBook className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {assignment.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {assignment.course}
                    </p>
                  </div>
                </div>
                <span className={`flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${statusConfig.color} whitespace-nowrap`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusConfig.label}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Due: <span className="font-semibold text-gray-900 dark:text-white">{assignment.due}</span>
                </span>
                <button className="px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default WorksPage;
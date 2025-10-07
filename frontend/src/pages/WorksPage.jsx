import React from 'react';
import BottomNavigation from '../components/home/BottomNavigation';

const WorksPage = () => {
  const assignments = [
    { title: 'Data Structures Project', course: 'CS 201', due: 'Mar 20', status: 'pending' },
    { title: 'Marketing Research Paper', course: 'MKT 301', due: 'Mar 22', status: 'in-progress' },
    { title: 'Physics Lab Report', course: 'PHY 101', due: 'Mar 18', status: 'completed' },
    { title: 'Database Design Assignment', course: 'CS 301', due: 'Mar 25', status: 'pending' },
    { title: 'Financial Analysis Case Study', course: 'FIN 201', due: 'Mar 28', status: 'pending' },
    { title: 'Literature Review Essay', course: 'ENG 202', due: 'Mar 30', status: 'in-progress' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments & Works</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center">
              <div className="text-3xl font-bold text-cyan-500">6</div>
              <div className="text-gray-600 dark:text-gray-400">Total Assignments</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center">
              <div className="text-3xl font-bold text-yellow-500">2</div>
              <div className="text-gray-600 dark:text-gray-400">In Progress</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center">
              <div className="text-3xl font-bold text-red-500">3</div>
              <div className="text-gray-600 dark:text-gray-400">Pending</div>
            </div>
          </div>

          <div className="space-y-4">
            {assignments.map((assignment, index) => (
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{assignment.title}</h3>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(assignment.status)}`}>
                    {assignment.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{assignment.course}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Due: {assignment.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation activeTab="works" />
    </div>
  );
};

export default WorksPage;
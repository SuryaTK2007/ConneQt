import React from 'react';
import BottomNavigation from '../components/home/BottomNavigation';

const AlumniChatPage = () => {
  const chats = [
    { name: 'Sarah Johnson', role: 'Software Engineer at Google', lastMessage: 'Happy to help with your career questions!', time: '2m ago', online: true },
    { name: 'Michael Chen', role: 'Product Manager at Microsoft', lastMessage: 'The internship program is great...', time: '1h ago', online: false },
    { name: 'Emily Davis', role: 'Data Scientist at Netflix', lastMessage: 'Thanks for connecting!', time: '3h ago', online: true },
    { name: 'David Wilson', role: 'Marketing Director at Apple', lastMessage: 'Let me know if you need any advice', time: '1d ago', online: false },
    { name: 'Lisa Rodriguez', role: 'UX Designer at Adobe', lastMessage: 'Portfolio looks great!', time: '2d ago', online: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Alumni Chat</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <input
              type="text"
              placeholder="Search alumni..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="space-y-4">
            {chats.map((chat, index) => (
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {chat.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{chat.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{chat.role}</p>
                      </div>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation activeTab="alumni" />
    </div>
  );
};

export default AlumniChatPage;
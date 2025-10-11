import React, { useState } from 'react';
import { FiSearch, FiMessageSquare } from 'react-icons/fi';
import PageContainer from '../components/common/PageContainer';
import { EmptyState } from '../components/common/LoadingStates';

const AlumniChatPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const chats = [
    { name: 'Sarah Johnson', role: 'Software Engineer at Google', lastMessage: 'Happy to help with your career questions!', time: '2m ago', online: true, unread: 2 },
    { name: 'Michael Chen', role: 'Product Manager at Microsoft', lastMessage: 'The internship program is great...', time: '1h ago', online: false, unread: 0 },
    { name: 'Emily Davis', role: 'Data Scientist at Netflix', lastMessage: 'Thanks for connecting!', time: '3h ago', online: true, unread: 1 },
    { name: 'David Wilson', role: 'Marketing Director at Apple', lastMessage: 'Let me know if you need any advice', time: '1d ago', online: false, unread: 0 },
    { name: 'Lisa Rodriguez', role: 'UX Designer at Adobe', lastMessage: 'Portfolio looks great!', time: '2d ago', online: true, unread: 0 }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer maxWidth="max-w-4xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Alumni Chat
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with alumni and mentors
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search alumni by name or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
        />
      </div>

      {/* Chat List */}
      {filteredChats.length === 0 ? (
        <EmptyState
          icon={FiMessageSquare}
          title="No conversations found"
          description={searchQuery ? `No results for "${searchQuery}"` : 'Start a conversation with alumni to see it here'}
        />
      ) : (
        <div className="space-y-3">
          {filteredChats.map((chat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                {/* Avatar with Online Status */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                  {chat.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                      {chat.unread}
                    </div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {chat.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {chat.role}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                      {chat.time}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 truncate ${chat.unread > 0 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default AlumniChatPage;
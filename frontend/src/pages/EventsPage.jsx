import React, { useState } from 'react';
import EventCard from '../components/home/EventCard';
import PageContainer from '../components/common/PageContainer';

const EventsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const events = [
    { id: 1, title: 'Tech Career Fair 2024', date: 'March 15, 2024', location: 'Main Auditorium', type: 'Career Event', icon: '💼', bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-600' },
    { id: 2, title: 'Alumni Networking Night', date: 'March 20, 2024', location: 'Student Center', type: 'Networking', icon: '🤝', bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600' },
    { id: 3, title: 'Workshop: Resume Building', date: 'March 25, 2024', location: 'Room 201', type: 'Workshop', icon: '📝', bgColor: 'bg-gradient-to-br from-green-500 to-teal-600' },
    { id: 4, title: 'Startup Pitch Competition', date: 'March 28, 2024', location: 'Innovation Hub', type: 'Competition', icon: '🚀', bgColor: 'bg-gradient-to-br from-orange-500 to-red-600' },
    { id: 5, title: 'Industry Panel Discussion', date: 'April 2, 2024', location: 'Conference Hall', type: 'Panel', icon: '🎯', bgColor: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
    { id: 6, title: 'Coding Bootcamp', date: 'April 5, 2024', location: 'Computer Lab', type: 'Workshop', icon: '💻', bgColor: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
    { id: 7, title: 'Finance Seminar', date: 'April 8, 2024', location: 'Business Hall', type: 'Seminar', icon: '💰', bgColor: 'bg-gradient-to-br from-yellow-500 to-orange-600' },
    { id: 8, title: 'Design Thinking Workshop', date: 'April 12, 2024', location: 'Creative Studio', type: 'Workshop', icon: '🎨', bgColor: 'bg-gradient-to-br from-pink-500 to-rose-600' },
    { id: 9, title: 'AI & ML Conference', date: 'April 15, 2024', location: 'Tech Center', type: 'Conference', icon: '🤖', bgColor: 'bg-gradient-to-br from-violet-500 to-purple-600' },
    { id: 10, title: 'Leadership Summit', date: 'April 18, 2024', location: 'Executive Hall', type: 'Summit', icon: '👑', bgColor: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
    { id: 11, title: 'Internship Fair', date: 'April 22, 2024', location: 'Campus Grounds', type: 'Fair', icon: '🎓', bgColor: 'bg-gradient-to-br from-blue-600 to-indigo-600' },
    { id: 12, title: 'Entrepreneurship Bootcamp', date: 'April 25, 2024', location: 'Startup Hub', type: 'Bootcamp', icon: '💡', bgColor: 'bg-gradient-to-br from-amber-500 to-yellow-600' }
  ];

  const filteredEvents = selectedFilter === 'all'
    ? events
    : events.filter(event =>
      event.type.toLowerCase().includes(selectedFilter.toLowerCase())
    );

  return (
    <PageContainer maxWidth="max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Upcoming Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} available
          </p>
        </div>

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
        >
          <option value="all">All Events</option>
          <option value="career">Career Events</option>
          <option value="workshop">Workshops</option>
          <option value="networking">Networking</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </PageContainer>
  );
};

export default EventsPage;
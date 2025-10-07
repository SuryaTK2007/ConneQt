import React from 'react';
import BottomNavigation from '../components/home/BottomNavigation';
import EventCard from '../components/home/EventCard';

const EventsPage = () => {
  
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



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
            <select className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <option>All Events</option>
              <option>Career Events</option>
              <option>Workshops</option>
              <option>Networking</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation activeTab="events" />
    </div>
  );
};

export default EventsPage;
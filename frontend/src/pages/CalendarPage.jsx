import React from 'react';
import BottomNavigation from '../components/home/BottomNavigation';

const CalendarPage = () => {
  const events = [
    { date: '15', day: 'Mon', title: 'Tech Career Fair', time: '10:00 AM' },
    { date: '18', day: 'Thu', title: 'Alumni Meetup', time: '6:00 PM' },
    { date: '22', day: 'Mon', title: 'Workshop: Resume', time: '2:00 PM' },
    { date: '25', day: 'Thu', title: 'Networking Event', time: '7:00 PM' },
    { date: '28', day: 'Sun', title: 'Campus Tour', time: '11:00 AM' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">March 2024</h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {day}
                </div>
              ))}
              {Array.from({length: 31}, (_, i) => (
                <div key={i} className="p-2 text-sm hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-lg cursor-pointer">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Events</h3>
            {events.map((event, index) => (
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-500">{event.date}</div>
                  <div className="text-xs text-gray-500">{event.day}</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation activeTab="calendar" />
    </div>
  );
};

export default CalendarPage;
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';
import PageContainer from '../components/common/PageContainer';

const CalendarPage = () => {
  const [currentMonth] = useState('March 2024');

  const events = [
    { date: '15', day: 'Mon', title: 'Tech Career Fair', time: '10:00 AM', color: 'bg-blue-500' },
    { date: '18', day: 'Thu', title: 'Alumni Meetup', time: '6:00 PM', color: 'bg-purple-500' },
    { date: '22', day: 'Mon', title: 'Workshop: Resume', time: '2:00 PM', color: 'bg-green-500' },
    { date: '25', day: 'Thu', title: 'Networking Event', time: '7:00 PM', color: 'bg-cyan-500' },
    { date: '28', day: 'Sun', title: 'Campus Tour', time: '11:00 AM', color: 'bg-orange-500' }
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const eventDates = events.map(e => parseInt(e.date));

  return (
    <PageContainer maxWidth="max-w-5xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Calendar
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Keep track of your events and meetings
        </p>
      </div>

      {/* Calendar Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentMonth}</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {/* Day Headers */}
          {daysOfWeek.map(day => (
            <div key={day} className="p-2 text-center text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {Array.from({ length: 31 }, (_, i) => {
            const dayNum = i + 1;
            const hasEvent = eventDates.includes(dayNum);

            return (
              <div
                key={i}
                className={`
                  relative p-2 md:p-3 text-center text-sm md:text-base rounded-lg cursor-pointer transition-all
                  ${hasEvent
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 font-semibold hover:bg-cyan-100 dark:hover:bg-cyan-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {dayNum}
                {hasEvent && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Upcoming Events
        </h3>
        <div className="space-y-3">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                {/* Date Badge */}
                <div className={`flex-shrink-0 ${event.color} rounded-xl p-3 text-white text-center min-w-[60px]`}>
                  <div className="text-2xl font-bold">{event.date}</div>
                  <div className="text-xs uppercase">{event.day}</div>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {event.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FiClock className="w-4 h-4 mr-1" />
                    {event.time}
                  </div>
                </div>

                {/* Action Button */}
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all whitespace-nowrap">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default CalendarPage;
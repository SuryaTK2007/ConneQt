import React from "react";
import EventCard from "./EventCard";

const EventsSection = () => {
  return (
    <section id="events" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Unified Campus Events Hub
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
          Discover career fairs, guest lectures, cultural festivals, and workshops all in one place. Get personalized recommendations and never miss opportunities that matter to you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard
            date={{ day: "15", month: "DEC" }}
            title="Tech Industry Career Fair"
            category="Career Fair"
          />
          <EventCard
            date={{ day: "22", month: "DEC" }}
            title="Alumni Success Stories"
            category="Guest Lecture"
          />
          <EventCard
            date={{ day: "08", month: "JAN" }}
            title="Professional Networking Mixer"
            category="Networking"
          />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
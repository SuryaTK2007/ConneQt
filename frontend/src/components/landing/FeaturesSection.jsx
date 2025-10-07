import React from "react";
import { FiUsers, FiAward, FiCalendar } from "react-icons/fi";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Professional Networking for Campus
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
          Bridge the gap between academic life and professional success with our comprehensive campus networking platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={<FiUsers />} title="Alumni Connections">
            Connect with graduates in your field, get career insights, and build professional relationships that last beyond graduation.
          </FeatureCard>
          <FeatureCard icon={<FiAward />} title="Skill Endorsements">
            Showcase your abilities and get endorsed by peers, faculty, and alumni to build your professional credibility.
          </FeatureCard>
          <FeatureCard icon={<FiCalendar />} title="Smart Event Discovery">
            Never miss career fairs, workshops, or networking events with personalized recommendations and real-time notifications.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
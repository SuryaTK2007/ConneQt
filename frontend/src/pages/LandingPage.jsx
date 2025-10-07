import React from "react";
import { useTheme } from "../hooks/useTheme";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import MentorshipSection from "../components/landing/MentorshipSection";
import EventsSection from "../components/landing/EventsSection";
import CTASection from "../components/landing/CTASection";

const LandingPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();



  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
      <Header isDarkMode={isDarkMode} handleThemeToggle={toggleTheme} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <MentorshipSection />
        <EventsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

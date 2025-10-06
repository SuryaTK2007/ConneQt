import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiAward,
  FiCalendar,
  FiBarChart2,
  FiArrowRight,
  FiMoon,
  FiSun,
  FiCode,
  FiLink,
  FiZap,
} from "react-icons/fi";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const handleThemeToggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setIsDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const FeatureCard = ({ icon, title, children }) => (
    <div className="group border border-gray-200/50 bg-white/80 dark:border-gray-700/50 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 text-center transform hover:-translate-y-3 transition-all duration-500 ease-out shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400/30">
      <div className="text-cyan-500 text-5xl mb-6 inline-block transform group-hover:scale-110 transition-transform duration-300 ease-out">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>
    </div>
  );

  const EventCard = ({ date, title, category }) => (
    <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 flex items-center space-x-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 ease-out shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transform hover:-translate-y-1 cursor-pointer">
      <div className="text-center border-r border-gray-300 dark:border-gray-600 pr-6 group-hover:border-cyan-400/50 transition-colors duration-300">
        <p className="text-3xl font-bold text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300">{date.day}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">{date.month}</p>
      </div>
      <div className="flex-1">
        <p className="text-xs text-cyan-500 font-semibold tracking-widest uppercase mb-2 group-hover:text-cyan-400 transition-colors duration-300">
          {category}
        </p>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a
              href="#"
              className="text-2xl font-bold text-gray-900 dark:text-white hover:scale-105 transition-transform duration-300 ease-out"
            >
              Conne<span className="text-cyan-500">Q</span>t
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Features
              </a>
              <a
                href="#mentorship"
                className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Mentorship
              </a>
              <a
                href="#events"
                className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Events
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleThemeToggle}
                className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:scale-110"
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              <a
                href="#"
                className="hidden sm:inline-block px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 ease-out transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden px-4">
          <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-white via-white/50 to-transparent dark:from-gray-900 dark:via-gray-900/50 dark:to-transparent"></div>
          <div className="relative z-10 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 pb-2">
              Your Campus Professional Network
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-4 mb-10 max-w-2xl mx-auto">
              Connect with alumni, find mentors, discover events, and build lasting professional relationships within your campus community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full shadow-xl shadow-cyan-500/30 hover:from-cyan-700 hover:to-cyan-800 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 ease-out transform hover:scale-105">
                Get Started <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="px-8 py-4 font-bold text-gray-800 dark:text-white bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-out transform hover:scale-105 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-lg hover:shadow-xl">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
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

        {/* Mentorship Section */}
        <section id="mentorship" className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  AI-Powered Mentorship Matching
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Get matched with the perfect mentor based on your career goals, interests, and skills. Our intelligent system connects you with alumni and faculty who can provide valuable guidance and industry insights.
                </p>
                <button className="group px-8 py-4 font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full shadow-xl shadow-cyan-500/30 hover:from-cyan-700 hover:to-cyan-800 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500 ease-out transform hover:scale-105">
                  Find a Mentor <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
              <div className="relative h-96">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-20 dark:opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiUsers className="text-9xl text-cyan-400 opacity-20" />
                </div>
                <div className="relative flex flex-col space-y-4">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl flex items-center space-x-4 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 ease-out transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
                    <img
                      src="https://i.pravatar.cc/40?u=a"
                      alt="Mentor 1"
                      className="w-12 h-12 rounded-full ring-2 ring-cyan-500/20 hover:ring-cyan-500/40 transition-all duration-300"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-base">
                        Sarah Chen
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Lead Engineer @ Google
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl flex items-center space-x-4 ml-12 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 ease-out transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
                    <img
                      src="https://i.pravatar.cc/40?u=b"
                      alt="Mentor 2"
                      className="w-12 h-12 rounded-full ring-2 ring-cyan-500/20 hover:ring-cyan-500/40 transition-all duration-300"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-base">
                        David Lee
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Product Manager @ OpenAI
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl flex items-center space-x-4 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 ease-out transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
                    <img
                      src="https://i.pravatar.cc/40?u=c"
                      alt="Mentor 3"
                      className="w-12 h-12 rounded-full ring-2 ring-cyan-500/20 hover:ring-cyan-500/40 transition-all duration-300"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-base">
                        Maria Rodriguez
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        UX Designer @ Figma
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
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

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent dark:from-cyan-900/30 dark:to-transparent"></div>
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Start Building Your Professional Network Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Join thousands of students, alumni, and faculty who are already leveraging ConneQt to advance their careers and foster lifelong connections.
            </p>
            <button className="group px-12 py-5 text-lg font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full shadow-2xl shadow-cyan-500/40 hover:from-cyan-700 hover:to-cyan-800 hover:shadow-3xl hover:shadow-cyan-500/50 transition-all duration-500 ease-out transform hover:scale-110">
              Sign Up for Free <FiArrowRight className="inline ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Conne<span className="text-cyan-500">Q</span>t
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Professional networking for campus communities.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-500 hover:text-cyan-500 transition-all duration-300 ease-out transform hover:scale-110 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-cyan-500 transition-all duration-300 ease-out transform hover:scale-110 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-cyan-500 transition-all duration-300 ease-out transform hover:scale-110 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out hover:translate-x-1"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out hover:translate-x-1"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-all duration-300 ease-out hover:translate-x-1"
                  >
                    Demo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
            <p>&copy; 2025 ConneQt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

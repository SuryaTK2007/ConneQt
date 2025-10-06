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
    <div className="border border-gray-200 bg-white dark:border-cyan-500/20 dark:bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-cyan-500/50">
      <div className="text-cyan-400 text-5xl mb-6 inline-block">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-wide">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{children}</p>
    </div>
  );

  const EventCard = ({ date, title, category }) => (
    <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-xl p-6 flex items-center space-x-6 border border-gray-200 dark:border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300">
      <div className="text-center border-r border-gray-700 pr-6">
        <p className="text-3xl font-bold text-cyan-400">{date.day}</p>
        <p className="text-sm text-gray-400">{date.month}</p>
      </div>
      <div>
        <p className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">
          {category}
        </p>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
          {title}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/80 dark:border-gray-800/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a
              href="#"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Conne<span className="text-cyan-500">Q</span>t
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-colors"
              >
                Features
              </a>
              <a
                href="#mentorship"
                className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-colors"
              >
                Mentorship
              </a>
              <a
                href="#events"
                className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-colors"
              >
                Events
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleThemeToggle}
                className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 transition-colors"
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              <a
                href="#"
                className="hidden sm:inline-block px-6 py-2 text-sm font-semibold text-white bg-cyan-600 rounded-full hover:bg-cyan-700 transition-colors"
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
              The Future of Campus Networking
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-4 mb-10 max-w-2xl mx-auto">
              ConneQt is a decentralized platform connecting students, alumni,
              and faculty through shared interests and projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 font-bold text-white bg-cyan-600 rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-700 transition-all transform hover:scale-105">
                Get Started <FiArrowRight className="inline ml-2" />
              </button>
              <button className="px-8 py-3 font-bold text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Unlock Your Potential
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
              Discover the tools and connections you need to succeed in your
              academic and professional life.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard icon={<FiLink />} title="Decentralized Identity">
                Own your data and control your digital identity with our
                blockchain-powered profiles.
              </FeatureCard>
              <FeatureCard icon={<FiCode />} title="Project Collaboration">
                Find and contribute to innovative projects posted by peers and
                faculty.
              </FeatureCard>
              <FeatureCard icon={<FiZap />} title="Skill-Based Matching">
                Connect with mentors and collaborators based on skills and
                interests, not just majors.
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
                  Guidance from Industry Leaders
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Our mentorship program connects you with experienced alumni
                  and faculty who are dedicated to helping you navigate your
                  career path.
                </p>
                <button className="px-8 py-3 font-bold text-white bg-cyan-600 rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-700 transition-all transform hover:scale-105">
                  Find a Mentor
                </button>
              </div>
              <div className="relative h-96">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-20 dark:opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiUsers className="text-9xl text-cyan-400 opacity-20" />
                </div>
                <div className="relative flex flex-col space-y-4">
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-lg shadow-lg flex items-center space-x-3">
                    <img
                      src="https://i.pravatar.cc/40?u=a"
                      alt="Mentor 1"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        Sarah Chen
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Lead Engineer @ Google
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-lg shadow-lg flex items-center space-x-3 ml-12">
                    <img
                      src="https://i.pravatar.cc/40?u=b"
                      alt="Mentor 2"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        David Lee
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Product Manager @ OpenAI
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-lg shadow-lg flex items-center space-x-3">
                    <img
                      src="https://i.pravatar.cc/40?u=c"
                      alt="Mentor 3"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
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
              Campus Hotspots
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
              Stay in the loop with workshops, hackathons, and networking events
              happening on campus.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <EventCard
                date={{ day: "28", month: "OCT" }}
                title="Intro to Quantum Computing"
                category="Workshop"
              />
              <EventCard
                date={{ day: "05", month: "NOV" }}
                title="Web3 & Decentralization Summit"
                category="Conference"
              />
              <EventCard
                date={{ day: "12", month: "NOV" }}
                title="Founder & Investor Mixer"
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
              Ready to Build the Future?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Join ConneQt today and become part of a thriving community of
              innovators and leaders.
            </p>
            <button className="px-10 py-4 text-lg font-bold text-white bg-cyan-600 rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-700 transition-all transform hover:scale-105">
              Sign Up for Free
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
                The future of campus networking.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-500 hover:text-cyan-500">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-cyan-500">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-cyan-500">
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
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-500"
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

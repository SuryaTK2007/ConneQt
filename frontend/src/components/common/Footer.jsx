import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
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
  );
};

export default Footer;
import React, { useState } from 'react';
import Sidebar from '../compnents/Sidebar';
import Card from '../compnents/Card';
import Welcome from '../compnents/Welcome';
import UserHeader from '../compnents/UserHeader';

export default function Dashboard() {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* User Header */}
      <UserHeader />

      <div className="flex flex-col lg:flex-row pt-8 mt-10">
        {/* Sidebar - Mobile and Desktop */}
        <div>
          {/* Hamburger Button for Mobile */}
          <div className="p-4 lg:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-t from-purple-600 to-indigo-500 text-white shadow-lg transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </div>

          {/* Overlay for Mobile Sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/50 lg:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Welcome Section */}
          <div className="mt-20 px-4 md:px-6">
            <Welcome />
          </div>

          {/* Cards Section */}
          <div className="flex-1 p-4 md:p-6 mt-4">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

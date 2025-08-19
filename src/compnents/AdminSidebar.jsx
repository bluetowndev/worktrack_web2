import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminSidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { logout } = useAuth();

  // Function to handle redirect to the AdminDashboard
  const handleNavigateToDashboard = () => {
    navigate("/admindashboard"); // Navigate to the Admin Dashboard route
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-[#6C6EF5] text-white font-bold flex flex-col transition-all duration-300 h-full mt-14 sm:mt-0">
      <div className="flex flex-col justify-between h-full">
        {/* Menu Items */}
        <ul className="mt-4 space-y-4 px-4">
          <li 
            onClick={handleNavigateToDashboard} 
            className="hover:text-blue-900 cursor-pointer"
          >
            Dashboard
          </li>
          <li className="hover:text-blue-900 cursor-pointer">Notice</li>
          <li className="hover:text-blue-900 cursor-pointer">Attendance</li>
          <li className="hover:text-blue-900 cursor-pointer">Holiday</li>
          <li className="hover:text-blue-900 cursor-pointer">Employee Detail</li>
          <li className="hover:text-blue-900 cursor-pointer">Settings</li>
        </ul>

        {/* Logout Section */}
        <div className="p-4 border-t border-blue-700 mt-60">
          <button 
            onClick={handleLogout}
            className="w-full text-left hover:text-blue-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

          {/* Leaves Application Received with Icon and Badge */}
          {/* <li className="hover:text-blue-900 cursor-pointer flex items-center justify-between">
            <span>Leaves Application Received</span>
            <div className="relative flex items-center">
              {/* Heroicon */}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                />
              </svg>
              {/* Notification Badge */}
              {/* <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                3
              </span>
              {/* <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-rd-600 text-white text-xs flex items-center justify-center"<span></span> */}
            {/* </div>
          </li>
        //   <li className="hover:text-blue-900 cursor-pointer">Claims Status</li> */} 
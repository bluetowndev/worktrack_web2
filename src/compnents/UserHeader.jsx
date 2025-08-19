import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";

const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-2 bg-gradient-to-b from-white to-[#d2ddfc] z-50">
      {/* Logo */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="no-underline" onClick={closeMenu}>
          <div className="text-black text-3xl md:text-5xl font-bold">
            Work<span className="text-[#6C6EF5]">Track</span>
          </div>
          <span className="text-black text-sm md:text-base ml-4">
            Simplifying field work
          </span>
        </Link>
        {/* Hamburger Menu for Mobile */}
        <button
          className="text-gray-600 md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen
            ? "block absolute top-14 left-0 w-full bg-white shadow-md z-10"
            : "hidden"
        } md:static md:block md:w-auto md:bg-transparent md:shadow-none md:flex md:space-x-12`}
      >
        <a
          href="/#home"
          className="block md:inline-block text-gray-600 hover:text-blue-500 text-lg no-underline px-4 py-2 font-bold"
          onClick={closeMenu}
        >
          Home
        </a>
        <a
          href="/#about"
          className="block md:inline-block text-gray-600 hover:text-blue-500 text-lg no-underline px-4 py-2 font-bold"
          onClick={closeMenu}
        >
          About Us
        </a>
        <a
          href="/#contact"
          className="block md:inline-block text-gray-600 hover:text-blue-500 text-lg no-underline px-4 py-2 font-bold"
          onClick={closeMenu}
        >
          Contact Us
        </a>
      </div>

      {/* User Info and Actions */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Camera Icon */}
        <Link to="/camera">
          <CameraIcon className="w-8 h-8 text-gray-600 hover:text-blue-500" />
        </Link>
        
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 text-sm">
            Welcome, {user?.fullName || user?.email || 'User'}
          </span>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="block md:hidden w-full text-center mt-2 px-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-600 mb-2">
              Welcome, {user?.fullName || user?.email || 'User'}
            </div>
            <Link to="/camera" onClick={closeMenu}>
              <button className="w-full bg-blue-500 text-white text-lg px-4 py-2 rounded-lg hover:bg-blue-600 mb-2">
                Camera
              </button>
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full bg-red-500 text-white text-lg px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserHeader;
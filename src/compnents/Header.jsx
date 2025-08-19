import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  const handleLoginClick = () => {
    closeMenu();
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 bg-gradient-to-b from-white to-[#d2ddfc] shadow-sm z-50">
      {/* Logo and Tagline */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="no-underline" onClick={closeMenu}>
          <div className="flex flex-col">
            <div className="text-black text-3xl md:text-5xl font-bold leading-tight">
              Work<span className="text-[#6C6EF5]">Track</span>
            </div>
            <span className="text-black text-sm md:text-base mt-1">
              Simplifying field work
            </span>
          </div>
        </Link>

        {/* Hamburger Button */}
        <button
          className="text-gray-600 md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-7 h-7"
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
            ? "block absolute top-[80px] left-0 w-full bg-white shadow-md z-10"
            : "hidden"
        } md:static md:block md:w-auto md:bg-transparent md:shadow-none md:flex md:space-x-12`}
      >
        <a
          href="/#home"
          className="block md:inline-block text-gray-700 hover:text-blue-600 text-lg no-underline px-4 py-2 font-semibold"
          onClick={closeMenu}
        >
          Home
        </a>
        <a
          href="/#about"
          className="block md:inline-block text-gray-700 hover:text-blue-600 text-lg no-underline px-4 py-2 font-semibold"
          onClick={closeMenu}
        >
          About Us
        </a>
        <a
          href="/#contact"
          className="block md:inline-block text-gray-700 hover:text-blue-600 text-lg no-underline px-4 py-2 font-semibold"
          onClick={closeMenu}
        >
          Contact Us
        </a>

        {/* Mobile Auth Button */}
        {isMenuOpen && (
          <div className="block md:hidden w-full text-center mt-2 px-4">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="text-sm text-gray-600 mb-2">
                  Welcome, {user?.fullName || user?.email || 'User'}
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white text-lg px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={handleLoginClick}>
                <button className="w-full bg-blue-500 text-white text-lg px-4 py-2 rounded-lg hover:bg-blue-600">
                  Login/SignUp
                </button>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Desktop Auth Button */}
      <div className="hidden md:block">
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-sm">
              Welcome, {user?.fullName || user?.email || 'User'}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white text-lg px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-blue-500 text-white text-lg px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
              Login/SignUp
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;

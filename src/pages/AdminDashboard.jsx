import React, { useState } from "react";
import Header from "../compnents/Header";
import AdminSidebar from "../compnents/AdminSidebar";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const users = [
    { name: "Karan Sharma", email: "karan@example.com", phone: "234-567-1234", location: "Uttar Pradesh", company: "Google", status: "Onsite" },
    { name: "Anil Kumar", email: "anil@example.com", phone: "340-456-4287", location: "Jharkhand", company: "WebFlow", status: "Offline" },
    { name: "Ram Singh", email: "ram@example.com", phone: "318-658-8899", location: "Delhi", company: "Facebook", status: "Onsite" },
    { name: "Shyam Verma", email: "shyam@example.com", phone: "567-987-3699", location: "Madhya Pradesh", company: "Twitter", status: "Onsite" },
    { name: "Sunny Chawla", email: "sunny@example.com", phone: "178-345-0988", location: "Bihar", company: "YouTube", status: "Offline" },
    { name: "Anjali Rani", email: "anjali@example.com", phone: "312-478-8910", location: "Punjab", company: "Spotify", status: "Onsite" },
    { name: "Shikha Jain", email: "shikha@example.com", phone: "401-234-8988", location: "West Bengal", company: "Pinterest", status: "Offline" },
  ];

  return (
    <div>
      <Header />

      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-blue-50 to-green-50 text-gray-900 mt-20">
        {/* Hamburger Button */}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-t from-purple-600 to-indigo-500 text-white shadow-lg transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminSidebar />
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Top Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-300 to-green-500 text-white p-4 sm:p-6 rounded-lg shadow-md">
              <p>On Duty</p>
              <h3 className="text-3xl font-bold">256</h3>
            </div>
            <div className="bg-gradient-to-br from-red-300 to-red-500 text-white p-4 sm:p-6 rounded-lg shadow-md">
              <p>On Leave</p>
              <h3 className="text-3xl font-bold">15</h3>
            </div>
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 text-white p-4 sm:p-6 rounded-lg shadow-md">
              <p>Attendance Not Marked</p>
              <h3 className="text-3xl font-bold">271</h3>
            </div>
            <div className="bg-gradient-to-br from-blue-300 to-blue-500 text-white p-4 sm:p-6 rounded-lg shadow-md">
              <p>Total Employees</p>
              <h3 className="text-3xl font-bold">55</h3>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-900 ">
              Today's Employees Overview
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="text-left text-gray-700 bg-gradient-to-r from-blue-200 to-purple-200">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Circle</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">{user.location}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            user.status === "Onsite"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

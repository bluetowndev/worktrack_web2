import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../compnents/Header";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${API_BASE_URL}/user/forgot-password`, {
        email,
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        setEmail("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <section className="min-h-screen w-full flex flex-col-reverse lg:flex-row items-center justify-center bg-gradient-to-b from-white to-[#d2ddfc] pt-16">
        {/* Form Section */}
        <div className="w-full lg:w-6/12 flex flex-col items-center justify-center py-8 px-4 lg:py-24 lg:px-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center lg:text-left">
            Forgot Password
          </h1>
          <p className="text-gray-600 mb-6 text-lg lg:text-xl text-center lg:text-left">
            Enter your email address and we'll send you a link to reset your password
          </p>
          
          {error && (
            <div className="w-full max-w-md mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="w-full max-w-md mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mb-4"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/Login"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Back to Login
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-6/12 flex items-center justify-center">
          <div className="w-full max-w-lg p-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Check Your Email
              </h3>
              <p className="text-gray-600">
                We'll send you a secure link to reset your password. The link will expire in 1 hour.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;

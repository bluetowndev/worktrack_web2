import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../compnents/Header";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/user/reset-password`, {
        token,
        newPassword: formData.newPassword,
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div>
        <Header />
        <section className="min-h-screen w-full flex flex-col-reverse lg:flex-row items-center justify-center bg-gradient-to-b from-white to-[#d2ddfc] pt-16">
          <div className="w-full lg:w-6/12 flex flex-col items-center justify-center py-8 px-4 lg:py-24 lg:px-12">
            <div className="w-full max-w-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Reset Link</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link
                to="/forgot-password"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Request New Reset Link
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <section className="min-h-screen w-full flex flex-col-reverse lg:flex-row items-center justify-center bg-gradient-to-b from-white to-[#d2ddfc] pt-16">
        {/* Form Section */}
        <div className="w-full lg:w-6/12 flex flex-col items-center justify-center py-8 px-4 lg:py-24 lg:px-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center lg:text-left">
            Reset Password
          </h1>
          <p className="text-gray-600 mb-6 text-lg lg:text-xl text-center lg:text-left">
            Enter your new password below
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
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                required
                minLength={8}
              />
              <p className="text-sm text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mb-4"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Secure Password Reset
              </h3>
              <p className="text-gray-600">
                Choose a strong password that you'll remember. Your new password will be encrypted and secure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;

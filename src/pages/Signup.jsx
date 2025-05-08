import React, { useState, useCallback } from "react";
import loginImg from "../assets/login image.jpg";
import signupImg from "../assets/signup.jpg";
import Header from "../compnents/Header";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast"; // Install: npm install react-hot-toast

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Signup = () => {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    role: "user",
    fullName: "",
    email: "",
    phoneNumber: "",
    organization: "",
    state: "",
    baseLocation: "",
    reportingManager: "",
    designation: "",
    companyName: "",
    companyPhone: "",
    companyAddress: "",
    country: "",
    city: "",
    zipCode: "",
    industry: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRoleChange = useCallback((e) => {
    const newRole = e.target.value;
    setRole(newRole);
    setFormData((prev) => ({ ...prev, role: newRole }));
  }, []);

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setLoading(true);

      try {
        const signupData = {
          role: formData.role,
          password: formData.password,
          ...(role === "user"
            ? {
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                organization: formData.organization,
                state: formData.state,
                baseLocation: formData.baseLocation,
                reportingManager: formData.reportingManager,
              }
            : {
                email: formData.email,
                designation: formData.designation,
                companyName: formData.companyName,
                companyPhone: formData.companyPhone,
                companyAddress: formData.companyAddress,
                country: formData.country,
                state: formData.state,
                city: formData.city,
                zipCode: formData.zipCode,
                industry: formData.industry,
              }),
        };

        const response = await axios.post(
          `${API_BASE_URL}/user/signup`,
          signupData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        toast.success(response.data.message || "Signup successful!");
        setFormData({
          role: "user",
          fullName: "",
          email: "",
          phoneNumber: "",
          organization: "",
          state: "",
          baseLocation: "",
          reportingManager: "",
          designation: "",
          companyName: "",
          companyPhone: "",
          companyAddress: "",
          country: "",
          city: "",
          zipCode: "",
          industry: "",
          password: "",
          confirmPassword: "",
        });
        setRole("user");
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Signup failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [formData, role]
  );

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200";

  const labelClass = "block text-gray-700 font-medium mb-2";

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <section
        id="signup"
        className="container mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-center gap-12"
      >
        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center">
            Create Account
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Join us by filling in your details
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="role" className={labelClass}>
                Role
              </label>
              <select
                id="role"
                className={inputClass}
                value={role}
                onChange={handleRoleChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {role === "user" ? (
              <>
                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className={inputClass}
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={inputClass}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className={inputClass}
                    placeholder="+1234567890"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="organization" className={labelClass}>
                    Organization
                  </label>
                  <select
                    id="organization"
                    className={inputClass}
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Organization</option>
                    <option value="org1">Organization 1</option>
                    <option value="org2">Organization 2</option>
                    <option value="org3">Organization 3</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    className={inputClass}
                    placeholder="California"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="baseLocation" className={labelClass}>
                    Base Location
                  </label>
                  <input
                    id="baseLocation"
                    type="text"
                    className={inputClass}
                    placeholder="San Francisco"
                    value={formData.baseLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="reportingManager" className={labelClass}>
                    Reporting Manager
                  </label>
                  <input
                    id="reportingManager"
                    type="text"
                    className={inputClass}
                    placeholder="Jane Smith"
                    value={formData.reportingManager}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={inputClass}
                    placeholder="admin@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="designation" className={labelClass}>
                    Designation
                  </label>
                  <input
                    id="designation"
                    type="text"
                    className={inputClass}
                    placeholder="Senior Manager"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="companyName" className={labelClass}>
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    className={inputClass}
                    placeholder="Tech Corp"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="companyPhone" className={labelClass}>
                    Company Phone
                  </label>
                  <input
                    id="companyPhone"
                    type="tel"
                    className={inputClass}
                    placeholder="+1234567890"
                    value={formData.companyPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="companyAddress" className={labelClass}>
                    Company Address
                  </label>
                  <input
                    id="companyAddress"
                    type="text"
                    className={inputClass}
                    placeholder="123 Business St"
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="country" className={labelClass}>
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    className={inputClass}
                    placeholder="United States"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    className={inputClass}
                    placeholder="California"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    className={inputClass}
                    placeholder="San Francisco"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className={labelClass}>
                    Zip Code
                  </label>
                  <input
                    id="zipCode"
                    type="text"
                    className={inputClass}
                    placeholder="94105"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="industry" className={labelClass}>
                    Industry
                  </label>
                  <input
                    id="industry"
                    type="text"
                    className={inputClass}
                    placeholder="Technology"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                id="password"
                type="password"
                className={inputClass}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={inputClass}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-8">
          <img
            className="w-full max-w-md rounded-lg shadow-lg object-cover"
            src={loginImg}
            alt="Login illustration"
          />
          <img
            className="w-full max-w-md rounded-lg shadow-lg object-cover"
            src={signupImg}
            alt="Signup illustration"
          />
        </div>
      </section>
    </div>
  );
};

export default Signup;
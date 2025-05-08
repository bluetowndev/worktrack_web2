import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../compnents/Header";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      console.log("Verifying token:", token);
      if (!token) {
        setVerificationStatus("error");
        setMessage("Invalid or missing verification token");
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/verifyEmail?token=${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("API response:", data);

        if (response.ok) {
          setVerificationStatus("success");
          setMessage(data.message || "Email successfully verified! Redirecting to dashboard...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          throw new Error(data.message || "Verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
        setMessage(
          error.message || "Verification failed. The link may be invalid or expired."
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#d2ddfc]">
      <Header />
      <section className="flex items-center justify-center min-h-screen pt-16 pb-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#6C6EF5] mb-6">
            Email Verification
          </h1>
          <div className="mb-6">
            {verificationStatus === "verifying" && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C6EF5]"></div>
              </div>
            )}
            <p
              className={`text-lg mt-4 ${
                verificationStatus === "error" ? "text-red-500" : "text-gray-600"
              }`}
            >
              {message}
            </p>
          </div>
          {verificationStatus === "error" && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Please try registering again or contact support if the problem persists.
              </p>
              <Link
                to="/register"
                className="inline-block px-6 py-2 bg-[#6C6EF5] text-white rounded-full font-medium text-sm transition-all hover:bg-[#4A4DE4]"
              >
                Try Again
              </Link>
            </div>
          )}
          <div className="mt-6">
            <Link
              to="/"
              className="text-[#6C6EF5] text-sm hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailVerification;
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import ResetPic from "../assets/reset.jpg";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 2000,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message);
      toast.success("Password reset successfully", {
        position: "top-right",
        autoClose: 2000,
        onClose: () => {
          navigate("/login");
        },
      });
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error.response?.data?.message || "Error resetting password", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#FFF8E7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${ResetPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/80 backdrop-blur-sm py-8 px-6 shadow-lg rounded-lg border border-white/20">
          <div className="flex justify-center">
            <div className="bg-[#800020] p-3 rounded-full">
              <svg
                className="w-12 h-12 text-[#FFF8E7]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#800020]">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-700">
            Enter your new password below.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                {message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#FFF8E7] bg-[#800020] hover:bg-[#600018] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#800020] transition disabled:opacity-50"
              >
                {loading ? (
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="font-medium text-[#800020] hover:text-[#600018]"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

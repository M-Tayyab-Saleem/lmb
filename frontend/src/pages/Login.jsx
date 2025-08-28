import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginPic from "../assets/Login.jpg"

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL ='http://localhost:8080';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/login`, formData, {
        withCredentials: true,
      });

      console.log("Login response:", response.data.user.role);
      
      // Store user role if available
      if (response.data.user.role) {
        localStorage.setItem('userRole', response.data.user.role);
      }
      
      toast.success(response.data.message, {
        position: "top-right",
        onClose: () => {
          navigate("/");
        },
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        (error.message === "Network Error"
          ? "Server connection failed"
          : "Login failed");

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#FFF8E7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
  backgroundImage: `url(${LoginPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/80 backdrop-blur-sm py-8 px-6 shadow-lg rounded-lg border border-white/20">
          <div className="flex justify-center">
            <div className="bg-[#800020] p-3 rounded-full">
              <svg className="w-12 h-12 text-[#FFF8E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#800020]">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-700">
            Or{" "}
            <Link to="/signup" className="font-medium text-[#800020] hover:text-[#600018]">
              create a new account
            </Link>
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition"
                  placeholder="Enter your username"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-[#800020] hover:text-[#600018]">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#FFF8E7] bg-[#800020] hover:bg-[#600018] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#800020] transition disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
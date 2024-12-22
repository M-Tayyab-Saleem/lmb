import React, { useState } from 'react';
import axios from 'axios';
import {  toast } from "react-toastify";

import { useNavigate } from 'react-router-dom'


const SignupForm = () => {
    const [formData, setFormData] = useState({ email: '',username:'', password: '' });
    const navigate = useNavigate()
    const API_URL = "https://bookify-cfly.onrender.com" || 'http://localhost:8080';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/signup`, formData, {
                withCredentials: true, 
            });
            console.log(response.data.message);
            toast.success("You Sign Up Successfully!", {
                  position: "top-right",
                  onClose: () => {
                navigate('/');
                },
                autoClose: 1000,
            });
        } catch (error) {
            console.log(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
           
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border  "
                  
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border"
                  
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border"
                
                 onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border bg-black text-white"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default SignupForm;

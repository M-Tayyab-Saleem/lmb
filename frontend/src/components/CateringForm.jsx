import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SuccessPopup from './SuccessPopup';


const CateringForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    eventType: '',
    dateOfEvent: '',
    numberOfGuests: '',
    menuPreferences: '',
    cateringType: []
  });

  const [loading, setLoading] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);  

  const cateringOptions = [
    'Buffet',
    'Plated Service',
    'Family Style',
    'Appetizers',
    'Food Stations',
    'Drinks & Bar'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          cateringType: [...prev.cateringType, value]
        };
      } else {
        return {
          ...prev,
          cateringType: prev.cateringType.filter(item => item !== value)
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/catering', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setShowSuccessPopup(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("This time slot is already booked. Please choose a different date.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

    const handleSuccessClose = () => {
    setShowSuccessPopup(false); 
    onClose();
  };

  return (
    <>
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#800020]">In-House Catering Booking</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Event</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
            >
              <option value="">Select Event Type</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Event</label>
            <input
              type="date"
              name="dateOfEvent"
              value={formData.dateOfEvent}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Menu Preferences</label>
          <textarea
            name="menuPreferences"
            value={formData.menuPreferences}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
            placeholder="Please describe any dietary restrictions, cuisine preferences, etc."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Catering Type (Select all that apply)</label>
          <div className="grid grid-cols-2 gap-2">
            {cateringOptions.map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.cateringType.includes(option)}
                  onChange={handleCheckboxChange}
                  className="mr-2 text-[#800020] focus:ring-[#800020]"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#800020] text-white rounded-md hover:bg-[#600018] disabled:opacity-50"
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </div>
      </form>
    </div>
          <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={handleSuccessClose}
        message="Your slot has been partially booked kindly visit the onsite office within two days to confirm the booking, otherwise after two days your partial booking will be revoked. Thank you."
      />      </>
  );
};

export default CateringForm;
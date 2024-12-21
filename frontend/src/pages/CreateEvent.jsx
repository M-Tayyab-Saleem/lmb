import React, { useState } from 'react';
import {  toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    capacity: '',
    bookedSeats: '',
    imageURL: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

     // Check for empty fields
     const emptyFields = Object.keys(eventData).filter(
      (key) => !eventData[key].trim()
  );

  if (emptyFields.length > 0) {
      toast.error(`Please fill the ${emptyFields.join(", ")} field(s)`, {
          position: "top-right",
          autoClose: 3000,
      });
      return;
  }

  try {
      const response = await axios.post('/api/events', eventData);
      console.log('Response from server:', response.data);
      toast.success("Event Created successfully!", {
        position: "top-right",
        onClose: () => {
          navigate('/events');
          },
        autoClose: 1500,
    });
    console.log("Form data:", eventData);
  } catch (error) {
    console.error('Error submitting event:', error.response?.data?.message || error.message);
    toast.error( error.response?.data?.message || error.message, {
      position: "top-right",
      autoClose: 3000,
  });
  }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Create New Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
           
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={eventData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                
              />
            </div>

           
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="4"
                value={eventData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                
              />
            </div>

            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={eventData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                
              />
            </div>

            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date and Time
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={eventData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                
              />
            </div>

            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                  Total Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  min="1"
                  value={eventData.capacity}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                  
                />
              </div>

              <div>
                <label htmlFor="bookedSeats" className="block text-sm font-medium text-gray-700">
                  Booked Seats
                </label>
                <input
                  type="number"
                  name="bookedSeats"
                  id="bookedSeats"
                  min="0"
                  value={eventData.bookedSeats}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                  
                />
              </div>
            </div>

          
            <div>
              <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">
                Event Image URL
              </label>
              <input
                type="url"
                name="imageURL"
                id="imageURL"
                value={eventData.imageURL}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                
              />
            </div>


           
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black "
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;

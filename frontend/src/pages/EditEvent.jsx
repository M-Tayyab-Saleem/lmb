import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditEvent = ({ event,fetchEvents, onClose }) => {
  const API_URL = "https://bookify-cfly.onrender.com" || 'http://localhost:8080';

  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    date: event.date,
    capacity: event.capacity,
    bookedSeats: event.bookedSeats,
    imageURL: event.imageURL,
    usersBooked: event.usersBooked,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/api/events/${event._id}`, formData);
      onClose();
      fetchEvents()
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong!");
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Update Your Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Event Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date and Time
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="bookedSeats"
                  className="block text-sm font-medium text-gray-700"
                >
                  Booked Seats
                </label>
                <input
                  type="number"
                  name="bookedSeats"
                  id="bookedSeats"
                  min="0"
                  value={formData.bookedSeats}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="imageURL"
                className="block text-sm font-medium text-gray-700"
              >
                Event Image URL
              </label>
              <input
                type="url"
                name="imageURL"
                id="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black "
              >
                Update Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;

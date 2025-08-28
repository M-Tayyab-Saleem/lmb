import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import deleteIcon from "../assets/delete.svg";

const BookedEvents = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const API_URL = 'http://localhost:8080';
  
  //Fetch bookedEvents
  const fetchBookedEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/events/booked`);
      setBookedEvents(response.data);
    } catch (error) {
      console.error("Error fetching booked events:", error);
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  //get user id
  const fetchUserId = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/getUser`, { withCredentials: true });
        setUserId(response.data.user._id);
    } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.message || error.message);
    }
};

  useEffect(() => {
    fetchUserId();
    fetchBookedEvents();
  }, []);


  //Delete Events
  const handleDelete = async (eventId) => {
    try {
        const response = await axios.delete(`https://bookify2.onrender.com/api/events/${eventId}/cancel`, {
          data: { user: userId }, 
          withCredentials: true, 
      }); 
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
        });
        fetchBookedEvents();
    } catch (error) {
      console.error(
        "Error deleting event:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  
  return (
    <div>
      {bookedEvents.length === 0 ? (
        <h2 className="text-3xl font-bold text-center text-gray-800 mt-10">
          You have not booked any events yet.
        </h2>
      ) : (
        <div className="flex flex-col items-center gap-10 px-[5%] mt-5 ">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Your Booked Events
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookedEvents.map((event) => (
              <li key={event._id} className="flex justify-center relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.imageURL}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="py-5 px-2 ">
                    <h4 className="font-bold text-[1.2rem]">{event.title}</h4>
                    <div className="py-5 flex justify-between">
                      <span className="pr-8">
                        <i className="fa-solid fa-calendar-days mr-2"></i>
                        {new Date(event.date).toLocaleDateString("ur-PK")}
                      </span>
                      <span>
                        <i className="fa-solid fa-location-dot mr-2"></i>
                        {event.location}
                      </span>
                    </div>
                    <p>{event.description}</p>
                  </div>
               <div className="absolute right-2 top-2 flex flex-col gap-4 bg-white rounded-xl p-3 shadow-sm transition-all text-black">
               <span
              onClick={() => handleDelete(event._id)}
              className="cursor-pointer"
              >
               <img src={deleteIcon} alt="" width={20} height={20} />
              </span>
          </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookedEvents;

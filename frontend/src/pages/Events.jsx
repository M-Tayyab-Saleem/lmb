import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import EditEvent from "./EditEvent";

function Events() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  //fetch Event
  const fetchEvents = async () => {
  await axios
    .get("https://bookify-cfly.onrender.com/api/events")
    .then((response) => {
      setEvents(response.data);
    })
    .catch((error) => {
      console.log(error);
    })};

    //fetchUser
    const fetchUserId = async () => {
      try {
          const response = await axios.get('/api/getUser', { withCredentials: true });
          setUserId(response.data.user._id);
      } catch (error) {
          console.error('Error fetching user data:', error.response?.data?.message || error.message);
      }
  };

  useEffect(() => {
      fetchEvents()
      fetchUserId();
  }, []);

  //BookSeats Logic
  const bookSeat = async (eventId) => {
    try {
      const response = await axios.post(`/api/events/${eventId}/book`);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
      const updatedEvents = events.map((event) =>
        event._id === eventId
          ? { ...event, bookedSeats: event.bookedSeats + 1 }
          : event
      );
      setEvents(updatedEvents);
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong!");
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  //Delete Events
  const handleDelete = async (eventId) => {
    try {
      if (window.confirm("Are you sure you want to delete this event?")) {
        const response = await axios.delete(`/api/events/${eventId}`);
        console.log("Response from server:", response.data);
        toast.success("Event Deleted successfully!", {
          position: "top-right",
          autoClose: 1500,
        });
        const updateEvents = events.filter((event) => event._id != eventId);
        setEvents(updateEvents);
      }
    } catch (error) {
      console.error(
        "Error submitting event:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  //Edit Event
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEditClick = (event) => {
    setEditingEvent(event);
  };

  const handleCloseEdit = () => {
    setEditingEvent(null);
  };

  return (
    <div>
      {editingEvent ? (
        <EditEvent event={editingEvent} fetchEvents={fetchEvents} onClose={handleCloseEdit} />
      ) : (
        <div className="flex flex-col items-center gap-10 px-[5%] mt-5">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Our Upcoming Events
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <li key={event._id} className="flex justify-center">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
                    <div className="mt-5 mb-3 flex justify-between items-center">
                      <span className="bg-black text-white py-2 rounded-full px-4">
                        Only {eval(event.capacity - event.bookedSeats)} Seats
                        Left
                      </span>
                      { event.createdBy !== userId && (<button
                        className="bg-transparent border-2 border-black rounded-full py-2 px-4 hover:bg-black hover:text-white"
                        onClick={() => bookSeat(event._id)}
                      >
                        {event.bookedSeats >= event.capacity
                          ? "Fully Booked"
                          : "Book Seat"}
                      </button>)}
                    </div>
                  </div>
                  { event.createdBy === userId && (
                  <div className="absolute right-2 top-2 flex flex-col gap-4 bg-white rounded-xl p-3 shadow-sm transition-all text-black">
                    <span
                      onClick={() => handleDelete(event._id)}
                      className="cursor-pointer"
                    >
                      <img src={deleteIcon} alt="" width={20} height={20} />
                    </span>
                    <span
                      onClick={() => handleEditClick(event)}
                      className="cursor-pointer"
                    >
                      <img src={editIcon} alt="" width={20} height={20} />
                    </span>
                  </div>)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Events;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState({
    events: [],
    catering: [],
    decorations: [],
    onlineBookings: []
  });
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:8080';

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/user/bookings`, { 
        withCredentials: true 
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Cancel booking function
  const handleCancelBooking = async (bookingId, type) => {
    try {
      let endpoint = '';
      
      switch(type) {
        case 'event':
          endpoint = `${API_URL}/api/events/${bookingId}/cancel`;
          break;
        case 'catering':
          endpoint = `${API_URL}/api/catering/${bookingId}`;
          break;
        case 'decoration':
          endpoint = `${API_URL}/api/decoration/${bookingId}`;
          break;
        case 'onlineBooking':
          endpoint = `${API_URL}/api/online-booking/${bookingId}`;
          break;
        default:
          return;
      }

      await axios.delete(endpoint, { withCredentials: true });
      toast.success("Booking cancelled successfully", {
        position: "top-right",
        autoClose: 1500,
      });
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error(error.response?.data?.message || "Failed to cancel booking", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Filter bookings based on active tab
  const filteredBookings = () => {
    switch(activeTab) {
      case "events":
        return { events: bookings.events };
      case "catering":
        return { catering: bookings.catering };
      case "decorations":
        return { decorations: bookings.decorations };
      case "online":
        return { onlineBookings: bookings.onlineBookings };
      default:
        return bookings;
    }
  };

  const allBookings = filteredBookings();
  const hasBookings = Object.values(allBookings).some(array => array.length > 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#800020] mb-4">My Bookings</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Manage all your event bookings and services in one place
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeTab === "all" 
                  ? "bg-[#800020] text-[#FFF8E7]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab("catering")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeTab === "catering" 
                  ? "bg-[#800020] text-[#FFF8E7]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Catering ({bookings.catering.length})
            </button>
            <button
              onClick={() => setActiveTab("decorations")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeTab === "decorations" 
                  ? "bg-[#800020] text-[#FFF8E7]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Decorations ({bookings.decorations.length})
            </button>
            <button
              onClick={() => setActiveTab("online")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeTab === "online" 
                  ? "bg-[#800020] text-[#FFF8E7]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Venue Bookings ({bookings.onlineBookings.length})
            </button>
          </div>
        </div>

        {/* Bookings Content */}
        {!hasBookings ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="bg-[#800020] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#FFF8E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#800020] mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start planning your event today!</p>
            <a 
              href="/services" 
              className="bg-[#800020] text-[#FFF8E7] px-6 py-2 rounded-lg font-semibold hover:bg-[#600018] transition"
            >
              Explore Services
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Event Bookings */}
            {allBookings.events && allBookings.events.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#800020] mb-4">Event Bookings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allBookings.events.map((event) => (
                    <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={event.imageURL}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#800020] mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            {event.location}
                          </div>
                        </div>
                        <button
                          onClick={() => handleCancelBooking(event._id, 'event')}
                          className="w-full mt-4 bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Catering Bookings */}
            {allBookings.catering && allBookings.catering.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#800020] mb-4">Catering Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allBookings.catering.map((catering) => (
                    <div key={catering._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                      <h3 className="text-xl font-bold text-[#800020] mb-2">{catering.eventType} Catering</h3>
                      <div className="space-y-2 text-sm text-gray-700 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          {new Date(catering.dateOfEvent).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          {catering.numberOfGuests} guests
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                          </svg>
                          {catering.cateringType.join(', ')}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(catering._id, 'catering')}
                        className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
                      >
                        Cancel Service
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Decoration Bookings */}
            {allBookings.decorations && allBookings.decorations.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#800020] mb-4">Decoration Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allBookings.decorations.map((decoration) => (
                    <div key={decoration._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                      <h3 className="text-xl font-bold text-[#800020] mb-2">{decoration.eventType} Decoration</h3>
                      <div className="space-y-2 text-sm text-gray-700 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          {new Date(decoration.dateOfEvent).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          {decoration.numberOfGuests} guests
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                          </svg>
                          {decoration.decorationType.join(', ')}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(decoration._id, 'decoration')}
                        className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
                      >
                        Cancel Service
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Online Bookings */}
            {allBookings.onlineBookings && allBookings.onlineBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#800020] mb-4">Venue Bookings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allBookings.onlineBookings.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                      <h3 className="text-xl font-bold text-[#800020] mb-2">{booking.eventType}</h3>
                      <div className="space-y-2 text-sm text-gray-700 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          {new Date(booking.dateOfEvent).toLocaleDateString()} - {booking.eventSlot}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          {booking.numberOfGuests} guests
                        </div>
                        {booking.decorationType && booking.decorationType.length > 0 && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                            </svg>
                            Decoration: {booking.decorationType.join(', ')}
                          </div>
                        )}
                        {booking.cateringType && booking.cateringType.length > 0 && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                            </svg>
                            Catering: {booking.cateringType.join(', ')}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleCancelBooking(booking._id, 'onlineBooking')}
                        className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
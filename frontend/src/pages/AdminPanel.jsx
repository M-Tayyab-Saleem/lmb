import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AdminPanel = () => {
  const [bookings, setBookings] = useState({
    catering: [],
    decorations: [],
    onlineBookings: []
  });
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState({ status: "", notes: "" });
  const API_URL = 'http://localhost:8080';

  // Fetch all bookings for admin
  const fetchAdminBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/admin/bookings`, { 
        withCredentials: true 
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching admin bookings:", error);
      if (error.response?.status === 403) {
        toast.error("Access denied. Admin only.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Failed to load bookings", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/stats`, { 
        withCredentials: true 
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchAdminBookings();
    fetchStats();
  }, []);

  // Update booking status
  const handleStatusUpdate = async () => {
    try {
      await axios.put(
        `${API_URL}/api/admin/bookings/${selectedBooking.type}/${selectedBooking._id}`,
        statusUpdate, 
        { withCredentials: true }
      );
      
      toast.success("Status updated successfully", {
        position: "top-right",
        autoClose: 1500,
      });
      
      setSelectedBooking(null);
      setStatusUpdate({ status: "", notes: "" });
      fetchAdminBookings(); // Refresh bookings
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || "Failed to update status", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Filter bookings based on active tab
  const filteredBookings = () => {
    switch(activeTab) {
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

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#800020] mb-4">Admin Panel</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Manage all bookings and monitor system statistics
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-[#800020]">{stats.totalUsers || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-[#800020]">{stats.totalBookings || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Approvals</h3>
            <p className="text-3xl font-bold text-[#800020]">
              {(stats.catering?.find(s => s._id === 'pending')?.count || 0) +
               (stats.decorations?.find(s => s._id === 'pending')?.count || 0) +
               (stats.onlineBookings?.find(s => s._id === 'pending')?.count || 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed Events</h3>
            <p className="text-3xl font-bold text-[#800020]">
              {(stats.catering?.find(s => s._id === 'completed')?.count || 0) +
               (stats.decorations?.find(s => s._id === 'completed')?.count || 0) +
               (stats.onlineBookings?.find(s => s._id === 'completed')?.count || 0)}
            </p>
          </div>
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
                  ? "bg[#800020] text-[#FFF8E7]" 
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
            <p className="text-gray-600">There are no bookings in the system yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Catering Bookings */}
            {allBookings.catering && allBookings.catering.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#800020] mb-4">Catering Services</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allBookings.catering.map((catering) => (
                          <tr key={catering._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{catering.eventType}</div>
                              <div className="text-sm text-gray-500">{catering.cateringType.join(', ')}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{catering.user?.username}</div>
                              <div className="text-sm text-gray-500">{catering.user?.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(catering.dateOfEvent).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {catering.numberOfGuests}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={catering.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setSelectedBooking({ ...catering, type: 'catering' })}
                                className="text-[#800020] hover:text-[#600018] mr-3"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedBooking({ ...catering, type: 'catering' });
                                  setStatusUpdate({ status: catering.status, notes: catering.adminNotes || '' });
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Decoration Bookings */}
            {allBookings.decorations && allBookings.decorations.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#800020] mb-4">Decoration Services</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allBookings.decorations.map((decoration) => (
                          <tr key={decoration._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{decoration.eventType}</div>
                              <div className="text-sm text-gray-500">{decoration.decorationType.join(', ')}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{decoration.user?.username}</div>
                              <div className="text-sm text-gray-500">{decoration.user?.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(decoration.dateOfEvent).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {decoration.numberOfGuests}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={decoration.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setSelectedBooking({ ...decoration, type: 'decoration' })}
                                className="text-[#800020] hover:text-[#600018] mr-3"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedBooking({ ...decoration, type: 'decoration' });
                                  setStatusUpdate({ status: decoration.status, notes: decoration.adminNotes || '' });
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Online Bookings */}
            {allBookings.onlineBookings && allBookings.onlineBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#800020] mb-4">Venue Bookings</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allBookings.onlineBookings.map((booking) => (
                          <tr key={booking._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{booking.eventType}</div>
                              <div className="text-sm text-gray-500">
                                {booking.cateringType?.join(', ')} {booking.decorationType?.join(', ')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{booking.user?.username}</div>
                              <div className="text-sm text-gray-500">{booking.user?.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(booking.dateOfEvent).toLocaleDateString()} - {booking.eventSlot}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {booking.numberOfGuests}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={booking.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setSelectedBooking({ ...booking, type: 'onlineBooking' })}
                                className="text-[#800020] hover:text-[#600018] mr-3"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedBooking({ ...booking, type: 'onlineBooking' });
                                  setStatusUpdate({ status: booking.status, notes: booking.adminNotes || '' });
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* View Booking Modal */}
        {selectedBooking && !statusUpdate.status && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#800020]">Booking Details</h3>
                  <button 
                    onClick={() => setSelectedBooking(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <StatusBadge status={selectedBooking.status} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Booking Type</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedBooking.type}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">User Information</label>
                    <p className="text-sm text-gray-900">{selectedBooking.user?.username} ({selectedBooking.user?.email})</p>
                    <p className="text-sm text-gray-900">{selectedBooking.name} - {selectedBooking.phoneNumber}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Event Date</label>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedBooking.dateOfEvent || selectedBooking.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Event Type</label>
                      <p className="text-sm text-gray-900">{selectedBooking.eventType}</p>
                    </div>
                  </div>

                  {selectedBooking.eventSlot && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Time Slot</label>
                      <p className="text-sm text-gray-900">{selectedBooking.eventSlot}</p>
                    </div>
                  )}

                  {selectedBooking.numberOfGuests && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                      <p className="text-sm text-gray-900">{selectedBooking.numberOfGuests}</p>
                    </div>
                  )}

                  {selectedBooking.cateringType && selectedBooking.cateringType.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Catering Type</label>
                      <p className="text-sm text-gray-900">{selectedBooking.cateringType.join(', ')}</p>
                    </div>
                  )}

                  {selectedBooking.decorationType && selectedBooking.decorationType.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Decoration Type</label>
                      <p className="text-sm text-gray-900">{selectedBooking.decorationType.join(', ')}</p>
                    </div>
                  )}

                  {selectedBooking.menuPreferences && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Menu Preferences</label>
                      <p className="text-sm text-gray-900">{selectedBooking.menuPreferences}</p>
                    </div>
                  )}

                  {selectedBooking.adminNotes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
                      <p className="text-sm text-gray-900">{selectedBooking.adminNotes}</p>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setStatusUpdate({ 
                          status: selectedBooking.status, 
                          notes: selectedBooking.adminNotes || '' 
                        });
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#800020] rounded-md hover:bg-[#600018]"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Status Modal */}
        {selectedBooking && statusUpdate.status && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#800020]">Update Booking Status</h3>
                  <button 
                    onClick={() => {
                      setSelectedBooking(null);
                      setStatusUpdate({ status: "", notes: "" });
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={statusUpdate.status}
                      onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                    <textarea
                      value={statusUpdate.notes}
                      onChange={(e) => setStatusUpdate({ ...statusUpdate, notes: e.target.value })}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
                      placeholder="Add any notes or comments here..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => {
                        setSelectedBooking(null);
                        setStatusUpdate({ status: "", notes: "" });
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleStatusUpdate}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#800020] rounded-md hover:bg-[#600018]"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
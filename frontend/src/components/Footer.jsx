import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <footer className="bg-black text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">𝔹𝕠𝕠𝕜𝕚𝕗𝕪</h3>
            <p className="text-gray-400">Your one-stop platform for event booking and management.</p>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition-colors duration-300">Home</a></li>
              <li><Link to="/events" className="hover:text-white transition-colors duration-300">Events</Link></li>
              <li><Link to="/createEvent" className="hover:text-white transition-colors duration-300">Create Event</Link></li>
              <li><Link to="/bookedEvents" className="hover:text-white transition-colors duration-300">My Bookings</Link></li>
            </ul>
          </div>

       
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>Email: support@bookify.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a  className="hover:text-white transition-colors duration-300" aria-label="Facebook">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a  className="hover:text-white transition-colors duration-300" aria-label="Twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a  className="hover:text-white transition-colors duration-300" aria-label="Instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

       
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">&copy; 2025 Bookify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

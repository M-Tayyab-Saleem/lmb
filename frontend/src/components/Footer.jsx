import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#800020] text-[#FFF8E7] mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    
          <div>
            <h3 className="text-2xl font-bold mb-4">BML Banquets</h3>
            <p className="text-[#FFEBC1] mb-4">Your premier destination for luxurious events and memorable celebrations.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors duration-300" aria-label="Facebook">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300" aria-label="Instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300" aria-label="Twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors duration-300">Our Services</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors duration-300">Events</Link></li>
              <li><Link to="/bookings" className="hover:text-white transition-colors duration-300">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors duration-300 cursor-pointer">Event Decoration</span></li>
              <li><span className="hover:text-white transition-colors duration-300 cursor-pointer">Catering Services</span></li>
              <li><span className="hover:text-white transition-colors duration-300 cursor-pointer">Venue Booking</span></li>
              <li><span className="hover:text-white transition-colors duration-300 cursor-pointer">Sound & Lighting</span></li>
              <li><span className="hover:text-white transition-colors duration-300 cursor-pointer">Event Planning</span></li>
            </ul>
          </div>
       
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mr-3 mt-1"></i>
                <span>123 Luxury Avenue, Prestige District, City</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3"></i>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3"></i>
                <span>info@bmlbanquets.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-3"></i>
                <span>Mon-Sun: 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#FFEBC1] text-center">
          <p className="text-sm text-[#FFEBC1]">&copy; 2025 BML Banquets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
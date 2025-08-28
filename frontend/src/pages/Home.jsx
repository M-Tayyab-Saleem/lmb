import React from 'react';
import videoHome from "../assets/Home 2.mp4";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            poster="/path-to-poster.jpg"
          >
            <source src={videoHome} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-5 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Luxury Banquet Experiences
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10 text-white">
            Host your special events in our exquisite banquet halls with premium amenities
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/services" 
              className="bg-[#800020] text-[#FFF8E7] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#600018] transition"
            >
              Book Now
            </Link>
            <Link 
              to="/about" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:bg-opacity-10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-16 bg-[#FFF8E7]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#800020]">Why Choose Our Banquet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="bg-[#800020] p-3 rounded-full">
                  <svg className="w-8 h-8 text-[#FFF8E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10m4 0v4m-4 0H5m4 0h4m4 0h4m-4 0v-4m0 4v4"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">Elegant Venues</h3>
              <p className="text-gray-700">Spacious halls with luxurious decor and modern amenities for any occasion</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="bg-[#800020] p-3 rounded-full">
                  <svg className="w-8 h-8 text-[#FFF8E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">Gourmet Catering</h3>
              <p className="text-gray-700">Exquisite menus prepared by our expert chefs with diverse cuisine options</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="bg-[#800020] p-3 rounded-full">
                  <svg className="w-8 h-8 text-[#FFF8E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">Event Planning</h3>
              <p className="text-gray-700">Professional coordination for seamless events from start to finish</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-[#800020] text-[#FFF8E7]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">3</div>
              <div className="text-lg">Premium Venues</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-lg">Expert Staff</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-lg">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-[#FFF8E7]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#800020]">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#800020] rounded-full flex items-center justify-center text-[#FFF8E7] font-bold">AS</div>
                <div className="ml-4">
                  <div className="font-semibold">Ahmed S.</div>
                  <div className="text-sm text-gray-500">Wedding Reception</div>
                </div>
              </div>
              <p className="text-gray-700">"The team at BML made our wedding day absolutely perfect. The venue was stunning and the service was exceptional."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#800020] rounded-full flex items-center justify-center text-[#FFF8E7] font-bold">MR</div>
                <div className="ml-4">
                  <div className="font-semibold">Maria R.</div>
                  <div className="text-sm text-gray-500">Corporate Event</div>
                </div>
              </div>
              <p className="text-gray-700">"Our annual corporate event was a huge success thanks to the professional staff and excellent facilities at BML Banquets."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#800020] rounded-full flex items-center justify-center text-[#FFF8E7] font-bold">JK</div>
                <div className="ml-4">
                  <div className="font-semibold">James K.</div>
                  <div className="text-sm text-gray-500">Birthday Celebration</div>
                </div>
              </div>
              <p className="text-gray-700">"The birthday celebration for my daughter was magical! The decorations and catering exceeded our expectations."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Preview */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#800020]">Our Event Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#800020] to-[#600018] opacity-70 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <div className="aspect-square bg-gray-300 rounded-lg"></div>
            <div className="aspect-square bg-gray-400 rounded-lg"></div>
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery" className="inline-flex items-center text-[#800020] font-semibold hover:text-[#600018]">
              View Full Gallery
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-[#800020] text-[#FFF8E7]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Event?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss how we can make your next event unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/services" 
              className="bg-[#FFF8E7] text-[#800020] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#FFF0D0] transition inline-block"
            >
              Explore Our Services
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-[#FFF8E7] text-[#FFF8E7] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#FFF8E7] hover:bg-opacity-10 transition inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
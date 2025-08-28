import React from 'react';
import banquet from "../assets/Login.jpg"

const About = () => {
  return (
    <div className="min-h-screen bg-[#FFF8E7] pt-16">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <img 
          src={banquet}
          alt="BML Banquet Exterior" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-5xl font-bold text-white">About BML Banquet Management</h1>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-[#800020]">Our Story</h2>
          <p className="text-lg text-gray-700 mb-8">
            At BML Banquet Management, we turn your dreams into unforgettable celebrations. Whether it's a wedding, 
            a birthday, corporate event, or a cultural gathering, our team is dedicated to creating stunning and 
            seamless experiences.
          </p>
          
          <p className="text-lg text-gray-700 mb-8">
            Founded in 2022, BML has served over 500 successful events across the region. We provide all-in-one 
            solutions — from elegant decor and delicious catering to sound, lighting, and complete event coordination.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-[#800020]">Our Mission</h3>
              <p className="text-gray-700">
                To offer professional and personalized services to help make your moments special. With transparent 
                pricing, modern tools, and a client-first approach, BML is the perfect partner for your event.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-[#800020]">Our Vision</h3>
              <p className="text-gray-700">
                To be the leading banquet management company known for innovation, quality, and impeccable service 
                in the events industry, creating memorable experiences for all our clients.
              </p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-6 text-[#800020]">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#800020]">
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">Experienced Team</h3>
              <p className="text-gray-600">Skilled event planners and decorators with years of industry experience</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#800020]">
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">Customizable Packages</h3>
              <p className="text-gray-600">Tailored banquet packages to suit your specific needs and budget</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#800020]">
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">Diverse Catering</h3>
              <p className="text-gray-600">In-house catering with diverse menu options for all tastes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#800020]">
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">Modern Technology</h3>
              <p className="text-gray-600">Live booking system with online payment options for your convenience</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#800020] md:col-span-2">
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support to address all your queries</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-6 text-[#800020]">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">Grand Ballroom</h3>
              <p className="text-gray-600">Capacity: up to 500 guests</p>
              <p className="text-gray-600 mt-2">Elegant space perfect for large weddings and corporate events</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">Royal Suite</h3>
              <p className="text-gray-600">Capacity: up to 200 guests</p>
              <p className="text-gray-600 mt-2">Intimate setting for smaller gatherings and celebrations</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-[#800020]">Garden Pavilion</h3>
              <p className="text-gray-600">Capacity: up to 300 guests</p>
              <p className="text-gray-600 mt-2">Beautiful outdoor space for daytime events and ceremonies</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-6 text-[#800020]">Our Team</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our dedicated team of event professionals, chefs, and service staff work tirelessly to ensure 
            your event is executed flawlessly. With attention to detail and commitment to excellence, 
            we transform your vision into reality. From our experienced event coordinators to our talented 
            culinary team, everyone at BML is committed to making your event truly special.
          </p>
          
          <div className="bg-[#800020] p-8 rounded-lg text-center text-[#FFF8E7]">
            <h3 className="text-2xl font-semibold mb-4">Ready to Plan Your Event?</h3>
            <p className="text-lg mb-6">
              Contact us today to discuss how we can make your next event unforgettable.
            </p>
            <button className="bg-[#FFF8E7] text-[#800020] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFEBC1] transition">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
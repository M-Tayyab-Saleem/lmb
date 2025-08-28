import React, { useState } from 'react';
import { toast } from 'react-toastify';
import EventDecorationForm from '../components/EventDecorationForm';
import CateringForm from '../components/CateringForm';
import OnlineBookingForm from '../components/OnlineBookingForm';
import SupportForm from '../components/SupportForm';
import decoration from '../assets/Decoration1.jpg';
import catering from '../assets/Catering.jpg';
import booking from '../assets/Booking.jpg';
import lighting from '../assets/Lighting.jpg';
import support from '../assets/Support.jpg';

const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [activeTab, setActiveTab] = useState('services');

  const services = [
    {
      id: 1,
      title: "Event Decoration",
      description: "Transform your venue with our exquisite decoration services",
      image: decoration,
      details: "Our expert decorators create magical atmospheres for weddings, corporate events, birthdays, and special occasions. We handle everything from floral arrangements to thematic setups.",
      features: ["Custom theme design", "Premium floral arrangements", "Backdrop & stage decoration", "Table settings & centerpieces", "Lighting effects", "Setup & teardown included"],
      form: <EventDecorationForm onClose={() => setActiveService(null)} />
    },
    {
      id: 2,
      title: "In-House Catering",
      description: "Delight your guests with our gourmet catering options",
      image: catering,
      details: "Experience culinary excellence with our diverse menu options prepared by expert chefs. We cater to all dietary preferences and cultural requirements.",
      features: ["Multi-cuisine menus", "Live cooking stations", "Dietary accommodation", "Professional serving staff", "Premium dinnerware", "Custom menu planning"],
      form: <CateringForm onClose={() => setActiveService(null)} />
    },
    {
      id: 3,
      title: "Venue Booking",
      description: "Reserve our premium venues for your special event",
      image: booking,
      details: "Choose from our elegant banquet halls and outdoor spaces, each equipped with modern amenities and customizable layouts for your perfect event.",
      features: ["Multiple venue options", "Flexible seating arrangements", "Audio-visual equipment", "Climate control", "Ample parking", "Bridal/green rooms"],
      form: <OnlineBookingForm onClose={() => setActiveService(null)} />
    },
    {
      id: 4,
      title: "Sound & Lighting",
      description: "Create the perfect atmosphere with our professional equipment",
      image: lighting,
      details: "Enhance your event with state-of-the-art audio and lighting systems managed by experienced technicians for flawless execution.",
      features: ["Professional DJ setup", "Crystal clear sound systems", "Themed lighting effects", "Stage lighting", "Microphones & speakers", "Technical support"],
      form: (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#800020]">Sound & Lighting Services</h3>
            <button 
              onClick={() => setActiveService(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="prose text-gray-700">
            <p className="mb-4">
              Create the perfect mood for your event with our professional sound and lighting services.
            </p>
            <p className="mb-4">
              Our team specializes in transforming any space with amazing lighting effects that set the right vibe, 
              from soft and romantic to bright and energetic. We use high-quality equipment to ensure clear sound 
              for every speech, song, and announcement, making sure everyone can hear the important moments.
            </p>
            <p>
              Whether you need a full DJ setup for a lively party or subtle lighting to highlight your beautiful decor, 
              our sound and lighting packages are designed to make your event truly unforgettable.
            </p>
          </div>
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-[#800020] mb-3">Our Services Include:</h4>
            <ul className="grid grid-cols-2 gap-2">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#800020]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                DJ & Speakers
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#800020]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Microphones
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#800020]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Colored Lights
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#800020]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Spotlights
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#800020]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Stage Lights
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#800020]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Logo Projection
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#800020]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Mood Lighting
              </li>
            </ul>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              To book our sound & lighting services, please use our Online Booking form and select your preferences.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "24/7 Support",
      description: "Get assistance anytime with our round-the-clock support",
      image: support,
      details: "Our dedicated support team is available 24/7 to ensure your event planning experience is smooth and stress-free from start to finish.",
      features: ["Dedicated event coordinator", "24/7 customer support", "Emergency assistance", "Vendor coordination", "Timeline management", "On-site support"],
      form: <SupportForm onClose={() => setActiveService(null)} />
    }
  ];

  const packages = [
    {
      name: "Basic Package",
      price: "₹75,000",
      services: ["Venue booking (4 hours)", "Basic decoration", "Buffet catering (up to 100 guests)", "Sound system"],
      bestFor: "Small gatherings and intimate events"
    },
    {
      name: "Premium Package",
      price: "₹1,50,000",
      services: ["Venue booking (6 hours)", "Premium decoration", "Plated service catering", "Professional sound & lighting", "Event coordinator"],
      bestFor: "Weddings and corporate events"
    },
    {
      name: "Luxury Package",
      price: "₹3,00,000",
      services: ["Exclusive venue access", "Luxury decoration", "Multi-cuisine catering", "Full production services", "Dedicated planning team", "Premium amenities"],
      bestFor: "Grand celebrations and VIP events"
    }
  ];

  const faqs = [
    {
      question: "How far in advance should I book my event?",
      answer: "We recommend booking at least 3-6 months in advance for weddings and large events, and 1-2 months for smaller gatherings. Popular dates get booked quickly!"
    },
    {
      question: "Can I customize my service package?",
      answer: "Absolutely! We offer fully customizable packages to meet your specific needs and budget. Our event coordinators will work with you to create the perfect combination of services."
    },
    {
      question: "Do you provide wedding planning services?",
      answer: "Yes, we offer complete wedding planning services including venue selection, decoration, catering, and coordination with other vendors to ensure your special day is perfect."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We understand that plans can change. Our cancellation policy allows for full refunds up to 30 days before the event, with partial refunds available up to 15 days before. Please contact us for specific details."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7] pt-16">
      {/* Hero Section */}
      <div className="bg-[#800020] text-[#FFF8E7] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Premium Banquet Services</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            From intimate gatherings to grand celebrations, we provide comprehensive event solutions with attention to every detail
          </p>
          <button 
            onClick={() => document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#FFF8E7] text-[#800020] px-8 py-3 rounded-full font-semibold hover:bg-[#FFEBC1] transition"
          >
            Explore Our Services
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <button 
              onClick={() => setActiveTab('services')}
              className={`py-4 font-semibold border-b-2 transition ${activeTab === 'services' ? 'border-[#800020] text-[#800020]' : 'border-transparent text-gray-600 hover:text-[#800020]'}`}
            >
              Services
            </button>
            {/* <button 
              onClick={() => setActiveTab('packages')}
              className={`py-4 font-semibold border-b-2 transition ${activeTab === 'packages' ? 'border-[#800020] text-[#800020]' : 'border-transparent text-gray-600 hover:text-[#800020]'}`}
            >
              Packages
            </button> */}
            <button 
              onClick={() => setActiveTab('faq')}
              className={`py-4 font-semibold border-b-2 transition ${activeTab === 'faq' ? 'border-[#800020] text-[#800020]' : 'border-transparent text-gray-600 hover:text-[#800020]'}`}
            >
              FAQ
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Services Section */}
        {activeTab === 'services' && (
          <div id="services-section">
            <h2 className="text-4xl font-bold text-center mb-4 text-[#800020]">Our Services</h2>
            <p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
              Discover our comprehensive range of banquet services to make your event truly memorable
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map(service => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                  onClick={() => setActiveService(service)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[#800020]">{service.title}</h3>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <button className="text-[#800020] font-semibold hover:underline">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Details Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
              <h3 className="text-3xl font-bold text-center mb-8 text-[#800020]">Why Choose Our Services?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-[#800020] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#FFF8E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Quality Assurance</h4>
                  <p className="text-gray-700">We maintain the highest standards in all our services, ensuring your event is executed flawlessly.</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#800020] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#FFF8E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
                  <p className="text-gray-700">Our dedicated team is available around the clock to address your needs and ensure smooth execution.</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#800020] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#FFF8E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Competitive Pricing</h4>
                  <p className="text-gray-700">We offer transparent pricing with no hidden costs, providing excellent value for premium services.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Packages Section
        {activeTab === 'packages' && (
          <div>
            <h2 className="text-4xl font-bold text-center mb-4 text-[#800020]">Event Packages</h2>
            <p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
              Choose from our curated packages or customize your own for the perfect event experience
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {packages.map((pkg, index) => (
                <div key={index} className={`bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300 hover:scale-105 ${index === 1 ? 'border-2 border-[#800020] relative' : ''}`}>
                  {index === 1 && (
                    <div className="absolute top-0 right-0 bg-[#800020] text-[#FFF8E7] px-4 py-1 rounded-bl-lg font-semibold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-center mb-4 text-[#800020]">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-center mb-6 text-[#800020]">{pkg.price}</div>
                  <ul className="space-y-3 mb-6">
                    {pkg.services.map((service, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-[#800020]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 text-center mb-6">{pkg.bestFor}</p>
                  <button 
                    onClick={() => setActiveTab('services')}
                    className="w-full bg-[#800020] text-[#FFF8E7] py-3 rounded-lg font-semibold hover:bg-[#600018] transition"
                  >
                    Select Package
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[#800020] text-[#FFF8E7] rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Custom Package Options</h3>
              <p className="mb-6">Can't find what you're looking for? We'll create a custom package tailored to your specific needs and budget.</p>
              <button 
                onClick={() => setActiveService(services[2])}
                className="bg-[#FFF8E7] text-[#800020] px-8 py-3 rounded-lg font-semibold hover:bg-[#FFEBC1] transition"
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        )} */}

        {/* FAQ Section */}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-4xl font-bold text-center mb-4 text-[#800020]">Frequently Asked Questions</h2>
            <p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions about our services and booking process
            </p>

            <div className="max-w-3xl mx-auto space-y-6 mb-16">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-3 text-[#800020]">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-[#800020]">Still have questions?</h3>
              <p className="text-gray-700 mb-6">Our team is here to help you with any questions or special requests.</p>
              <button 
                onClick={() => setActiveService(services[4])}
                className="bg-[#800020] text-[#FFF8E7] px-8 py-3 rounded-lg font-semibold hover:bg-[#600018] transition"
              >
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for forms */}
      {activeService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {activeService.form}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
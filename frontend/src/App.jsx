import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import BookEvents from "./pages/BookedEvents";
import CreateEvent from "./pages/CreateEvent";
import SignupForm from "./pages/SignUp";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import About from "./pages/AboutUs";
import Services from "./pages/services";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

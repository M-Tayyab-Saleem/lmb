import React from 'react'
import { useState , useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar'
import axios from "axios"
import Home from "./pages/Home"
import Events from './pages/Events';
import BookEvents from './pages/BookedEvents';
import CreateEvent from './pages/CreateEvent';
import SignupForm from './pages/SignUp';
import Login from './pages/Login';
import Footer from './components/Footer';

function App() {
  
  return (
    <div>
       <ToastContainer />
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/events" element={ <Events /> } />
      <Route path="/bookedEvents" element={ <BookEvents /> } />
      <Route path="/createEvent" element={ <CreateEvent /> } />
      <Route path="/signup" element={ <SignupForm /> } />
      <Route path="/login" element={ <Login /> } />
    </Routes>
    <Footer />
  </BrowserRouter>
    </div>
  )
}

export default App

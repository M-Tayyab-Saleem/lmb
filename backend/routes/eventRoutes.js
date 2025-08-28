const express = require('express');
const { createEvent, getEvents, bookSeat , bookedEvents, deleteEvents, editEvents, cancelBooking} = require('../controllers/enventController');
const router = express.Router();
const { isLoggedIn } = require("../middleware/authMiddleware");

const { eventValidator} = require("../middleware")

router.get('/api/events', getEvents);          // List all events
router.post('/api/events', isLoggedIn, eventValidator, createEvent);  // Create an event
router.post('/api/events/:eventId/book',isLoggedIn, bookSeat); // Book a seat
router.get("/api/events/booked" ,isLoggedIn, bookedEvents) //Booked Events
router.put("/api/events/:eventId" ,eventValidator, editEvents) //Edit Event
router.delete("/api/events/:eventId" , deleteEvents) //Delete Event
router.delete('/api/events/:eventId/cancel', cancelBooking); //Cancel Booking

module.exports = router;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user")

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: { 
    type: String 
  },
  location: {
     type: String, required: true 
    },
  date: {
     type: Date, required: true 
    },
  capacity: {
     type: Number, required: true 
    },
  bookedSeats: {
     type: Number, default: 0 
    },
  imageURL: {
     type: String,
    },
  usersBooked: { 
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  createdBy:{
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true
  }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

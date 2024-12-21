const Joi = require("joi");

const eventSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  location: Joi.string().min(3).required(),
  date: Joi.date().greater("now").required(),
  capacity: Joi.number().integer().positive().required(),
  bookedSeats: Joi.number().integer().min(0).required(),
  imageURL: Joi.string().uri().optional(),
  usersBooked: Joi.array().optional(),
  createdBy: Joi.string().optional(),
});

module.exports = eventSchema;

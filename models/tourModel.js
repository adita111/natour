const mongoose = require('mongoose');

const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    requierd: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    requierd: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },

  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantaty: { type: Number, default: 0 },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    requierd: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    defoult: Date.now,
    select: false,
  },
  startDates: [Date],
});
const Tour = mongoose.model('Tour', tourScheme);

module.exports = Tour;

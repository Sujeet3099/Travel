const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Name is required for a tour.'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required for a tour.'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'maxGroupSize is required for a tour.'],
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required for a tour.'],
  },
  ratingsAverage: { type: Number, default: 0 },
  ratingsQuantity: { type: Number, default: 0 },

  price: { type: Number, required: [true, 'A tour must have a Price.'] },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
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
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

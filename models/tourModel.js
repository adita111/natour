const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const slugify = require('slugify');
// const validator = require('validator');

const tourScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      requierd: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name must have less or equal than 40 characters',
      ],
      minlength: [
        10,
        'A tour name must have more or equal than 10 characters',
      ],
      // validate: [
      //   validator.isAlpha,
      //   'Tour name must only contain characters',
      // ],
    },
    slug: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'rating must be below 5'],
    },
    ratingsQuantaty: { type: Number, default: 0 },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (val) {
          // this only points to current doc on NEW document
          return val < this.price;
        },
        message:
          'Discount price ({VALUE}) should be below regular price',
      },
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
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourScheme.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
///Documant midleware
//This middleware will run before .save() and .create()
// tourScheme.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });
// tourScheme.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });
// tourScheme.post('save', function(doc, next)  {
//   console.log(doc);
//   next();
// });
//Query middleware
tourScheme.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourScheme.post(/^find/, function (docs, next) {
  // console.log(docs);
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

//Aggregation middleware
tourScheme.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourScheme);

module.exports = Tour;

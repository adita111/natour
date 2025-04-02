const express = require('express');

const router = express.Router();
const tourControler = require('../controllers/tourController');

// router.param('id', tourControler.checkID);

router
  .route('/')
  .get(tourControler.getAllTours)
  .post(tourControler.createTour);

router
  .route('/:id')
  .delete(tourControler.deleteTour)
  .patch(tourControler.updateTour)
  .get(tourControler.getTour);

module.exports = router;

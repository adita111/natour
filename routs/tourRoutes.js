const express = require('express');

const router = express.Router();
const tourControler = require('../controllers/tourController');
const authController = require('../controllers/authController');

// router.param('id', tourControler.checkID);

router
  .route('/top-5-cheap')
  .get(tourControler.aliasTopTours, tourControler.getAllTours);

router.route('/tour-stats').get(tourControler.getTourStats);
router.route('/monthly-plan/:year').get(tourControler.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourControler.getAllTours)
  .post(tourControler.createTour);

router
  .route('/:id')
  .delete(tourControler.deleteTour)
  .patch(tourControler.updateTour)
  .get(tourControler.getTour);

module.exports = router;

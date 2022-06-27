const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/flights', controller.getAllFlights)
router.post('/book',controller.bookFlight)
router.get('/flights/:title',controller.searchFlightByTitle)
router.put('/update/:title',controller.updateFlight)
router.delete('/flights/delete/:title',controller.deleteFlight)

module.exports = router;

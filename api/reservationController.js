const express = require('express');
const router = express.Router();
const reservations = require('../database/reservation.json');

// Get all reservations
router.get('/', (req, res) => {
  res.json(reservations);
});

/// Get a single reservation by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const reservation = reservations.find(item => item.id == id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  });
  
  // Create a new reservation
  router.post('/', (req, res) => {
    const newReservation = req.body; // Assuming the request body contains the new reservation data
    // Generate a unique ID for the new reservation (you may use a library like UUID)
    reservations.push(newReservation); // Add the new reservation to the reservations array
    res.status(201).json(newReservation); // Return the newly created reservation with status code 201 (Created)
  });
  
  // Update an existing reservation
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedReservation = req.body; // Assuming the request body contains the updated reservation data
    const index = reservations.findIndex(item => item.id == id); // Find the index of the reservation in the array
    if (index !== -1) {
      reservations[index] = { ...reservations[index], ...updatedReservation }; // Update the reservation with the new data
      res.json(reservations[index]); // Return the updated reservation
    } else {
      res.status(404).json({ message: 'Reservation not found' }); // If reservation with given ID is not found, return 404
    }
  });
  
  // Remove a reservation
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = reservations.findIndex(item => item.id == id); // Find the index of the reservation in the array
    if (index !== -1) {
      reservations.splice(index, 1); // Remove the reservation from the array
      res.json({ message: 'Reservation removed successfully' }); // Return success message
    } else {
      res.status(404).json({ message: 'Reservation not found' }); // If reservation with given ID is not found, return 404
    }
  });
  
  module.exports = router;
  
const express = require('express');
const router = express.Router();
const voitures = require('../database/voiture.json');

// Get all voitures
router.get('/', (req, res) => {
  res.json(voitures);
});

// Get a single voiture by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const voiture = voitures.find(car => car.id == id);
    if (voiture) {
      res.json(voiture);
    } else {
      res.status(404).json({ message: 'Voiture not found' });
    }
  });
  
  // Create a new voiture
  router.post('/', (req, res) => {
    const newCar = req.body; // Assuming the request body contains the new voiture data
    voitures.push(newCar); // Add the new voiture to the voitures array
    res.status(201).json(newCar); // Return the newly created voiture with status code 201 (Created)
  });
  
  // Update an existing voiture
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body; // Assuming the request body contains the updated voiture data
    const index = voitures.findIndex(car => car.id == id); // Find the index of the voiture in the array
    if (index !== -1) {
      voitures[index] = { ...voitures[index], ...updatedCar }; // Update the voiture with the new data
      res.json(voitures[index]); // Return the updated voiture
    } else {
      res.status(404).json({ message: 'Voiture not found' }); // If voiture with given ID is not found, return 404
    }
  });
  
  // Remove a voiture
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = voitures.findIndex(car => car.id == id); // Find the index of the voiture in the array
    if (index !== -1) {
      voitures.splice(index, 1); // Remove the voiture from the array
      res.json({ message: 'Voiture removed successfully' }); // Return success message
    } else {
      res.status(404).json({ message: 'Voiture not found' }); // If voiture with given ID is not found, return 404
    }
  });
    
module.exports = router;

const express = require('express');
const router = express.Router();
const chauffeurs = require('../database/driver.json');
 
// Get all chauffeurs
router.get('/', (req, res) => {
  res.json(chauffeurs);
});

// Get a single chauffeur by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const chauffeur = chauffeurs.find(driver => driver.id == id);
    if (chauffeur) {
      res.json(chauffeur);
    } else {
      res.status(404).json({ message: 'Chauffeur not found' });
    }
  });
  
  // Create a new chauffeur
  router.post('/', (req, res) => {
    const newDriver = req.body; // Assuming the request body contains the new chauffeur data
    // Generate a unique ID for the new chauffeur (you may use a library like UUID)
    chauffeurs.push(newDriver); // Add the new chauffeur to the chauffeurs array
    res.status(201).json(newDriver); // Return the newly created chauffeur with status code 201 (Created)
  });
  
  // Update an existing chauffeur
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedDriver = req.body; // Assuming the request body contains the updated chauffeur data
    const index = chauffeurs.findIndex(driver => driver.id == id); // Find the index of the chauffeur in the array
    if (index !== -1) {
      chauffeurs[index] = { ...chauffeurs[index], ...updatedDriver }; // Update the chauffeur with the new data
      res.json(chauffeurs[index]); // Return the updated chauffeur
    } else {
      res.status(404).json({ message: 'Chauffeur not found' }); // If chauffeur with given ID is not found, return 404
    }
  });
  
  // Remove a chauffeur
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = chauffeurs.findIndex(driver => driver.id == id); // Find the index of the chauffeur in the array
    if (index !== -1) {
      chauffeurs.splice(index, 1); // Remove the chauffeur from the array
      res.json({ message: 'Chauffeur removed successfully' }); // Return success message
    } else {
      res.status(404).json({ message: 'Chauffeur not found' }); // If chauffeur with given ID is not found, return 404
    }
  });
  
  module.exports = router;
  
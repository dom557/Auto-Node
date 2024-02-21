
const express = require('express');
const router = express.Router();
const utilisateurs = require('../database/utilisateur.json');

// Get all utilisateurs
router.get('/', (req, res) => {
  res.json(utilisateurs);
});

// Get a single utilisateur by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const utilisateur = utilisateurs.find(user => user.id === id);
  if (utilisateur) {
    res.json(utilisateur);
  } else {
    res.status(404).json({ message: 'Utilisateur not found' });
  }
});
// Create a new utilisateur
router.post('/', (req, res) => {
    const newUser = req.body; // Assuming the request body contains the new utilisateur data
    // Generate a unique ID for the new utilisateur (you may use a library like UUID)
    utilisateurs.push(newUser); // Add the new utilisateur to the utilisateurs array
    res.status(201).json(newUser); // Return the newly created utilisateur with status code 201 (Created)
    res.redirect('/joueurs');

  });
  
// Update an existing utilisateur
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body; // Assuming the request body contains the updated utilisateur data
  const index = utilisateurs.findIndex(user => user.id == id); // Find the index of the utilisateur in the array
  
  if (index !== -1) {
    // Update the utilisateur with the new data
    utilisateurs[index].id = updatedUser.id;
    utilisateurs[index].admin = updatedUser.admin;
    utilisateurs[index].email = updatedUser.email;
    utilisateurs[index].status = updatedUser.status;
    utilisateurs[index].date_ajoutee = updatedUser.date_ajoutee;
    utilisateurs[index].outils = updatedUser.outils;
    res.send(utilisateurs[index]);
  } else {
    res.status(404).send("Utilisateur not found");
  }
});

  
  // Remove an utilisateur
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = utilisateurs.findIndex(user => user.id == id); // Find the index of the utilisateur in the array
    if (index !== -1) {
      utilisateurs.splice(index, 1); // Remove the utilisateur from the array
      res.json({ message: 'Utilisateur removed successfully' }); // Return success message
    } else {
      res.status(404).json({ message: 'Utilisateur not found' }); // If utilisateur with given ID is not found, return 404
    }
  });
  
module.exports = router;

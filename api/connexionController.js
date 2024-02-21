const express = require('express');
const router = express.Router();
const connexions = require('../database/connexion.json');

//get all routes
router.route('/')
  .get((req, res) => {
    let data = JSON.stringify(connexions);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(data);
  })
// User authentication
router.post('/login', (req, res) => {
  const { email, password } = req.body; // Assuming request body contains email and password

  // Check if the provided email and password match any user in the connexions array
  const user = connexions.find(connexion => connexion.email === email && connexion.password === password);

  if (user) {
    // Authentication successful
    res.status(200).json({ message: 'Authentication successful', user });
  } else {
    // Authentication failed
    res.status(401).json({ message: 'Authentication failed' });
  }
});

module.exports = router;

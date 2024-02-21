const express = require('express');
const utilisateurController = require('./api/utilisateurController');
const voitureController = require('./api/voitureController');
const chauffeurController = require('./api/chauffeurController');
const connexionController = require('./api/connexionController');
const reservationController = require('./api/reservationController');

const app = express();
const port = 3000;
const localhost = `http://localhost:${port}`;

app.use(express.json());

// Define routes
app.use('/api/user', utilisateurController);
app.use('/api/car', voitureController);
app.use('/api/driver', chauffeurController);
app.use('/api/connexion', connexionController);
app.use('/api/reservation', reservationController);

app.listen(port, () => {
  console.log(`Server is listening on port ${localhost}`);
});

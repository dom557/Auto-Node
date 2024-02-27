const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbname = "Auto";

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let database, collection;

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        database = client.db(dbname);
        collection = database.collection("reservation");
    } catch (error) {
        console.error("Failed to connect to MongoDB server.");
        console.error(error);
        throw error;
    }
}
// Connect to MongoDB when the application starts
connectToMongoDB().catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});


// Get all reservations
router.get('/', async (req, res) => {
  try {
      if (!collection) {
          throw new Error("Collection is not initialized");
      }
      let reservations = await collection.find().toArray();
      res.status(200).json(reservations);
  } catch (err) {
      console.error(err);
      res.status(500).json({ "error": "Internal server error" });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
      let id = parseInt(req.params.id)
      let user = await collection.findOne({ id: id })
      res.status(200).json(reservation)
      }catch (err) {
      console.log(err)
      res.status(500).json({ "error": "Internal server error" })
      }
});

// Create a new reservation
router.post('/',  async (req, res) => {
  try {
      let reservations = await collection.find().toArray();
      let reservation = req.body
      let listOdIds = reservations.map(usr => usr.id)
      let maxID = listOdIds.reduce((acc,id) => Math.max(acc,id),-Infinity)
      reservation.id = maxID + 1
      await collection.insertOne(reservation);
      res.status(200).json(reservation);
  } catch (e) {
      console.log(e);
      res.status(500).json({ "error": 'Internal server error' });
  }
})


// Update an existing reservation
router.put("/:id",async(req,res)=>{
  try {
  let id = parseInt(req.params.id)
  let userUpdate = req.body
  userUpdate.id = id
  await collection.replaceOne({ id: id }, userUpdate)
  let user = await collection.find({ id }).toArray()
  res.status(200).json(user)
  } catch (err) {
  console.log(err)
  res.status(500).json({ "error": "Internal server error" })
  }
});

// Remove a user
router.delete("/:id",async(req,res)=>{
  try {
  let id = parseInt(req.params.id)
  await collection.deleteOne({ id: id })
  let reservations = await collection.find().toArray()
  res.status(200).json(reservations)
  } catch (err) {
  console.log(err)
  res.status(500).json({ "error": "Internal server error" })
  }
});

// Close MongoDB connection when the application exits
process.on('SIGINT', async () => {
  try {
      await client.close();
      console.log('MongoDB connection closed.');
      process.exit(0);
  } catch (err) {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
  }
});

module.exports = router;

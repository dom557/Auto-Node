const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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
        collection = database.collection("connexion");
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

//get all connexions
router.get('/', async (req, res) => {
  try {
      if (!collection) {
          throw new Error("Collection is not initialized");
      }
      let connexions = await collection.find().toArray();
      res.status(200).json(connexions);
  } catch (err) {
      console.error(err);
      res.status(500).json({ "error": "Internal server error" });
  }
});

// authentification email and password
router.post("/auth", async (req, res) => {
    // Get user's input from request body
    const { email, password } = req.body;
    
    // Check if inputs are empty
    if (!email || !password) {
        return res.sendStatus(400);
    }

    try {
        // Assuming your collection is named 'users'
        const user = await collection.findOne({ "email": email });

        if (!user) {
            return res.sendStatus(403);
        }

        // Check if password matches
        if (user.password !== password) {
            return res.sendStatus(401);
        }

        // Remove sensitive data
        delete user["Password"];

        // Send user data back to client
        res.json("user is authenticated");
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).send("Internal Server Error");
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

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
        collection = database.collection("cars");
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

// Get all cars
router.get('/', async (req, res) => {
    try {
        if (!collection) {
            throw new Error("Collection is not initialized");
        }
        let cars = await collection.find().toArray();
        res.status(200).json(cars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "error": "Internal server error" });
    }
});

// Get a single car by ID
router.get('/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let car = await collection.findOne({ id: id })
        res.status(200).json(car)
        }catch (err) {
        console.log(err)
        res.status(500).json({ "error": "Internal server error" })
        }
});

// Create a new car
router.post('/',  async (req, res) => {
    try {
        let cars = await collection.find().toArray();
        let car = req.body
        let listOdIds = cars.map(usr => usr.id)
        let maxID = listOdIds.reduce((acc,id) => Math.max(acc,id),-Infinity)
        car.id = maxID + 1
        await collection.insertOne(car);
        res.status(200).json(car);
    } catch (e) {
        console.log(e);
        res.status(500).json({ "error": 'Internal server error' });
    }
})


// Update an existing car
router.put("/:id",async(req,res)=>{
    try {
    let id = parseInt(req.params.id)
    let carUpdate = req.body
    carUpdate.id = id
    await collection.replaceOne({ id: id }, carUpdate)
    let car = await collection.find({ id }).toArray()
    res.status(200).json(car)
    } catch (err) {
    console.log(err)
    res.status(500).json({ "error": "Internal server error" })
    }
});

// Remove a car
router.delete("/:id",async(req,res)=>{
    try {
    let id = parseInt(req.params.id)
    await collection.deleteOne({ id: id })
    let cars = await collection.find().toArray()
    res.status(200).json(cars)
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

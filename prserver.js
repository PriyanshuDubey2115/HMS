// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017'; // MongoDB connection URL
const dbName = 'patientDatabase'; // Name of your MongoDB database

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submission and save data to MongoDB
app.post('/register', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);
        const collection = db.collection('patients'); // Collection to store patient data
        await collection.insertOne(req.body);
        client.close();
        res.send('Registration successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

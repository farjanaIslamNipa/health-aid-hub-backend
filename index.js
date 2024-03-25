const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId  } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db('assignment');
        const collection = db.collection('users');
        const supplies = db.collection('supplies');
        const donations = db.collection('donations');
        const comments = db.collection('comments');
        const testimonials = db.collection('testimonials');
        const volunteers = db.collection('volunteers');

        // User Registration
        app.post('/api/v1/register', async (req, res) => {
            const { name, email, password } = req.body;

            // Check if email already exists
            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists'
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into the database
            await collection.insertOne({ name, email, password: hashedPassword });

            res.status(201).json({
                success: true,
                message: 'User registered successfully'
            });
        });

        // User Login
        app.post('/api/v1/login', async (req, res) => {
            const { email, password } = req.body;

            // Find user by email
            const user = await collection.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Compare hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });

            res.json({
                success: true,
                message: 'Login successful',
                token
            });
        });


        // ==============================================================
        // WRITE YOUR CODE HERE
        // Add new supply
        app.post('/api/v1/create-supply', async (req,res) => {
            const {title} = req.body

            const existingSupply = await supplies.findOne({title})
            if(existingSupply){
                return res.status(400).json({
                    success: false,
                    message: 'This supply is already exists'
                })
            }

            await supplies.insertOne(req.body)

            res.status(200).json({
                success: true,
                message: 'New supply added successfully'
            })
        })

        // Get all supplies
        app.get('/api/v1/supplies', async (req, res) => {

            const result = await supplies.find().toArray()

            res.status(200).json({
                success: true,
                message: 'Supplies retrieved successfully',
                data: result
            })

        })

        // Get single supply
        app.get('/api/v1/supplies/:id', async(req, res) => {
            const {id} = req.params;

            const result = await supplies.findOne({_id: new ObjectId(id)})
            res.status(200).json({
                success: true,
                message: 'Supply retrieved successfully',
                data: result
            })
        })

        // Update supply
        app.put('/api/v1/update-supply/:id', async (req, res) => {
            const id = req.params.id
            const updatedData = req.body

            const result = await supplies.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedData }
            );

            if (result.modifiedCount === 0) {
                return res.status(404).json({ message: 'Data not found or no changes applied' });
            }
    
            res.status(200).json({
                success: true,
                message: 'Supply updated successfully',
                data: result
            })
        })

        // delete Supply
        app.delete('/api/v1/delete-supply/:id', async(req, res) => {
            const result = await supplies.deleteOne({ _id: new ObjectId(req.params.id) });

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Data not found' });
            }


            res.status(200).json({
                success: true,
                message: 'Supply deleted successfully',
                data: result
            })
        })

        // Get User 
        app.get('/api/v1/users', async(req, res) => {

            const users = await collection.find({},{projection: {name:1, email:1}}).toArray()

            res.status(200).json({
                success: true,
                message: 'Users retrieved successfully',
                users
            });
        })

        // Add Donation
        app.post('/api/v1/donate', async(req, res) => {
            await donations.insertOne(req.body)

            res.status(200).json({
                success: true,
                message: 'Donate successfully'
            })
        })

        // Get all donors
        app.get('/api/v1/leaderboard', async(req, res) => {
            const result = await donations.find().toArray()

            res.status(200).json({
                success: true,
                message: 'Donations retrieved successfully',
                donations: result
            })
        })

        // Post comments
        app.post('/api/v1/add-comment', async(req, res) => {
            await comments.insertOne(req.body)

            res.status(200).json({
                success: true,
                message: 'Comment published successfully',
            })
        })

        // Get comments
        app.get('/api/v1/comments', async(req, res) => {
           const result = await comments.find().toArray()

            res.status(200).json({
                success: true,
                message: 'Comments retrieved successfully',
                comments: result
            })
        })

        // Post Testimonial
        app.post('/api/v1/add-testimonial', async(req, res) => {
            await testimonials.insertOne(req.body)

            res.status(200).json({
                success: true,
                message: 'Testimonial added successfully',
            })
        })
        // Get Testimonials
        app.get('/api/v1/testimonials', async(req, res) => {
            const result = await testimonials.find().toArray()

            res.status(200).json({
                success: true,
                message: 'Testimonial retrieved successfully',
                testimonials: result
            })
        })

        // Register as volunteer
        app.post('/api/v1/add-volunteer', async(req, res) => {
            await volunteers.insertOne(req.body)

            res.status(200).json({
                success: true,
                message: 'Volunteer added successfully',
            })
        })
        // Get volunteers
        app.get('/api/v1/volunteers', async(req, res) => {
            const result = await volunteers.find().toArray()

            res.status(200).json({
                success: true,
                message: 'Volunteers retrieved successfully',
                volunteers: result
            })
        })

     
        // ==============================================================
        

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } finally {
    }
}

run().catch(console.dir);

// Test route
app.get('/', (req, res) => {
    const serverStatus = {
        message: 'Server is running smoothly',
        timestamp: new Date()
    };
    res.json(serverStatus);
});
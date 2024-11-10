// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');  // Import the CORS package

const app = express();
const PORT = process.env.PORT || 3000;  // Ensure the PORT works on Render as well

// Enable CORS for all origins (you can change '*' to your GitHub Pages domain for tighter security)
app.use(cors());  // This allows requests from any origin, including your GitHub Pages site

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public'))); // Ensure your static files are in the 'public' directory
app.use(bodyParser.json()); // Parse JSON bodies

// In-memory comments array (this will reset when the server restarts)
let comments = [];

// Serve the contact page (or your main HTML file)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Route to get all comments
app.get('/comments', (req, res) => {
    res.json(comments); // Return comments as JSON
});

// Route to post a new comment
app.post('/comments', (req, res) => {
    const { name, comment } = req.body;
    const date = new Date().toLocaleString(); // Get the current date and time
    const newComment = { name, comment, date };
    
    comments.push(newComment); // Add the new comment to the array
    res.json(comments); // Return the updated comments array as JSON
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

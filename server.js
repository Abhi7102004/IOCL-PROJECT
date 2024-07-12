// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Create connection to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@123',
    database: 'oracle'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database as id', connection.threadId);
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static('frontend'));

// Handle login request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error authenticating user:', err.stack);
            res.status(500).json({ success: false, error: err.message });
            return;
        }
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Handle saving dialogue data
app.post('/saveDialogue', (req, res) => {
    const { refNo, section, department, location, date, subject, perspective, proposal, conclusion, confidential } = req.body;

    const query = `INSERT INTO iocl (Ref_No, Section, Department, Location, Date, Subject, Perspective, Proposal, Conclusion, Confidential)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [refNo, section, department, location, date, subject, perspective, proposal, conclusion, confidential];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error saving dialogue data:', err.stack);
            res.status(500).json({ success: false, error: err.message });
            return;
        }
        console.log('Dialogue data saved successfully:', result);
        res.json({ success: true });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

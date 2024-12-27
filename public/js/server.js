const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite database (if not exists, it will be created)
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

// Create a table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    );
`);

// Route to handle signup
app.post('/signup', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error hashing password');

        // Insert user into the database
        db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
            if (err) {
                return res.status(500).send('Error signing up user');
            }
            res.status(200).send('Signup successful');
        });
    });
});

// Route to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            return res.status(500).send('Error querying database');
        }

        if (!row) {
            return res.status(400).send('User not found');
        }

        // Compare passwords
        bcrypt.compare(password, row.password, (err, result) => {
            if (err) return res.status(500).send('Error comparing passwords');
            if (result) {
                res.status(200).send('Login successful');
            } else {
                res.status(400).send('Invalid password');
            }
        });
    });
});

// Route for forgot password (just as an example, real implementation would require email functionality)
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    // Check if email exists in database
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            return res.status(500).send('Error querying database');
        }

        if (!row) {
            return res.status(400).send('Email not found');
        }

        // In a real application, we would send an email with a reset link here
        res.status(200).send('Password reset instructions sent');
    });
});

// Route to serve the home page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..','html', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

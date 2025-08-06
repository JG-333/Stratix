import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

// MySQL Connection
const sb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "react_auth"
});

// SIGNUP ROUTE
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

        sb.query(query, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Signup error:", err);
                return res.status(500).json({ error: "Signup failed" });
            }
            res.json({ message: "Signup successful" });
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// LOGIN ROUTE
app.post('/login', (req, res) => {
    const { name, password } = req.body;

    const query = 'SELECT * FROM users WHERE name = ?';
    sb.query(query, [name], async (err, results) => {
        if (err) return res.status(500).json({ error: "Login failed" });

        if (results.length === 0) {
            return res.status(401).json({ error: "User not found" });
        }

        const user = results[0];

        console.log("Entered password:", password);
        console.log("Hashed password from DB:", user.password);

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === 'production'
        });

        res.json({ message: "Login successful", token });
    });
});

// CHECK AUTH ROUTE 
app.get('/check-auth', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ authenticated: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ authenticated: false });
        } else {
            return res.json({ authenticated: true });
        }
    });
});

// VERIFY ROUTE 
app.get('/verify', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        res.status(200).json({ message: 'Authorized' });
    });
});

// LOGOUT ROUTE
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.VITE_DATABASE_URL,
});

pool.query(`
    CREATE TABLE IF NOT EXISTS public.users 
    (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS public.playlists 
    (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        movie_id INTEGER NOT NULL,
        movie_title TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS public.watch_later
    (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        movie_id INTEGER NOT NULL,
        movie_title TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );   
`);

const generateToken = (user) => {
    return jwt.sign({id: user.id, email: user.email}, process.env.VITE_JWT_SECRET, 
        {expiresIn: '1h',});
    }

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }
    try {
        req.user = jwt.verify(token, process.env.VITE_JWT_SECRET);
        next();
    } catch (error) {
        return res.status(403).json({message: 'Invalid token'});
    }
};


// register endpoint
app.post('/api/register', async (req, res) => {
    const {email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query(
            'INSERT INTO public.users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );
        res.status(201).json({
            token: generateToken(result.rows[0]),
            user: {id: result.rows[0].id, email: result.rows[0].email},
        });
    } catch (error) {
        if (error.code === '23505') { // Unique violation
            return res.status(409).json({message: 'Email already exists'});
        }
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});


// login endpoint

app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    const result = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    res.json({
        token: generateToken(user),
        user: {id: user.id, email: user.email},
    });
});

// watch_later endpoint
app.post('/api/watch_later', verifyToken, async (req, res) => {
    const {movie_id, movie_title} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO public.watch_later (user_id, movie_id, movie_title) VALUES ($1, $2, $3) RETURNING *',
            [req.user.id, movie_id, movie_title]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding to watch later:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

// get watch_later endpoint
app.get('/api/watch_later', verifyToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM public.watch_later WHERE user_id = $1',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching watch later:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

// delete watch_later endpoint
app.delete('/api/watch_later/:id', verifyToken, async (req, res) => {
    const {id} = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM public.watch_later WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, req.user.id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({message: 'Watch later item not found'});
        }
        res.json({message: 'Watch later item deleted successfully'});
    } catch (error) {
        console.error('Error deleting watch later item:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

// playlists endpoint
app.post('/api/playlists', verifyToken, async (req, res) => {
    const {movie_id, movie_title} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO public.playlists (user_id, movie_id, movie_title) VALUES ($1, $2, $3) RETURNING *',
            [req.user.id, movie_id, movie_title]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding to playlist:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});
// get playlists endpoint
app.get('/api/playlists', verifyToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM public.playlists WHERE user_id = $1',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});
// delete playlist endpoint
app.delete('/api/playlists/:id', verifyToken, async (req, res) => {
    const {id} = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM public.playlists WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, req.user.id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({message: 'Playlist item not found'});
        }
        res.json({message: 'Playlist item deleted successfully'});
    } catch (error) {
        console.error('Error deleting playlist item:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const axios = require('axios');
const User = require('../models/Users');

const authenticate = require("../middlewares/authRoutes");

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


router.post('/signup', authenticate, async (req, res) => {

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ name, email, password: hashedPassword });
        const token = generateToken(user);

        res.json({ token });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Signup First' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({ token });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/google', (req, res) => {
    const redirectUri = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(redirectUri);
});

router.get('/google/callback', async (req, res) => {

    const { code } = req.query;
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'
        });

        const { id_token } = response.data;
        const googleUser = jwt.decode(id_token);

        let user = await User.findOne({ googleId: googleUser.sub });
        if (!user) {
            user = await User.create({
                googleId: googleUser.sub,
                email: googleUser.email,
                name: googleUser.name
            });
        }

        const token = generateToken(user);
        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

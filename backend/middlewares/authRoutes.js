const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

export default authMiddleware = async (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = await User.findOne({ contact: decoded.user.contact });   

        next();
    } 
    catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};
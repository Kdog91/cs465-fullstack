const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Middleware to authenticate the JWT in the Authorization header
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.status(401).json({ message: 'Authorization header required' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        console.log('Malformed Auth Header');
        return res.status(401).json({ message: 'Invalid authorization header' });
    }

    jwt.verify(parts[1], process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            return res.status(401).json({ message: 'Token validation error' });
        }
        req.auth = verified;
        next();
    });
}

// Authentication endpoints
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// Trips: anyone can read, only logged-in users can change data
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(authenticateJWT, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip)
    .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
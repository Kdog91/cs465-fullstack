const passport = require('passport');
const User = require('../models/user');

// POST /api/register
const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields required' });
    }

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    try {
        await user.save();
        const token = user.generateJWT();
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(400).json(err);
    }
};

// POST /api/login
const login = (req, res) => {
    // Validate message to ensure that email and password are present.
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields required' });
    }

    // Delegate authentication to the passport module
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Error in authentication process
            return res.status(404).json(err);
        }
        if (user) {
            // Auth succeeded - generate JWT and return to caller
            const token = user.generateJWT();
            return res.status(200).json({ token });
        }
        // Auth failed
        return res.status(401).json(info);
    })(req, res);
};

module.exports = { register, login };
const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips - list all trips
const tripsList = async (req, res) => {
    const q = await Trip.find({}).exec();

    if (!q) {
        return res.status(404).json({ message: 'No trips found' });
    }
    return res.status(200).json(q);
};

// GET /api/trips/:tripCode - one trip by code
const tripsFindByCode = async (req, res) => {
    const q = await Trip.find({ code: req.params.tripCode }).exec();

    if (!q || q.length === 0) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(q);
};

module.exports = {
    tripsList,
    tripsFindByCode
};
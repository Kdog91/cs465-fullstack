const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips
const tripsList = async (req, res) => {
    const q = await Trip.find({}).exec();
    if (!q) {
        return res.status(404).json({ message: 'No trips found' });
    }
    return res.status(200).json(q);
};

// GET /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
    const q = await Trip.find({ code: req.params.tripCode }).exec();
    if (!q || q.length === 0) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(q);
};

// POST /api/trips
const tripsAddTrip = async (req, res) => {
    try {
        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
};

// PUT /api/trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true, runValidators: true }
        ).exec();
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
};

// DELETE /api/trips/:tripCode
const tripsDeleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        return res.status(204).send();
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
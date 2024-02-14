import Rooms from "../models/rooms.model.js";

export const createRoom = async (req, res, next) => {
    try {
        const room = await Rooms.create(req.body);
        return res.status(201).json(room);
    } catch (error) {
        next(error);
    }
};

export const getUserListing = async (req, res, next) => {
    if(req.user.id === req.params.id) {
        try {
            const listings = await Rooms.find({userRef: req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You can only view your own listings'));
    }  
};

export const getAllListings = async (req, res, next) => {
    try {
        const allListings = await Rooms.find();
        res.status(200).json(allListings);
    } catch (error) {
        next(error);
    }
};
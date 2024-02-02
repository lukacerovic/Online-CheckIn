import Rooms from "../models/rooms.model.js";

export const createRoom = async (req, res, next) => {
    console.log('Evo je soba');
    try {
        const room = await Rooms.create(req.body);
        return res.status(201).json(room);
    } catch (error) {
        next(error);
    }
};
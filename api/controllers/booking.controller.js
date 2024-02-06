import Booking from "../models/booking.model.js";
import Rooms from "../models/rooms.model.js";

export const createBooking = async (req, res, next) => {
    try {
        const booking = await Booking.create(req.body);
        return res.status(201).json(booking);
    } catch (error) {
        next(error);
    }
};

export const getBookingsInfo = async (req, res, next) => {
   
    try {
        const bookingDetails = await Booking.find({roomId: req.params.id});
        res.status(200).json(bookingDetails);
    } catch (error) {
        next(error);
    }
  
}

export const assignRoom = async (req, res, next) => {
    try {
        const room = await Rooms.findOne({ _id: req.params.roomId });
        if (!room) {
            return res.status(404).json({ message: 'Soba nije pronađena.' });
        }

        const availableRooms = room.availableRooms;
        const updatedAvailableRooms = availableRooms - 1;

        await Rooms.updateOne({ _id: req.params.roomId }, { availableRooms: updatedAvailableRooms });

        const booking = await Booking.findOne({ _id: req.params.id });

        if (!booking) {
            return res.status(404).json({ message: 'Rezervacija nije pronađena.' });
        }

        await Booking.updateOne({ _id: req.params.id }, { assignedRoom: availableRooms });
        return res.status(200).json({ message: 'Soba uspešno dodeljena rezervaciji.' });

    } catch (error) {
        next(error);
    }
};
import Booking from "../models/booking.model.js";

export const createBooking = async (req, res, next) => {
    console.log("BOOKING CONTROLLER", req.body);
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
        console.log("BOOKINGS Details", bookingDetails);
        res.status(200).json(bookingDetails);
    } catch (error) {
        next(error);
    }
  
}
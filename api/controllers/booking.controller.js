// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import Booking from "../models/booking.model.js";
import Rooms from "../models/rooms.model.js";
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import QRCode from "qrcode";

dotenv.config(); // Učitavanje vrednosti iz .env fajla

sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

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

        const touristEmail = booking.touristEmail;

        if (!booking) {
            return res.status(404).json({ message: 'Rezervacija nije pronađena.' });
        }

        await Booking.updateOne({ _id: req.params.id }, { assignedRoom: availableRooms });
        
        const sendEmailWithQRCode = async (receiver, qrCodeSVG) => {
            console.log(receiver);
            try {
                const msg = {
                    to: receiver,
                    from: 'snapinproject@gmail.com',
                    subject: 'QR Code for Your Room',
                    html: `<p>Dear Guest,</p><p>Please find attached your QR Code for accessing your room.This QR Code represents your room key:</p>`,
                    attachments: [
                        {
                            content: qrCodeSVG.toString('base64'), 
                            filename: 'qrcode.png',
                            type: 'image/png',
                            disposition: 'attachment'
                        }
                    ]
                };
                await sgMail.send(msg);
                console.log('Email sent successfully!');
            } catch (error) {
                console.error('Error sending email:', error);
            }
        };

        const generateQRCode = async () => {
            console.log('Generisanje QR KODA');
            try {
                const qrCodeURL = `http://localhost:5173/your-room/${req.params.roomId}/${updatedAvailableRooms}`;
             
                const qrCodeSVG = await QRCode.toBuffer(qrCodeURL, {
                    errorCorrectionLevel: 'H',
                    type: 'png',
                    quality: 1,
                    margin: 1,
                    scale: 1
                });
                await Booking.updateOne({ _id: req.params.id }, { qrCode: qrCodeURL });
                await sendEmailWithQRCode(touristEmail, qrCodeSVG);
        
            } catch (error) {
                console.error('Greška prilikom generisanja QR koda:', error);
            }
        };

        await generateQRCode();
  
        return res.status(200).json({ message: 'Soba uspešno dodeljena rezervaciji.' });

    } catch (error) {
        next(error);
    }
};

export const yourRoomDetails = async (req, res, next) => {
    try {
        const bookingDetails = await Booking.find({roomId: req.params.roomId});
        res.status(200).json(bookingDetails);
    } catch (error) {
        next(error);
    }
}
import mongoose from "mongoose";

// Schema / Rules
const bookingSchema = new mongoose.Schema({
    touristId: {
        type: String,
        requred: true,
    },
    touristEmail: {
        type: String,
        requred: true,
    },
    roomId: {
        type: String,
        requred: true,
    },
    touristName: {
        type: String,
        requred: true,
    },
    touristLastName: {
        type: String,
        requred: true,
    },
    touristSex: {
        type: String,
        requred: true,
    },
    touristPassportNo: {
        type: String,
        requred: true,
    },
    touristPassportCode: {
        type: String,
        required: true,
    },
    touristPassportType: {
        type: String,
        required: true,
    },
    touristDateOfBirth: {
        type: String,
        requred: true,
    },
    touristPersonalNo: {
        type: String,
        requred: true,
    },
    touristPlaceOfBirth: {
        type: String,
        requred: true,
    },
    touristNationality: {
        type: String,
        required: true,
    },
    passportDateOfIssue: {
        type: String,
        requred: true,
    },
    passportDateOfExpire: {
        type: String,
        requred: true
    },
    assignedRoom: {
        type: Number,
        requred: false,
    },

}, { timestamps: true });  // prilikom svakog rezultata koji se kreira ce beleziti i vreme kada se rezultat upisao i updatovao.


// creating model
const Booking = mongoose.model('Booking', bookingSchema);  

export default Booking; 
import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", // dodali smo sliku sa neta ako korisnik nema sliku da mu stoji ikonica korisnika bez slike
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        numberOfGuests: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        }, 
        includes: {
            type: Array,
            requred: true,
        },
        imageUrls: {
            type: Array,
            required: true
        },
        availableRooms: {
            type: Number,
            requred: true,
        },
        userRef: {
            type: String,
            required: true
        },

    }, {timestamps: true}

);

const Rooms = mongoose.model('Rooms', roomsSchema);

export default Rooms;
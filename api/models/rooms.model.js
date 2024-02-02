import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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
        userRef: {
            type: String,
            required: true
        },
    }, {timestamps: true}

);

const Rooms = mongoose.model('Rooms', roomsSchema);

export default Rooms;
import mongoose from "mongoose";

const touristSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    lastName: {
        type:String,
        requred: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:  true
    },
    gender: {
        type: String,
        requred: true
    }
}, { timestamps: true });

const Tourist = mongoose.model("Tourist", touristSchema);
export default Tourist;
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
    },
    type: {
        type: String,
        default: 'tourist'
    },
    profileImage: {
        type: String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    }
}, { timestamps: true });

const Tourist = mongoose.model("Tourist", touristSchema);
export default Tourist;
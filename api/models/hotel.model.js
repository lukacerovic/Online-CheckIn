import mongoose from "mongoose";

// Schema / Rules
const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
        unique: true  // da hotelName bude unikatan, dakle ne moze da bude dva rezultata sa istim usename vrednoscu u bazi
    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    password: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", // dodali smo sliku sa neta ako korisnik nema sliku da mu stoji ikonica korisnika bez slike
    },
    type: {
        type: String,
        default: 'hotel'
    }

}, { timestamps: true });  // prilikom svakog rezultata koji se kreira ce beleziti i vreme kada se rezultat upisao i updatovao.


// creating model
const Hotel = mongoose.model('Hotel', hotelSchema);  // naziv modela i rules.Naziv mora da bude sa singular navodnicima

export default Hotel; // koristimo default nacin exporta u reactu da bi mogli da koristimo Hotel model svuda u projektu
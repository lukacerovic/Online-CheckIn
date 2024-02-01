import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import hotelRouter from './routes/hotel.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config(); 

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Mongo DB');  // .then(() => ) ..... provera da smo se stvarno konektovali sa MongoDb-em
}).catch((err) => {  // u slucaju da nismo konektovani, da nam uhvati gresku
    console.log(err);
});

// Creating application
const app = express();

app.use(express.json());

// kreiramo rikvestove
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use("/api/hotel", hotelRouter);
app.use("/api/auth", authRouter);


// middlware
app.use((err, req, res, next) => {
    // err - error that is comming from the input of the middleware / error that we sent to the middleware
    // req - data from the browser or client
    // res - response from server to client
    // next - going to the next middleware
    const statusCode = err.statusCode || 500;  // ili err.statusCode, ako ga nema nek koristi 500
    const message = err.message || "Internal server error occurred!";  // ili greska ili u suprotnom tekst poruke
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
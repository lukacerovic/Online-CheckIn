import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import hotelRouter from './routes/hotel.route.js';

dotenv.config(); 

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Mongo DB');  // .then(() => ) ..... provera da smo se stvarno konektovali sa MongoDb-em
}).catch((err) => {  // u slucaju da nismo konektovani, da nam uhvati gresku
    console.log(err);
});

// Creating application
const app = express();

app.use(express.json());

app.use("/api/hotel", hotelRouter);

// kreiramo rikvestove
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

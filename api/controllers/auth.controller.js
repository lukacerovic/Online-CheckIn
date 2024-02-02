import Hotel from '../models/hotel.model.js';
import bcryptjs from 'bcryptjs';
import Tourist from '../models/tourist.model.js';
import jwt  from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signupHotel = async (req, res, next) => {  // kreiramo asinhronu zbog cuvanja podataka
    const { hotelName, email, password } = req.body;  // dograbimo vrednosti u varijable
    const hashedPassword = bcryptjs.hashSync(password, 10);  // drugi parametar (broj 10) predstavlja number of round for creating the salt
    // salt je hash broj ili hash varijabla koja ce biti ukljucen u nas password i napraviti ga enkriptovan

    // koriscenje modela korisnika za cuvanje podataka u bazi
    const newHotel = new Hotel({ hotelName, email, password: hashedPassword });
    try {
        // cuvanje rezultata
        await newHotel.save();
        res.status(201).json("Hotel created successfully");  // 201 - status da je nesto kreirano
    } catch (error) {
        next(error);
    }

};

export const signupTourist = async (req, res, next) => {
    const { name, lastName, email, password, gender, type } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); 

    const newTourist = new Tourist({ name, lastName, email, password:hashedPassword, gender, type });
    try{
        await newTourist.save();
        res.status(201).send('User added to database');
    } catch(error) {
        next(error);
    }
};

export const signinHotel = async(req, res, next) => {
    console.log('Hotel')
    const { email, password } = req.body;
    try{
        const validHotel = await Hotel.findOne({ email });
        console.log(validHotel);
        if (!validHotel) return next(errorHandler(404, 'User not found'));
        
        const validPassword = bcryptjs.compareSync(password, validHotel.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials'));
        
        const token = jwt.sign({ id: validHotel._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validHotel._doc;
        res.cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

    } catch (error) {
        next(error);
    }
};


export const signinTourist = async (req, res, next) => {
    console.log('Evo turiste')
    const { email, password } = req.body;
    try{
        const validTourist = await Tourist.findOne({ email });
        console.log(validTourist);
        if (!validTourist) return next(errorHandler(404, 'User not found'));
        
        const validPassword = bcryptjs.compareSync(password, validTourist.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials'));
        
        const token = jwt.sign({ id: validTourist._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validTourist._doc;
        res.cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

    } catch (error) {
        next(error);
    }
};

export const signoutUser = async (req, res, next) => {
    // clear cookie
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out')
    } catch (error) {
        next(error);
    }
};

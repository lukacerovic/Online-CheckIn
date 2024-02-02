import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {

    // taking token from a cookie (for that we need package: 'npm i cookie-parser')
    const token = req.cookies.access_token;  // jer smo ga mi nazvali access_token prilikom kreiranja 

    // verifying token
    if (!token) return next(errorHandler(401, "Unauthorized")); // ako nema tokena, pozivamo errorHandler iz error.js iz utils foldera

    // ako ima tokena:
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // ako ima greske
        if (err) {
            console.log('Ovde je greska:')
            return next(errorHandler(403, 'Token not valid'));
        }
        
        req.user = user; 
        next(); 
    });
};
import Tourist from "../models/tourist.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';


export const updateTourist = async (req, res, next) => {
   
    // ako dobijemo rikverst (preko req.user = user iz naseg verifyUser.js)
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account')); // ako id koji prosledjujemo iz verifyUser.js (preko req.user = user) nije isti kao id koji ce se naci u url-u (ovde: /update/:id koji smo definisali u user.route.js) onda vrati gresku
    
    // ako je pravi korisnik, sprovodimo update:
    try {
        // ako korisnik hoce da promeni sifru, moramo da ga enkriptujemo:
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const existingUser = await Tourist.findById(req.params.id);
        console.log(existingUser);
        if (!existingUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const updatedTourist = await Tourist.findByIdAndUpdate(req.params.id, {
            // koristimo set da bi promenili samo vrednosti koje su menjane, ne sve
            $set:{
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                profileImage: req.body.profileImage,
            },
        }, {new: true});  // ovo ce sacuvati korisnika sa novim informacijama, ne sa prethodnim
        
        // odvajamo password od ostatka:
        const {password, ...rest} = updatedTourist._doc;

        res.status(200).json(rest);
    
    } catch (error) {
        next(error);
    }

};

export const deleteTourist = async (req, res, next) => {
  
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account')); 
    try {
        // pokusavamo da obrisemo korisnika
        await Tourist.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');  // brisemo kolacic korisnika zajedno sa njim
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error)
    }
}
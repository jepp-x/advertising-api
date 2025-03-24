import { userModel } from '../model/usermodel.js'
import { expressjwt } from 'express-jwt'

// authenticate user  at signup/register
export const isAuthenticated = expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"]
});

export const isAuthorized = (roles) => {
    return async (req, res, next) => {
        const user = await userModel.findById(req.auth.id);

        if (roles?.includes(user.role)) {
            next();
        } else {
            res.status(403).json("You have to be Authorized")
        }
    }
}

//vendorand admin access [post get put patch delete ]
export const checkAdminOrVendor = (req, res, next) => {
    if (req.user && (req.user.role == 'admin' || req.user.role == 'vendor')) {
        next();
    } else {
        res.status(403).json({ message: 'Access Denined!, Only Admin or Vendor' });
    }
};
//admin Only to delete prmanently 
export const checkAdminOnly = (req, res, next) => {
    if(req.user && req.user.role == 'admin') {
        next(); //allow access
    }else {
        return res.json({message:'Access denied!, Amins only', status:'error'})
    }
};
import jwt from 'jsonwebtoken';
import User from '../../DB_Models/user-model.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    //read JWT from Cookie
    token = req.cookies.jwt;

    if (token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();

        }catch(error){
            res.status(401);
            throw new Error("Unauthorized");
        }
    }else{
        res.status(401)
        throw new Error("Unauthorized, No Token Found");
    }
});

const authorizeAdmin = (req, res, next) => {

    if(req.user && req.user.isAdmin) {
        next();
    }else{
        res.status(401).send("Not authorized as Admin");
    }
};

export { authenticate, authorizeAdmin };
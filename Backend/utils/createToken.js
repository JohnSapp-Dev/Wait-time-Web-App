import jwt from "jsonwebtoken"


const generateToken = (res, userId) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET, {expiresIn: '1d'});

    // Set JWT as an HTTP-only Cookie
    res.cookie('JWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 86400});

    return token;
};

export default generateToken;
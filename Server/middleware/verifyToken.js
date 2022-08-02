/* 
 * MIDDLEWARE FUNCTIONS TO AUTHORIZE USER AND ADMIN
 */

// IMPORT 
const expressJwt = require("express-jwt");

//VALIDATE TOKEN
const requireSignin = expressJwt({
    secret: process.env.JWT_SEC,
    userProperty: "auth",
});

//CHECK FOR AUTHORISED USER
const isAuth = (req, res, next) => {
    //COMPARE THE USER FROM REQUEST AND LOGGED IN USER
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    //console.log("3" + req.profile._id)
    if (!user) {
        return res.status(403).json({
            error: "Access denied",
        });
    }
    next();
};

//CHECK FOR ADMIN
const isAdmin = async(req, res, next) => {
    //IF ROLE IS OTHER THAN 0 THEN THE USER IS ADMIN
    if (req.profile.role === 0)
        return res.status(403).send({ message: "Admin resources, Acess denied!" });
    next();
};

module.exports = { requireSignin, isAdmin, isAuth };
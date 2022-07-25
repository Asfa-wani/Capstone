const expressJwt = require("express-jwt");
const { User, validate } = require("../models/user");
const requireSignin = expressJwt({
    secret: process.env.JWT_SEC,
    userProperty: "auth",
});


const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    console.log(req.auth)
    console.log(req.profile)
        //console.log("3" + req.profile._id)
    console.log(req.auth._id)
    if (!user) {
        return res.status(403).json({
            error: "Access denied",
        });
    }
    next();
};

const isAdmin = async(req, res, next) => {
    if (req.profile.role === 0)
        return res.status(403).send({ message: "Admin resources, Acess denied!" });
    next();
};

module.exports = { requireSignin, isAdmin, isAuth };
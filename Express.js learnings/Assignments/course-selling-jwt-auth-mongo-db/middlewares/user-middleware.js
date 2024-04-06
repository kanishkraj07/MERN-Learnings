const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} =  require("../config");

async function isUserAuthenticated(req, res, next) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.slice(7);
    try {
        jwt.verify(token, JWT_SECRET_KEY);
        next();
    } catch(e) {
    res.status(403).json({
        msg: "Unauthorized user"
    });
  }
 }

 module.exports = isUserAuthenticated;
 
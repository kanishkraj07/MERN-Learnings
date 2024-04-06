const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../config");

async function isAdminAuthenticated(req, res, next) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.slice(7);
    try {
        jwt.verify(token, JWT_SECRET_KEY);
        next();
    } catch(e) {
    res.status(403).json({
        msg: "Unauthorized admin"
    });
  }
 }

 module.exports = isAdminAuthenticated;
 
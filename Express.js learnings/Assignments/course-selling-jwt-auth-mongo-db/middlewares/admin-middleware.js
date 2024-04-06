const jwt = require("jsonwebtoken");
const SECRET_KEY = 'V9BmsENzLL/Js+Lf9ygRhXDOO6KIPNpZ38p2WS26ynG8SXtBr+Ajci+COTV3JT4Y';

async function isAdminAuthenticated(req, res, next) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.slice(7);
    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch(e) {
    res.status(403).json({
        msg: "Unauthorized admin"
    });
  }
 }

 module.exports = isAdminAuthenticated;
 
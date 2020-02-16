const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // set token from header
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json('Access denied. No access token.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json('Invalid token.');
    }    
}
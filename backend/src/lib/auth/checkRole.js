"use strict";

const jwt = require('jsonwebtoken');
const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process
let decoded;

module.exports = function checkRole(roles){
    { return function(req, res, next) {
        const token = req.headers.authorization;
        try {
            decoded = jwt.verify(token, jwtSecret);
        }catch(e) {
            return next(e);
        }

        for(let role of roles) {
            if (decoded.role === role) {
                return next();
            }
        }
        return next({
            message: 'Forbidden. There was no valid role found for the given request.',
            statusCode: 403
        });
    }}
};
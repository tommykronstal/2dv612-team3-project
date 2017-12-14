"use strict";

const auth = require('./Auth');
const jwt = require('jsonwebtoken');
const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process
let decoded;
let role;

class CheckRole {

    checkApiUser(roles){
        { return function(req, res, next) {
            for (role of roles){
                if (decoded.role === role) {
                    return next();
                }
            }
            returnForbidden(next);
        }}
    }

    checkApiCompany(roles){
        { return function(req, res, next) {

            for(role of roles) {
                if (role === "ADMIN"){
                    return next();
                }else if (decoded.role === role) {
                    return auth.apiCompany(req, res, next, role);
                }
            }
            returnForbidden(next);
        }}
    }

    checkApiCategory(roles) {
        { return function(req, res, next) {

            for(let role in roles) {
                if (role === "ADMIN"){
                    return next();
                }else if (decoded.role === role) {
                    return auth.apiCategory(req, res, next);
                }
            }
            returnForbidden(next);
        }}
    }

    checkApiMaterial(roles) {
        { return function(req, res, next) {

            for(let role in roles) {
                if (role === "ADMIN" || role === "COMPANY_REP"){
                    return next();
                }else if (decoded.role === role) {
                    return auth.apiMaterial(req, res, next);
                }
            }
            returnForbidden(next);
        }}
    }

    checkApiProduct(roles){
        { return function(req, res, next) {

            for(let role in roles) {
                if (role === "ADMIN" || role === "COMPANY_REP"){
                    return next();
                }else if (decoded.role === role) {
                    return auth.apiProduct(req, res, next);
                }
            }
            returnForbidden(next);
        }}
    }

    async getToken(req, next) {
        const token = req.headers.authorization;
        try {
            decoded = await jwt.verify(token, jwtSecret);
            return next();
        }catch(e) {
            return next(e);
        }
    }
}

function returnForbidden(next) {
    return next({
        message: 'Forbidden. There was no valid role found for the given request.',
        statusCode: 403
    });
}



module.exports = new CheckRole();
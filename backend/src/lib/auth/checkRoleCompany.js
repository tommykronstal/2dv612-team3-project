"use strict";

const companyFacade = require('../../model/company/facade');
const userFacade = require('../../model/user/facade');
const jwt = require('jsonwebtoken');
const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process
let decoded;

module.exports = async function apiCompany(req, res, next){
    const companyId = req.param('id');
    const token = req.headers.authorization;
    let company;
    let user;

    try {
        decoded = jwt.verify(token, jwtSecret);
        //If user is ADMIN continue
        if (decoded.role === 'ADMIN'){
            return next();
        }

        //Get the Company provided in the url
        company = await companyFacade.findOne({ _id: companyId });
        if (!company) return next({message: 'Invalid Company ID', statusCode: 401});

        //Get the user that is logged in
        user = await userFacade.findOne({ email: decoded.email });
        if (!user) return next({message: 'Invalid token', statusCode: 401 });
    }catch (e){
        return next({
            message: e.message,
            statusCode: 500
        });
    }

    if (decoded.role === 'COMPANY_REP') {
        //Check if the user is a rep in the company provided by the url
        if (company.reps.indexOf(user._id.toString()) === -1){
            return next({ message: 'Forbidden. Company rep ID does not match the User ID', statusCode: 403 });
        }

        //Everything looks good continue.
        return next();
    }else if (decoded.role === 'COMPANY_ADMIN') {
        //Check if the user is a admin in the company provided by the url
        if (user._id.toString() !== company.admin.toString()){
            return next({ message: 'Forbidden. Company admin ID does not match the User ID', statusCode: 403 });
        }

        //Everything looks good continue.
        return next();
    }else {
        return next({
            message: 'Forbidden. There was no valid role found for the given request.',
            statusCode: 403
        });
    }
};
const companyFacade = require('../../model/company/facade');
const userFacade = require('../../model/user/facade');

const jwt = require('jsonwebtoken');
const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process
let decoded;

class Authorization {

    async apiCompany(req, res, next, role){
        const companyId = req.url.substring(13, 37) || "default";
        let company;
        let user;

        try {
            //Get the Company provided in the url
            company = await companyFacade.findOne({ _id: companyId });
            if (!company) return next({message: 'Invalid Company ID', statusCode: 401});

            //Get the user that is logged in
            user = await userFacade.findOne({ email: decoded.email });
            if (!user) return next({message: 'Invalid token', statusCode: 401 });

        }catch (e){
            return next(e);
        }

        if (role === 'COMPANY_REP' && (req.url !== "/api/company/" + companyId || req.url !== "/api/company/")) {
            //Check if the user is a rep in the company provided by the url
            if (company.reps.indexOf(user._id.toString()) === -1){
                return next({ message: 'Forbidden. Company rep ID does not match the User ID', statusCode: 403 });
            }

            //Everything looks good continue.
            return next();
        }else if (role === 'COMPANY_ADMIN' && req.url === '/api/company/' + companyId) {
            //Check if the user is a admin in the company provided by the url
            if (user._id.toString() !== company.admin.toString()){
                return next({ message: 'Forbidden. Company admin ID does not match the User ID', statusCode: 403 });
            }

            //Everything looks good continue.
            return next();
        }else {
            // Space for future auth on company admin/rep outside of the company route
            return next({
                message: 'Forbidden. There was no valid role found for the given request.',
                statusCode: 403
            });
        }
    }

    apiCategory(req, res, next) {
        if (req.url.indexOf('/api/category') > - 1 && req.method === 'GET') {
            return next();
        }
    }

    apiMaterial(req, res, next) {
        if (req.url.indexOf('/api/product/material') > - 1 && req.method === 'GET') {
            return next();
        }
    }

    apiProduct(req, res, next) {
        if ((req.url.indexOf('/api/product/') > - 1 || req.url === 'api/search') && req.method === 'GET') {
            return next();
        }
    }

    //Basic auth for every role and route.
    async authorize(req, res, next) {
        if (req.headers.authorization === undefined) {
            return next({message: 'There was no token in the header', statusCode: 401 });
        }

        const token = req.headers.authorization;

        try {
            decoded = await jwt.verify(token, jwtSecret);

            const mongoGetUserQuery = {
                $and: [
                    { 'email': decoded.email },
                    { 'role': decoded.role }
                ]
            };

            const user = await userFacade.findOne(mongoGetUserQuery);
            if (!user) return next({ error: true, message: 'Invalid token', statusCode: 401});
        } catch(e) {
            return next(e);
        }
    }
}

module.exports = new Authorization();

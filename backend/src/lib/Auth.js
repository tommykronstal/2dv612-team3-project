const companyFacade = require('../model/company/facade');
const userFacade = require('../model/user/facade');

const jwt = require('jsonwebtoken');
const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process
let decoded;

class Authorization {

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

            //Let any user get all categories and products
            if ((req.url.indexOf('/api/category') > - 1 && req.method === 'GET' || req.url.indexOf('/api/product') > - 1)) return next();
            
            return checkRole(req, res, next);
        } catch(e) {
            return next(e);
        }
    }
}

async function checkRole(req, res, next) {
    const companyId = req.url.substring(13, 37) || "default";
    const productId = req.url.substring(46);
    let company;
    let user;

    if (decoded.role === 'ADMIN') return next();

    if (decoded.role === 'USER') return next({ message: 'Forbidden', statusCode: 403});

    if ((decoded.role === 'COMPANY_REP' || decoded.role === 'COMPANY_ADMIN') && (req.url.indexOf('/api/company/' + companyId) > -1 )){
        try {
            //Get the Company provided in the url
            company = await companyFacade.findOne({ _id: companyId });
            if (!company) return next({message: 'Invalid Company ID', statusCode: 401});

            //Get the user that i logged in
            user = await userFacade.findOne({ email: decoded.email });
            if (!user) return next({message: 'Invalid token', statusCode: 401 });

        }catch (e){
            return next(e);
        }

        if (decoded.role === 'COMPANY_REP' && (req.url === "/api/company/" + companyId + "/product"
                || req.url === "/api/company/" + companyId + "/product/" + productId)) {
            //Check if the user is a rep in the company provided by the url
            if (company.reps.indexOf(user._id.toString()) === -1){
                return next({ message: 'Forbidden. Company rep ID does not match the User ID', statusCode: 403 });
            }

            //Everything looks good continue.
            return next();
        }else if (decoded.role === 'COMPANY_ADMIN' && req.url === '/api/company/' + companyId) {
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
    }else {
        // Reject the request since no role was matched
        return next({
            message: 'Forbidden. There was no valid role found for the given request.',
            statusCode: 403
        });
    }
}

module.exports = new Authorization();

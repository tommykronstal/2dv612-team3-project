const userFacade = require('../../model/user/facade');

const jwt = require('jsonwebtoken');
const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process
let decoded;

module.exports = async function authorize(req, res, next) {
    const token = req.headers.authorization;

    if (token === undefined) {
        return next({message: 'There was no token in the header', statusCode: 401 });
    }

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
        res.locals.email = decoded.email;
        res.locals.role = decoded.role;
        res.locals.user = user;

        return next();
    } catch(e) {
        return next(e);
    }
};
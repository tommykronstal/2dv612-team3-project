const companyFacade = require('../../model/company/facade');
const userFacade = require('../../model/user/facade');

const jwt = require('jsonwebtoken');
const jwtSecret = 'keyboardcat'; // todo should be in a .env or config file or read from process

class Authorization {

    authorize(req, res, next) {
        if (req.headers.authorization === undefined) {
            return res.status(401).json({ error: true, message: 'There was no token in the header' });
        }

        const token = req.headers.authorization;
        let decoded;

        try {
            decoded = jwt.verify(token, jwtSecret);
        } catch (e) {
            return res.status(401).json({ error: true, name: e.name, message: e.message });
        }

        const mongoUserQuery = {
            $and: [
                { 'email': decoded.email },
                { 'role': decoded.role }
            ]
        };

        userFacade.findOne(mongoUserQuery).then((doc) => {
            if (!doc) return res.status(401).json({ error: true, message: 'Invalid token' });

            return checkRole(req, res, next, decoded);
        }).catch(() => res.status(500).json({ error: true }));
    }
}

function checkRole(req, res, next, decoded) {
    const companyId = req.url.substring(13);

    if (decoded.role === 'ADMIN') return next();

    if (decoded.role === 'USER') return res.status(403).json({ error: true, message: 'Forbidden' });

    if (decoded.role === 'COMPANY_REP') return res.status(403).json({
        error: true,
        message: 'Forbidden'
    });

    if (decoded.role === 'COMPANY_ADMIN' && req.url === '/api/company/' + companyId) {

        companyFacade.findOne({ _id: companyId }).then((doc) => {
            if (!doc) return res.status(401).json({error: true, message: 'Invalid Company ID'});

            userFacade.findOne({ email: decoded.email }).then((user) => {
                if (!user) return res.status(401).json({ error: true, message: 'Invalid token' });

                if (user._id.toString() !== doc.admin.toString()) {
                    return res.status(403).json({ error: true, message: 'Forbidden. Company admin ID does not match the User ID' });
                }

                return next();
            }).catch((error) => res.status(500).json({
                error: true,
                message: 'Error: Cant find the given admin' + error
            }));

        }).catch(() => res.status(500).json({error: true, message: 'Error: Cant find the given company'}));
    } else {
        return res.status(403).json({
            error: true,
            message: 'Forbidden. There was no valid role found for the given request.'
        });
    }
}

module.exports = new Authorization();
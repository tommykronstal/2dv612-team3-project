let validateError = require('../lib/validateError');
let Auth = require('../lib/auth/Auth');

let _req = {
    _startTime: Date,
    app: function(req,res){},
    headers: {},
    method: String,
    next: function next(err){},
    url: String
};
let _res = {};

describe('test validateError', () => {
    it('CastError should return statusCode 400', () => {
        let err = new Error();
        err.name = 'CastError';
        validateError(err);
        expect(err.statusCode).toBe(400);
    });

    it('ValidationError should return statusCode 402', () => {
        let err = new Error();
        err.name = 'ValidationError';
        validateError(err);
        expect(err.statusCode).toBe(402);
    });

    it('JsonWebTokenError should return statusCode 401', () => {
        let err = new Error();
        err.name = 'JsonWebTokenError';
        validateError(err);
        expect(err.statusCode).toBe(401);
    });
});

describe('test Auth', () => {
    it('should return 401 for missing token', () => {
        Auth.authorize(_req, _res, function(err) {
            expect(err.statusCode).toBe(401);
            expect(err.message).toBe("There was no token in the header");
        });
    });
    it('should return no error for valid token', () => {
        _req.headers.authorization = "eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiIiLCJlbWFpbCI6ImhlakBoZWouY29tIiwicm9sZSI6IlVTRVIiLCJ1c2VySWQiOiI1YTFmMDVhODM5MmRmZTI3ZjhkNzNmNmEifQ.w6qbIy00V6u6nyqhdXb2G5sk2F86k9AVmEZQF7bDcnQ";
        let auth = Auth.authorize(_req, _res, function(err) {
            expect(err).toBe(null);
        });
    });
});

"use strict";

/**
 * Please put any unhandled Errors in here and assign them a statusCode
 * Optional change the message of the error.
 * @param err
 */
function validateError(err) {
    if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "The given input was not valid.";
    }

    if (err.name === "ValidationError") {
        err.statusCode = 402;
    }

    if (err.name === "JsonWebTokenError"){
        err.statusCode = 401;
    }
}

module.exports = validateError;
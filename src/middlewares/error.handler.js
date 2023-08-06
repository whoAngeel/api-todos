const debug = require("debug")("error-handler");

function logErrors(err, req, res, next) {
	debug(err.message);
	next(err);
}

function errorHandler(err, req, res, next) {
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
}

module.exports = { logErrors, errorHandler };
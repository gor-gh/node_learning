const httpStatus = require('http-status-codes');

exports.pageNotFound = (req, res) => {
	res.status(httpStatus.NOT_FOUND);
	res.render('error');
}
exports.internalServerError = (error, req, res, next) => {
	res.status(httpStatus.INTERNAL_SERVER_ERROR);
	console.log(`There was an internal server error: ${error.stack}`);
	res.send(`Sorry our application is taking a nap: ${httpStatus.INTERNAL_SERVER_ERROR}`);
}
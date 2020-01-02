const fs = require('fs'),
	httpStatus = require('http-status-codes'),
	contentTypes = require('./contentTypes');
	module.exports = {
		getFile : (fileName,res) => {
			fs.readFile(fileName,(err,data) => {
				if(err){
					res.writeHead(httpStatus.INTERNAL_SERVER_ERROR,contentTypes.html);
					res.end('<h1>There is no such file</h1>');
				}
				else
					res.end(data);
			})
		}
	}
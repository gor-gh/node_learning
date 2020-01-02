const httpStatus = require('http-status-codes');
htmlContentType = {
	'Content-Type' : 'text/html'
}
routes = {
	"GET" : {
		'/info' : (req,res) => {
			res.writeHead(httpStatus.OK,{
				'Content-Type' : 'text/plain'
			});
			res.end("Welcome to info page");
		}
	},
	"POST" : {}
}

exports.handle = (req,res) => {
	try{
		if(routes[req.method][req.url]){
			routes[req.method][req.url](req,res);
		}
		else{
			res.writeHead(httpStatus.NOT_FOUND,htmlContentType);
			console.log(req.url)
			res.end('<h1>Sorry file not found</h1>');
		}
	}
	catch(ex){
		console.log(' error: ' + ex);
	}
}
exports.get = (url,action) => {
	routes["GET"][url] = action;
}
exports.post = (url,action) => {
	routes["POST"][url] = action;
}
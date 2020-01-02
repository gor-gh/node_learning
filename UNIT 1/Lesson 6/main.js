const http = require('http'),
	httpStatus = require('http-status-codes'),
	fs = require('fs'),
	port  = 3000,
	getViewUrl = url => {
		return `views${url}.html`
	};
	http.createServer((req,res) => {
		let viewUrl = getViewUrl(req.url);
		fs.readFile(viewUrl,(error,data) => {
			if(error){
				res.writeHead(httpStatus.NOT_FOUND);
				res.end('<h1>Sorry the page was not found</h1>')
			}
			else {
				res.writeHead(httpStatus.OK,{
					'Content-Type' : 'text/html'
				});
				res.end(data);
			}
		})
	})
	.listen(port,() => {
		console.log(`The server is listening on port : ${port}`);
	})

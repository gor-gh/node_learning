let routeResponseMap = {
	"/" : "<h1>Welcome!</h1>",
	"/info" : "<h1>info page</h1>",
	"/about" : "<h1>about page</h1>",
	"/contact" : "<h1>contact page</h1>",
	"/error" : "<h1>this is a special error page</h1>"
};
const port = 3000,
		http = require('http'),
		httpStatus = require('http-status-codes'),
		app = http.createServer((req,res) => {
			res.writeHead(httpStatus.OK,{
				'Content-Type' : 'text/html'
			});
			if(routeResponseMap[req.url]){
				res.end(routeResponseMap[req.url]);
			}
			else {
				res.end("<h1>Sorry this page isn't exists!</h1>");
			}
		}).listen(port,() => {
				console.log(`Server is running at port \` ${port} `);
			})
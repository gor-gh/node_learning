const http = require('http'),
		httpStatus = require('http-status-codes'),
		port = 3000,
		app = http.createServer(),
		getJSONString = obj => {
			return JSON.stringify(obj,null,2);
		}
app.on('request',(req,res) => {
	let body = [];
	req.on('data',(chunk) => {
		body.push(chunk);
	});
	req.on('end',() => {
		body = Buffer.concat(body).toString();
		console.log(`Request body contains : ${body}`)
	})
	console.log(`Request's method is : ${getJSONString(req.method)}`);
	console.log(`Request's url is : ${getJSONString(req.url)}`);
	console.log(`Request's headers is : ${getJSONString(req.headers)}`);
	res.writeHead(httpStatus.OK,{
		'Content-Type' : 'text/html' 
	});
	let responseMessage = '<h1>This will show on the screen</h1>';
	res.end(responseMessage);
});
app.listen(port,() => {
	console.log(`The server is running on port number : ${port}`);
})
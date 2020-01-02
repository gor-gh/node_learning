const port = 3000;
const http = require('http');
const httpStatus = require('http-status-codes');
app = http.createServer((req,res) => {
	console.log('request received!');
	res.writeHead(httpStatus.OK,{
		'Content-Type' : 'text/html'
	});
	let responseMessage = '<h1>Hello,Universe</h1>';
	res.write(responseMessage);
	res.end();
	console.log(`Request Sent : ${responseMessage}`);
});
app.listen(port,() => {
	console.log(`Server is running at port \` ${port} `);
})
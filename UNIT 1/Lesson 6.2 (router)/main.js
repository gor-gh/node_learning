const http = require('http'),
	fs = require('fs'),
	httpStatusCodes = require('http-status-codes'),
	router = require('./router'),
	port = 3000,
	plainTextContentType = {
		"Content-Type" : "text/plain"
	},
	htmlContentType = {
		"Content-Type" : "text/html"
	},
	sendErrMsg = res => {
		res.writeHead(httpStatusCodes.NOT_FOUND,{
			"Content-Type" : "text/html"
		});
		res.end('<h1>No such file</h1>')
	}
	customReadFile = (filePath,res) => {
		if( fs.existsSync(filePath) ) { 
			fs.readFile(filePath,(err,data) => {
				if(err){
					console.log(err);
					sendErrMsg(res);
					return;
				}
				res.end(data);
			})
		}
		else {
			sendErrMsg(res);
		}
	};
	router.get("/",(req,res) => {
		res.writeHead(httpStatusCodes.OK,plainTextContentType);
		res.end("index");
	});
	router.get('/index.html',(req,res) => {
		res.writeHead(httpStatusCodes.OK,htmlContentType);
		customReadFile(`./views/index.html`,res);
	});
	router.post('/',(req,res) => {
		res.writeHead(httpStatusCodes.OK,plainTextContentType);
		res.end('posted!!');
	});
	http.createServer(router.handle).listen(port,() => {
		console.log(`The server is loistening to port number : ${port}`);
	});
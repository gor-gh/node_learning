const http = require('http'),
	fs = require('fs'),
	httpStatus = require('http-status-codes'),
	port = 3000,
	sendErrorMsg = res => {
		res.writeHead(httpStatus.NOT_FOUND,{
			'Content-Type' : 'text/html'
		});
		res.end('<h1>File not found</h1>');
	},
	customReadFile = (filePath,res) => {
		if(fs.existsSync(filePath)){
			fs.readFile(filePath,(err,data) => {
				if( err ) {
					console.log(err);
					sendErrorMsg(res);
					return;
				}
				res.end(data);
			});
		}
		else {
			sendErrorMsg(res)
		}
	};
	http.createServer((req,res) => {
		let url = req.url;
		if( url.indexOf('.html') !== -1){
			res.writeHead(httpStatus.OK,{
				'Content-Type' : 'text/html'
			});
			customReadFile(`./views${url}`,res);
		}
		else if(url.indexOf('.js') !== -1){
			res.writeHead(httpStatus.OK,{
				'Content-Type' : 'text/javascript'
			});
			customReadFile(`./public/js${url}`,res);
		}
		else if(url.indexOf('.css') !== -1){
			res.writeHead(httpStatus.OK,{
				'Content-Type' : 'text/css'
			});
			customReadFile(`./public/css${url}`,res);			
		}
		else if(url.indexOf('.png') !== -1){
			res.writeHead(httpStatus.OK,{
				'Content-Type' : 'image/png'
			});
			customReadFile(`./public/images${url}`,res);
		}
		else {
			sendErrorMsg(res);
		}
	}).listen(port,() => {
		console.log(`The server is listening to port number \` ${port}`);
	});
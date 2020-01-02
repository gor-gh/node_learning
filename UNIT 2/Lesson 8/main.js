const port = 3000,
	express = require('express'),
	app = express();
	app.get('/',(req,res) => {
		res.send('Hello Universe!!!');
	})
	.listen(port,() => {
		console.log(`The server is listening to port number ${port}`);
	}) 
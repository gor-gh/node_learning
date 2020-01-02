const layouts = require('express-ejs-layouts'),
	express = require('express'),
	homeController = require('./controllers/homeController'),
	errorController = require('./controllers/errorController'),
	app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(layouts);


app.get('/', homeController.loadHomePage);
app.get('/courses', homeController.showCourses);
app.get('/contact', homeController.showSignUp);
app.post('/contact', homeController.postedSignUpForm);

app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
	console.log(`The server is running at port : ${app.get('port')}`);
});

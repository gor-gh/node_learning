const layouts = require('express-ejs-layouts'),
	express = require('express'),
	mongoose = require('mongoose'),
	homeController = require('./controllers/homeController'),
	subscriberController = require('./controllers/subscriberController'),
	errorController = require('./controllers/errorController'),
	app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
	"mongodb://localhost:27017/confetti_cuisine",
	{ useNewUrlParser: true }
);


app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());

app.get('/', homeController.loadHomePage);
app.get('/courses', homeController.showCourses);
app.get('/subscribers', subscriberController.getAllSubscribers);
app.get('/contact', subscriberController.getSubscriptonPage);
app.get('/subscribe', subscriberController.afterSubscription);
app.post('/subscribe', subscriberController.saveSubscriber);


app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
	console.log(`The server is running at port : ${app.get('port')}`);
});

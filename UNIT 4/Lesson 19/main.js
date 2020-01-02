const layouts = require('express-ejs-layouts'),
	express = require('express'),
	mongoose = require('mongoose'),
	homeController = require('./controllers/homeController'),
	subscriberController = require('./controllers/subscriberController'),
	userController = require('./controllers/userController'),
	errorController = require('./controllers/errorController'),
	app = express(),
	router = express.Router();

mongoose.Promise = global.Promise;
mongoose.connect(
	"mongodb://localhost:27017/confetti_cuisine",
	{ useNewUrlParser: true }
);

// helper middlewares
app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());
app.use('/', router);

//routes
router.get('/', homeController.loadHomePage);
router.get('/courses', homeController.showCourses);
router.get('/subscribers', subscriberController.getAllSubscribers);
router.get('/contact', subscriberController.getSubscriptonPage);
router.get('/subscribe', subscriberController.afterSubscription);
router.post('/subscribe', subscriberController.saveSubscriber);
router.get('/users', userController.index, userController.indexView);
router.get('/users/new', userController.new);
router.post('/users/create', userController.create, userController.redirectView);

//error handling
app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

//configuring server to listen to specified port
app.listen(app.get('port'), () => {
	console.log(`The server is running at port : ${app.get('port')}`);
});

const layouts = require('express-ejs-layouts'),
	express = require('express'),
	expressSession = require('express-session'),
	cookieParser = require('cookie-parser'),
	connectFlash = require('connect-flash'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	homeController = require('./controllers/homeController'),
	subscribersController = require('./controllers/subscribersController'),
	usersController = require('./controllers/usersController'),
	coursesController = require('./controllers/coursesController'),
	errorController = require('./controllers/errorController'),
	app = express(),
	router = express.Router();

mongoose.Promise = global.Promise;
mongoose.connect(
	"mongodb://localhost:27017/confetti_cuisine",
	{ useNewUrlParser: true }
);

app.set('port', process.env.PORT || 3000);

//additionally installed middlewares
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["GET", "POST"] }));
app.use("/", router);

//Session and cookie
router.use(cookieParser('this0_passcode1_is2_very3_hard4_to5_guess6'));
router.use(expressSession({
	secret: 'this0_passcode1_is2_very3_hard4_to5_guess6',
	cookie: {
		maxAge: 4000000
	},
	resave: false,
	saveUninitialized: false
}));
router.use(connectFlash());

router.use((req, res, next) => {
	res.locals.flashMessages = req.flash();
	next();
})
// ROUTERS



//home page
router.get('/', homeController.index);

//subscriber's routes

router.get('/subscribers', subscribersController.index, subscribersController.indexView);
router.get('/subscribers/new', subscribersController.new);
router.post('/subscribers/create', subscribersController.create, subscribersController.redirectView);
router.get('/subscribers/:id', subscribersController.show, subscribersController.showView);
router.get('/subscribers/:id/edit', subscribersController.edit);
router.put('/subscribers/:id/update', subscribersController.update, subscribersController.redirectView);
router.delete('/subscribers/:id/delete', subscribersController.delete, subscribersController.redirectView);

//user's routes

router.get('/users', usersController.index, usersController.indexView);
router.get('/users/new', usersController.new);
router.post('/users/create', usersController.create, usersController.redirectView);
router.get('/users/:id', usersController.show, usersController.showView);
router.get('/users/:id/edit', usersController.edit);
router.put('/users/:id/update', usersController.update, usersController.redirectView);
router.delete('/users/:id/delete', usersController.delete, usersController.redirectView);

router.get('/courses', coursesController.index, coursesController.indexView);
router.get('/courses/new', coursesController.new);
router.post('/courses/create', coursesController.create, coursesController.redirectView);
router.get('/courses/:id', coursesController.show, coursesController.showView);
router.get('/courses/:id/edit', coursesController.edit);
router.put('/courses/:id/update', coursesController.update, coursesController.redirectView);
router.delete('/courses/:id/delete', coursesController.delete, coursesController.redirectView);




app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
	console.log(`The server is running at port : ${app.get('port')}`);
});

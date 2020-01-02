let courses = [
	{
		title: 'Event Driven Course',
		cost: 50
	},
	{
		title: 'Asynchronus artichoke',
		cost: 25
	},
	{
		title: 'Object Oriented orange juice',
		cost: 10
	}
];
exports.loadHomePage = (req, res) => {
	res.render('index');
}
exports.showCourses = (req,res) => {
	res.render('courses',{offeredCourses : courses});
}
exports.showSignUp = (req,res) => {
	res.render('contact');
}
exports.postedSignUpForm = (req,res) => {
	res.render('thanks');
}
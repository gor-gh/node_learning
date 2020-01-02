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
module.exports = {
	showCourses: (req, res) => {
		res.render('courses', { offeredCourses: courses });
	},
	loadHomePage: (req, res) => {
		res.render('index');
	}
}


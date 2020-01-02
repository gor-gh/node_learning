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
	index: (req, res) => {
		res.render('index');
	}
}

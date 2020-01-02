const Course = require('../models/course'),
    getCourseParams = (body) => {
        return {
            title: body.title,
            description: body.description,
            maxStudents: body.maxStudents,
            cost: body.cost
        };
    }
module.exports = {
    index: (req, res, next) => {
        Course.find({})
            .then(courses => {
                res.locals.courses = courses;
                next();
            })
            .catch(error => {
                console.log(`Error finding courses: ${error.message}`);
                next(error);
            })
    },
    indeView: (req, res) => {
        res.render('courses/index');
    },
    new: (req, res) => {
        res.render('courses/new');
    },
    create: (req, res, next) => {
        let courseParams = getCourseParams(req.body);
        Course.create(courseParams)
            .then(course => {
                res.locals.redirect = "/courses";
                res.locals.course = course;
                next();
            })
            .catch(err => {
                console.log(`Error creating course:${err.message}`);
                next(err);
            })
    },
    redirectView: (req, res, next) => {
        if (res.locals.redirect)
            res.redirect(res.locals.redirect);
        else next();
    },
    show: (req, res, next) => {
        let courseId = req.params.id;
        Course.findById(courseId)
            .then(course => )
    }
}
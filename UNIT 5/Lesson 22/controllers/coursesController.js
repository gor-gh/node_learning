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
    indexView: (req, res) => {
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
            .then(course => {
                res.locals.course = course;
                console.log(course);
                next();
            })
            .catch(err => {
                console.log(`Error while fetching course by id : ${err.message}`);
                next(err);
            })
    },
    showView: (req, res) => {
        res.render('courses/show');
    },
    edit: (req, res, next) => {
        let courseId = req.params.id;
        Course.findById(courseId)
            .then(course => {
                res.locals.course = course;
                res.render('courses/edit');
            })
            .catch(err => {
                console.log(`Error while finding course: ${err.message}`);
                next(err);
            })
    },
    update: (req, res, next) => {
        let courseId = req.params.id,
            courseParams = getCourseParams(req.body);
        Course.findByIdAndUpdate(courseId, {
            $set: courseParams
        })
            .then(course => {
                res.locals.redirect = `/courses/${course._id}`;
                res.locals.course = course;
                next();
            })
            .catch(err => {
                console.log(`Error while updating course info: ${err.message}`);
                next(err);
            })
    },
    delete: (req, res, next) => {
        let courseId = req.params.id;
        Course.findByIdAndRemove(courseId)
            .then(() => {
                res.locals.redirect = '/courses';
                next();
            })
            .catch(err => {
                console.log(`Error while deleting course: ${err.message}`);
                next(err);
            })
    }
}
const validator = require('../helpers/validate');

const saveUser = (req,res,next) => {
    const validationRule = {
        name: 'required|string',
        email: 'required|email',
        username: 'required|email',
        ipaddress: 'required|string',
    };
    validator(req.body,validationRule,{},(err,status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });

        } else {
            next();
        }
    });
};

const saveBook = (req,res,next) => {
    const validationRule = {
        title: 'required|string',
        authorId: 'required|email',
        genre: 'required|email',
        year: 'required|string',
    };
    validator(req.body,validationRule,{},(err,status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });

        } else {
            next();
        }
    });
};

const saveAuthor = (req,res,next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
    };
    validator(req.body,validationRule,{},(err,status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });

        } else {
            next();
        }
    });
};

module.exports = {
    saveUser,
    saveAuthor
};

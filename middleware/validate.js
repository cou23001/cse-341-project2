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

const saveReporter = (req,res,next) => {
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
    saveReporter
};

const eventSchema = require("./JoiSchema")

exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized, Login First!' });
    }
    next();
};


exports.eventValidator = (req, res, next) => {
    let { error } = eventSchema.validate(req.body);
    if (error) {
        let result = error.details.map((el) => el.message).join(",");
        return res.status(400).json({
            message: result,
        });
    } else {
      next();
    }
  };
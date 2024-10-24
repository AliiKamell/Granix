const appError = require("../utilities/appError");

module.exports = (...roles) => {
  return (req, res, next) => {    
    if (!roles.includes(req.currentUser.role)) {
      return next(appError.create("this role is not autherized", 401));
    }
    next();
  };
};

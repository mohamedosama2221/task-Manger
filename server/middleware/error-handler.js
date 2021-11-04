const { StatusCodes } = require("http-status-codes");

module.exports.errorHandler = (err, req, res, next) => {
  let errorObject = {
    StatusCodes: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Sorry something went wrong please try again",
  };

  return res
    .status(errorObject.statusCode)
    .json({ success: false, msg: errorObject.message });
};

const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;

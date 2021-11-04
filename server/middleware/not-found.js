const { StatusCodes } = require("http-status-codes");

module.exports.notFound = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).send("<h1>404 this page not found</h1>");

const HttpError = require("../helpers/HttpError.js");

const isEmptyFavoriteBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "missing field favorite"));
  }
  next();
};

module.exports = isEmptyFavoriteBody;

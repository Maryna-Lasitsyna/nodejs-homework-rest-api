module.exports.handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

module.exports.runValidatorsAtUpdate = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};

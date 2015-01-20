module.exports = function(app) {
  require('./pages')(app);
  require('./service')(app);
};

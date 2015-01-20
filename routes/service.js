var yelp = require('yelp-service/yelp').createYelpClient();
    Q = require('q');



module.exports = function(app) {
  app.get('/api/yelp', function(req, res, err) {
    // var deferred = Q.defer();
    yelp.search(req.query).then(function(data) {
      if (data.businesses.length) {
        res.status(200).send(data);
      }
    });
  });
};

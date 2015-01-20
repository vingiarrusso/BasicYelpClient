var express = require('express'),
    path = require('path'),
    http = require('http'),
    logger = require('morgan'),
    swig = require('swig'),
    request = require('request'),
    cookieParser = require('cookie-parser');
    bodyParser = require('body-parser');

var app = express();

// view engine setup
app.engine('html', swig.renderFile);
app.set('port', '3333');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('json spaces', 4);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/index')(app);

var server = http.createServer(app);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
    app.emit('started', server);
});

module.exports = app;

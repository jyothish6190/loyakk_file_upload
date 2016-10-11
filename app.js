var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));
var multer = require('multer');
var port = 3000;

app.set('port', port); 

/* Disk Storage engine of multer gives you full control on storing files to disk. The options are destination (for determining which folder the file should be saved) and filename (name of the file inside the folder) */

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'public/uploads');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, Date.now() + '-' + file.originalname);
  }
});

/*Multer accepts a single file with the name photo. This file will be stored in request.file*/

var upload = multer({storage: storage}).any();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Showing index.html file on our homepage
app.get('/', function(resuest, response) {
      response.sendFile(path.join(__dirname + '/file.html'));
});

//Posting the file upload
app.post('/upload', function(request, response) {
  upload(request, response, function(err) {
  if(err) {
    console.log(err);
    return;
  }
  console.log(request.file);
  console.log(request.files);
  response.json({'path' : request.files[0].path});
  console.log('Photo Uploaded');
  })
});

var server = app.listen(port, function () {
  console.log('Listening on port ' + server.address().port)
});
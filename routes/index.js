var express = require('express');
var multer = require('multer');
var path = require("path");
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var upload = multer({ storage: storage});

/* GET home page. */
router.get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname + '/file.html'));
});

router.post('/upload', upload.any(), function (req, res, next) {
  res.send(req.files);
});

module.exports = router;

var express = require('express');
var multer = require('multer');
var path = require("path");
var router = express.Router();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

/* GET home page. */
router.get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname + '/file.html'));
});

router.post('/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const http = require('http');
const formidable = require('formidable');

var folder;
// Donate page
router.get('/', function(req, res){
      res.render('uploadchooser', {
      });
});

router.get('/:folder', function(req, res){
    folder = req.params.folder;
    res.render('uploads', {
        folder: folder
    });
});

// Save uploads file
router.post('/uploads', function(req, res, next){
    var it = this;
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/../public/downloads/' + folder + '/' + file.name;
    });
    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });
});
module.exports = router;
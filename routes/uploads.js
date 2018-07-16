const express = require('express');
const router = express.Router();
const http = require('http');
const formidable = require('formidable');
const path = require('path');

var folder;
// Donate page
router.get('/', ensureAuthenticated, function(req, res){
      res.render('uploadchooser', {
      });
});

router.get('/:folder', ensureAuthenticated, function(req, res){
    folder = req.params.folder;
    res.render('uploads', {
    });
});

// Save uploads file
router.post('/uploads', function(req, res, next){
    var it = this;
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file){
        if (folder == "heoress" || folder == "hachayal") {
            file.path = path.join(__dirname, '/../','public/downloads/', folder , '/' , file.name);
        } else{
            file.path = path.join(__dirname , '/../','public/img/yeshiva/', file.name);
        }
    });
    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name + 'to folder:'+ folder);
        res.redirect('/uploads');
    });
});



// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      res.redirect('/users/login');
    }
  }
module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require('fs');

// page
router.get('/', function(req, res){
    hachyalfiles = fs.readdirSync(__dirname + "/../public/downloads/hachayal");
    heoressfiles = fs.readdirSync(__dirname + "/../public/downloads/heoress");
    
    res.render('downloads', {
        hachyalfiles: hachyalfiles,
        heoressfiles: heoressfiles
      });
});

module.exports = router;
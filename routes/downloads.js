const express = require('express');
const router = express.Router();
const fs = require('fs');

// page
router.get('/', function(req, res){
    files = fs.readdirSync(__dirname + "/../public/downloads/hachayal");
    res.render('downloads', {
        files: files
      });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// page
router.get('/', function(req, res){
    hachyalfiles = fs.readdirSync(path.join(__dirname, "/../","public/downloads/hachayal"));
    heoressfiles = fs.readdirSync(path.join(__dirname, "/../","public/downloads/heoress"));
    
    res.render('downloads', {
        hachyalfiles: hachyalfiles,
        heoressfiles: heoressfiles
      });
});

module.exports = router;
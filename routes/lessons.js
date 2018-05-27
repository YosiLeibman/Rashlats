const express = require('express');
const router = express.Router();

// User Model
let User = require('../models/user');

// Donate page
router.get('/lessons', function(req, res){
      var videos = { };
      res.render('lessons', {
            videos: videos
      });
});

module.exports = router;
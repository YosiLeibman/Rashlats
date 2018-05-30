const express = require('express');
const router = express.Router();

// User Model
let User = require('../models/user');

// Donate page
router.get('/donate', function(req, res){
      res.render('donate', {
      });
});

router.post('/donate', function(req, res){
     
});
module.exports = router;
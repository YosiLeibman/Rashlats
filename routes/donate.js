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
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var time = req.body.time;
    req.checkBody('name', 'נא למלא שם').notEmpty();
    req.checkBody('phone', 'נא למלא מספר פלאפון').notEmpty();
    req.checkBody('email', 'נא למלא כתובת דוא"ל').notEmpty();
    req.checkBody('email', 'כתובת דואל לא תקינה, נא הזן שנית').isEmail();    
 
    var errors = req.validationErrors();  
    if(errors){
        res.render('donate', {
            errors:errors
        });
    } else {
        // nodemailer here
    }
});
module.exports = router;
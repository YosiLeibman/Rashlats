var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

//import  user schema
var User = require('../models/user');

router.get('/register', function(req,res){
    res.render('register');
});

router.post('/register', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();    
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'password not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors){
        res.render('register', {
            errors:errors
        });
    }else{
        var newUser = new User({
            name:name,
            email:email,
            username:username,
            password:password
        });

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }

                newUser.password = hash;

                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        req.flash('success','you are now registred and can log in');
                        res.redirect('/users/login');
                    }
                });
            });
        })
    }
    
});

// login form
router.get('/login', function(req, res){
    res.render('login');
});

// login process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// profile page
router.get('/profile', function(req, res){
    if (res.locals.user === null || res.locals.user === undefined) {
        res.redirect('/');
    } else{
        res.render('profile');
    }
});

//edit profile
// Update Submit POST Route
router.post('/profile/:id', function(req, res){
    let CurrUser = {};
    CurrUser.name = req.body.name;
    CurrUser.password = req.body.password;

    // form validation
    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'password not match').equals(req.body.password);

    var errors = req.validationErrors();
    
    if (errors){
        res.render('profile', {
            errors:errors
        });
    } else{
        // generate the hash
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(CurrUser.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                // put the hash back in the password variable
                CurrUser.password = hash;

                // update
                let query = {_id:req.params.id}

                User.update(query, CurrUser, function(err){
                  if(err){
                    console.log(err);
                    return;
                  } else {
                    req.flash('success', 'profile Updated');
                    res.redirect('/');
                  }
                });
            });
        })
    }
});

// logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'you are logged out');
    res.redirect('/users/login');
});

module.exports = router;
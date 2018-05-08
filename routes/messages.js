const express = require('express');
const router = express.Router();

// Message_model Model
let Message_model = require('../models/Message_model');

// User Model
let User = require('../models/user');

// Messages page    // maybe move it to app.js becauseits ugly url?
router.get('/news', function(req, res){
  Message_model.find({}, function(err, messages){
    if(err){
      console.log(err);
    } else {
      res.render('messages', {
        messages: messages
      });
    }
  });
});

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
  res.render('add_msg');
});

// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('title','נא להוסיף כותרת').notEmpty();
  req.checkBody('body','נא להוסיף הודעה').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_msg', {
      title:'Add Message',
      errors:errors
    });
  } else {
    let message = new Message_model();
    message.title = req.body.title;
    message.body = req.body.body;

    message.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Article Added');
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Message_model.findById(req.params.id, function(err, message){
    res.render('edit_msg', {
      message:message
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  let message = {};
  message.title = req.body.title;
  message.body = req.body.body;

  let query = {_id:req.params.id}

  Message_model.update(query, message, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Message Updated');
      res.redirect('/messages/news');
    }
  });
});

// Delete Message
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Message_model.findById(req.params.id, function(err, article){
      Message_model.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
  });
});

// // Get Single Article  - needed????????????????????
// router.get('/:id', function(req, res){
//   Message_model.findById(req.params.id, function(err, message){
//     res.render('messages', {
//       messages: messages
//     });
//   });
// });

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
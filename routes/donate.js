const express = require('express');
const router = express.Router();
const fs = require('fs');
const nodemailer = require("nodemailer");


var html;
var sponser = {};
var markup;
// User Model
let User = require('../models/user');

// Donate page
router.get('/donate', function(req, res){
      res.render('donate', {
      });
});

fs.readFile('./email/dntemail.html', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    html = data;
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
    sponser = {
        name: name,
        email: email,
        phone: phone,
        time: time
    };

     markup = `
        <div class="person">
            <h2>
               שם:  ${sponser.name}
            </h2>
            <p>דוא"ל:  ${sponser.email}</p>
            <p > פלאפון: ${sponser.phone}</p>
            <p > שעה נוחה ליצירת קשר: ${sponser.time}</p>
            
        </div>
`;

    var errors = req.validationErrors();  
    if(errors){
        res.render('donate', {
            errors:errors
        });
    } else {
        res.redirect('/');
        console.log(sponser);
        fs.writeFile('./logs/donates/' + name + '.txt', JSON.stringify(sponser), function (err){
            if (err) throw err;
                console.log("saved!");
                sendMailToYeshiva(markup);
                sendMailToPerson(name, email, html);
            })
            res.end();
        };
      
        function sendMailToYeshiva(sponser){
        // create reusable transport method (opens pool of SMTP connections)
        var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                     user: 'rashlatsyeshiva@gmail.com',
                     pass: 'rashlats'
                }
        });
      
          // setup e-mail data with unicode symbols
          var mailOptions = {
          from: "yeshiva ✔ <rashlatsyeshiva@gmail.com>", // sender address
          to: "yosil.770@gmail.com", // list of receivers
          subject: "תמיכה בישיבה", // Subject line
          html: markup // html body
          };
      
          // send mail with defined transport object
          transporter.sendMail(mailOptions, function (err, info) {
              if(err)
                console.log(err)
              else
                console.log(info);
           });
      }
      
      function sendMailToPerson(name, email, html){
          // create reusable transport method (opens pool of SMTP connections)
          var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                     user: 'rashlatsyeshiva@gmail.com',
                     pass: 'rashlats'
                 }
          });
      
          // setup e-mail data with unicode symbols
          var mailOptions = {
          from: "yeshiva ✔ <rashlatsyeshiva@gmail.com>", // sender address
          to: email, // list of receivers
          subject: "שלום " + name, // Subject line
          html: html // html body
          };
      
          // send mail with defined transport object
          transporter.sendMail(mailOptions, function (err, info) {
              if(err)
                console.log(err)
              else
                console.log(info);
           });
      
    }
});
module.exports = router;
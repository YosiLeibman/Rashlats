const express = require('express');
const router = express.Router();
const fs = require('fs');
const nodemailer = require("nodemailer");

// Donate page
router.get('/regtoyeshiva', function(req, res){
      res.render('regtoyeshiva', {
      });
});

router.post('/regtoyeshiva', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var time = req.body.time;

    var student = {
        name: name,
        email: email,
        phone: phone,
        time: time
    };

    // req.checkBody('name', 'נא למלא שם').notEmpty();
    // req.checkBody('phone', 'נא למלא מספר פלאפון').notEmpty();
    // req.checkBody('email', 'נא למלא כתובת דוא"ל').notEmpty();
    // req.checkBody('email', 'כתובת דואל לא תקינה, נא הזן שנית').isEmail();    
 
    // var errors = req.validationErrors();  
    // if(errors){
    //     res.render('donate', {
    //         errors:errors
    //     });
    // } else {
    //     // nodemailer here
    //     console.log(name, email, phone, time);
         console.log(student);
         res.redirect('/');
        fs.writeFile('./logs/' + name + '.txt', JSON.stringify(student), function (err){
            if (err) throw err;
            console.log("saved!");
            sendMailToYeshiva();
            sendMailToPerson(name, email);
        })
         res.end();
        
    // }
});

function sendMailToYeshiva(){
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
    subject: "Hello ✔", // Subject line
    html: "<b>Hello world ✔</b>" // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}

function sendMailToPerson(name, email){
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
    subject: "שלום "+name+"✔", // Subject line
    html: "<b>בקשת הרישום התקבלה בהצלחה, נציג הישיבה יצור עימכם קשר בהקדם</b>" // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });

}
module.exports = router;
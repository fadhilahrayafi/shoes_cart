"use strict";
const nodemailer = require("nodemailer");

function mailer(email, message) {


    console.log("<<<masuk")
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'shoecartz@gmail.com', // generated ethereal user
            pass: 'lalala12-' // generated ethereal password
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: 'shoecartz@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Shoe Cart", // Subject line
        text: "Hello world?", // plain text body
        html: message
    }

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('email sent');
        }
    })
}

// mailer("fadhilahrayafi@gmail.com", "oiiii masuk kan")

module.exports = mailer
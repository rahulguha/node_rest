/**
 * Created by rahulguha on 23/02/14.
 */
var nodemailer = require('nodemailer');
var util = require('../util/util.js')
var log4js = require('log4js');


// set up logger
var logger = log4js.getLogger("email");
logger.setLevel(util.get_logging_level());


// Create a SMTP transport object
var transport = nodemailer.createTransport("SMTP", {
     //service: 'Gmail', // use well known service.
    // If you are using @gmail.com address, then you don't
    // even have to define the service name
    auth: {
        user: util.get_email_info().sending_email,// "nodeemailer@gmail.com",
        pass: util.get_email_info().password
    }
});
logger.info("SMTP Configured");

// Message object
exports.set_message = function (mail_payload){
    var from_address = "'" + util.get_email_info().sender_name +  "<" + util.get_email_info().sender_email + ">'";
    logger.info(from_address);
    var message = {

    // sender info
    from: from_address,

    // Comma separated list of recipients
    to: '"Receiver Name" <rahul@annectos.in>',

    // Subject of the message
    subject:  mail_payload.subject +  ' ✔', //

    headers: {
        'X-Laziness-level': 1000
    },

    // plaintext body
    text: 'Hello to myself!',

    // HTML body
    html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
        '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@node"/></p>',

    // An array of attachments
    attachments:[

        // String attachment
        {
            fileName: 'notes.txt',
            contents: 'Some notes about this e-mail',
            contentType: 'text/plain' // optional, would be detected from the filename
        },

        // Binary Buffer attachment
        {
            fileName: 'image.png',
            contents: new Buffer('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC', 'base64'),

            cid: 'note@node' // should be as unique as possible
        }

        // File Stream attachment
//        {
//            fileName: 'nyan cat ✔.gif',
//            filePath: __dirname+"/nyan.gif",
//            cid: 'nyan@node' // should be as unique as possible
//        }
    ]
};
    return message;
}

console.log('Sending Mail');
exports.send_email = function(message){
    //console.log(message);
    transport.sendMail(message, function(error){
        if(error){
            console.log('Error occured');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');

        // if you don't want to use this transport object anymore, uncomment following line
        //transport.close(); // close the connection pool
    });
}
/**
 * Created with JetBrains WebStorm.
 * User: Rahul
 * Date: 22/2/14
 * Time: 6:16 AM
 * To change this template use File | Settings | File Templates.
 */
/* The API controller
 Exports 3 methods:
 * post - Creates a new thread
 * list - Returns a list of threads
 * show - Displays a thread and its posts
 */
var log4js = require('log4js');
var jade = require('jade'),
    fs = require('fs');

var util = require('../util/util.js');
var email = require('../email/m.js');
var payload = require('../model/mail_payload.js');
var cat = require('../model/category.js');

var logger = log4js.getLogger("api");
logger.setLevel(util.get_logging_level());
//var Post = require('../models/post.js');

//exports.post = function(req, res) {
//    new Thread({title: req.body.title, author: req.body.author}).save();
//}

exports.cat_list = function(req, res) {
    cat
        .find()
        //.populate('id name description')
        .select ('id name description -_id')
        .exec (function(err, cats){
            logger.info("category list returned");
            res.send(cats);
        });
};
exports.email = function() {
    fs.readFile('./email_template/greetings.jade', 'utf8', function (err, data) {
        if (err) {
                logger.info(err)
                throw err;
            };

        var options ={};
        options.filename =  util.get_email_templating_engine("jade").config.template_path ;
        var fn = jade.compile(data, options);
        var html = fn({name:'Tabbu'});
        payload.Mail_payload("rahul@annectos.in, rahul.guha@gmail.com", "", "This is a good subject", html);
        var msg = email.set_message(payload);

        email.send_email(msg);
        logger.info("email sent successfully. ")
        logger.info(html)
    });

    //res.send("email sent");

};
// first locates a thread by title, then locates the replies by thread ID.
//exports.cat_by_id = (function(req, res) {
//    cat.findOne({id: req.params.id}, cats) {
//            res.send([{thread: thread, posts: posts}]);
//});
//}
//// first locates a thread by title, then locates the replies by thread ID.
//exports.show = (function(req, res) {
//    Thread.findOne({title: req.params.title}, function(error, thread) {
//        var posts = Post.find({thread: thread._id}, function(error, posts) {
//            res.send([{thread: thread, posts: posts}]);
//        });
//    })
//});
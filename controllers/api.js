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
var util = require('../util/util.js')

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
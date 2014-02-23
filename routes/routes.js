/**
 * Created with JetBrains WebStorm.
 * User: Rahul
 * Date: 21/2/14
 * Time: 9:06 PM
 * To change this template use File | Settings | File Templates.
 */
//var cat = require('../schema/category.js');
var api = require('../controllers/api.js');
exports.send_email = function(req, res) {
    console.log("routes.send_email");
    api.email();
    res.send("Email Sent");
};
exports.findAll = function(req, res) {
    console.log("routes.findAll");
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};

exports.findById = function(req, res) {
    console.log("routes.findbyId");
    res.send({id:req.params.id, name: "The Name", description: "description"});
};

exports.cat = function(req, res) {
    api.cat_list(req,res);
//    var q = cat.find();
//    q.select('id Name description');
//    q.exec(function (err, cats) {
//        if (err) return handleError(err);
//        res.send(cats);
//    })

//    cat.find(function(err, cats) {
//        console.log("cat");
//        res.send(cats);
//    });
    //res.send({id:req.params.id, name: "The Name", description: "description"});
};
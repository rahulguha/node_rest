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
//var fs = require ("fs");
var mysql = require("../db_connect/mysql.js");
var util = require('../util/util.js');
var cat = require('../model/category.js');
var product = require('../model/product.js');

var claim = require('../model/claim.js');

var logger = util.get_logger("api");


//********************  get  methods   *************************************
var claim_field_list = "claim_id user_id claim_details supporting_doc_list workflow -_id";
    exports.cat_list = function(req, res) {
    cat
        .find()
        .select ('id name description -_id')
        .exec (function(err, cats){
            logger.info("category list returned");
            res.send(cats);
        });
    }; //mongo db get method example


    exports.claim_list = function (req, res) {
        claim
            .find()
            .select('claim_id user_id company active claim_details supporting_doc_list workflow -_id')
            .exec(function (err, claims) {
                logger.info("claim list returned");
                res.send(claims);
            });
    };

    // implementation using schema and promise. Use this example
    exports.claims_by_company = function (req, res) {
         //claim.find( function (err, results){
        claim.find_claims_by_company(req.params.company)
            .then (
                function (results){
                    send_to_response(results, res);
                },
                function (err){
                    res.send(err);
                }

        );
    };

// implementation using schema and promise. Use this example
exports.get_prod_by_cat_id = function (req, res) {
    console.log(req.params.limit);
    // find skip
    if ((req.params.limit == undefined) || (req.params.limit == 0)) {
        product.get_prod_by_cat_id_no_limit(req.params.cat_id)
            .then(
            function (results) {
                if (results.length > 0) {
                    send_to_response(results, res);
                }
                else {
                    send_empty_recordset(res);
                }
            },
            function (err) {
                res.send(err);
            }
        );
    }
    else {
        var limit = sanitize_limit(req);
        var skip =  sanitize_skip(req);
        product.get_prod_by_cat_id(req.params.cat_id, limit, skip)
            .then(
            function (results) {
                if (results.length > 0) {
                    send_to_response(results, res);
                }
                else {
                    send_empty_recordset(res);
                }
            },
            function (err) {
                res.send(err);
            }
        );

    }
};
    // todo - depricate this method
    exports.claim_list_by_company = function (req, res) {
        var q ="{'company': '" + req.company +"','active' : 1 }";
        //var q ={'company': '" + company +"','active' : 1 }";
        claim
            .find(q)
            .select(claim_field_list)
            .exec(function (err, claims) {
                logger.info("claim list returned");
                res.contentType('application/json');
                res.send( claims);
            });
    };


//******************** end  get *************************************

//********************  post methods   *************************************
    exports.user_login = function(req, res) {
    var conn = mysql.get_mysql_connection();
    var sql = "call user_login ('" + req.body.email_id + "','" + req.body.password + "','" + req.body.login_date
                + "','"+ util.new_uuid() + "',0, 'wipro', '');"
        //conn.query("select * from user_registration where email_id='rahul.guha@gmail.com'",

    //var sql = "call user_login ('ann.ectostestemails@gmail.com','welcome','2014-03-11 11:23:54','237b28fa-4ec5-44cd-94e2-a811fa7ff47a',0, 'span', '');"
    conn.query(sql,
        function (err, rows){
            if (err){
                logger.info(err)
                res.end;
            }
            logger.info("user login validated from mysql");
            res.send (rows);
        });


}; //mysql post method example

exports.add_claim = function (req, res) {

    var claim_data = {
        claim_id: req.params.claim_id
        , user_id: req.params.user_id
        , company: req.params.company
    };

    var clm = new claim(claim_data);

    clm.save(function (req) {
        res.send('item saved');
    });
};

//******************** end  post *************************************


// ******************* private helper functions ***********************
var send_to_response = function(results, res ){
    var arr = [];
    results.forEach(function(r){
        arr.push(r)
    });
    res.contentType('application/json');
    res.send(arr);
}
var return_back  = function(results ){
    var arr = [];
    results.forEach(function(claim){
        arr.push(claim)
    });
    return arr;
}
var send_empty_recordset = function( res ){
    var response = {"message": "no result found", "length": 0};

    res.contentType('application/json');
    res.send(response);
}

// ***********************************************************************
//limit and skip functionality
//Below functions are to be used by every function to ensure
//limit and skip values are legal
//and no error is generated as a result.
//Every developer needs to use these if they are implementing
// ***********************************************************************
var sanitize_limit = function (req) {
    var limit = req.params.limit;
    if ((limit === undefined) || (limit < 0 )) {
        limit = util.get_fetch_limit();
    }
    return limit;
}
var sanitize_skip = function (req) {
    var skip = req.params.skip;
    if ((skip === undefined) || (skip < 0 )) {
        skip = 0;
    }
    return skip;
}
// ***********************************************************************



// ******************* private helper functions ***********************





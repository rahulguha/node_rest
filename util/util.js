/**
 * Created by rahulguha on 22/02/14.
 */
var config =require('../config/config.json'),
    _ = require('lodash-node')
    ;


exports.get_connection_string = function(){
    var e = config.env;
    var mongo_address = _.find(config.mongo_address, function(env) {
        return env.env == e;
    });
    return  "mongodb://" + mongo_address.ip + "/" + config.db + "?poolSize=4";
}

exports.get_logging_level = function(){
    return config.logging_level;
}
exports.get_email_info = function(){
    return config.email_info;
}
exports.get_email_templating_engine = function(engine){
    var engine_info = _.find(config.email_templating_engine, function(template_info) {
        return template_info.name == engine;
    });
    return engine_info;
}
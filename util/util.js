/**
 * Created by rahulguha on 22/02/14.
 */
var config =require('../config/config.json'),
    _ = require('lodash-node')
    ;


this.get_connection_string = function(){
    var e = config.env;
    var mongo_address = _.find(config.mongo_address, function(env) {
        return env.env == e;
    });
    return  "mongodb://" + mongo_address.ip + "/" + config.db + "?poolSize=4";
}

this.get_logging_level = function(){
    return config.logging_level;
}
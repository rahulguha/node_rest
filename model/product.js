/**

 * User: Rahul
 * Date: 31 March 2014
 * Time: 4:07 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectID;

var mongo = require('../db_connect/mongoose.js');
var util = require('../util/util.js');
//var priceSchema = new Schema({
//    mrp: { type: Number  },
//    list : { type: Number  },
//    discount : { type: Number  },
//    min : { type: Number  },
//    final_offer : { type: Number  },
//    final_discount : { type: Number  }
//
//});

var productSchema = new Schema({
    _id : false,
    Express : { type: String, trim: true },
    Name: { type: String, trim: true },
    active : { type: Number},
    brand: { type: String, trim: true },
    create_date : { type: Date},
    description :  { type: String, trim: true },
    id :  { type: String, trim: true },
    cat_id : [{type: String}],
    parent_prod_id :  { type: String, trim: true },
    parent_prod :  { type: String, trim: true },
    shortdesc :  { type: String, trim: true },
    sku :  { type: String, trim: true },
    thumb_link :  { type: String, trim: true },
    stock : {type: Number},
    price : {
        mrp: { type: Number  },
        list : { type: Number  },
        discount : { type: Number  },
        min : { type: Number  },
        final_offer : { type: Number  },
        final_discount : { type: Number  }
    }

});

var short_include_fields ="sku Name Express brand  price thumb_link shortdesc stock description -_id";
// static methods

// for every NON SINGLETONE funtion returning data there will be two variants
// one returning all data no skip or limit
// other one will limit data by skip and limit parameter
// api will decide which one to use
// developer needs to create both the functions always
productSchema.statics.get_prod_by_cat_id = function(cat_id, limit, skip){
    var q = {"cat_id.cat_id" : cat_id, "active": 1, "stock" : {$gt : 0}};
    return this.find(q)
        .select (short_include_fields)
        .limit(limit)// app sends limit now. we can use configured limit by using util method  util.get_fetch_limit())
        .skip (skip)
        .exec();
}
productSchema.statics.get_prod_by_cat_id_no_limit = function(cat_id){
    var q = {"cat_id.cat_id" : cat_id, "active": 1, "stock" : {$gt : 0}};
    return this.find(q)
        .select (short_include_fields)
        .exec();
}


productSchema.set('collection', 'product')
module.exports = mongo.get_mongoose_connection().model('products', productSchema);
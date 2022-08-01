var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email : {type:String, require:true},
    name : {type:String, require:true},
    text:{type:String, require:true},
    creation_dt:{type:Date, require:true}
});

module.exports = mongoose.model('Post',schema);
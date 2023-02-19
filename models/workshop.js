var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var workshopSchema = new mongoose.Schema({
    name: String,
    dept: String,
    desc:String,
    workshopid: String,//use as unique key
    open: { type: Boolean, default: true },
    limit: Number,
    ecn:String,//Event Co-ordinator Name
    ecc:Number,//Event Co-ordinator Contact and password for event
    venue:String,
    time:String,
    fee: Number
});
workshopSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Workshop", workshopSchema);
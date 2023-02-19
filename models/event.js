var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var eventSchema = new mongoose.Schema({
    name: String,
    dept: String,
    eventid: String,//use as unique key
    desc:String,
    rounds:Number,
    r1:String,
    r2:String,
    r3:String,
    rules:Array,
    team_count: Number,
    pr:String, //participant requirements
    limit:Number,
    ecn:String,//Event Co-ordinator Name
    ecc:Number,//Event Co-ordinator Contact and password for event
    venue:String,
    time:String,
    open: { type: Boolean, default: true },
    prize:Number,
    entry:Number
});

eventSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Event", eventSchema);
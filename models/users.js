var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
var AutoIncrement = require("mongoose-sequence")(mongoose)

var UserSchema = new mongoose.Schema({
    yukid: Number,
    username: String,
    accountType: { type: String, default: "user" },
    password: String,
    googleId: String,
    name: String,
    gender: { type: String, default: "others" },
    contact: String,
    year: String,
    collegeName: String,
    department: String,
    notifToken: { default: null, type: String, required: false, unique: true },
    events: [{
        _id: false,
        eventid: String,
        event_name: String,
        wpaid: { type: Boolean, default: false }
    }],
    workshops: [{
        _id: false,
        workshop_name: String,
        workshopid: String,
        wpaid: { type: Boolean, default: false }
    }]
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
UserSchema.plugin(AutoIncrement, { inc_field: "yukid" })

module.exports = mongoose.model("users", UserSchema);
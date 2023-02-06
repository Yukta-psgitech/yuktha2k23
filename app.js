//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var favicon = require('serve-favicon');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();
app.use(express.static("static"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(session({secret:"this is the secret that nobody wants to know.",
// resave:false,
// saveUninitialized:false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(favicon(__dirname + '/static/images/favicon.png'));

// mongoose.connect("mongodb://localhost:27017/yuktha2k23", {useCreateIndex: true,useNewUrlParser: true});
// mongoose.set('useCreateIndex', true);

// const userSchema = new mongoose.Schema ({
//     email: String,
//     googleId: String,
//     secret: String
// });

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// const User = new mongoose.model("User",userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(function(user,done){
//     done(null,user.id);
// });

// passport.deserializeUser(function(id,done){
//     user.findById(id,function(err,user){
//         done(err,user);
//     });
// });

// passport.use(new GoogleStrategy({
//         clientID: process.env.client_ID,
//         clientSecret: process.env.client_Secret,
//         callbackURL:"http://localhost:3000/auth/google/home",
//         userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//     },
//     function(accessToken,refreshToken,profile,cb) {
//         console.log(profile);

//         User.findOrCreate({googleId:profile.id},function(err,user){
//             return cb(err,user);
//         });
//     }
// ));

app.get("/", function(req, res){
  res.render("index");
})


const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server started on port "+port);
});


// -----------------------------------reference-----------------------------------
// pp.get("/auth/google/acccount",
//   passport.authenticate('google', { failureRedirect: "/login" }),
//   function(req, res) {
// Successful authentication, redirect to acccount.
//     res.redirect("/acccount");
//   });

// app.get("/login", function(req, res){
//   res.render("login");
// });

// app.get("/register", function(req, res){
//   res.render("register");
// });

// app.get("/acccount", function(req, res){
//   User.find({"secret": {$ne: null}}, function(err, foundUsers){
//     if (err){
//       console.log(err);
//     } else {
//       if (foundUsers) {
//         res.render("acccount", {usersWithacccount: foundUsers});
//       }
//     }
//   });
// });

// app.get("/submit", function(req, res){
//   if (req.isAuthenticated()){
//     res.render("submit");
//   } else {
//     res.redirect("/login");
//   }
// });

// app.post("/submit", function(req, res){
//   const submittedSecret = req.body.secret;

// Once the user is authenticated and their session gets saved, their user details are saved to req.user.
// console.log(req.user.id);

//   User.findById(req.user.id, function(err, foundUser){
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         foundUser.secret = submittedSecret;
//         foundUser.save(function(){
//           res.redirect("/acccount");
//         });
//       }
//     }
//   });
// });

// app.get("/logout", function(req, res){
//   req.logout();
//   res.redirect("/");
// });

// app.post("/register", function(req, res){

//   User.register({username: req.body.username}, req.body.password, function(err, user){
//     if (err) {
//       console.log(err);
//       res.redirect("/register");
//     } else {
//       passport.authenticate("local")(req, res, function(){
//         res.redirect("/acccountt");
//       });
//     }
//   });

// });

// app.post("/login", function(req, res){

//   const user = new User({
//     username: req.body.username,
//     password: req.body.password
//   });

//   req.login(user, function(err){
//     if (err) {
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function(){
//         res.redirect("/acccount");
//       });
//     }
//   });

// });
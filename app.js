//jshint esversion:6
//requirements
const dotenv = require('dotenv').config({path : "config/.env"});
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var favicon = require('serve-favicon');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const flash = require('connect-flash');

const port = process.env.PORT || 3000;

//Requiring models
const Event = require("./models/event");
const User = require("./models/users");
const Workshop = require("./models/workshop");
const College = require("./models/college");

//EJS
const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

//FOR DATABASE CONNECTION
//DB config
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/yuktha2k23", {useUnifiedTopology: true, useNewUrlParser: true});

//check connection
// db.once('open', function() {
//     console.log('Connected to MongoDB')
// });

//check for db errors
// db.on('error', function(err) {
//     console.log(err);
// });

// Serving favicon
app.use(favicon(__dirname + '/public/images/favicon.png'));

//Express Session middleware
app.use(session(
    {secret:"YUKTAHA2023",
    resave:false,
    saveUninitialized:false //should be true if we want to logging in again and again
    }));


app.use(passport.initialize());
app.use(passport.session());

//connect flash middleware
app.use(flash());

//routes for later
// app.use('/',require('./routes/index'));
// app.use('/users',require('./routes/users'));

// app.use((req, res, next) => {
//     res.status(404).render("404");
// });


// const userSchema = new mongoose.Schema ({
//     email: String,
//     googleId: String
// });

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// const User = new mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    user.findById(id,function(err,user){
        done(err,user);
    });
});

// passport.use(new GoogleStrategy({
//         clientID: process.env.client_ID,
//         clientSecret: process.env.client_Secret,
//         callbackURL:"http://localhost:3000/google/login_successful",
//         userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//     },
//     function(accessToken,refreshToken,profile,cb) {
//         User.findOrCreate({googleId:profile.id},function(err,user){
//             return cb(err,user);
//         });
//     }
// ));


//---------------routes start-------------------------------
app.get('/', (req, res) => {
    res.render("index");
});

app.get("/login", function(req, res){
  res.render("login_register");
});

app.get("/register", function(req, res){
  res.render("login_register");
});


//---------==========edit
app.get("/acccount", function(req, res){
  User.find({"secret": {$ne: null}}, function(err, foundUsers){
    if (err){
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("acccount", {usersWithacccount: foundUsers});
      }
    }
  });
});

// app.get("/auth/google/login_successful",
//   passport.authenticate('google', { failureRedirect: "/login" }),
//   function(req, res) {
// // Successful authentication, redirect to acccount.
//     res.redirect("/dashboard");
//   });



app.post("/register", function(req, res){
  // const user = new User({
  //   name:req.body.,
  //   username:,
    
  // })


  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/acccountt");
      });
    }
  });

});

// const user = new User({
//   name: req.body.name,
//   department: req.body.d_name,
//   accountType: "paper",
//   collegeName: "PSG Institute of Technology and Applied Research",
//   username: req.body.username.replace(/ /g, "").toLowerCase(),
// });
// User.register(user, req.body.password, (err, user) => {
//   if (err) {
//       req.flash("error_msg", err.message);
//       res.redirect('signin');
//       return;
//   } else {
//       passport.authenticate("local")(req, res, () => {
//           User.findOne({ 'username': req.user.username }, (err, users) => {
//               if (err) {
//                   req.flash("error", err.message);
//                   res.redirect('signin');
//                   return;
//               }
//               console.log("PPP")
//           });
//       });
//   }
// });

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/dashboard");
      });
    }
  });

});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

// -----------------------------------reference-----------------------------------

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




app.listen(port, function() {
    console.log("Server started on port "+port);
  });
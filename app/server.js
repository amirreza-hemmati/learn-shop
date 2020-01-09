// required modules => node-modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const validator  = require("express-validator");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
// ________________________________________________
// required routes
const webRouter = require("./routes/web/index");
//___________________________________________________________________
// create an app express
const app = express();
//___________________________________________________________________
// create a secret
const secretKey = "qwertyuiopzxcvbnm,./asdfghjkl;QWERTYUIOPASDFGHJKL:XZCVBNM324156987@#%$!^%";
//___________________________________________________________________
// build a middleware in preve starting server
app.use(express.static('public'));// the folder public for files views
app.set('view engine', 'ejs');//the suffix for show views in browser
app.set("views", path.resolve("./resource/views"));// the url files for show views
app.use(bodyParser.json());//bodyparse for show json formatting in view
app.use(bodyParser.urlencoded({extended: true}));// bodyparser for show data in post routes
// app.use(validator());
app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({mongooseConnection: mongoose.connection})
}));
app.use(cookieParser(secretKey));
app.use(flash());
//___________________________________________________________________
//routers
//___________________________________________________________________
// listen the server
module.exports = () => {
    mongoose.connect("mongodb://localhost/nodejscms")
        .then(() => {
            app.listen(5000, () => console.log("Starting The Web Server")); //listen the port server and starting server
        })
        .catch(err => console.log(err));
};
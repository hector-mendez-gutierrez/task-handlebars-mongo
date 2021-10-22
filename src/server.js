const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// Inicializaciones
const app = express();
require("./config/passport");

// Settings
app.set("port", process.PORT || 3000);
app.set("views", path.join(__dirname, "views")); //Configura la ruta de las vistas!
app.engine(
  ".hbs",
  hbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//Midleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // envia querys desde un formulario
app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Vaiables globales

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null; // guarda el usurio de passport
  next();
});

//Routes
app.use(require("./routes"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));

// Static file
app.use(express.static(path.join(__dirname, "public"))); //Configura la ruta de los archivos staticos!

module.exports = app;

const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const localPassport = require("./authentication/local");

require('dotenv').config();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "hello",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1800000 },
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(passport.initialize());
app.use(passport.session());
localPassport.passportInit();

app.use("/api", require("./routes/api/routes"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

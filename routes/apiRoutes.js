var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  // Login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Signup
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      club: req.body.club,
      isAdmin: req.body.isAdmin
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Logout
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Get User Data
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        club: req.user.club,
        isAdmin: req.user.isAdmin,
        id: req.user.id
      });
    }
  });
};
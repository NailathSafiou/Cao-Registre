const express = require("express");
const router = express.Router();

const appInitial = process.env.APP_INITIAL || 'FNJS';

router.get("/active", (req, res) => {
  res.render("pages/login/active_account.hbs", { title: appInitial + " - Activation de compte", initial: appInitial,});
});

router.get("/forgot", (req, res) => {
  res.render("pages/login/forgot.hbs", { title: appInitial + " - Mot de passe oublie", initial: appInitial,});
});

router.get("/", (req, res) => {
  res.render("pages/login/login.hbs", { title: appInitial + " - Login", initial: appInitial,});
});

router.get("/2", (req, res) => {
    res.render("pages/login/login2.hbs", { title: appInitial + " - Login proposition 2", initial: appInitial,});
});

module.exports = router;

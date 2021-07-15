const express = require("express");
const router = express.Router();

const appInitial = process.env.APP_INITIAL || 'FNJS';

router.get("/", (req, res) => {
  res.render("pages/home/home.hbs", { title:  appInitial + " - Home", initial: appInitial,});
});

module.exports = router;
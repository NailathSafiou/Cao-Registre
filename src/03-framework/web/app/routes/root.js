const express = require("express");
const router = express.Router();

const appInitial = process.env.APP_INITIAL || 'FNJS';

router.get("/", (req, res) => {
  res.render("pages/root/root.hbs", {
    title: appInitial + " - Gestion des utilisateurs",
    initial: appInitial,
    root: true,
    tabtitle: [
      { inner: "Compte utilisateur" },
    ],
    tabcontent: [
      { partial: "root/utilisateur" },
    ]
  });
});

router.get("/nouvelle-utilisateur", (req, res) => {
  res.render("pages/root/creer_utilisateur.hbs", {
    title: appInitial + " - Nouvelle utilisateur",
    initial: appInitial,
    root: true,
    tabtitle: [
      { inner: "Ajouter un utilisateur" },
    ],
    tabcontent: [
      { partial: "root/creer_utilisateur_form" },
    ]
  });
});

router.get("/profil", (req, res) => {
  res.render("pages/root/profil.hbs", {
    title: appInitial + " - Profil",
    initial: appInitial,
    root: true,
    tabtitle: [
      { inner: "Profil" },
    ],
    tabcontent: [
      { partial: "root/profil_content" },
    ]
  });
});

module.exports = router;
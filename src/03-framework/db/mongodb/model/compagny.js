const mongoose = require("mongoose");

module.exports = mongoose.model('Compagny', mongoose.Schema({
  nom: { type: String, default: "SING SA" },
  logo: { type: String, default: "/assets/img/compagny-default-logo.png" },
  responsable: { type: String, default: "Yannick EBIBIE" },
  telephone: { type: String, default: "077598300" },
  email: { type: String, default: "contact@sing.ga" },
  adresse: { type: String, default: "Rue Pecqueur, derriere l'immeuble premium de BGFi" }
}));
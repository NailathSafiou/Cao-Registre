const mongoose = require("mongoose");

module.exports = mongoose.model("Profil", mongoose.Schema({
  nom: { type: String },
  prenom: { type: String },
  photo_url: { type: String },
  adresse: { type: String },
  boite_postale: { type: String },
  ville: { type: String },
  date_naissance: { type: Date },
  lieu_naissance: { type: String },
  sexe: { type: String, enum: ['M', 'F'] },
  nom_pere: { type: String },
  nom_mere: { type: String },

  numero_cni: { type: String },
  numero_permis_conduire: { type: String },
  type_permis_conduire: { type: String },
  matricule_fonction_publique: { type: String },
  numero_cnss: { type: String },
  matricule_cnss: { type: String },
  numero_cnamgs: { type: String },
  situation_familial: { type: String, enum: ['Marie', 'Celibataire', 'Divorce'] },
  nombre_enfant_charge: { type: Number, default: 0 },

  niveau_etude: { type: String },
  dernier_diplome: { type: String },
  etablissement: { type: String },
  profession_formation: { type: String },

  poste: { type: String },
  mode_paiement_salaire: { type: String, enum: ["Virement", "Cheque"] },
  type_contrat: { type: String, enum: ["CDD", "CDI", "Stage", "Interimaire"] },
  date_embauche: { type: Date },
  date_fin_contrat: { type: Date },

  email: { type: String },
  telephone: { type: String },
  contact_de_secours: { type: String },

  account: { type: mongoose.Types.ObjectId, ref: "UserAccount", unique: true },

  create_at: { type: Date, default: Date.now }
}));
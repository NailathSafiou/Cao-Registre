import { createUser } from "../../service/profilService.js";
import { loadAllTab } from "../../shared/tab.js";

window.addEventListener("load", () => {
  loadAllTab();
  document.getElementById("createBtn").addEventListener("click", onCreateUser);
});

async function onCreateUser() {
  document.querySelector(".bar-loading").classList.remove("hidden-loading");
  const email = document.getElementById("email").value;
  if (!email) {
    alert("l'email est obligatoire");
    document.querySelector(".bar-loading").classList.add("hidden-loading");
    return;
  }
  const data = {
    "email": email,
    "username": email,
    "password": Math.floor(Math.random() * 99999999).toString(),
    "firstname": document.getElementById("prenom").value,
    "lastname": document.getElementById("nom").value,
    "profil": {
      "nom": document.getElementById("nom").value,
      "prenom": document.getElementById("prenom").value,
      "adresse": document.getElementById("adresse").value,
      "boite_postale": document.getElementById("boite_postale").value,
      "ville": document.getElementById("ville").value,
      "date_naissance": document.getElementById("date_naissance").value,
      "lieu_naissance": document.getElementById("lieu_naissance").value,
      "sexe": document.getElementById("sexe").value,
      "nom_pere": document.getElementById("nom_pere").value,
      "nom_mere": document.getElementById("nom_mere").value,
      "numero_cni": document.getElementById("numero_cni").value,
      "numero_permis_conduire": document.getElementById("numero_permis_conduire").value,
      "type_permis_conduire": document.getElementById("type_permis_conduire").value,
      "matricule_fonction_publique": document.getElementById("matricule_fonction_publique").value,
      "numero_cnss": document.getElementById("numero_cnss").value,
      "matricule_cnss": document.getElementById("matricule_cnss").value,
      "numero_cnamgs": document.getElementById("numero_cnamgs").value,
      "situation_familial": document.getElementById("situation_familial").value,
      "nombre_enfant_charge": document.getElementById("nombre_enfant_charge").value,
      "niveau_etude": document.getElementById("niveau_etude").value,
      "dernier_diplome": document.getElementById("dernier_diplome").value,
      "etablissement": document.getElementById("etablissement").value,
      "profession_formation": document.getElementById("profession_formation").value,
      "poste": document.getElementById("poste").value,
      "mode_paiement_salaire": document.getElementById("mode_paiement_salaire").value,
      "type_contrat": document.getElementById("type_contrat").value,
      "date_embauche": document.getElementById("date_embauche").value,
      "date_fin_contrat": document.getElementById("date_fin_contrat").value,
      "email": email,
      "telephone": document.getElementById("telephone").value,
      "contact_de_secours": document.getElementById("contact_de_secours").value,
    }
  };
  const res = await createUser(data);
  if (res) {
    location.href = "/root";
  } else {
    document.querySelector(".bar-loading").classList.add("hidden-loading");
    alert("Veuillez verifier si un utilisateur avec la meme adresse email n'existe pas deja");
  }
}
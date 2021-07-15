import { getInitialFillColor, getProfil, updateProfil } from "../../service/profilService.js";
import { updateOtherUserAccount } from "../../service/userAccountService.js";
import { loadAllTab } from "../../shared/tab.js";
import { getTimeStamp } from "../../shared/util.js";

window.addEventListener("load", async () => {
  loadAllTab();
  await fetchProfil();
});

async function fetchProfil() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userId = urlParams.get("user");
  if (userId) {
    const profil = await getProfil(userId);
    displayProfilData(profil);
    loadProfilData(profil);
    document.getElementById("updateBtn").addEventListener("click", async () => {
      await saveDatachange(profil);
    })
  }
}

function displayProfilData(profil) {
  const initial = document.getElementById("p-initial")
  initial.innerHTML = profil.prenom.charAt(0).toUpperCase();
  initial.style.backgroundColor = getInitialFillColor(profil.account.initial_color);
  document.getElementById("p-nom").innerHTML = profil.prenom + " " + profil.nom;
  const email = document.getElementById("p-email");
  email.innerHTML = profil.email;
  email.href = "mailto:" + profil.email;
  const roles = document.getElementById("roles");
  if (profil.account.role) {
    const splitRole = profil.account.role.split(",");
    let inner = '';
    splitRole.forEach(r => {
      inner = inner + `<span>${r}</span>`;
    });
    roles.innerHTML = inner;
  }
  document.getElementById("p-last-connexion").innerHTML = "Derniere connexion " + getTimeStamp(profil.account.last_connexion);
  document.getElementById("p-last-activity").innerHTML = "Derniere activite " + getTimeStamp(profil.account.last_activity);
  document.getElementById("stat-text").innerHTML = profil.account.isActive ? "Actif" : "Inactif";
  const statBtn = document.getElementById("stat-btn");
  statBtn.innerHTML = profil.account.isActive ? "Desactiver" : "Activer";
  statBtn.addEventListener("click", () => {
    updateUserAccountData(profil, { isActive: !profil.account.isActive });
  });
  const statIcon = document.getElementById("stat-icon");
  if (profil.account.isActive) {
    statIcon.classList.remove("red");
  } else {
    statIcon.classList.remove("green");
  }
}

async function updateUserAccountData(profil, editData) {
  const res = await updateOtherUserAccount(profil.account._id, editData);
  location.href = "/root/profil?user=" + profil._id;
}

function loadProfilData(profil) {
  document.getElementById("email").value = profil.email;
  document.getElementById("nom").value = profil.nom;
  document.getElementById("prenom").value = profil.prenom;
  document.getElementById("adresse").value = profil.adresse;
  document.getElementById("boite_postale").value = profil.boite_postale;
  document.getElementById("ville").value = profil.ville;
  if (profil.date_naissance) {
    document.getElementById("date_naissance").value = new Date(profil.date_naissance).toISOString().split("T")[0];
  }
  document.getElementById("lieu_naissance").value = profil.lieu_naissance;
  document.getElementById("sexe").value = profil.sexe;
  document.getElementById("nom_pere").value = profil.nom_pere;
  document.getElementById("nom_mere").value = profil.nom_mere;
  document.getElementById("numero_cni").value = profil.numero_cni;
  document.getElementById("numero_permis_conduire").value = profil.numero_permis_conduire;
  document.getElementById("type_permis_conduire").value = profil.type_permis_conduire;
  document.getElementById("matricule_fonction_publique").value = profil.matricule_fonction_publique;
  document.getElementById("numero_cnss").value = profil.numero_cnss;
  document.getElementById("matricule_cnss").value = profil.matricule_cnss;
  document.getElementById("numero_cnamgs").value = profil.numero_cnamgs;
  document.getElementById("situation_familial").value = profil.situation_familial;
  document.getElementById("nombre_enfant_charge").value = profil.nombre_enfant_charge;
  document.getElementById("niveau_etude").value = profil.niveau_etude;
  document.getElementById("dernier_diplome").value = profil.dernier_diplome;
  document.getElementById("etablissement").value = profil.etablissement;
  document.getElementById("profession_formation").value = profil.profession_formation;
  document.getElementById("poste").value = profil.poste;
  document.getElementById("mode_paiement_salaire").value = profil.mode_paiement_salaire;
  document.getElementById("type_contrat").value = profil.type_contrat;
  if (profil.date_embauche) {
    document.getElementById("date_embauche").value = new Date(profil.date_embauche).toISOString().split("T")[0];
  }
  if (profil.date_fin_contrat) {
    document.getElementById("date_fin_contrat").value = new Date(profil.date_fin_contrat).toISOString().split("T")[0];
  }
  document.getElementById("telephone").value = profil.telephone;
  document.getElementById("contact_de_secours").value = profil.contact_de_secours;
  //Controle d'acces
  const role = document.getElementById("role");
  if (profil.account.role) {
    role.value = profil.account.role;
  }
  document.getElementById("si-role").addEventListener("change", (e) => {
    updateRoleInput(e.target.value);
    e.target.value = "";
  })
}

function updateRoleInput(value) {
  const role = document.getElementById("role");
  if (!role.value.includes(value)) {
    role.value = value + (role.value.length > 0 ? ',' : '') + role.value;
  } else {
    role.value = role.value.replace(value, "");
  }
  role.value = role.value.replace(",,", ",");
  if (role.value.charAt(0) == ',') {
    role.value = role.value.slice(1, role.value.length);
  } else if (role.value.charAt(role.value.length - 1) == ',') {
    role.value = role.value.slice(0, role.value.length - 1);
  }
}

async function saveDatachange(profil) {
  const data = {
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
    "email": document.getElementById("email").value,
    "telephone": document.getElementById("telephone").value,
    "contact_de_secours": document.getElementById("contact_de_secours").value,
  };
  const role = document.getElementById("role").value;
  await updateProfil(profil._id, data);
  await updateUserAccountData(profil, { role });
  location.href = "/root/profil?user=" + profil._id;
}
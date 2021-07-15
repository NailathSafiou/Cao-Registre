import { logout } from "../service/authService.js"
import { getAuthProfil, getInitialFillColor } from "../service/profilService.js";
import { getToken, hasToken, removeToken } from "../service/tokenService.js";

window.addEventListener('load', async () => {
  await configureDropdownMenu();
  configureOpenCloseAppMenuButton();
})

function configureOpenCloseAppMenuButton() {
  const epg = document.getElementById("epg");
  if (epg) {
    epg.addEventListener("click", () => {
      document.querySelector("main").classList.toggle("display-canvas");
    })
  }
}

async function configureDropdownMenu() {
  const logoutBtn = document.getElementById("logoutBtn");
  const changePassBtn = document.getElementById("changePassBtn");
  if (logoutBtn) {
    if (hasToken() == false) {
      location.href = "/";
    }
    logoutBtn.addEventListener("click", disconnection);
    changePassBtn.addEventListener("click", changePassword);
    const profil = await getAuthProfil();
    if (profil) {
      document.getElementById("my-profil").addEventListener("click", () => {
        location.href = "/root/profil?user=" + profil._id; 
      })
      //Afficher les initials de l'utilisateur
      const initials = document.querySelectorAll(".user-initials");
      for (let i = 0; i < initials.length; i++) {
        initials[i].innerHTML = profil.prenom.charAt(0).toUpperCase();
        initials[i].style.backgroundColor = getInitialFillColor(profil.account.initial_color);
      }
      //Afficher le nom complet de l'utilisateur
      document.getElementById("user-fullname").innerHTML = profil.prenom + " " + profil.nom;
      //Afficher le nom d'utilisateur de l'utilisateur
      document.getElementById("user-email").innerHTML = profil.account.username;
    } else {
      await logout();
      location.href = "/";
    }

  }
}

async function changePassword() {
  const token = getToken();
  removeToken();
  location.href = "/login/active?token=" + token;
}

async function disconnection() {
  if (await logout()) {
    location.reload();
  }
}
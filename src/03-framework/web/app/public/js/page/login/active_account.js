import { updateUserAccount } from "../../service/userAccountService.js";
import { login } from "../../service/authService.js";

window.addEventListener("load", async () => {
  const token = await validateCredentials();
  document.getElementById("activeBtn").addEventListener("click", async () => activeAccount(token));
});

async function activeAccount(token) {
  const newPassword = document.getElementById("password").value;
  const confNewPassword = document.getElementById("confpassword").value;
  if (newPassword != confNewPassword) {
    return alert("Les deux mot de passe doivent correspondre");
  }
  if (!validatePassword(newPassword)) {
    return alert("Le mot de passe doit avoir au minimum 6 caracteres");
  }
  const res = await updateUserAccount({ password: newPassword, isActive: true }, token);
  if(res){
    location.href = "/login";
  } else {
    alert("Une erreur c'est produite lors de l'activation, veuillez reessayer !");
  }
}

function validatePassword(password) {
  return password.length >= 6;
}

async function validateCredentials() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get("username");
  const password = urlParams.get("password");
  const token = urlParams.get("token");
  let accessToken = null;
  if (token) {
    accessToken = token;
  } else {
    const result = await login(username, password);
    if (!result) {
      location.href = "/login";
    } else {
      accessToken = result.access_token;
    }
  }
  return accessToken;
}
import { login } from "../../service/authService.js";
import { hasToken, persistToken } from "../../service/tokenService.js"

window.addEventListener("load", async () => {
  if(hasToken()){
    location.href = "/home";
  }
  document.getElementById("loginBtn").addEventListener("click", authenticate);  
});

async function authenticate(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const res = await login(username, password);
  if(res){
    const token = res.access_token;
    persistToken(token);
    location.reload();
  } else {
    alert("Identifiants incorrectes");
  }
}
import { disableAccount } from "../../service/authService.js";

window.addEventListener("load", async () => {
  document.getElementById("initBtn").addEventListener("click", reactive);  
});

async function reactive(){
  const username = document.getElementById("username").value;
  const res = await disableAccount(username);
  if(res){
    alert("Un email d'activation de compte vient de vous etre envoye");
  } else {
    alert("Aucun compte n'est associe a cette adresse email");
  }
}
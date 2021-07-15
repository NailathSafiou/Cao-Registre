import { getAllProfil } from "../../service/profilService.js"
import { getProfilRowElement } from "./template/row_profil.js";


export async function fetchAndDisplayAllUser(){
  const profils = await getAllProfil();
  displayAllUser(profils);
}

async function displayAllUser(profils){
  const profilContainer = document.getElementById("profils");
  while(profilContainer.firstChild){
    profilContainer.removeChild(profilContainer.firstChild);
  }
  for(let i = 0; i < profils.length; i++){
    const node = getProfilRowElement(profils[i]);
    node.addEventListener("click", () => {
      location.href = "/root/profil?user=" + profils[i]._id;
    })
    profilContainer.appendChild(node);
  }
}


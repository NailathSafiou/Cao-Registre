import { getInitialFillColor } from "../../../service/profilService.js";
import { getTimeStamp } from "../../../shared/util.js";

export function getProfilRowElement(profil) {
  const template = `
    <td class="text-small">
      <div class="row">
        <span class="circle-avatar" style="background-color: ${getInitialFillColor(profil.account.initial_color)}">
          ${profil.prenom.charAt(0).toUpperCase()}
        </span>
        <span>${profil.prenom} ${profil.nom}</span>
      </div>
    </td>
    <td class="text-small">
      <span>${profil.telephone ? profil.telephone : ''}</span>
    </td>
    <td class="text-small">
      <span>${profil.email ? profil.email : ''}</span>
    </td>
    <td class="text-small">
      <span>${getTimeStamp(profil.account.last_activity)}</span>
    </td>
  `;
  const tr = document.createElement("tr");
  tr.innerHTML = template;
  return tr;
}
import { SERVICE_URL } from "./apiService.js";
import { getToken } from "./tokenService.js";


export async function getCompagny(){
  const token = getToken();
  const res = await fetch(`${SERVICE_URL}/api/compagny`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  if (res.status == 200) {
    return await res.json();
  } else {
    return null;
  }
}

export async function updateCompagny(id, data){
    const token = getToken();
    const res = await fetch(`${SERVICE_URL}/api/compagny/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(data)
    });
    if (res.status == 200) {
      return await res.json();
    } else {
      return null;
    }
}

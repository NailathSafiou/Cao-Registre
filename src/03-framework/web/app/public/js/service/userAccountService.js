import { SERVICE_URL } from "./apiService.js";
import { getToken } from "./tokenService.js";


export async function updateUserAccount(data, token){
  const res = await fetch(`${SERVICE_URL}/api/account`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(data)
  });
  if(res.status == 200){
    return await res.json();
  } else {
    return null;
  }
}

export async function updateOtherUserAccount(id, data){
  const token = getToken();
  const res = await fetch(`${SERVICE_URL}/api/account/${id}`, {
    method: "PUT",
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

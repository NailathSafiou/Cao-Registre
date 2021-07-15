import { SERVICE_URL } from "./apiService.js";
import { removeToken } from "./tokenService.js";

export async function login(username, password) {
  const res = await fetch(SERVICE_URL + "/api/account/login", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      'username': username,
      'password': password,
      'grant_type': 'password',
      'client_id': 'null',
      'client_secret': 'null'
    }),
  });
  if (res.status == 200) {
    const data = await res.json();
    return data;
  } else if (res.status == 400) {
    return null;
  }
}

export async function logout(){
  removeToken();
  return true;
}

export async function disableAccount(username){
  const res = await fetch(`${SERVICE_URL}/api/account/reactive/${username}`, {
    method: 'GET'
  });
  if(res.status == 200){
    return await res.text();
  } else {
    return null;
  }
}
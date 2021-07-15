
const TOKEN_KEY = "token-key-auth";

export function getToken(){
  return localStorage.getItem(TOKEN_KEY);
}

export function hasToken(){
  return getToken() != null;
}

export function persistToken(token){
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(){
  localStorage.removeItem(TOKEN_KEY);
}
import { SERVICE_URL } from "./apiService.js";
import { getToken } from "./tokenService.js";

const COLORS = ["#E65100", "#01579B", "#880E4F", "#2E7D32", "#4A148C"];

export async function getAuthProfil() {
  const token = getToken();
  const res = await fetch(`${SERVICE_URL}/api/profil/search/by-account`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });
  if (res.status == 200) {
    return await res.json();
  } else {
    return null;
  }
}

export async function getAllProfil() {
  const token = getToken();
  const res = await fetch(`${SERVICE_URL}/api/profil`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });
  if (res.status == 200) {
    return await res.json();
  } else {
    return null;
  }
}

export async function getProfil(id) {
  const token = getToken();
  const res = await fetch(`${SERVICE_URL}/api/profil/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });
  if (res.status == 200) {
    return await res.json();
  } else {
    return null;
  }
}

export async function updateProfil(id, data) {
  const token = getToken();
  const res = await fetch(`${SERVICE_URL}/api/profil/${id}`, {
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

export async function createUser(data) {
  const token = getToken();
  const res = await fetch(`${SERVICE_URL}/api/profil/with-account`, {
    method: 'POST',
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

export function getInitialFillColor(index) {
  if (index >= COLORS.length || index < 0) {
    return COLORS[0];
  } else {
    return COLORS[index];
  }
}
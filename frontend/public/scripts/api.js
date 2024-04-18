import { BACKEND_URL } from "./config.js";

export async function getUser(name) {
  const user = await fetch(`${BACKEND_URL}/users/${name}`).then((res) => res.json());
  return user[0]; //will return error if user is not available
}

export async function getUsers() {
  const users = await fetch(`${BACKEND_URL}/items`).then((r) => r.json());
  return users;
}

export async function createUser(name,password) {
  const item = {
    "name" : name,
    "password" : password,
    "score" : 0,
  }
  const res = await fetch(`${BACKEND_URL}/users/createUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return res.json; //return error if username is alr taken
}

export async function getRank(id, item) {
  const top = await fetch(`${BACKEND_URL}/users/rank`).then((res) => res.json());
  return top;
}

export async function updateScore(name,score) {
  const item = {
    "name" : name,
    "score" : score
  }
  const res = await fetch(`${BACKEND_URL}/users/updateScore`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return res.json;
}
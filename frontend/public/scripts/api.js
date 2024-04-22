import { BACKEND_URL } from "./config.js";

export async function getUser(name) {
  const user = await fetch(`${BACKEND_URL}/users/${name}`).then((res) => res.json());
  return {
    "name" : user[0].name,
    "score" : user[0].score,
    "password" : user[0].password, // must be check on the backend
  }; // if user doest exist => return undefined. 
}

export async function createUser(name,password,group) {
  const item = {
    "name" : name,
    "password" : password,
    "score" : 0,
    "group" : group
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

export async function getRank() {
  const top = await fetch(`${BACKEND_URL}/users/rank`).then((res) => res.json());
  return top;
}

export async function getGroupRank() {
  const top = await fetch(`${BACKEND_URL}/group/rank`).then((res) => res.json());
  return top;
}

export async function getRankInGroup(group) {
  const top = await fetch(`${BACKEND_URL}/group/rankInGroup/${group}`).then((res) => res.json());
  return top;
}

export async function updateScore(name,score,group) {
  const item = {
    "name" : name,
    "score" : score,
    "group" : group
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
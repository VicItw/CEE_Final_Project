import { BACKEND_URL } from "./config.js";

export async function getUser(name) {
  const user = await fetch(`${BACKEND_URL}/users/${name}`).then((res) => res.json());
  return user[0]; //will return error if user is not available
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

export async function checkPassword(username, password) {
  try {
    const item = {
      name: username,
      password: password
    };
    const res = await fetch(`${BACKEND_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    
    const data = await res.json();
    
    if (res.ok) {
      alert("Welcome back " + username+ ".")
      return data.message === 'Login successful';
    } else if (res.status === 400) {
        throw (data.message);
    } else if (res.status === 401) {
        throw ('Unauthorized: Invalid credentials');
    } else {
        throw ('Server error: ' + res.statusText);
    }
  }
  catch (error) {
    console.error('Error logging in:', error);
    alert(error);
    return false; // Return false in case of error
  }
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
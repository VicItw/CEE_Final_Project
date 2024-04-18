import { createUser, getUser, updateScore } from "./api.js";

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loginModal = document.getElementById("login-modal");
const RegisterModal = document.getElementById("register-modal");
const playerUser = document.getElementById("player-user"); 
const logoutBtn = document.getElementById("logout-btn")
const count = document.getElementById("player-score");
var player = undefined;


export function showLoginInterface() {
    if (loginBtn.textContent == "Login") {
      loginModal.style.display = "block";
      loginBtn.textContent = "Close";
      RegisterModal.style.display = "none";
      registerBtn.textContent = "Register";
    } 
    else {
      loginModal.style.display = "none";
      loginBtn.textContent = "Login";
    }
}
  
export function showRegisterInterface() {
    if (registerBtn.textContent == "Register") {
      RegisterModal.style.display = "block";
      registerBtn.textContent = "Close";
      loginModal.style.display = "none";
      loginBtn.textContent = "Login";
    } 
    else {
      RegisterModal.style.display = "none";
      registerBtn.textContent = "Register";
    }
}

export async function login() {
    const usernameField = document.getElementById("login-username");
    const passwordField = document.getElementById("login-password");
    const username = usernameField.value;
    const password = passwordField.value;
    console.log(username);
    console.log(password);
    try {
        const user = await getUser(username);
        console.log(user)
        const correctPassword = user.password
        if (password !== correctPassword) alert("Incorrect Password.");
        else if (password === correctPassword) {
            alert("Logged in.")
            count.innerHTML = user.score;
            playerUser.textContent = "Logged in as : " + username;
            logoutBtn.style.display = "block"
            loginModal.style.display = "none";
            loginBtn.textContent = "Login";
            usernameField.value = "";
            player = username;
        }
        passwordField.value = "";
    }
    catch (error) {
        alert("username not found");
        usernameField.value = "";
        passwordField.value = "";
    }
    
}

export async function register() {
    const usernameField = document.getElementById("register-username");
    const passwordField = document.getElementById("register-password");
    const username = usernameField.value;
    const password = passwordField.value;
    console.log(username);
    console.log(password);
    try {
        const user = await getUser(username);
        if (username === user.name) alert("Username is already used.");
    }

    catch (error) {
        createUser(username,password);
        alert("Registered");
        RegisterModal.style.display = "none";
        registerBtn.textContent = "Register";
        usernameField.value = "";
    }
    passwordField.value = "";
}

export async function update() {
    if (player === undefined) return;
    var score = parseInt(count.textContent);
    // console.log("update user : ", player, " score : ", score);
    updateScore(player, score);
}

export async function refreshPage() {
    location.reload();
}

logoutBtn.addEventListener("click", refreshPage);
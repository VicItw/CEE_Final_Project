import { checkPassword, createUser, getUser, updateScore } from "./api.js";
import { populateLeaderboard } from "./leaderboard.js";
import { score, setScore } from "./main.js";

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loginModal = document.getElementById("login-modal");
const RegisterModal = document.getElementById("register-modal");
const playerUser = document.getElementById("player-user"); 
const playerGroup = document.getElementById("player-group"); 
const logoutBtn = document.getElementById("logout-btn")
var player = undefined;
var group = undefined;
const showScore = document.getElementById("show-score");

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
        const correctPassword = await checkPassword(username, password);       
        if (correctPassword) {
            const user = await getUser(username);
            setScore(user.score);
            showScore.innerHTML = score;
            group = user.group;
            playerUser.textContent = "Logged in as : " + username;
            if (group === undefined)
                playerGroup.textContent = "";
            else playerGroup.textContent = "Group " + group;
            logoutBtn.style.display = "block"
            loginModal.style.display = "none";
            loginBtn.textContent = "Login";
            usernameField.value = "";
            player = username;
        }
        passwordField.value = "";
    }
    catch (error) {
        usernameField.value = "";
        passwordField.value = "";
    }
}

export async function register() {
    const usernameField = document.getElementById("register-username");
    const passwordField = document.getElementById("register-password");
    const groupSelect = document.getElementById("register-group");
    const username = usernameField.value;
    const password = passwordField.value;
    const groupReg = groupSelect.value;
    console.log(username);
    console.log(password);
    try {
        const user = await getUser(username);
        if (username === user.name) alert("Username is already used.");
    }

    catch (error) {
        createUser(username, password, groupReg);
        alert("Registered");
        RegisterModal.style.display = "none";
        registerBtn.textContent = "Register";
        usernameField.value = "";
    }
    passwordField.value = "";
}

export async function update() {
    populateLeaderboard();
    if (group !== undefined) {
        updateScore(player, score, group);
    }
    else if (player === undefined) return;
    updateScore(player, score);
}


export async function refreshPage() {
    location.reload();
}

logoutBtn.addEventListener("click", refreshPage);
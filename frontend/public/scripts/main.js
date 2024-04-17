// import { handleCreateMember, populateMembers } from "./member.js";
// import { fetchAndDrawTable, handleCreateItem, handleFilterItem } from "./table.js";

// document.addEventListener("DOMContentLoaded", () => {
//   fetchAndDrawTable();

//   populateMembers();

//   const addItemButton = document.getElementById("add-newrow");
//   addItemButton.addEventListener("click", () => {
//     handleCreateItem();
//   });

//   const filterButton = document.getElementById("filter-button");
//   filterButton.addEventListener("click", () => {
//     handleFilterItem();
//   });

//   const addMemberButton = document.getElementById("add-member");
//   addMemberButton.addEventListener("click", () => {
//     handleCreateMember();
//   });
// });


window.onload = function() {
  // load in all the basic variables
    var img = document.getElementById("pop-img");
    var img_path = document.getElementById("pop-img").src; 
    var pop = document.getElementById("pop-img").src; 
    var count = document.getElementById("player-score");
    var score = 0;
    var clickCount = 0;
    var currentCPS = 0;
    var audio = new Audio("res/catAudio.mp3");
    var hit = 1;
    var cpsCounter = document.getElementById("cps");
    var current = "popcat"

    // on click
    img.addEventListener('mousedown', function () {
        pop = img_path.replace("idle", "pop");
        img.src = pop;
        clickCount++;
        increaseScore(hit);
        audio.play()
    }); 

    // unclick
    img.addEventListener('mouseup', function (){
        if ( currentCPS >= 10 && current == "popcat") {
            img.src = img_path.replace("idle", "ultra");
        }
        else 
            img.src = img_path;
    })


    // Click per second counter
    setInterval(function() {
        cpsCounter.innerHTML = clickCount + " cps";
        currentCPS = clickCount;
        clickCount = 0; // Reset click count for the next interval
        img.src = img_path;
      }, 1000); // Update CPS every 1000ms (1 second)

    function increaseScore(hit) {
        score += hit;
        count.innerHTML = score;
    }


    // Character selection
    var catButton = document.getElementById("cat-button")
    catButton.addEventListener('mousedown', function (){
        img.src = "res/Popcat_idle.png";
        img_path = document.getElementById("pop-img").src; 
        current = "popcat"
        audio = new Audio("res/catAudio.mp3");
    });

    
    var bonkButton = document.getElementById("bonk-button")
    bonkButton.addEventListener('mousedown', function (){
        img.src = "res/bonk_idle.png";
        img_path = document.getElementById("pop-img").src; 
        current = "bonk"
        audio = new Audio("res/bonkAudio.mp3");
    });

// ------------- Data from Backend------------------------------- 
    var leaderboardData = [
      //get when onLoad() and player click
        { name: "Player 1", score: 100 },
        { name: "Player 2", score: 80 },
        { name: "Player 3", score: 70 },
        { name: "Player 4", score: 60 },
        { name: "Player 5", score: 50 }
      ];
//-----------------------------------------------------------------

    // Function to populate the leaderboard with data
  function populateLeaderboard() {
    var leaderboardList = document.getElementById("leaderboardList");
    leaderboardList.innerHTML = ""; // Clear previous entries
    
    // Loop through the leaderboardData array and create list items
    leaderboardData.forEach(function(item, index) {
      var listItem = document.createElement("li");
      listItem.textContent = item.name + ": " + item.score;
      leaderboardList.appendChild(listItem);
    });
  }

  // Call the populateLeaderboard function to initially populate the leaderboard
  populateLeaderboard();

  var btn = document.getElementById("x10");
  btn.addEventListener('mousedown', function (){
    console.log("x10");
    // Disable the button while it's active
    btn.disabled = true;
    hit = 10;
    
    // Set the duration for how long the button remains active (in milliseconds)
    var duration = 10000; // 5 seconds
    
    // Set the cooldown period after the button is clicked (in milliseconds)
    var cooldown = 60000; // 10 seconds
    
    // Set the button text to show the remaining duration
    var remainingTime = duration / 1000; // Convert milliseconds to seconds
    btn.textContent = "x10 Active (" + remainingTime + "s)";
    
    // Change the button color when it's active
    btn.style.backgroundColor = "green"; // Change the color to green
    
    // Update the countdown every second during active duration
    var activeCountdownInterval = setInterval(function() {
        remainingTime--;
        btn.textContent = "Active (" + remainingTime + "s)";
        if (remainingTime <= 0) {
        clearInterval(activeCountdownInterval); // Stop the countdown when it reaches zero
        btn.disabled = true;
        hit = 1;
        btn.textContent = "Cooldown (" + (cooldown / 1000) + "s)";
        btn.style.backgroundColor = "gray"; // Change the color to gray during cooldown
        
        // Set the cooldown duration countdown
        var cooldownRemainingTime = cooldown / 1000;
        var cooldownCountdownInterval = setInterval(function() {
            cooldownRemainingTime--;
            btn.textContent = "Cooldown (" + cooldownRemainingTime + "s)";
            if (cooldownRemainingTime <= 0) {
            clearInterval(cooldownCountdownInterval); // Stop the cooldown countdown when it reaches zero
            btn.disabled = false;
            btn.textContent = "x10 Ready";
            btn.style.backgroundColor = "#007bff"; // Reset the color to default after cooldown
            }
        }, 1000);
        }
    }, 1000);
  });
  

  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const loginModal = document.getElementById("login-modal");
  const RegisterModal = document.getElementById("register-modal");

  function showLoginInterface() {
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
  
  function showRegisterInterface() {
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
  
  loginBtn.addEventListener("click", showLoginInterface);
  registerBtn.addEventListener("click", showRegisterInterface);
  

}

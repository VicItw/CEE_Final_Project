var hit = 1;
var img = document.getElementById("pop-img");
var img_path = document.getElementById("pop-img").src; 
var current = "popcat"
var audio = new Audio("res/catAudio.mp3");
const count = document.getElementById("player-score");

// Character selection
export function getCat() {
    img.src = "res/Popcat_idle.png";
    img_path = document.getElementById("pop-img").src; 
    current = "popcat"
    audio = new Audio("res/catAudio.mp3");
}


export function getBonk() {
    img.src = "res/bonk_idle.png";
    img_path = document.getElementById("pop-img").src; 
    current = "bonk"
    audio = new Audio("res/bonkAudio.mp3");
}


var btn = document.getElementById("x10");
export function useX10() {
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
}


export function increaseScore(hit) {
    var score = parseInt(count.textContent);
    score += hit;
    count.innerHTML = score;
}
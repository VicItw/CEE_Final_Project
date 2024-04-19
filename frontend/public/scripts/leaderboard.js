import { getRank } from "./api.js";

var leaderboardData = [];

// Function to populate the leaderboard with data
export async function populateLeaderboard() {
    leaderboardData = await getRank();
    
    var leaderboardList = document.getElementById("leaderboardList");
    leaderboardList.innerHTML = ""; // Clear previous entries

    // Loop through the leaderboardData array and create list items
    leaderboardData.forEach(function(user, index) {
        var listUser = document.createElement("li");
        listUser.textContent = index+1 + ") " + user.name + ": " + user.score;
        leaderboardList.appendChild(listUser);
    });
}
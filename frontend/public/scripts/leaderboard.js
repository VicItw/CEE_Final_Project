import { getGroupRank, getRank, getRankInGroup } from "./api.js";

var leaderboardData = [];

const filterSelect = document.getElementById("leaderboard-filter");
const totalScoreField = document.getElementById("total");

// Function to populate the leaderboard with data
export async function populateLeaderboard() {

    var filter = filterSelect.value;
    var totalScore = 0;
    if (filter === "Users")
        leaderboardData = await getRank();
    
    else if (filter === "Groups")
        leaderboardData = await getGroupRank();
    
    else 
        leaderboardData = await getRankInGroup(filter);

    var leaderboardList = document.getElementById("leaderboardList");
    
    leaderboardList.innerHTML = ""; // Clear previous entries

    // Loop through the leaderboardData array and create list items

    if (filter === "Groups") {
        leaderboardData.forEach(function(group, index) {
            var listUser = document.createElement("li");
            listUser.textContent = index + 1 + ") " + group.group + ": " + group.score;
            totalScore += group.score;
            leaderboardList.appendChild(listUser);
        });
    }

    else {
        leaderboardData.forEach(function(user, index) {
            var listUser = document.createElement("li");
            listUser.textContent = index + 1 + ") " + user.name + ": " + user.score;
            totalScore += user.score;
            leaderboardList.appendChild(listUser);
        });
    }

    totalScoreField.innerHTML = "Total Score : " + totalScore;

}
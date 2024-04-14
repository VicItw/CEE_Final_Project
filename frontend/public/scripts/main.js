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
    var img = document.getElementById("pop-img");
    var img_path = document.getElementById("pop-img").src; 
    var pop = document.getElementById("pop-img").src; 
    var count = document.getElementById("player-score");
    var score = 0;
    var clickCount = 0;
    var currentCPS = 0;
    var audio = new Audio("res/BOB.mp3");
    var hit = 1;
    var cpsCounter = document.getElementById("cps");

    // click
    img.addEventListener('mousedown', function () {
        pop = img_path.replace("idle", "pop");
        if ( currentCPS >= 10) {
            pop = img_path.replace("idle", "ultra");
        }
        img.src = pop;
        clickCount++;
        increaseScore(hit);
        console.log(pop);
        audio.play()
    }); 

    // unclick
    img.addEventListener('mouseup', function (){
        img.src = img_path;
    })

    setInterval(function() {
        cpsCounter.innerHTML = clickCount + " cps";
        currentCPS = clickCount;
        clickCount = 0; // Reset click count for the next interval
      }, 1000); // Update CPS every 1000ms (1 second)

    function increaseScore(hit) {
        score += hit;
        count.innerHTML = score;
    }
}
document.addEventListener("DOMContentLoaded", function () {
//     const nameScreen = document.getElementById("name");
//     const userNameInput = document.getElementById("userName");
//     const isUserNameValid = () => {
//         return userNameInput.value.trim() !== "";
//     };
//     const showNameScreen = () => {
//         nameScreen.style.display = "block";
//     }
//     const hideNameScreen = () => {
//         nameScreen.style.display = "none";
//     };

//     // Event listener for the input field for entering the user name
//     userNameInput.addEventListener("keydown", function (event) {
//         if (event.keyCode === 13) {
//             event.preventDefault();
//             if (isUserNameValid()) {
//                 hideNameScreen();
//             } else {
//             alert("Please enter your name to continue.");
//             }
//         }
//     });

//     // Initially show the name screen
//     nameScreen.style.display = "block";

//     playButton.addEventListener("click", function () {
//         if (isUserNameValid()) {
//             activateGameFunctions();
//         } else {
//             alert("Please enter your name and select a difficulty level.");
//         }
//     });

const cards = document.querySelectorAll('.cards .card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle visibility by changing background image
            if (card.style.backgroundImage === 'url("Card Images/black-square-1000x750mm.png")') {
                // Change to actual image
                card.style.backgroundImage = `url(${card.dataset.image})`;
            } else {
                // Change to black square image
                card.style.backgroundImage = 'url("Card Images/black-square-1000x750mm.png")';
            }
        });
    });
});
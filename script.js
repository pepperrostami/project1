// document.addEventListener("DOMContentLoaded", function () {
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
// });
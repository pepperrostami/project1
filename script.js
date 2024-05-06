document.addEventListener("DOMContentLoaded", function () {
    const gameInfo = document.getElementById("gameInfo");
    const nextButton = document.getElementById("nextButton");
    const gameSpecs = document.getElementById("gameSpecs");
    const playButton = document.getElementById("playButton");
    const gameEnd = document.getElementById("gameEnd");

    const hideGameInfo = () => {
        gameInfo.style.display = "none";
    };

    const showGameSpecs = () => {
        gameSpecs.style.display = "block";
    };

    const hideGameSpecs = () => {
        gameSpecs.style.display = "none";
    };

    const activateGameFunctions = () => {
        // updateStatusBars();
        // updateStatusAutomatically();
        // setInterval(updateAge, 60000);
        // setInterval(updateStatusAutomatically, 20000);
    };

    nextButton.addEventListener("click", function () {
        console.log("next button clicked");
        hideGameInfo();
        showGameSpecs();
    });

    playButton.addEventListener("click", function () {
        console.log("play button clicked");
        hideGameSpecs();
        activateGameFunctions();
    });
});
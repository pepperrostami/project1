document.addEventListener("DOMContentLoaded", function () {
    const inputForm = document.getElementById("input-form");
    const startBtn = document.getElementById("startBtn");
    const nextBtn1 = document.getElementById("nextBtn1");
    const professorText = document.getElementById("professorText");
    const playerText = document.getElementById("player");
    const levelButtons = document.querySelectorAll(".level-btn");
    const readyBtn = document.getElementById("readyBtn");
    const userInfo = document.getElementById("userInfo");
    const cardsContainer = document.querySelector('.cards');
    const countdownTimer = document.getElementById("countdownTimer");

    const screen1 = document.getElementById("screen1");
    const screen2 = document.getElementById("screen2");
    const screen3 = document.getElementById("screen3");
    const screen4 = document.getElementById("screen4");

    const cardData = [
        { image: "Card Images/01.Man_carrying_a_box,_possibly_for_offerings_ca._2900–2600_BCE_Sumer.png"},
        {image: "Card Images/02.Head_of_Gudea_(Metropolitan_Museum_of_Art).png"},
        {image: "Card Images/03.Statue_of_Gudea,_Metropolitan_Museum_of_Art.png"},
        {image: "Card Images/04.Human-headed_bison_Neo-Sumerian_circa_2080_BCE.png"},
        {image: "Card Images/05.Ringstone_MET_DT9196.png"},
        {image: "Card Images/06.Cocoon-Shaped_Jar_Han_dynasty.png"},
        {image: "Card Images/07.Scepter_(MET_collection).png"},
        {image: "Card Images/08.Whip_Handle_in_the_Shape_of_a_Horse_1390-1353_BCE.png"},
        {image: "Card Images/09.Sarmatian_cup_with_animal_handle_(1st_century_CE,_reproduction).png"},
        {image: "Card Images/10.Old_Assyrian_drinking_vessel_Kültepe.png"},
        {image: "Card Images/11.Etruscan_bronze_funerary_urn_with_Scythian_mounted_archer,_mid-5th_century_BCE.png"},
        {image: "Card Images/12.Terracotta_skyphos.png"},
        {image: "Card Images/13.AI-Restored_Head_of_an_Oba,_Benin_Bronze,_1550.png"},
        {image: "Card Images/14.Cup_with_a_Poem_on_Wine._Ibn_Sukkara_al-Hashimi_(d._995–6_CE)._Buyid_dynasty._Iran.png"},
        {image: "Card Images/15.Pyxis_attique_à_figures_rouges_MET.png"},
        {image: "Card Images/16.Zeus_Ammon_Cyprus.png"},
        {image: "Card Images/17.Kushano-Sasanian_footed_cup_with_medallion_3rd-4th_century_CE_Bactria_Metropolitan_Museum_of_Art.png"},
        {image: "Card Images/18.Terret_(Rein_Guide)_Celtic_or_Roman_The_Metropolitan_Museum_of_Art.png"}   
    ];

    let playerName = "";
    let selectedLevel = "";
    let levelSelected = false;

    //1. name screen - user enters name. pressing 'start game' after entering name makes name window disappear and game intro appear
    startBtn.addEventListener("click", function (event) {
        event.preventDefault();
        playerName = document.getElementById("name").value.trim();
        if (playerName !== "") {
            screen1.style.display = "none";
            screen2.style.display = "block";
            professorText.textContent = "Help, Professor " + playerName + "! Pranksters have flooded our museum with fakes and no one can tell the difference! Search through the display cases in our archives to find the dupes and help us authenticate the real masterpieces. Only YOU can restore integrity to our great institution!";
        }
    });

    //2. game intro screen - brief paragraph intro concept of the game, next button to go to next screen. pressing next makes game intro screen disappear and level screen appear
    nextBtn1.addEventListener("click", function () {
        screen2.style.display = "none";
        screen3.style.display = "block";
    });
    //3. level screen - blurb about levels - user selects one of three buttons corresponding to three levels. user presses play button to advance to the game screen
    levelButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (!button.classList.contains("selected")) {
                levelButtons.forEach(function (btn) {
                    btn.classList.remove("selected");
                });
                button.classList.add("selected");
                selectedLevel = button.textContent;
                levelSelected = true;
                console.log("Selected Level:", selectedLevel);
            } else {
                levelSelected = false;
            }
        });
    });

    readyBtn.addEventListener("click", function () {
        // Implement functionality for ready button
        if (levelSelected === true) {
            playerName = document.getElementById("name").value.trim().toUpperCase();
            if (playerName !== "") {
            screen3.style.display = "none";
            screen4.style.display = "block";
            playerText.textContent = "PROFESSOR " + playerName;
            userInfo.textContent = "Player: " + playerName;
            startCountdown();
        } else {
            alert("Please enter your name.");
        }
        } else {
            alert("Please select how many galleries you'd like to tackle.");
        }
    });

    //4. game screen 1: dupes - gallery 1
    //card gallery
    //36 cards, 18 artifacts - can be turned over 2 at a time by user clicking on card
    //If 3rd card is clicked, other 2 exposed cards turn back over
    cardData.forEach((data, index) => {
        const card = document.createElement('div');
        card.classList.add('cardMatchGrid');
        card.dataset.image = data.image;
        card.addEventListener('click', function () {
            this.classList.toggle('revealed');
        });
        cardsContainer.appendChild(card);
    });

    const cards = document.querySelectorAll('.cards .card');

    cards.forEach(card => {
        card.style.backgroundImage = 'url("Card Images/black-square-1000x750mm.png")';
    });

    cards.forEach(card => {
        card.addEventListener('click', function () {
            const backgroundImage = getComputedStyle(card).backgroundImage;
            if (backgroundImage === 'url("Card Images/black-square-1000x750mm.png")') {
                card.style.backgroundImage = `url(${card.dataset.image})`;
            } else {
                card.style.backgroundImage = 'url("Card Images/black-square-1000x750mm.png")';
            }
        });
    });
    //basic info
    //game title & subtitle
    //user name carried over from screen 1
    //level carried over from screen 1
    //time remaining in min & sec countdown clock from moment page loads
    function startCountdown() {
        let totalTime = 10 * 60;
        updateTimerDisplay(totalTime);

        const timerInterval = setInterval(function () {
            totalTime--;
            updateTimerDisplay(totalTime);
            if (totalTime <= 0) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    function updateTimerDisplay(totalTime) {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        const formattedTime = padZero(minutes) + ":" + padZero(seconds);
        countdownTimer.textContent = formattedTime;
    }

    function padZero(num) {
        return (num < 10 ? "0" : "") + num;
    }
    //stats
    //time elapsed - counting in minutes & seconds from moment page loads
    //moves - counts cumulative number of moves
    //accuracy - accuracy %
    //average match time

});

//5. (game screen 2-optional, only if '2 galleries' is selected on screen 3): dupes - gallery 2 - stats and basic info carried over from screen 4, game screen 1
//card gallery
//36 cards, 18 artifacts - can be turned over 2 at a time by user clicking on card
//If 3rd card is clicked, other 2 exposed cards turn back over
//basic info
//game title & subtitle
//user name carried over from screen 1
//level carried over from screen 1
//time remaining in min & sec countdown clock from moment page loads
//stats
//time elapsed - counting in minutes & seconds from moment page loads
//moves - counts cumulative number of moves
//accuracy - accuracy %
//average match time

//6. (game screen 3-optional, only if '3 galleries' is selected on screen 3): dupes - gallery 3 - stats and basic info carried over from screen 5, game screen 2
//card gallery
//36 cards, 18 artifacts - can be turned over 2 at a time by user clicking on card
//If 3rd card is clicked, other 2 exposed cards turn back over
//basic info
//game title & subtitle
//user name carried over from screen 1
//level carried over from screen 1
//time remaining in min & sec countdown clock from moment page loads
//stats
//time elapsed - counting in minutes & seconds from moment page loads
//moves - counts cumulative number of moves
//accuracy - accuracy %
//average match time

//7. Authentication Intro
//p - brief blurb to say, congratulations on finding the dupes. Now it's time to use your expertise to find which one is the real one
//time briefly stops until screen 8 loads
//button 'ready!'

//8. game screen 4: authentication - gallery 1
//button to activate blacklight - starts timers again
//images appear 2 at a time large on the screen
//user has to wave blacklight over images to find the invisible authentication seal or the phony signature ('Van Noh')

//9. (game screen 5: authentication - gallery 2-optional, only if '2 galleries' is selected on screen 3):
//button to activate blacklight - starts timers again
//images appear 2 at a time large on the screen
//user has to wave blacklight over images to find the invisible authentication seal or the phony signature ('Van Noh')

//10. (game screen 6: authentication - gallery 3-optional, only if '3 galleries' is selected on screen 3):
//button to activate blacklight - starts timers again
//images appear 2 at a time large on the screen
//user has to wave blacklight over images to find the invisible authentication seal or the phony signature ('Van Noh')

//11. (win screen - contingent on user winning by completing level selected in the timeframe given):
//p - congratulations, Professor (username!) You helped us find the dupes and discard the frauds to restore harmony to our sacred institution. Museum-goers for the rest of time are forever indebted to you!

//12. (lose screen - if user doesn't complete levels selected in the timeframe given):
//p - message about losing. 'replay' button brings user back to screen 1
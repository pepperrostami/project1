const artObjects = [
    { img: 'img/02.Head_of_Gudea_(Metropolitan_Museum_of_Art).png', matched: false },
    { img: 'img/03.Statue_of_Gudea,_Metropolitan_Museum_of_Art.png', matched: false },
    { img: 'img/04.Human-headed_bison_Neo-Sumerian_circa_2080_BCE.png', matched: false },
    { img: 'img/05.Ringstone_MET_DT9196.png', matched: false },
    { img: 'img/07.Scepter_(MET_collection).png', matched: false },
    { img: 'img/08.Whip_Handle_in_the_Shape_of_a_Horse_1390-1353_BCE.png', matched: false },
    { img: 'img/09.Sarmatian_cup_with_animal_handle_(1st_century_CE,_reproduction).png', matched: false },
    { img: 'img/10.Old_Assyrian_drinking_vessel_Kültepe.png', matched: false },
    { img: 'img/11.Etruscan_bronze_funerary_urn_with_Scythian_mounted_archer,_mid-5th_century_BCE.png', matched: false },
    { img: 'img/12.Terracotta_skyphos.png', matched: false },
    { img: 'img/13.AI-Restored_Head_of_an_Oba,_Benin_Bronze,_1550.png', matched: false },
    { img: 'img/14.Cup_with_a_Poem_on_Wine._Ibn_Sukkara_al-Hashimi_(d._995–6_CE)._Buyid_dynasty._Iran.png', matched: false },
    { img: 'img/15.Pyxis_attique_à_figures_rouges_MET.png', matched: false },
    { img: 'img/17.Kushano-Sasanian_footed_cup_with_medallion_3rd-4th_century_CE_Bactria_Metropolitan_Museum_of_Art.png', matched: false },
    { img: 'img/18.Terret_(Rein_Guide)_Celtic_or_Roman_The_Metropolitan_Museum_of_Art.png', matched: false }
];
const objectCover = 'img/black-square-1000x750mm.png';

const backgroundMusic = document.getElementById('background-music');
const pauseButton = document.getElementById('pause-music');
const withSoundButton = document.getElementById('with-music');
const startGameSound = new Audio('mp3/FTF Start-Game.wav');
const selectSound = new Audio('mp3/FTF Select.wav');
const dupeFoundSound = new Audio('mp3/FTF Dupe-Found.wav');
const noMatchSound = new Audio('mp3/FTF No-Match.wav');
const winGameSound = new Audio('mp3/FTF Win-Game.wav');
const loseGameSound = new Audio('mp3/FTF Lose-Game.wav')
const chancesDisplay = document.querySelector('h2');
const timerDisplay = document.getElementById('timer');
const counterDisplay = document.getElementById('time-elapsed');
const introModal = document.getElementById('intro-modal-container');
const loseModal = document.getElementById('lose-modal-container');
const winModal = document.getElementById('win-modal-container');

let accuracy, avgMatchTime, chances, counter, seconds, objects, selectedObject, matches, ignoreClicks;
let numMoves = 0;
let dupes = 0;
let totalMatches = 0;
let totalMatchTime = 0;

document.querySelector('grid').addEventListener('click', selectionDetermination);
document.getElementById('replay').addEventListener('click', replayGame);
document.getElementById('play-again').addEventListener('click', replayGame);

document.getElementById('ready').addEventListener("click", function () {
    startGame();
    document.getElementById('game-screen').style.display = 'block';
});
pauseButton.addEventListener('click', function() {
    toggleSound(false);
});
withSoundButton.addEventListener('click', function() {
    toggleSound(true);
});

play();

function play() {
    objects = getShuffledObjects();
    selectedObject = null;
    winner = null;
    ignoreClicks = false;
    counter = 0;
    seconds = 90;
    chances = 30;
    matches = 0;
    render();
}

function toggleSound(play) {
    if (play) {
        backgroundMusic.play();
        pauseButton.style.display = "block";
        withSoundButton.style.display = "none";
    } else {
        backgroundMusic.pause();
        pauseButton.style.display = "none";
        withSoundButton.style.display = "block";
    }
}

function render() {
    objects.forEach(function (object, idx) {
        const imgEl = document.getElementById(idx);
        const src = (object.matched || object === selectedObject) ? object.img : objectCover;
        imgEl.src = src;
    });
    chancesDisplay.innerHTML = `chances: ${chances}/30`;
    timerDisplay.innerHTML = `0:${seconds}`;
    counterDisplay.innerHTML = `0:${counter}`;
    document.getElementById('num-moves').textContent = numMoves;
    document.getElementById('dupes').textContent = dupes;
}

function getShuffledObjects() {
    let tempObjects = [];
    let objects = [];
    for (let object of artObjects) {
        tempObjects.push({ ...object }, { ...object });
    }
    while (tempObjects.length) {
        let rndIdx = Math.floor(Math.random() * tempObjects.length);
        let object = tempObjects.splice(rndIdx, 1)[0];
        objects.push(object);
    }
    return objects;
}

function selectionDetermination(evt) {
    const objectIdx = parseInt(evt.target.id);
    const object = objects[objectIdx];
    if (ignoreClicks || isNaN(objectIdx) || object.matched) return;
    selectSound.play();
    if (selectedObject && selectedObject === object) {
        selectedObject = null;
    } else if (selectedObject) {
        if (object.img === selectedObject.img) {
            object.matched = selectedObject.matched = true;
            dupeFoundSound.play();
            selectedObject = null;
            winner = objects.every(object => object.matched);
            dupes++;
            updateAccuracy();
            updateAverageMatchTime();
        } else {
            ignoreClicks = true;
            object.matched = true;
            chances--;
            setTimeout(function () {
                ignoreClicks = false;
                selectedObject = null;
                object.matched = false;
                noMatchSound.play();
                render();
            }, 800);
        }
        numMoves++;
        updateAccuracy();
        updateAverageMatchTime();
    } else {
        selectedObject = object;
    }
    if (chances <= 0) {
        gameOver();
    }
    if (winner === true) {
        winGame();
    }
    if (seconds <= 0) {
        resetTimer();
        gameOver();
    }
    render();
    toggleFlip(objectIdx);
}

function toggleFlip(objectIdx) {
    const container = document.getElementById(`container-${objectIdx}`);
    container.classList.add('flip');
    setTimeout(() => {
        container.classList.remove('flip');
    }, 600);
}

function startGame() {
    backgroundMusic.play();
    startGameSound.play();
    introModal.classList.add('hidden');
    winModal.classList.remove('show');
    loseModal.classList.remove('show');
    play();
    startTimer();
    document.getElementById('game-logo').style.display = 'block';
    document.querySelector('h3').style.display = 'block';
    document.getElementById('game-screen').classList.add('custom-cursor');
}

function startTimer() {
    function tick() {
        seconds--;
        if (seconds <= 0) {
            seconds = 0;
            gameOver();
            resetTimer();
            clearInterval(timeCount);
            return;
        }
        render(seconds);
        counter++;
        render(counter);
    }
    timeCount = setInterval(tick, 1000);
}

function resetTimer() {
    clearInterval(timeCount);
    seconds = 90;
    counter = 0;
    render(seconds);
    render(counter);
}

function winGame() {
    winGameSound.play();
    selectedObject = null;
    winModal.classList.add('show');
    timerDisplay.style.visibility = 'hidden';
    chancesDisplay.style.visibility = 'hidden';
    resetTimer();
    clearInterval(timeCount);
    document.getElementById('game-logo').style.display = 'block';
    document.querySelector('h3').style.display = 'block';
    accuracy = 0;
    avgMatchTime = 0;
}

function replayGame() {
    backgroundMusic.play();
    resetTimer();
    startGame();
    loseModal.classList.remove('show');
    timerDisplay.style.visibility = 'visible';
    chancesDisplay.style.visibility = 'visible';
    document.getElementById('game-logo').style.display = 'block';
    document.querySelector('h3').style.display = 'block';
    document.getElementById('stats').style.display = 'block';
    document.getElementById('pause-music').style.display = 'block';
    document.getElementById('with-music').style.display = 'none';
    numMoves = 0;
    dupes = 0;
    updateAccuracy();
    updateAverageMatchTime()
}

function gameOver() {
    loseGameSound.play();
    selectedObject = null;
    loseModal.classList.add('show');
    timerDisplay.style.visibility = 'hidden';
    chancesDisplay.style.visibility = 'hidden';
    document.getElementById('game-logo').style.display = 'block';
    document.querySelector('h3').style.display = 'block';
    document.getElementById('stats').style.display = 'block';
    document.getElementById('game-screen').classList.remove('custom-cursor');
    accuracy = 0;
    avgMatchTime = 0;
}

function calculateAccuracy() {
    return Math.round((dupes / numMoves) * 100);
}

function updateAccuracy() {
    const accuracyPercentage = calculateAccuracy();
    document.getElementById('accuracy').textContent = accuracyPercentage + '%';
}

function calculateAverageMatchTime() {
    if (dupes === 0) {
        return '0:00';
    }
    const averageTimeSeconds = Math.round(counter / dupes);
    const minutes = Math.floor(averageTimeSeconds / 60);
    const seconds = averageTimeSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateAverageMatchTime() {
    const averageMatchTime = calculateAverageMatchTime();
    document.getElementById('avg-match-time').textContent = averageMatchTime;
}
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
const startSound = new Audio('mp3/FTF Start.wav');
const clickSound = new Audio('mp3/FTF Ding.wav');
const matchSound = new Audio('mp3/FTF Correct.wav');
const loseSound = new Audio('mp3/FTF Lose louder.wav')
const winSound = new Audio('mp3/FTF Win louder.wav');
const wrongSound = new Audio('mp3/FTF Wrong.wav');

let accuracy, avgMatchTime, counter, cards, selectedCard, ignoreClicks, matches, seconds, chances;
let numMoves = 0;
let dupes = 0;
let totalMatches = 0;
let totalMatchTime = 0;

const chancesDisplay = document.querySelector('h2');
const timerDisplay = document.getElementById('timer');
const counterDisplay = document.getElementById('time-elapsed');
const introModal = document.getElementById('intro-modal-container');
const loseModal = document.getElementById('lose-modal-container');
const winModal = document.getElementById('win-modal-container');

document.querySelector('main').addEventListener('click', handleChoice);
document.getElementById('replay').addEventListener('click', replayGame);
document.getElementById('play-again').addEventListener('click', replayGame);
document.getElementById('ready').addEventListener("click", function () {
    startGame();
    document.getElementById('game-screen').style.display = 'block';
});

play();

function play() {
    cards = getShuffledCards();
    selectedCard = null;
    ignoreClicks = false;
    seconds = 90;
    counter = 0;
    chances = 30;
    matches = 0;
    winner = null;
    render();
}

function render() {
    cards.forEach(function (card, idx) {
        const imgEl = document.getElementById(idx);
        const src = (card.matched || card === selectedCard) ? card.img : objectCover;
        imgEl.src = src;
    });
    chancesDisplay.innerHTML = `chances: ${chances}/30`;
    timerDisplay.innerHTML = `0:${seconds}`;
    counterDisplay.innerHTML = `0:${counter}`;
    document.getElementById('num-moves').textContent = numMoves;
    document.getElementById('dupes').textContent = dupes;
}

function getShuffledCards() {
    let tempCards = [];
    let cards = [];
    for (let card of artObjects) {
        tempCards.push({ ...card }, { ...card });
    }
    while (tempCards.length) {
        let rndIdx = Math.floor(Math.random() * tempCards.length);
        let card = tempCards.splice(rndIdx, 1)[0];
        cards.push(card);
    }
    return cards;
}

function handleChoice(evt) {
    const cardIdx = parseInt(evt.target.id);
    const card = cards[cardIdx];
    if (ignoreClicks || isNaN(cardIdx) || card.matched) return;
    clickSound.play();
    if (selectedCard && selectedCard === card) {
        selectedCard = null;
    } else if (selectedCard) {
        if (card.img === selectedCard.img) {
            card.matched = selectedCard.matched = true;
            matchSound.play();
            selectedCard = null;
            winner = cards.every(card => card.matched);
            dupes++;
            updateAccuracy();
            updateAverageMatchTime();
        } else {
            ignoreClicks = true;
            card.matched = true;
            chances--;
            setTimeout(function () {
                ignoreClicks = false;
                selectedCard = null;
                card.matched = false;
                wrongSound.play();
                render();
            }, 800);
        }
        numMoves++;
        updateAccuracy();
        updateAverageMatchTime();
    } else {
        selectedCard = card;
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
    toggleFlip(cardIdx);
}

function toggleFlip(cardIdx) {
    const container = document.getElementById(`container-${cardIdx}`);
    container.classList.add('flip');
    setTimeout(() => {
        container.classList.remove('flip');
    }, 600);
}

function startGame() {
    backgroundMusic.play();
    startSound.play();
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
        render(seconds);
        counter++;
        render(counter);
    }
    timeCount = setInterval(tick, 1000);
}

function resetTimer() {
    clearInterval(timeCount);
    seconds = 60;
    counter = 0;
    render(seconds);
    render(counter);
}

function winGame() {
    winSound.play();
    selectedCard = null;
    winModal.classList.add('show');
    timerDisplay.style.visibility = 'hidden';
    chancesDisplay.style.visibility = 'hidden';
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
    numMoves = 0;
    dupes = 0;
    updateAccuracy();
    updateAverageMatchTime()
}

document.getElementById('play-again').addEventListener('click', replayGame);
document.getElementById('replay').addEventListener('click', replayGame);

function gameOver() {
    loseSound.play();
    selectedCard = null;
    loseModal.classList.add('show');
    timerDisplay.style.visibility = 'hidden';
    chancesDisplay.style.visibility = 'hidden';
    document.getElementById('game-logo').style.display = 'none';
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
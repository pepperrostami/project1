const SOURCE_CARDS = [
    { img: 'img/03.Statue_of_Gudea,_Metropolitan_Museum_of_Art.png', matched: false },
    { img: 'img/05.Ringstone_MET_DT9196.png', matched: false },
    { img: 'img/07.Scepter_(MET_collection).png', matched: false },
    { img: 'img/09.Sarmatian_cup_with_animal_handle_(1st_century_CE,_reproduction).png', matched: false },
    { img: 'img/11.Etruscan_bronze_funerary_urn_with_Scythian_mounted_archer,_mid-5th_century_BCE.png', matched: false },
    { img: 'img/12.Terracotta_skyphos.png', matched: false },
    { img: 'img/13.AI-Restored_Head_of_an_Oba,_Benin_Bronze,_1550.png', matched: false },
    { img: 'img/15.Pyxis_attique_à_figures_rouges_MET.png', matched: false },
    { img: 'img/17.Kushano-Sasanian_footed_cup_with_medallion_3rd-4th_century_CE_Bactria_Metropolitan_Museum_of_Art.png', matched: false },
    { img: 'img/18.Terret_(Rein_Guide)_Celtic_or_Roman_The_Metropolitan_Museum_of_Art.png', matched: false }
  ];  
  const CARD_BACK = 'img/black-square-1000x750mm.png';
  
  const backgroundMusic = document.getElementById('background-music');
  const startSound = new Audio('mp3/FTF Start.wav');
  const clickSound = new Audio('mp3/FTF Ding.wav');
  const matchSound = new Audio('mp3/FTF Correct.wav');
  const loseSound = new Audio('mp3/FTF Lose louder.wav')
  const winSound = new Audio('mp3/FTF Win louder.wav');
  const wrongSound = new Audio('mp3/FTF Wrong.wav');
  
  let startTime, cards, selectedCard, ignoreClicks, matches, seconds, chances;
  let numMoves = 0;
  let totalMatches = 0;
  let totalMatchTime = 0;
  
  const chancesEl = document.querySelector('h2');
  const timerEl = document.getElementById('counter');
  const introModal = document.getElementById('intro-modal-container');
  const loseModal = document.getElementById('lose-modal-container');
  const winModal = document.getElementById('win-modal-container');
  
  document.querySelector('main').addEventListener('click', handleChoice);
  document.getElementById('replay').addEventListener('click', replayGame);
  document.getElementById('play-again').addEventListener('click', replayGame);
document.getElementById('ready').addEventListener("click", function() {
    startGame();
    document.getElementById('game-screen').style.display = 'block';
});
  
  play();
  
function play() {
  cards = getShuffledCards();
  selectedCard = null;
  ignoreClicks = false;
  seconds = 60;
  chances = 20;
  matches = 0;
  winner = null;
  render();
}
  
  function render() {
  cards.forEach(function (card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === selectedCard) ? card.img : CARD_BACK;
    imgEl.src = src;
  });
  chancesEl.innerHTML = `chances: ${chances}/20`;
  timerEl.innerHTML = `0:${seconds}`;
  }
  
  function getShuffledCards() {
  let tempCards = [];
  let cards = [];
  for (let card of SOURCE_CARDS) {
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
      }
      timeCount = setInterval(tick, 1000);
    }

  function resetTimer() {
    clearInterval(timeCount);
    seconds = 60;
    render(seconds);
  }
  
  function winGame() {
    winSound.play();
    selectedCard = null;
    winModal.classList.add('show');
    timerEl.style.visibility = 'hidden';
    chancesEl.style.visibility = 'hidden';
    document.getElementById('game-logo').style.display = 'block';
    document.querySelector('h3').style.display = 'block';
  }
  
  function replayGame() {
    backgroundMusic.play();
    resetTimer();
    startGame();
    loseModal.classList.remove('show');
    timerEl.style.visibility = 'visible';
    chancesEl.style.visibility = 'visible';
    document.getElementById('game-logo').style.display = 'block';
    document.querySelector('h3').style.display = 'block';
    document.getElementById('stats').style.display = 'block';
  }
  
  document.getElementById('play-again').addEventListener('click', replayGame);
  document.getElementById('replay').addEventListener('click', replayGame);
  
  function gameOver() {
    loseSound.play();
    selectedCard = null;
    loseModal.classList.add('show');
    timerEl.style.visibility = 'hidden';
    chancesEl.style.visibility = 'hidden';
    document.getElementById('game-logo').style.display = 'none';
    document.querySelector('h3').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
    document.getElementById('game-screen').classList.remove('custom-cursor');
  }
(function($) {
  
  $.fn.hangman = function(hangmanData) {

    function loadClues(){
      for (i=0; i<hangmanData.length; i++){
        hangmanAnswers.push(hangmanData[i]['answer'])
        hangmanClues.push(hangmanData[i]['clue'])
        hangmanLinks.push(hangmanData[i]['link'])
      }
    }

    $('#hangmancontainer').append(
        '<h1 class="text-center">Hangman</h1>'+
        '<input type="image" class="btnStyle" id="btnMenu" src="images/settings.png" alt="Impostazioni"><br>'+
        '<input type="image" class="btnStyle" onClick = "audioMode()" id="btnAudioOn" src="images/soundon.png" style="display:none" alt="Disattiva suono">'+
        '<input type="image" class="btnStyle" onClick = "blindMode()" id="btnBlindMode" src="images/blindoff.png" style="display:none" alt="Modalità non vedenti"><br>'+
        '<select onchange="changeLang()" id="optChangeLang" style="display:none" alt="Cambia Interprete"></select>'+
        '<div class="float-right">Tentativi sbagliati: <span id="mistakes">0</span> of <span id="maxWrong"></span></div>' +
        '<div class="text-center">'+
        '<img id="hangmanPic" src="images/0.jpg" alt="Immagine dell\'impiccato">'+
        '<p id="clueSpotlight" alt="" tabindex=0></p>'+
        '<p id="wordSpotlight" alt="">The word to be guessed goes here</p><a href="#" id="aLinkImage" target="_blank"><img src="images/link.png" id="linkImage" hidden></a></div>'+
        '<p id="blindWordSpotlight" alt="" hidden>The word to be guessed goes here</p></div>'+
        '<div id="keyboard"></div>'+
        '<input type="button" class="btnStyle" id="btnHangmanBack" value="Indietro">'+
        '<button class="btnStyle" onClick="reset(), remindClue()" id="btnNext">Prossimo</button><br>'+
        '<h2 className="content1"></h2>'+
        '</div>'
    )

    $('hangmancontainer').ready(function(){
      loadLang();
    })
  
    $('#btnHangmanBack').click(function(){
      reset();
      $('#puzzle-wrapper').remove()
      $('#cluescontainer').remove()
      $('#hangmancontainer').remove()
      $('body').append('<div id="puzzle-wrapper"></div>')
      $('body').append('<div id="hangmancontainer" hidden></div>')
      $('#hangmancontainer').hide();
      $('#divIntro').show()
      hangmanAnswers = []
      hangmanClues = []
      settingsMode = 1;
      blindOn = false;
      audioOn = true;
    });

    $('#btnBlindMode').click(function(){
      if( $(window).width() > 500){
        $('#keyboard').toggle()
      }

      $('#clueSpotlight').attr('alt', clue)
      $('#wordSpotlight').toggle()
      $('#blindWordSpotlight').toggle()
    })

    $('#btnMenu').click(function(){
      if (settingsMode == 0){
        settingsMode = 1;
      }else{
        settingsMode = 0;
      }
      $('#btnAudioOn').toggle(400);
      $('#btnBlindMode').toggle(400);
      $('#optChangeLang').toggle(400);
    });

    $(document).keyup(function (event) {
        char = String.fromCharCode(event.keyCode).toLowerCase()
        if (document.getElementById(char).getAttribute('disabled') != 'true'){
          if (mistakes != maxWrong){
            handleGuess(char)
          }
        }
    });

    document.getElementById('maxWrong').innerHTML = maxWrong;

    loadClues();
    randomWord();
    generateButtons();
    guessedWord();
  }

})(jQuery)

var settingsMode = 1;

var hangmanAnswers = []
var hangmanClues = []
var hangmanLinks = []

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = 'images/0.jpg';
  document.getElementById('hangmanPic').style.opacity ='1';
  document.getElementById('linkImage').style.display ='none';

  if (hangmanAnswers.length == 0){
    document.getElementById('keyboard').innerHTML = 'Parole terminate!';
  }else {
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
  }

}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btnStyleTrans"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function randomWord() {
  randomNumber = Math.random()
  answer = hangmanAnswers[Math.floor(randomNumber * hangmanAnswers.length)];
  clue = hangmanClues[Math.floor(randomNumber * hangmanClues.length)];
  link = hangmanLinks[Math.floor(randomNumber * hangmanLinks.length)];
  var randomIndex = Math.floor(randomNumber * hangmanAnswers.length)
  hangmanAnswers.splice(randomIndex, 1)
  hangmanClues.splice(randomIndex, 1)
  hangmanLinks.splice(randomIndex, 1)
  document.getElementById('aLinkImage').href = link
  console.log(document.getElementById('aLinkImage').href)
}

function handleGuess(chosenLetter) {
  chosenLetter = chosenLetter.toLowerCase()
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);
  if (answer.toLowerCase().indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function guessedWord() {
  //wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  wordStatus = '';
  for (i=0; i<answer.length; i++){
    if (guessed.indexOf(answer[i].toLowerCase()) >= 0){
      wordStatus += answer[i].toLowerCase();
    }else{
      if (answer[i] == ' '){
        wordStatus += '&nbsp;'
      }else{
        wordStatus += ' _ '
      }
    }
  }
  let clueStatus = clue + ':';
  let wordStatusSplitted = ''
  for (x=0; x<wordStatus.length; x++){
    if (wordStatus[x]!= ' '){
      wordStatusSplitted += wordStatus[x];
    }
  }
  wordStatusSplitted = wordStatusSplitted.replace("&nbsp;", " ");
  document.getElementById('blindWordSpotlight').innerHTML = '';
  var accounting = 0;
  for (i=0; i<answer.length; i++) {
    if (wordStatusSplitted[i] == '_') {
      accounting += 1;
      if (i == answer.length - 1) {
        if (accounting == 1) {
          document.getElementById('blindWordSpotlight').innerHTML += ' una lettera, ';
        } else {
          document.getElementById('blindWordSpotlight').innerHTML += ' ' + accounting + ' lettere, ';
        }
      }
    }else{
      if (accounting !=0){
        if (accounting == 1){
          document.getElementById('blindWordSpotlight').innerHTML += ' una lettera, ';
        }else{
          document.getElementById('blindWordSpotlight').innerHTML += ' ' + accounting + ' lettere, ';
        }
      }
      if(wordStatusSplitted[i] == ' '){
        document.getElementById('blindWordSpotlight').innerHTML += ' spazio, ';
      }else{
        document.getElementById('blindWordSpotlight').innerHTML += answer[i] + ',';
      }

      accounting = 0;
    }
  }

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
  document.getElementById('clueSpotlight').innerHTML = clueStatus;

  if (blindOn == true){
    window.speechSynthesis.cancel()
    tts(document.getElementById('blindWordSpotlight').innerHTML, voiceIndex)
  }
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = 'images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  wordStatus = wordStatus.replace(/\s/g, '');
  if (wordStatus.replace('&nbsp;', '') === answer.replace(/\s/g, '').toLowerCase()) {
    document.getElementById("linkImage").style.display = 'inline'
    document.getElementById('hangmanPic').src = 'images/win.png';
    document.getElementById('hangmanPic').style.opacity ='0.5';
    if (blindOn == true) {
      window.speechSynthesis.cancel()
      tts('Complimenti, la parola corretta era: ' + document.getElementById('wordSpotlight').innerHTML.replace("&nbsp;", " " ), voiceIndex)
    }
    if (audioOn == true) {
      var audio = new Audio('sounds/nextlevel.wav');
      audio.play();
    }
    for (i=97;i<123; i++) {
      let characterCode = String.fromCharCode(i)
      document.getElementById(characterCode).disabled = true;
    }
  }else{
    if (audioOn == true){
      var audio = new Audio('sounds/win.wav');
      audio.play();
    }
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'La risposta era: ' + answer;
    document.getElementById('keyboard').innerHTML = 'Hai perso!!!';
    if (audioOn == true) {
      var audio = new Audio('sounds/loselevel.wav');
      audio.play();
    }
  }else{
    if (audioOn == true){
      var audio = new Audio('sounds/lose.wav');
      audio.play();
    }
    setTimeout(remindError(),90)

  }
}

// PARTE DI CODICE RELATIVA AL TEXT TO SPEECH --------------------------------------------------------->

window.onload = function () {
  speak(" ");
};

const speak = (sentance) => {

  const tts = new SpeechSynthesisUtterance(sentance);
  const voices = speechSynthesis.getVoices();
  tts.voice = voices[1]; //changing the voice
  tts.rate = 1;
  tts.pitch = 1; // 0 = deep voice

  window.speechSynthesis.speak(tts);
};

var audioOn = true;
var blindOn = false;

var voiceIndex = 0;

async function loadLang(){
  const voices = speechSynthesis.getVoices();
  for (i=0; i<voices.length; i++){
    if (voices[i].name.substring(voices[i].name.length - 7) == '(Italy)' || voices[i].name.substring(voices[i].name.length - 8) == 'italiano') {
      var opt = document.createElement('option');
      opt.value = voices[i].name;
      opt.innerHTML = voices[i].name;
      document.getElementById('optChangeLang').appendChild(opt);
      voiceIndex = i;
      opt.setAttribute('selected', '')
    }
  }
}

async function tts(message, indice) {
  const speech = new SpeechSynthesisUtterance();
  const voices = speechSynthesis.getVoices();

  speech.voice = voices[indice]

  speech.lang = 'it'
  speech.volume = 2;
  speech.rate = 1.0;
  speech.pitch = 0.8; //not so deep
  speech.text = message;

  window.speechSynthesis.speak(speech);
}

function audioMode(){
  if (audioOn == true){
    audioOn = false;
    document.getElementById('btnAudioOn').src = 'images/soundoff.png'
    document.getElementById('btnAudioOn').alt = 'Suoni disattivati'
  }else{
    audioOn = true;
    document.getElementById('btnAudioOn').src = 'images/soundon.png'
    document.getElementById('btnAudioOn').alt = 'Suoni attivati'
  }
}

function blindMode(){
  if (blindOn == true){
    blindOn = false;
    document.getElementById('btnBlindMode').src = 'images/blindoff.png'
    document.getElementById('btnBlindMode').alt = 'modalità non vedenti disattivata'

  }else{
    blindOn = true;
    document.getElementById('btnBlindMode').src = 'images/blindon.png'
    document.getElementById('btnBlindMode').alt = 'modalità non vedenti attiva'
    remindClue();
  }
}

function remindError(){
  if (blindOn == true) {
    window.speechSynthesis.cancel()
    if (mistakes < 5) {
      tts("Puoi fare ancora " + (6 - parseInt(mistakes)) + " errori", voiceIndex)
    } else {
      tts("Puoi fare ancora " + (6 - parseInt(mistakes)) + " errore", voiceIndex)
    }
  }
}

function remindClue(){
  if (blindOn == true){
    tts(clue, voiceIndex);
  }
}

function changeLang(){
  var langName = document.getElementById('optChangeLang').value
  const voices = speechSynthesis.getVoices();
  for (i=0; i<voices.length; i++){
    if (voices[i].name == langName) {
      voiceIndex = i
    }
  }
}
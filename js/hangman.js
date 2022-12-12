(function($) {
  
  $.fn.hangman = function(hangmanData) {

    function loadClues(){
      for (i=0; i<hangmanData.length; i++){
        hangmanAnswers.push(hangmanData[i]['answer'])
        hangmanClues.push(hangmanData[i]['clue'])
      }
    }

    $('#hangmancontainer').append(
			' <h1 class="text-center">Hangman</h1>'+
			'<div class="float-right">Tentativi sbagliati: <span id="mistakes">0</span> of <span id="maxWrong"></span></div>'+
			'<div class="text-center">'+
			  '<img id="hangmanPic" src="images/0.jpg" alt="">'+
			  '<p id="clueSpotlight"></p>'+
			  '<p id="wordSpotlight">The word to be guessed goes here</p>'+
			  '<div id="keyboard"></div>'+
        '<input type="button" class="btnStyle" id="btnHangmanBack" value="Indietro"></input>'+
			  '<button class="btnStyle" onClick="reset()">Next</button>'+
			'</div>'
		)
  
    $('#btnHangmanBack').click(function(){
      reset();
      $('#puzzle-wrapper').remove()
      $('#cluescontainer').remove()
      $('#hangmancontainer').remove()
      $('body').append('<div id="puzzle-wrapper"></div>')
      $('body').append('<div id="hangmancontainer" hidden></div>')
      $('#hangmancontainer').hide();
      $('#divIntro').show()
      //window.location.reload()
      hangmanAnswers = []
      hangmanClues = []
    });

    $(document).keyup(function (event) {
        char = String.fromCharCode(event.keyCode).toLowerCase()
        handleGuess(char)
    });

    document.getElementById('maxWrong').innerHTML = maxWrong;

    loadClues();
    randomWord();
    generateButtons();
    guessedWord();
  }

})(jQuery)

var hangmanAnswers = []
var hangmanClues = []

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
  var randomIndex = Math.floor(randomNumber * hangmanAnswers.length)
  hangmanAnswers.splice(randomIndex, 1)
  hangmanClues.splice(randomIndex, 1)
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
      console.log(answer[i].toLowerCase())
    }else{
      if (answer[i] == ' '){
        wordStatus += '&nbsp;'
      }else{
        wordStatus += ' _ '
      }
    }
  }
  let clueStatus = clue + ':';

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
  document.getElementById('clueSpotlight').innerHTML = clueStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = 'images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus.replace('&nbsp;', '') === answer.replace(/\s/g, '').toLowerCase()) {
    //document.getElementById('keyboard').innerHTML = 'You Won!!!';
    document.getElementById('hangmanPic').src = 'images/win.png';
    document.getElementById('hangmanPic').style.opacity ='0.5';
    for (i=97;i<123; i++) {
      let characterCode = String.fromCharCode(i)
      document.getElementById(characterCode).disabled = true;
    }
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

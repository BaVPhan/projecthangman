$(document).ready(function(){
  console.log("IS IT WORKING");

var mysteryWord = {
  hangmanWord: [],
  wordUnderscore: [],
  wordArray: [],
  counter: -1,
  bodyParts: ["#headcenter", "#torsocenter", "#armleft", "#armright", "#legleft", "#legright"]
}
var h4 = document.getElementsByTagName('h4')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        h4.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timer();
    }
    function timer() {
        t = setTimeout(add, 1000);
    }

    /* Start button */
    start.onclick = timer;

    /* Stop button */
      stop.onclick = function() {
        clearTimeout(t);
      }
    /* Clear button */
      clear.onclick = function() {
        h4.textContent = "00:00:00";
        seconds = 0; minutes = 0; hours = 0;
      }
$("#submitInput").on("click", function(evt){
  evt.preventDefault();
  var hintInput = $("#hintEntry").val();
  $("#showHint").html("Hint: " + hintInput);
  $("#hintEntry").val("");
  hideAll();
})

$("#submitInput").on("click", function(evt){
  evt.preventDefault();
  mysteryWord.hangmanWord = $("#wordEntry").val();
  mysteryWord.wordArray = mysteryWord.hangmanWord.split('');
  for (i=0; i < mysteryWord.wordArray.length; i++)
    mysteryWord.wordUnderscore[i] = " _ ";
    console.log(mysteryWord.wordUnderscore);
    $("#showWord").html(mysteryWord.wordUnderscore);
    $("#wordEntry").val("");
})

$("#submitGuess").on("click", function(evt){
  evt.preventDefault();
  var guessInput = $("#guessEntry").val();
  if (mysteryWord.wordArray.includes(guessInput)) {
    for (i=0; i< mysteryWord.wordArray.length; i++) {
      if (mysteryWord.wordArray[i] === guessInput) {
        mysteryWord.wordUnderscore[i] = guessInput;
        console.log(mysteryWord.wordUnderscore);
        $("#showWord").html(mysteryWord.wordUnderscore);
      }
    }
  } else if (mysteryWord.counter >= 5) {
    alert("GAME OVER!! The correct answer is: " + mysteryWord.hangmanWord);
  }
  else {
    mysteryWord.counter += 1;
    console.log(mysteryWord.counter);
    $(mysteryWord.bodyParts[mysteryWord.counter]).show();
    $("#displayGuesses").append(" <b>" + guessInput + "</b>");
  }
  $("#guessEntry").val("");
})

  function hideAll (){
    $("#headcenter").hide();
    $("#torsocenter").hide();
    $("#armleft").hide();
    $("#armright").hide();
    $("#legleft").hide();
    $("#legright").hide();
  }

})

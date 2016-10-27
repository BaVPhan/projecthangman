$(document).ready(function(){
  console.log("IS IT WORKING");

  //kind of a nitpick, but this is really the game-state rather than just being a mystery word, but the encapsualtion here is a good design pattern

  // You could also use a constructor function in place of an object literal
  var mysteryWord = {
    hangmanWord: [],
    wordUnderscore: [],
    wordArray: [],
    // Might be less hacky to start the counter at 0
    counter: -1,
    // I lke the logical use of the array here, and how the progression of the hanged man leverages the serial structure of the array! good choice
    bodyParts: ["#headcenter", "#torsocenter", "#armleft", "#armright", "#legleft", "#legright"]
  }

  // this is the vanilla javascript way below: I'd be careful about mixing vanilla js and jquery. You really just want to pick one and use it consistently through out your program
  // it's often okay to use other dev's code, but attribute your sources! https://jsfiddle.net/pertrai1/r3su6b6n/
  // if you don't understand exactly what a piece of code is doing, I wouldn't use it, not for moral reasons, but for the sake of the growth your understanding and development as a coder. you learn more overall when you struggle productively with a problem
  var h4 = document.getElementsByTagName('h4')[0],
  // I'd break some of these out into separate declarations to enhance readability
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
    // Lol I like that the counter includes hours
    //This method is also kind of annoying to read with all the chained ternary expressions. You could just handle this display logic with simple if statements in a far more readable fashion

    h4.textContent =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    // rather than recursively calling timer() from add(), and add() from timer(), I might use setInterval
    timer();
  }
  function timer() {
    // use setInterval here
    t = setTimeout(add, 1000);
  }

  /* Start button */
  // also vanilla js
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
    // this for-loop is missing curly braces!! it's only executing the line of code directly below; it works, but is bad readability practice
    for (i=0; i < mysteryWord.wordArray.length; i++)
    mysteryWord.wordUnderscore[i] = " _ ";
    console.log(mysteryWord.wordUnderscore);
    $("#showWord").html(mysteryWord.wordUnderscore);
    $("#wordEntry").val("");
  })

  $("#submitGuess").on("click", function(evt){
    evt.preventDefault();
    var guessInput = $("#guessEntry").val();
    // I might break the code below into a separate function called checkGuess or something
    // nice
    if (mysteryWord.wordArray.includes(guessInput)) {
      for (i=0; i< mysteryWord.wordArray.length; i++) {
        if (mysteryWord.wordArray[i] === guessInput) {
          mysteryWord.wordUnderscore[i] = guessInput;
          console.log(mysteryWord.wordUnderscore);
          $("#showWord").html(mysteryWord.wordUnderscore);
        }
      }
      // clever else if here
    } else if (mysteryWord.counter >= 5) {
      alert("GAME OVER!! The correct answer is: " + mysteryWord.hangmanWord);
    } else {
      mysteryWord.counter += 1;
      console.log(mysteryWord.counter);
      $(mysteryWord.bodyParts[mysteryWord.counter]).show();
      $("#displayGuesses").append(" <b>" + guessInput + "</b>");
    }
    $("#guessEntry").val("");
  })

  function hideAll (){
    // you could give them all a class and just have to write one line too
    $("#headcenter").hide();
    $("#torsocenter").hide();
    $("#armleft").hide();
    $("#armright").hide();
    $("#legleft").hide();
    $("#legright").hide();
  }

})

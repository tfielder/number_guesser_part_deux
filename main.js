//uses accesses the rest of the code upon page loadup.
$(document).ready(function() {
//creates a global variable to hold the random number stored and initializes it with 0.
  var aRandomNumber = 0;
//creates a global variable to hold the number of wins stored and initializes it with 0.
  var wins = 0;
//creates a global variable to hold the minimum number in a user specified range, and initializes it with 0.
  var min = 0;
//creates a global variable to hold the maximum number in a user specified range, and initializes it with 0.
  var max = 0;
//hides the section of html marked with the part-deux class.
  $(".part-deux").hide();
//hides the section of the html that contains the form for guessing.
  $(".form-div").hide();

  //Max and Min button
//when the javascript max-min button is clicked it calls the following code
  $(".js-min-max-button").click(function() {
//takes the input typed in at the min-number field, gets its value, parses it as an integer and stores it as user_min
    var user_min = parseInt($('#min-number').val());
//takes the input typed in at the max-number field, gets its value, parses it as an integer and stores it as user_max
    var user_max = parseInt($('#max-number').val());
//an if statement to check if the user defined minimum value, maximum values are numbers and if the user defined minimum is less than the user defined maximum.
    if ((isNumber(user_min)) && (isNumber(user_max)) && (user_min < user_max)) {
//sets the minimum value for the program equal to the integer typed by the user.
      min = user_min;
//sets the maximum value for the program equal to the integer typed by the user.
      max = user_max;
//calles the generateRandomNumber function using the newly set minimum and maximum range values
      generateRandomNumber(min, max);
//hides the input fields for minimum and maximum range values
      $(".max-min").hide();
//shows the input field for guessing a number
      $(".part-deux").show();
//shows the reset button
      $(".form-div").show();
//sets the text and instructions for the game.
      $('.result-line').text("Type in your guess and click the guess button");
//if the user did not define values specified by the if statement
    } else {
//The error message appears underneath the min max value fields for the user.
      $('.min-max-verify').text("One of those values doesn't seem to work, try again.");
    }
  });

  //generates a random number
// a function that takes two parameters for generating a random number
  function generateRandomNumber(mini, maxi) {
//sets the variable aRandomNumber equal to the formula for generating a random number using minimum and maximum values (inclusive)
    aRandomNumber = Math.floor(Math.random() * (maxi - mini + 1)) + mini;
//for the purposes of testing or smart players, the random number is printed to the console.
    console.log("random num is " + aRandomNumber);
  }

  //Guess Button
//when the guess button is clicked the following code executes
  $(".js-guess-button").click(function() {
//the input in the user guess input field is assigned to a variable
    var userGuess = $('#user-guess').val();
//the variable which contains the userGuess is passed to the function that validates the input
    validateGuess(userGuess);
//text is rendered "Your last guess was" above the guess placeholder
    $('.first-line').text("Your last guess was");
//the user's guess is rendered in the guess placeholder tag
    $('.js-guess-text').text(userGuess);
  });

  //Clear Button
//when the clear button is clicked the following code executes
  $(".js-clear-button").click(function () {
//the input field for a guess is set to an empty string appearing cleared.
    $('#user-guess').val("");
  });

  //Reset button
//when the reset button is clicked the following code executes
  $(".js-reset-button").click(function () {
    $('#user-guess').val("");
    $('.js-guess-text').text("");
    $('.first-line').text("The game has been reset");
    $('.result-line').text("A new number was created");
    generateRandomNumber(min, max);
  });

  //Processes a Guess
  function validateGuess(guess) {
    if (isNumber(guess)){
      if (numberWithinRange(guess)) {
        processValidGuess(guess);
      } else {
        $('.result-line').text("That number is out of range");
      }
    } else {
      returnErrorMessage();
    }
  }

  //Tests if the response is a number
  function isNumber(response) {
    var response = parseInt(response);
    if (response) {
      return true;
    } else {
      return false;
    }
  }

  //Determines if a number is within a valid range
  function numberWithinRange(guess) {
    if (min <= guess && guess<= max){
      return true;
    } else {
      return false;
    }
  }

  //Determines if guess is correct, high, or low
  function processValidGuess(guess) {
    if (guess < aRandomNumber) {
      $('.result-line').text("That is too low");
    } else if (guess > aRandomNumber) {
      $('.result-line').text("That is too high");
    } else {
      increaseWins();
      increaseMinMax();
      $('.result-line').text("BOOM! Click Reset to continue playing");
    }
  }

  //increaseWins
  function increaseWins() {
    wins += 1;
    $('.wins').text("Wins: " + wins);
  }

  //increase min and max
  function increaseMinMax() {
    min -= 10;
    max += 10;
  }

  //Returns an error message if the guess is not a valid response
  function returnErrorMessage() {
    $('.result-line').text("That is not a valid response");
  }

});

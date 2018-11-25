//note: functions were consistently defined using the ES5 format.
//constants were not included but instead variables were defined using the ES5 format.
//the decision here was due to familiarity with the ES5 format and its similarity to other programming languages such as C++.

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
//the input field for a user's guess is set to an empty string
    $('#user-guess').val("");
//the placeholder text for displaying a user's guess is set to an empty string
    $('.js-guess-text').text("");
//a message appears that notifies the user the game has been reset
    $('.first-line').text("The game has been reset");
//a message appears that notifies the user that a new random number is created
    $('.result-line').text("A new number was created");
//the function to generate a new random number is called.
    generateRandomNumber(min, max);
  });

  //Processes a Guess
//a function to validate a guess with the parameter of the guess
  function validateGuess(guess) {
//checks if the parameter passed to the function is a number by passing it to the isNumber funciton
    if (isNumber(guess)){
//passes the guess parameter to the numberWithinRange function to determine if the parameter is within a specified range.
      if (numberWithinRange(guess)) {
//passes the parameter to the processValidGuess function to process a valid guess
        processValidGuess(guess);
//an else statement if the previous if staement fails
      } else {
//prints to the screen that a number is out of range if the previous statement fails
        $('.result-line').text("That number is out of range");
      }
//an else statement if the original parameter is determened to be not a number
    } else {
//calls the function to return an error message
      returnErrorMessage();
    }
  }

  //Tests if the response is a number
//a function that takes a parameter to determine if it is a number
  function isNumber(response) {
//the parameter passed to the function is parsed as an integer and stored as a variable called response.
    var response = parseInt(response);
//if the parameter was successfully parsed as an integer the following lines of code will execute
    if (response) {
//the function returns true if the parameter passed is parsed successfully as an integer
      return true;
//if not the above
    } else {
//the function returns false if the parameter passed is unsuccessful in parsing as an integer i.e. the response is not a number
      return false;
    }
  }

  //Determines if a number is within a valid range
//function definition for numberWithinRange to determine if a passed number is within a specified range of values defined by the user.
  function numberWithinRange(guess) {
//creates an if statment to test if the passed parameter is greater than or equal to the variable min and less than or equal to the variable max (previously determined by the user)
    if (min <= guess && guess<= max){
//the function returns true if a guess is within the min and max values defined by the user
      return true;
//if the guess is not within the defined range provided by the user
    } else {
//the function returns false
      return false;
    }
  }

  //Determines if guess is correct, high, or low
//a function definition for processing a guess that has been determined to be valid
  function processValidGuess(guess) {
//if the parameter passed is less than the value of the random number
    if (guess < aRandomNumber) {
//a message prints to the screen that the value is too low
      $('.result-line').text("That is too low");
//otherwise if a guess is greater than the random number
    } else if (guess > aRandomNumber) {
//a message prints to the screen that the guessed number is too high
      $('.result-line').text("That is too high");
//otherwise the function determines that the user has guessed correctly
    } else {
//the function to increase wins is called (increasing wins by one)
      increaseWins();
//the function to increase the min and max values is called
      increaseMinMax();
//the text "Boom" is printed to the screen to notify the user that they have guessed correctly
      $('.result-line').text("BOOM! Click Reset to continue playing");
    }
  }

  //increaseWins
//a function to increase the number of wins
  function increaseWins() {
//the variable wins is increased by one
    wins += 1;
//the placeholder text for the number of user wins is updated
    $('.wins').text("Wins: " + wins);
  }

  //increase min and max
//the function template for increasing the range of the max and min values
  function increaseMinMax() {
//decreases the minimum value by ten
    min -= 10;
//increases the maximum value by ten
    max += 10;
  }

  //Returns an error message if the guess is not a valid response
//the function that returns an error message
  function returnErrorMessage() {
//prints the message to the screen that the input is not valid
    $('.result-line').text("That is not a valid response");
  }

});

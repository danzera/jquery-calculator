// global variable assigned by click-handler and
// sent over in AJAX call by the submit button
var operator;
// symbol to be displayed on the calculatorDisplay
var symbol;
// number variables used to store input from the numerical keypad on the DOM
var numOne = "";
var numTwo = "";
var minions;

$(document).ready(function() {
  addEventListeners();
}); // END of document.ready

function displayResult(result) {
  // clear any previous result
  $('.results').empty();
  // display current calculation's result
  $('.results').append('<p>Result: ' + result + '</p>');
}

// AJAX 'POST' call to the server
// sending calculation to be done (object)
// receiving calculation result (string)
// displayResult() function call on success
function postCalculate(calculation) {
  $.ajax({
    type: 'POST',
    url: '/calculator',
    data: calculation,
    success: function(res) {
      // display waiting message
      $('.results').append('<p>Minions busy crunching the numbers...</p>');
      // display results on the DOM upon success
      minions = setTimeout(displayResult(res), 3000);
      // reset numOne to equal the result of the prior calculation
      setNumOne(res);
    }
  }); // END AJAX 'POST' '/calculator'
} // END postCalculate() function

function addEventListeners() {
  // click handler for mathematical operator buttons
  $('.operators').on('click', 'button', function() {
    if (numOne === "") { // require user to enter a number if none has been entered yet
      alert('Please enter a number before choosing a mathematical operator. Thank you, kindly.');
    } else if (numTwo === "") { // only if numOne has been entered, and numTwo HAS NOT
      // assign operator/symbol variables based on the button that was clicked
      setOperation(this.name, $(this).text());
      changeHighlighting();
      // update calculatorDisplay with numOne and the selected operator
      $('.calculatorDisplay').empty();
      $('.calculatorDisplay').append('<span>' + numOne + ' ' + symbol + ' </span>');
    } else { // both numOne && numTwo have been entered, operator is already assigned
      // store numbers entered by the user and
      // the currently assigned operator in an object
      var calculation = {
        numOne: numOne,
        numTwo: numTwo,
        operator: operator
      };
      // send calculation to the server via postCalculate() function
      postCalculate(calculation);
      // assign operator/symbol variables based on the button that was clicked
      setOperation(this.name, $(this).text());
      changeHighlighting();
    } // END else statement
  }); // END mathematical operators click handler

  // click handler for "Crunch the Numbers" button
  $('#calculator').on('submit', function(e) {
    // prevent auto-refresh of the page
    e.preventDefault();
    // store numbers entered by the user and
    // the currently selected operator in an object
    var calculation = {
      numOne: numOne,
      numTwo: numTwo,
      operator: operator
    };
    // send calculation to the server via postCalculate() function
    postCalculate(calculation);
  }); // END on.submit click handler

  // click handler for "Clear" button
  $('#clear').on('click', function() {
    // reset numOne, numTwo, operator and symbol variables
    numOne = '';
    numTwo = '';
    operator = undefined;
    symbol = undefined;
    // un-highlight any button that was selected
    $('button').removeClass('highlight');
    // empty both number inputs and any results that are displayed on the DOM
    $('.results').empty();
    $('.calculatorDisplay').empty();
  }); // END of "Clear" button click handler

  // click handler for number buttons
  $('.numbers').on('click', 'button', function() {
    if (operator === undefined) { // string concatenation on numOne
      numOne += $(this).text();
      console.log('numOne', numOne);
      $('.calculatorDisplay').empty();
      $('.calculatorDisplay').append('<span>' + numOne + '</span>');
    } else { // string concatenation on numTwo
      numTwo += $(this).text();
      $('.calculatorDisplay').empty();
      $('.calculatorDisplay').append('<span>' + numOne + ' ' + symbol + ' ' + numTwo + '</span>');
      console.log('numTwo', numTwo);
    } // END else statement
  }); // END number buttons click handler
} // END addEventListeners() function

function changeHighlighting() {
  // remove highlight class from any previous operator button that was clicked
  $('button').removeClass('highlight');
  // add highlight class to current operator button
  $('#' + operator).addClass('highlight');
}

// setter for operator & symbol
function setOperation(operand, mathOperator) {
  operator = operand;
  symbol = mathOperator;
}
// setter for numOne
function setNumOne(num) {
  numOne = num;
}
// setter for numTwo
function setNumTwo(num) {
  numTwo = num;
}

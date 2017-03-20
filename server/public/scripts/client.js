// global variable assigned by click-handler and
// sent over in AJAX call by the submit button
var operator;
// symbol to be displayed on the calculatorDisplay
var symbol;
// number variables used to store input from the numerical keypad on the DOM
var numOne = "";
var numTwo = "";

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
      displayResult(res);
    }
  }); // END AJAX 'POST' '/calculator'
} // END postCalculate() function

function addEventListeners() {
  // click handler for mathematical operator buttons
  $('.operators').on('click', 'button', function() {
    if (numOne === "") {
      alert('Please enter a number before choosing a mathematical operator. Thank you, kindly.');
    } else {
      // assign operator/symbol variables based on the button that was clicked
      operator = this.name;
      symbol = $(this).text();
      // remove highlight class from any previous operator button that was clicked
      $('button').removeClass('highlight');
      // add highlight class to current operator button
      $(this).addClass('highlight');
      $('.calculatorDisplay').empty();
      $('.calculatorDisplay').append('<span>' + numOne + ' ' + symbol + ' </span>');
    }
  });

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
    // reset numOne, numTwo, and operator variables
    numOne = '';
    numTwo = '';
    operator = undefined;
    symbol = undefined;
    // un-highlight any button that was selected
    $('button').removeClass('highlight');
    // empty both number inputs and any results that are displayed on the DOM
    $('.numField').val("");
    $('.results').empty();
    $('.calculatorDisplay').empty();
  }); // END of "Clear" button click handler

  // click handler for number buttons
  $('.numbers').on('click', 'button', function() {
    if (operator === undefined) {
      numOne += $(this).text();
      console.log('numOne', numOne);
      $('.calculatorDisplay').empty();
      $('.calculatorDisplay').append('<span>' + numOne + '</span>');
    } else {
      numTwo += $(this).text();
      $('.calculatorDisplay').empty();
      $('.calculatorDisplay').append('<span>' + numOne + ' ' + symbol + ' ' + numTwo + '</span>');
      console.log('numTwo', numTwo);
    }
  });
}

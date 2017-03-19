// global variable assigned by click-handler and
// sent over in AJAX call by the submit button
var operator;
// variable to be displayed on DOM with calculation result
var symbol;

$(document).ready(function() {
  addEventListeners();
}); // END of document.ready

function updateDOM(result) {
  // clear any previous result
  $('.results').empty();
  // display current calculation's result
  $('.results').append('<p>Result: ' + result + '</p>');
}

// AJAX 'POST' call to the server
// sending calculation to be done (object)
// receiving calculation result (string)
// updateDOM() function call on success
function postCalculate(calculation) {
  $.ajax({
    type: 'POST',
    url: '/calculator',
    data: calculation,
    success: function(res) {
      updateDOM(res);
    }
  }); // END AJAX 'POST' '/calculator'
} // END postCalculate() function

function addEventListeners() {
  // click handler for mathematical operator buttons
  $('.operators').on('click', 'button', function() {
    // assign operator variable based on the button that was clicked
    operator = this.name;
    // remove highlight class from any previous operator button that was clicked
    $('button').removeClass('highlight');
    // add highlight class to current operator button
    $(this).addClass('highlight');
  });

  // click handler for "Crunch the Numbers" button
  $('#calculator').on('submit', function(e) {
    // prevent auto-refresh of the page
    e.preventDefault();
    // store numbers entered by the user and
    // the currently selected operator in an object
    var calculation = {
      numOne: parseInt($('#numOneInCalculator').val()),
      numTwo: parseInt($('#numTwoInCalculator').val()),
      operator: operator
    };
    // send calculation to the server via postCalculate() function
    postCalculate(calculation);
  }); // END on.submit click handler

  // click handler for "Clear" button
  $('#clear').on('click', function() {
    // reset operator variable and un-highlight any button that was selected
    operator = undefined;
    $('button').removeClass('highlight');
    // empty both number inputs and any results that are displayed on the DOM
    $('.numField').val("");
    $('.results').empty();
  }); // END of "Clear" button click handler
}

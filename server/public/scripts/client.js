// global variable assigned by click-handler and
// sent over in AJAX call by the submit button
var operator;

$(document).ready(function() {
  // handle operator button click events
  $('.operators').on('click', 'button', function() {
    // pull name from the button that was clicked and
    // assign it to the operator variable
    operator = this.name;
    // remove highlight class from any previous operator button that was clicked
    $('button').removeClass('highlight');
    // add highlight class to current operator button that is selected
    $(this).addClass('highlight');
    console.log("current operator selected: ", operator);
  });

  $('.calculator').on('submit', function(e) {
    // prevent auto-refresh of the page
    e.preventDefault();
    // store numbers entered by the user
    var x = parseInt($('#numOneInCalculator').val());
    var y = parseInt($('#numTwoInCalculator').val());
    console.log("x = ", x);
    console.log("y = ", y);
    // store numbers and the currently selected operator in an object
    var calculation = {
      numOne: x,
      numTwo: y,
      operator: operator
    };
    console.log("object being sent to the server: ", calculation);
    // AJAX 'POST' call to the server
    // sending object to be calculated
    // receiving calculation result
    $.ajax({
      type: 'POST',
      url: '/calculate',
      data: calculation,
      success: function(res) {
        console.log(res);
      }
    });
  });
});

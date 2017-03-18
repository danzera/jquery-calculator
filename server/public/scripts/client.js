var operator;

$(document).ready(function() {
  // handle calculator button click events
  $('.calculator').on('click', 'button', function(e) {
    // pull name from the button that was clicked
    var id = this.name;
    operator = id;
    console.log(id);
    //$('button').removeClass('highlight');
    $(this).addClass('highlight');
  });
});

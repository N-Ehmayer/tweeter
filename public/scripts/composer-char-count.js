
$( document ).ready(function() {

//--- Keeps track of key presses inside new tweet input ---
  $( "#new-tweet-input" ).on('keyup', function() {

    let maxChars = 140;
    let chars = $("#new-tweet-input").val().length;

    let charsRemaining = maxChars - chars;

    $(this).next().next().text(charsRemaining);
  });
});
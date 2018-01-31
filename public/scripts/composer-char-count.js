$( document ).ready(function() {

  //--- Keeps track of key presses inside compose tweet text-box ---
  $( "#new-tweet-input" ).on('keyup', function() {

    //--- Sets counter to remaining characters ---
    let maxChars = 140;
    let chars = $("#new-tweet-input").val().length;
    let charsRemaining = maxChars - chars;

    let counter = $(this).next().next();

    counter.text(charsRemaining);

    //--- Changes character counter to red when limit exceeded ---
    if (charsRemaining < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});

// --- Creates tweet from tweet data ---------------------------------------
function createTweetElement(tweet) {

  //--- Converts time passed in milliseconds to human readable output ------
  let timePassedMilli = Date.now() - tweet.created_at;
  let date = new Date(timePassedMilli);

  var timeStr = '';
  if (date.getUTCDate()-1 > 0) {
    timeStr += date.getUTCDate()-1 + " days, ";
  }
  if (date.getUTCHours() > 0) {
    timeStr += date.getUTCHours() + " hours, ";
  }
  timeStr += date.getUTCMinutes() + " minutes ago";


  let $tweet = `<article class="tweet">
                   <header>
                     <img src="${tweet.user.avatars.small}" />
                     <h2>${tweet.user.name}</h2>
                     <span>${tweet.user.handle}</span>
                   </header>
                   <footer>
                     <p class="content">${escape(tweet.content.text)}</p>
                     <p class="age-display">${timeStr}</p>
                   </footer>
                 </article>`;
  return $tweet;
};



//--- Renders each tweet to index.html ---
function renderTweets(tweet) {

  tweet.forEach(function(num, index) {
    let currentTweet = createTweetElement(num);
    $('#tweets-container').prepend(currentTweet);
  });
};


  //--- Loads the rendered tweets from /tweets to the DOM ---
function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function(tweets) {
      $('#tweets-container').empty();
      console.log("success");
      renderTweets(tweets);
    },
    error: function(err) {
      console.log(err);
    }
  });
};


//--- Loads flash error message to the new tweet object ---
function loadMessage(err) {

  const $container = $('#flash-holder');

  if (err === 'no input') {
    let $message = "You didn't Tweet anything!";
    $container.append($message);
  } else if (!err) {
    let $message = "Character limit exceeded!";
    $container.append($message);
  }
  $container.css('color', '#ff0000');
}

// --- Escapes user inputted strings before they are read by the DOM ---
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


//--- Execute when all DOM elements loaded ---
$(function() {

  loadTweets();

  //--- Toggles between show/hide 'compose new tweet' container ---
  $('.new-tweet').hide();

  $('#new-tweet-toggle').on('click', function(event) {
    $('.new-tweet').slideToggle('show');
  });


  //--- Executes when new tweet form is submitted ---
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();

    const tweet = $('#new-tweet-input').val();

    $('#flash-holder').empty().css('display', 'block');

    if (!tweet) {
      loadMessage('no input');
      $('#flash-holder').delay(4000).fadeOut();

    } else if (tweet.length > 140) {
      loadMessage();
      $('#flash-holder').delay(4000).fadeOut();

    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),

        success: function(tweets) {
          console.log("success");
          loadTweets();
          $('#new-tweet-input').val('');
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });
});








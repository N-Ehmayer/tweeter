
// --- Creates tweet from tweet data ---
function createTweetElement(tweet) {

  let $tweet = `<article class="tweet">
                   <header>
                     <img src="${tweet.user.avatars.small}" />
                     <h2>${tweet.user.name}</h2>
                     <span>${tweet.user.handle}</span>
                   </header>
                   <footer>
                     <p class="content">${tweet.content.text}</p>
                     <p>${tweet.created_at}</p>
                   </footer>
                 </article>`;
  return $tweet;
};



//--- Renders each tweet to index.html ---
function renderTweets(tweet) {

  tweet.forEach(function(num, index) {
    let currentTweet = createTweetElement(num);
    //console.log(currentTweet);
    $('#tweets-container').prepend(currentTweet);
  });

};


//--- Execute when all DOM elements loaded ---
$(function() {

//--- Loads the rendered tweets from /tweets to the DOM ---
  function loadTweets() {
    $.ajax({
      url: '/tweets/',
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

  loadTweets();

//--- Executes when new tweet from is submitted ---
  $('#tweet-form').on('submit', function(event) {

    event.preventDefault();

    const tweet = $('#new-tweet-input').val();

    if (!tweet) {
      console.log("No text input");

    } else if (tweet.length > 140) {
      console.log("Too many characters");

    } else {

      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $(this).serialize(),

        success: function(tweets) {
          console.log("success");
          loadTweets();
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });
});








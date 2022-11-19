import { tweetsData } from './data.js';

const tweetInput = document.getElementById('tweet-input');
const tweetBtn = document.getElementById('tweet-btn');

tweetBtn.addEventListener('click', function () {
  console.log(tweetInput.value);
});

document.addEventListener('click', function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  }
});

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }

  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  render();
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
}

function getFeedHtml() {
  let feedHtml = ``;
  tweetsData.forEach(function (tweet) {
    let likeIconClass = '';
    if (tweet.isLiked) {
      likeIconClass = 'liked';
    }
    let retweetIconClass = '';
    if (tweet.isRetweeted) {
      retweetIconClass = 'retweeted';
    }

    feedHtml += `<div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                <i class='fa-regular fa-comment-dots' data-reply='${tweet.uuid}'></i>
                <span class="tweet-detail">${tweet.replies.length}
                </span>
                <i class='fa-solid fa-heart ${likeIconClass}' data-like='${tweet.uuid}'></i>    
                <span class="tweet-detail">${tweet.likes}</span>
                <i class='fa-solid fa-retweet ${retweetIconClass}' data-retweet='${tweet.uuid}'></i>
                <span class="tweet-detail">${tweet.retweets}</span>
                </div>
            </div>
        </div>
    </div>`;
  });
  return feedHtml;
}

function render() {
  document.getElementById('feed').innerHTML = getFeedHtml();
}
render();

var TwitterBotHelper = require('./TwitterBotHelper.js');
var twitterBotHelper = new TwitterBotHelper();

// Lets listen for new Followers so we can send them a tweet saying thanks for following!
//twitterBotHelper.newFollowerIntroductionTweet();
twitterBotHelper.getLatestTweetFromHashtag('#website', function(statusData) {
    console.log(statusData.text);
});

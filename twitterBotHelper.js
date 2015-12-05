var Twit = require('twit');
var T = new Twit(require('./config.js'));

var TwitterBotHelper = function() {
};

/**
 * A helper function to verify the tweet is valid and to post it
 * 
 * @param {type} status The status we should post
 * @returns {Boolean} returns whether the status has been added
 */
TwitterBotHelper.prototype.post = function(status) {
    // Check to see if the string is blank or is more than 140 characters
    var statusLength = status.length;
    if (statusLength > 140) {
        console.log('Sorry, status must be less than 140 characters!');
        return false;
    } else if (status === '') {
        console.log('Sorry, status cannot be blank!');
        return false;
    }
    // Finally we'll send the status update if the status is valid
    T.post('statuses/update', {status: status}, function(error, data, response) {
        if (error) {
            console.log('There was an error tweeting this message.', error);
        } else if (response) {
            return true;
        }
    });
};

/**
 * A function to send a "Thanks for following" message directly to the user.
 * 
 * @returns {Boolean} returns true
 */
TwitterBotHelper.prototype.newFollowerIntroductionTweet = function() {
    var stream = T.stream('user');
    stream.on('follow', function(event) {
        var screenName = event.source.screen_name;
        TwitterBotHelper.prototype.post.call(this, '@' + screenName + ' Thanks for following!');
    });
    return true;
};

/**
 * 
 * @param {type} hashTag
 * @param {type} callbackFunction
 * @returns {undefined}
 */
TwitterBotHelper.prototype.getLatestTweetFromHashtag = function(hashTag, callbackFunction) {
    T.get('search/tweets', {q: hashTag, count: 1, result_type: "recent"}, function(error, data, response) {
        if (error) {
            console.log('There was an error finding this hashtag');
            callbackFunction(false);
        } else if (data) {
            var statusData = data['statuses'][0];
            var statusObject = {
                "id": statusData.id,
                "text": statusData.text
            };
            callbackFunction(statusObject);
        }
    });
};



module.exports = TwitterBotHelper;

var Twit = require('twit');
var T = new Twit(require('./config.js'));

var TwitterBotHelper = function() {
};

/**
 * A helper function to verify the tweet is valid and to post it
 * 
 * @param {string} status The status we should post
 * @param {Boolean} directMessage This is whether the tweet should be sent as a direct message
 * @returns {Boolean} returns whether the status has been added
 */
TwitterBotHelper.prototype.post = function(status, directMessage, userData) {
    // Check to see if the string is blank or is more than 140 characters
    var statusLength = status.length;
    if (statusLength > 140) {
        console.log('Sorry, status must be less than 140 characters!');
        return false;
    } else if (status === '') {
        console.log('Sorry, status cannot be blank!');
        return false;
    }

    // So we can tell the application whether to post the message as direct message or not
    var apiEndpoint = '';
    if (directMessage) {
        apiEndpoint = 'direct_messages/new';
        // The user data should contain a screen name or an user id
        var apiData = userData;
        apiData.status = status;
    } else {
        apiEndpoint = 'statuses/update';
        var apiData = {status: status};
    }

    // Finally we'll send the status update if the status is valid
    T.post(apiEndpoint, apiData, function(error, data, response) {
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
        TwitterBotHelper.prototype.post.call(this, 'Thanks for following!', true, {screen_name: screenName});
    });
    return true;
};

/**
 * 
 * @param {type} searchQuery
 * @param {type} callbackFunction
 * @returns {undefined}
 */
TwitterBotHelper.prototype.getLatestTweetFromHashtag = function(searchQuery, callbackFunction) {
    // If the search query is empty we should end the call and return an error to the user
    if (searchQuery === '') {
        callbackFunction(false);
        return false;
    }

    T.get('search/tweets', {q: searchQuery, count: 1, result_type: "recent"}, function(error, data, response) {
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

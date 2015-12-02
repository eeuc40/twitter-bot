var Twit = require('twit');
var T = new Twit(require('./config.js'));

var TwitterBotHelper = function() {
};

/**
 * A helper function to verify the tweet is valid
 * 
 * @param {type} status The 
 * @returns {Boolean} returns whether the status has been added
 */
TwitterBotHelper.prototype.post = function(status) {
    // Check to see if the string is blank or 
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

module.exports = TwitterBotHelper;

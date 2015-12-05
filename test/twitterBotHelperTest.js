var TwitterBotHelper = require('../twitterBotHelper.js');
var twitterHelper = new TwitterBotHelper();
var assert = require('assert');

describe('TwitterBotHelper', function() {
    describe('#post()', function() {
        it('should return false when checking the string length', function() {
            // Test Blank String
            assert.equal(false, twitterHelper.post(''));
            // Test >140 characters
            var longString = '';
            for (var characterCount = 0; characterCount < 170; characterCount++) {
                longString += "A";
            }
            // Test for a long string 
            assert.equal(false, twitterHelper.post(longString));
        });
    });
    
    
    describe('#getLatestTweetFromHashtag()', function() {
        it('should return an object', function(done) {
             twitterHelper.getLatestTweetFromHashtag('#website', function(statusData){
                 assert.equal('object', typeof statusData);
                 done();
             });
        });
        it('should return an integer as an id', function(done) {
             twitterHelper.getLatestTweetFromHashtag('#website', function(statusData){
                 assert.equal('number', typeof statusData.id);
                 done();
             });
        });
        it('should return a string as for text field', function(done) {
             twitterHelper.getLatestTweetFromHashtag('#website', function(statusData){
                 assert.equal('string', typeof statusData.text);
                 done();
             });
        });
    });
});

var TwitterBotHelper = require('../twitterBotHelper.js');
var twitterHelper = new TwitterBotHelper();
var assert = require('assert');

describe('TwitterBotHelper', function() {
  describe('#post()', function () {
    it('should return false when checking the string length', function () {
      // Test Blank String
      assert.equal(false, twitterHelper.post(''));
      // Test >140 characters
      var longString = '';
      for(var characterCount = 0; characterCount < 170; characterCount++){
          longString += "A";
      }
      assert.equal(false, twitterHelper.post(longString));
    });
  });
});

# A Simple NodeJS Twitter Bot ![alt text](https://travis-ci.org/eeuc40/twitter-bot.svg?branch=master "Build Status")

A simple twitter bot designed to use NodeJS to automatically send "Thank you for following" messages to new followers

## Installation

In order to install this you will need to download NodeJS and download all the files. You will need install the dependencies for the project. On your command line in the project directory type `npm install twit` which will install the Twit package.

To connect to twitter you will need to create a new app (After logging in): https://dev.twitter.com/apps/new 

You will need to change the `config.js` file to include you API keys, these can be found in the settings part of your new app

Once this is all setup, run `node bot.js` from your command line and your application should be running!

## Testing

I have added Mocha tests to the `tests` directory

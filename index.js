require('dotenv').config();
console.log('Bot is starting');
const Twit = require('twit');
let Twitr = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCES_TOKEN,
    access_token_secret:  process.env.ACCES_TOKEN_SECRET,
});
///gets latest tweat of user , also gets retweets if u want no retrweets set include_rts to false => info : https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline
Twitr.get('statuses/user_timeline', { screen_name: process.env.USERLOOKUP , count: 1 }, function(err, data, response) {
    console.log(data)
  })
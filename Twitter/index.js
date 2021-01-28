require("dotenv").config();
console.log("Bot is starting");
const Twit = require("twit");

let T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCES_TOKEN,
  access_token_secret: process.env.ACCES_TOKEN_SECRET,
});

let Twitter = {};

Twitter.getLatestTweet = async () => {
  let usernameResponse = await T.get(
    "https://api.twitter.com/2/users/by/username/:username",
    { username: process.env.HANDLE }
  );

  const userId = usernameResponse.data.data.id;

  console.log(userId);

  let tlResponse = await T.get(`https://api.twitter.com/2/users/:id/tweets`, {
    id: userId,
    exclude: "replies,retweets",
    "tweet.fields": "created_at"
  });

  console.log(tlResponse.data.data[1]);
};

module.exports = Twitter;

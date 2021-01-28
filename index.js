require(`dotenv`).config();
const Twitter = require(`./Twitter`);
const Discord = require("discord.js");
const client = new Discord.Client();

let lastTweetDate = null;

client.on(`ready`, () => {
  startInterval();
});

const startInterval = () => {
  sendNewest();
};

const sendNewest = async () => {
  const channel = client.channels.cache.find(
    (channel) => channel.name === "development"
  );
  let message = await Twitter.getLatestTweet();

  if (lastTweetDate === null) lastTweetDate = message.date;

  if (lastTweetDate != null && lastTweetDate < message.date) {
    channel.send(
      `@${
        process.env.HANDLE
      } just tweeted:\n ${message.date
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "")}\n ${message.value}`
    );
  }

  setTimeout(sendNewest, 10000);
};

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.login(process.env.BOT_TOKEN);

require(`dotenv`).config();
const Twitter = require(`./Twitter`);
const Discord = require("discord.js");
const client = new Discord.Client();

client.on(`ready`, async () => {
  const channel = client.channels.cache.find(
    (channel) => channel.name === "development"
  );
  let message = await Twitter.getLatestTweet();

  console.log(message);
  channel.send(
    `@${
      process.env.HANDLE
    } just tweeted:\n ${message.date
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")}\n ${message.value}`
  );
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.login(process.env.BOT_TOKEN);

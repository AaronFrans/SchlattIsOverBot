require(`dotenv`).config();
const Twitter = require(`./Twitter`);
const Discord = require("discord.js");
const client = new Discord.Client();
const embed = require("discord-embed-maker");

let lastTweetDate = null;
const prefix = "#";
let timout = null;

client.on(`ready`, () => {

  
  client.guilds.cache.map((guild) => sendIntroMessage(guild));
});

const sendIntroMessage = (guild) => {
  let channelID;
  let channels = guild.channels.cache;

  channelLoop:
  for (let key in channels) {
      let c = channels[key];
      if (c[1].type === "text") {
          channelID = c[0];
          break channelLoop;
      }
  }

  let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
  channel.send(`Please set the channel the bot should post in via the \"#set\" command.`);
};

const sendNewest = async () => {
  const channel = client.channels.cache.find(
    (channel) => channel.name === "development"
  );

  let message = await Twitter.getLatestTweet();

  if (lastTweetDate < message.date) {
    lastTweetDate = message.date;

    embed.setTitle(`@${process.env.HANDLE}`);
    embed.setFooter(
      `${message.date.toISOString().replace(/T/, " ").replace(/\..+/, "")}`
    );
    embed.setDescription(message.value);
    embed.setImage(
      "https://static.wikia.nocookie.net/my-hero-academia-the-pinnacle/images/4/44/Jonathan_schlatt.jpg/revision/latest/scale-to-width-down/256?cb=20190814233055"
    );

    channel.send({ embed: embed });
  }

  timout = setTimeout(sendNewest, 10000);
};

client.on("message", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "start":
      msg.channel.send("Started posting new tweets.");
      sendNewest();
      break;
    case "stop":
      msg.channel.send("Stopped posting new tweets.");
      if (timout != null) clearTimeout(timout);
      break;
    default:
      msg.channel.send("Not a valid command");
  }
});

client.login(process.env.BOT_TOKEN);

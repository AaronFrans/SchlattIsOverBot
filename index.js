require(`dotenv`).config();
const Twitter = require(`./Twitter`);
const Discord = require("discord.js");
const client = new Discord.Client();
const embed = require('discord-embed-maker');


const sendMessage = async () => {

  const channel = client.channels.cache.find(
    (channel) => channel.name === "development"
  );
  let message = await Twitter.getLatestTweet();

  embed.setTitle(`@${process.env.HANDLE}`);
  embed.setFooter(`${message.date.toISOString().replace(/T/," ").replace(/\..+/,"")}`);
  embed.setDescription((message.value));
  embed.setImage("https://static.wikia.nocookie.net/my-hero-academia-the-pinnacle/images/4/44/Jonathan_schlatt.jpg/revision/latest/scale-to-width-down/256?cb=20190814233055");
  console.log(message);
  channel.send({embed:embed});
}

client.on(`ready`, async () => {
 sendMessage();
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.login(process.env.BOT_TOKEN);

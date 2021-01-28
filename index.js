require(`dotenv`).config();
const Twitter = require(`./Twitter`);
const Discord = require('discord.js');
const client = new Discord.Client();

client.on(`ready`, async () =>{
   const channel = client.channels.cache.find(channel => channel.name === "development");
   let message = await Twitter.getLatestTweet();
   channel.send("message");
})


client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong');
    }
  });
   
client.login(process.env.BOT_TOKEN);

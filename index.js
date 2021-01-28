require(`dotenv`).config();
const Twitter = require(`./Twitter`);
const Discord = require('discord.js');
const client = new Discord.Client();



client.on(`ready`, async (server) =>{
   let response = await Twitter.getLatestTweet();

   const channel = server.guild.channels.find(ch => ch.name === 'development');
   channel.send(`The message :`);

})

client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong');
    }
  });
   
client.login(process.env.BOT_TOKEN);

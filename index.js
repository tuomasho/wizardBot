const botconfig = require("./json_files/botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("wizard shit", { type: "LISTENING" });
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}hello`) {
    return message.reply(" Hello");
  }
});

bot.login(botconfig.token);

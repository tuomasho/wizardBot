const Discord = require("discord.js");
const botconfig = require("./json_files/botconfig.json");
const colors = require("./json_files/colors.json");

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

  if (cmd === `${prefix}embed`) {
    let sEmbed = new Discord.RichEmbed()
      .setColor(colors.gryffindor_red)
      .setTitle("User info")
      .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
      .addField("**Guild Name:**", `${message.guild.name}`, true)
      .addField("**Guild owner:**", `${message.guild.owner}`, true)
      .setFooter(`${bot.user.username} | Footer`);

    message.channel.send({ embed: sEmbed });
  }
});

bot.login(botconfig.token);

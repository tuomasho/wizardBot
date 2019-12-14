const { Client, Collection } = require("discord.js");
const { token, prefix } = require("./json_files/botconfig.json");
const mongoose = require("mongoose");

const bot = new Client();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("wizard shit", { type: "LISTENING" });
});

//Read commands from commands folder
const fs = require("fs");
bot.commands = new Collection();
bot.aliases = new Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    return console.log("[LOGS] Couldn't find commands!");
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    bot.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name);
    });
  });
});

//Make bot to react on messages
bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!message.content.startsWith(prefix)) return;

  let commandfile =
    bot.commands.get(cmd.slice(prefix.length)) ||
    bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) commandfile.run(bot, message, args);
});

//Get db config
const db = require("./json_files/dbconfig.json").mongoUri;

//Connect to MongoDB
mongoose
  .connect(db, { userNewUrlParser: true })
  .then(() => console.log("MongoDB connected...."))
  .catch(err => console.log(err));

//Connect bot
bot.login(token);

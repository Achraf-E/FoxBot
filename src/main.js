const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const loadCommands = require("./Loaders/loadCommands.js");
const loadEvents = require("./Loaders/loadEvents.js");
const config = require("./config.json");

bot.login(config.TOKEN);
bot.commands = new Discord.Collection();
bot.color = "Orange";
loadCommands(bot,config);
loadEvents(bot,config);






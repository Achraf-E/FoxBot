const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const loadCommands = require("./Loaders/loadCommands.js");
const config = require("./config.js");

bot.login(config.token);
bot.commands = new Discord.Collection();
loadCommands(bot);

bot.on("messageCreate", async message => {
    if (message.content == "!ping"){
        return bot.commands.get("ping").run(bot, message);
    }
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
});

const Discord = require("discord.js");
const loadSlashCommands = require("../Loaders/loadSlashCommands");
const loadDatabase = require("../Loaders/loadDatabase.js");


module.exports = async(bot) => {
    await loadSlashCommands(bot);

    bot.db = await loadDatabase();

    bot.db.connect(function () {
        console.log("Database connected");
    });

    console.log(`${bot.user.username} is online`);

    
}
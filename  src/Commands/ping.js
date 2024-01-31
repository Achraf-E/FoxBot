const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "affiche la latence",
    dm : true,
    category: "Informations",

    async run(bot, message) {
        await message.reply({ephemeral: true, content : `\`Ping : ${bot.ws.ping}\``});
    }
}